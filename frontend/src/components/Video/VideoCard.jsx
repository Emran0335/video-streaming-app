import React from "react";
import { Link } from "react-router-dom";
import formatDuration from "../../utils/formatDuration.js";
import getTimeDistanceToNow from "../../utils/getTimeDistance.js";

function VideoCard({ video }) {
  const formattedDuration = formatDuration(parseInt(video?.duration));
  const timeDistance = getTimeDistanceToNow(video?.createdAt);

  const handleChannelClick = (e) => {
    e.preventDefault();
    Navigate(`/channel/${video?.owner?.username}`);
  };

  return (
    <Link to={`/watchpage/${video?._id}`}>
      <div className="2xl:w-[18vw] md:w-[25vw] w-[90vw] rounded-xl mb-2 mt-2 text-white relative p-1 hover:bg-zinc-900">
        <img
          className="w-full md:h-[24vw] 2xl:h-[15vw] object-cover mb-3 rounded-xl border border-gray-800"
          src={video?.thumbnail}
          alt={video?.title}
        />
        <p className="absolute bottom-24 right-4">{formattedDuration}</p>
        <div className="flex">
          <div onClick={handleChannelClick}>
            <img
              className="w-9 h-9 bg-gray-100 rounded-full object-cover"
              src={video?.owner?.avatar}
              alt={video?.owner?.fullname}
            />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{video?.title}</h2>
            <h2 className="text-gray-200">{video?.owner?.fullName}</h2>
            <p className="text-gray-300 text-[0.95rem]">{`${video?.views} views * ${timeDistance}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
