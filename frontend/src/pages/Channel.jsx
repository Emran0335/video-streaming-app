import React from "react";
import { useParams } from "react-router-dom";
import GuestChannel from "../components/GuestPages/GuestChannel";
import ChannelComponent from "../components/Channel/Channel";

function Channel() {
  const { username } = useParams();

  if (username === "undefined") {
    return <GuestChannel />;
  } else {
    return <ChannelComponent />;
  }
}

export default Channel;
