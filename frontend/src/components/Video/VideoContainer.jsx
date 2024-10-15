import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";
import VideoCard from "./VideoCard";
import axiosInstance from "../../utils/axios.helper";

function VideoContainer() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const getVideoData = async (page) => {
    try {
      const response = await axiosInstance.get(`/videos?page=${page}&limit=20`);
      if (response?.data?.data?.length > 0) {
        setVideos((prevVideos) => [...prevVideos, ...response.data.data]);
        setLoading(false);
        if (response.data.data.length !== 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error while fetching videos", error);
    }
  };

  useEffect(() => {
    getVideoData(page);
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
