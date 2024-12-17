import React, { useEffect, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { icons } from "../assets/Icons";
import Comments from "../components/Comments.jsx";
import GuestComponent from "../components/GuestPages/GuestComponent";
import VideoInfo from "../components/Video/VideoInfo.jsx";
import VideoListCard from "../components/Video/VideoListCard.jsx";
import VideoPlayer from "../components/Video/VideoPlayer.jsx";
import { setVideo } from "../store/videoSlice";
import axiosInstance from "../utils/axios.helper.js";

function Video() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { videoId } = useParams();
  const [videos, setVideos] = useState([]);
  const { video } = useSelector((state) => state.video);
  const authStatus = useSelector((state) => state.auth.status);

  const fetchVideo = async () => {
    setError("");
    try {
      const response = await axiosInstance.get(`/videos/${videoId}`);
      if (response?.data?.data) {
        dispatch(setVideo(response.data.data));
      }
    } catch (error) {
      setError(
        <GuestComponent
          title="Video does not exist"
          subTitle="There is no video present for the given videoId. It may have been moved or deleted."
          icon={
            <span className="w-full h-full flex items-center">
              <IoPlayCircleOutline className="w-28 h-28" />
            </span>
          }
          guest={false}
        />
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(`/videos?sortBy=views&limit=8`);
      if (response?.data?.data?.length > 0) {
        dispatch(setVideos(response?.data?.data));
      }
    } catch (error) {
      console.log("Error while fetching videos ", error);
    }
  };
  useEffect(() => {
    fetchVideo();
    fetchVideos();
  }, [videoId, authStatus]);

  if (error) {
    return error;
  }

  return (
    <div>
      {loading ? (
        <span className="flex justify-center mt-20">{icons.bigLoading}</span>
      ) : (
        <div className="flex">
          <div className="w-[70%] p-4">
            <div>
              <VideoPlayer key={video._id} videoFile={video.videoFile} />
            </div>
            <div>
              <VideoInfo video={video} />
            </div>
            <div>
              <Comments video={video} />
            </div>
          </div>
          <div className="w-[30%]">
            {videos
              ?.filter((video) => video?._id !== videoId) // exclude the current video from the list(array)
              .map((video) => (
                <VideoListCard
                  key={video?._id}
                  video={video}
                  imgWidth="w-[13vw]"
                  imgHeight="h-[8vw]"
                  titleWidth="w-[95%]"
                  titleSize="text-[0.95rem]"
                  titleFont=""
                  showVideoDescription={false}
                  paddingY="py-1"
                  marginLeft="ml-2"
                  marginLeft2="ml-2"
                  avatarHeight="h-7"
                  avatarWidth="w-7"
                  textFont="text-[0.9rem]"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;
