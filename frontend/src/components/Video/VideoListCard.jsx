import React from "react";
import formatDuration from "../../utils/formatDuration.js";
import getTimeDistanceToNow from "../../utils/getTimeDistance.js";
import { useNavigate, Link } from "react-router-dom";

function VideoListCard({
  imgWidth = "w-[25vw]",
  imgHeight = "h-[15vw]",
  mainDivWidth = "w-full",
  titleWidth = "w-[65%]",
  titleFont = "font-semibold",
  titleSize = "text-[1.2rem]",
  showVideoDescription = true,
  descriptionWidth = "w-[40vw]",
  paddingY = "py-2",
  marginLeft = "ml-10",
  marginLeft2 = "ml-4",
  avatarWidth = "w-9",
  avatarHeight = "h-9",
  textFont = "",
  video,
}) {
  const formattedDuration = formatDuration(parseInt(video?.duration));
  const timeDistance = getTimeDistanceToNow(video?.createdAt);
  const navigate = useNavigate();
  console.log("video", video);
  const handleChannelClick = (e) => {
    e.preventDefault();
    navigate(`/channel/${video?.owner?.username}`);
  };

  return (
    <div className={`${mainDivWidth}`}>
      <Link to={`/watchpage/${video?._id}`}>
        <div className={`${paddingY} hover:bg-zinc-900 rounded-lg`}>
          <div className={`flex text-white ${marginLeft} gap-2`}>
            <div className="relative">
              <img
                src={video?.thumbnail}
                alt={video?.title}
                className={`${imgWidth} ${imgHeight} object-content rounded-xl`}
              />
              <p className={`absolute bottom-1 right-3 ${textFont}`}>
                {formattedDuration}
              </p>
            </div>
            <div>
              <h1>{video?.title}</h1>
              <p>{`${video?.views} views * ${timeDistance}`}</p>
              <div>
                <div className="flex items-center mb-2 text-[0.95rem]">
                  <img
                    src={`${video?.owner?.avatar}`}
                    alt={video?.owner?.fullName}
                    className={`${avatarWidth} ${avatarHeight} mr-3 rounded-full object-cover`}
                  />
                  <p className="text-gray-300">{video?.owner?.fullName}</p>
                </div>
              </div>
              {showVideoDescription && (
                <span>
                  <p
                    className={`${descriptionWidth} text-gray-300 text-[0.90rem] line-clamp-2`}
                  >
                    {video?.description}
                  </p>
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VideoListCard;
