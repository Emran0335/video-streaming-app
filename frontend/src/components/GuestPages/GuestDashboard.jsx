import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import GuestComponent from "./GuestComponent.jsx";

const GuestDashboard = () => {
  return (
    <GuestComponent
      title="Manage your content"
      subTitle="Sign in to access moderation tools"
      icon={
        <span className="w-full h-full flex items-center p-4 pb-5">
          <FaRegUserCircle className="w-32 h-32" />
        </span>
      }
      route="/admin/dashboard"
    />
  );
};

export default GuestDashboard;
