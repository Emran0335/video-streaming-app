import React from "react";
import { Link } from "react-router-dom";
import formatDuration from "../../utils/formatDuration.js";
import getTimeDistanceToNow from "../../utils/getTimeDistance.js";

function VideoCard({ video }) {
  const formattedDuration = formatDuration(parseInt(video?.duration));
  const timeDistance = getTimeDistanceToNow(video?.createdAt);
  return (
    <Link to={`/watchpage/${video?._id}`}>
      <div>
        <img src={video?.thumbnail} alt={video?.title} />
        <p>{formattedDuration}</p>
        <div>
          <div className="w-9 h-9 bg-gray-100 rounded-full object-cover">
            <img src={video?.owner?.avatar} alt={video?.owner?.fullname} />
          </div>
          <div>
            <h2>{video?.title}</h2>
            <h2>{video?.owner?.fullName}</h2>
            <p>{`${video?.views} views * ${timeDistance}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
