import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setVideo } from "../store/videoSlice";
import VideoPlayer from "../components/Video/VideoPlayer.jsx";
import VideoInfo from "../components/Video/VideoInfo.jsx";
import VideoListCard from "../components/Video/VideoListCard.jsx";
import Comments from "../components/Comments.jsx";

function Video() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { videoId } = useParams();
  const { videos } = useSelector((state) => state.videos);
  const { video } = useSelector((state) => state.video);
  console.log(videos);
  const fetchVideo = async () => {
    setError("");
    try {
      const response = await axios.get(`/api/v1/videos/${videoId}`, {
        withCredentials: true,
      });
      if (response?.data?.data) {
        dispatch(setVideo(response.data.data));
      }
    } catch (error) {
      setError("Error while fetching video");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, [videoId]);
  return (
    <div>
      {loading ? (
        <p className="flex text-xl justify-center mt-96">Loading...</p>
      ) : (
        <div className="flex">
          <div className="w-[70%] p-4">
            <div>
              {error ? (
                <p className="flex text-xl justify-center mt-80">{error}</p>
              ) : (
                <VideoPlayer key={video._id} videoFile={video.videoFile} />
              )}
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
