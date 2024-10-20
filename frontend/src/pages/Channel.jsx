import React from "react";
import { useParams } from "react-router-dom";
import ChannelComponent from "../components/Channel/Channel";
import GuestChannel from "../components/GuestPages/GuestChannel";

function Channel() {
  const { username } = useParams();

  if (username === "undefined") {
    return <GuestChannel />;
  } else {
    return <ChannelComponent />;
  }
}

export default Channel;
