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
    userId,
  } = req.query;
  // TODO: get all videos based on query, sort, pagination
  // convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // build the filter object
  const filter = {};
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }
  if (userId) {
    filter.owner = userId;
  }
  // build the sort object
  const sort = {};
  if (sortBy) {
    sort[sortBy] = sortType === "asc" ? 1 : -1;
  }

  try {
    // execute the query with pagination and sorting
    const aggregate = Video.aggregate([{ $match: filter }, { $sort: sort }]);
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
  // TODO: get video, upload to cloudinary, create video
  // Extract video details from the request body.
  // Upload the video to Cloudinary (or any other cloud storage service).
  // Create a new video document in the database with the uploaded video’s details.
  // Send a response back to the client.

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }

  // console.log("req.files: ", req.files);
  const videoFileLocalPath = req.files?.videoFile[0]?.path;
  //const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  // console.log(videoFileLocalPath);
  // console.log(thumbnailLocalPath);

  // for checking the coverImage, it is set or not
  let thumbnailLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.thumbnail) &&
    req.files.thumbnail.length > 0
  ) {
    thumbnailLocalPath = req.files.thumbnail[0].path;
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required!");
  }
  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!(videoFile && thumbnail)) {
    throw new ApiError(
      400,
      "videoFile and thumbnail files not retrieved from cloudinary!"
    );
  }

  const newVideo = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
  });

  const publishVideo = await Video.findById(newVideo._id);
  if (!publishVideo) {
    throw new ApiError(500, "Something went wrong while publishing the video");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, publishVideo, "Video published Successfully!"));
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
