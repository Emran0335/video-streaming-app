import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelVideos } from "../hooks/getChannelVideos.js";
import { getChannelStats } from "../hooks/getChannelStats.js";
import GuestDashboard from "../components/GuestPages/GuestDashboard.jsx";
import { icons } from "../assets/Icons.jsx";
import ChannelStats from "../components/Dashboard/ChannelStats.jsx";
import VideoPanel from "../components/Dashboard/VideoPanel.jsx";

function Dashboard() {
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);
  const [statsLoading, setStatsLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    if (status) {
      getChannelVideos(dispatch).then(() => setVideoLoading(false));
      getChannelStats(dispatch, userData._id).then(() =>
        setStatsLoading(false)
      );
    }
  }, []);

  console.log("userData", userData);
  const { videos, stats } = useSelector((state) => state.dashboard);

  if (!status) {
    return <GuestDashboard />;
  }

  if (videoLoading || statsLoading) {
    return (
      <span className="flex justify-center mt-20">{icons.bigLoading}</span>
    );
  } else {
    return (
      <div>
        <ChannelStats stats={stats} />
        <VideoPanel channelVideos={videos} />
      </div>
    );
  }
}

export default Dashboard;
