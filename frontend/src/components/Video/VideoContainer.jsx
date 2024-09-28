import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../../store/videosSlice";
import { FaVideo } from "react-icons/fa";
import VideoCard from "./VideoCard";

function VideoContainer() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.videos);
  console.log("videos", videos);

  const getVideoData = async () => {
    try {
      const response = await axios.get("/api/v1/videos", {
        withCredentials: true,
      });
      if (response?.data?.data?.length > 0) {
        dispatch(addVideos(response?.data?.data));
      }
    } catch (error) {
      setError("Failed to fetch videos and add to store slice", error);
    }
  };

  useEffect(() => {
    if (!videos) {
      getVideoData();
    }
  }, [videos]);

  if (error) {
    return <div>{error}</div>;
  }

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
          <VideoCard key={video?._id} video={video} name={video?.owner?.username} />
        ))}
      </div>
    </div>
  );
}

export default VideoContainer;
