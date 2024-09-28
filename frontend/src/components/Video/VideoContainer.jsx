import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../../store/videosSlice";
import { FaVideo } from "react-icons/fa";
import VideoCard from "./VideoCard";
import axiosInstance from "../../utils/axios.helper";

function VideoContainer() {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.videos);

  const getVideoData = async () => {
    try {
      const response = await axiosInstance.get("/videos");
      if (response?.data?.data?.length > 0) {
        dispatch(addVideos(response?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoData();
  }, []);

  if (!videos || videos.length === 0) {
    return (
      <div className="flex justify-center mt-[30vh]">
        <div className="flex flex-col items-center">
          <FaVideo className="w-20 h-20" />
          <h1>No Videos Available</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden mt-5">
      <div className="flex flex-wrap justify-around">
        {videos?.map((video) => (
          <VideoCard key={video?._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoContainer;
