import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";

const getChannelStats = asyncHandler(async (res, req) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes, etc
});

const getChannelVideos = asyncHandler(async (res, req) => {
  // TODO: Get all the videos uploaded by the channel
});

export { getChannelStats, getChannelVideos };
