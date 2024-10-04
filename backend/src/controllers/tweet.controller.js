import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const createTweet = asyncHandler(async (req, res) => {
  // TODO: create tweet
  const { content } = req.body;
  if (!content?.trim()) {
    throw new ApiError(400, "Tweet cannot be empty");
  }
  const tweet = await Tweet.create({
    content,
    owner: req.user?._id,
  });
  if (!tweet) {
    throw new ApiError(500, "Error while adding tweet");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "No valid user Id found");
  }
  const tweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
      },
    },
    {
      $project: {
        _id: 1,
        content: 1,
        likesCount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
  if (!tweets?.length) {
    throw new ApiError(401, "No tweets found for this user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  // TODO: update tweet
  const { content } = req.body;
  const { tweetId } = req.params;

  if (!content?.trim()) {
    throw new ApiError(400, "Tweet cannot be empty");
  }
  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(500, "Tweet not found");
  }
  if (tweet.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(401, "You do not have permission to update this tweet");
  }
  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: { content },
    },
    {
      new: true,
    }
  );
  if (!updatedTweet) {
    throw new ApiError(400, "Error while updating tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updateTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  // TODO: delete tweet
  const { tweetId } = req.params;
  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(500, "Tweet not found");
  }
  if (tweet.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(401, "You do not have permission to delete this tweet");
  }
  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  
  if (!deletedTweet) {
    throw new ApiError(400, "Error while deleting the tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedTweet, "Tweet deleted successfully"));
});

const getAllTweets = asyncHandler(async(req, res)=> {})

export { createTweet, getUserTweets, updateTweet, deleteTweet, getAllTweets };
