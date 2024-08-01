import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "asc",
    owner,
  } = req.query;
  // TODO: get all videos based on query, sort, pagination
  // convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // build the filter object
  const filter = {};
  if (query) {
    filter.title = query;
  }
  if (owner) {
    filter.owner = owner;
  }
  console.log(filter);
  // build the sort object
  const sort = {};
  if (sortBy) {
    sort[sortBy] = sortType === "asc" ? 1 : -1;
  }

  try {
    // execute the query with pagination and sorting
    const aggregate = Video.aggregate({ $match: filter });
    const options = {
      page: pageNumber,
      limit: limitNumber,
    };
    const videos = await Video.aggregatePaginate(aggregate, options);
    // get the total count for pagination

    const videosWithPagination = {
      videos: videos.docs,
      pagination: {
        total: videos.totalDocs,
        page: videos.page,
        pages: videos.totalPages,
      },
    };
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          videosWithPagination,
          "videos and pagination are done perfectly!"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.params;

  // Validate required fields
  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // Extract paths from uploaded files
  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  let thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  // Validate required files
  if (!videoFileLocalPath) {
    throw new ApiError(400, "Video file is required!");
  }
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required!");
  }

  // Upload files to Cloudinary
  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  // Validate Cloudinary upload success
  if (!(videoFile && thumbnail)) {
    throw new ApiError(
      400,
      "Failed to upload video file and thumbnail to Cloudinary!"
    );
  }

  // Create new video entry in the database
  const newVideo = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    owner: userId, // Link the video to the user by userId
  });

  // Fetch and validate the newly created video
  const publishVideo = await Video.findById(newVideo._id).populate(
    "owner",
    "username email"
  );
  if (!publishVideo) {
    throw new ApiError(500, "Something went wrong while publishing the video");
  }

  // Return success response
  return res
    .status(201)
    .json(new ApiResponse(201, publishVideo, "Video published successfully!"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  // TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  // TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  // TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
