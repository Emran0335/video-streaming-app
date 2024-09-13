import React from "react";

function VideoPlayer({ videoFile }) {
  return (
    <video className="rounded-xl w-full max-h-[70vh]" controls autoPlay>
      <source src={videoFile} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
