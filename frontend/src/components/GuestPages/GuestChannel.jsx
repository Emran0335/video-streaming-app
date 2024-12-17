import React from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import GuestComponent from "./GuestComponent.jsx";

function GuestChannel() {
  return (
    <GuestComponent
      title="Create your own channel"
      subTitle="Sign in to get started"
      icon={
        <span className="w-full h-full flex items-center p-4 pb-5">
          <GoDeviceCameraVideo className="w-32 h-32" />
        </span>
      }
      route="/"
    />
  );
}

export default GuestChannel;
