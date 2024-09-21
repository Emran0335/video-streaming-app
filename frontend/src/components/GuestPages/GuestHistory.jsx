import React from "react";
import GuestComponent from "./GuestComponent";
import { GoHistory } from "react-icons/go";

function GuestHistory() {
  return (
    <GuestComponent
      title="keep track of what you watch"
      subtitle="Sign in to see your watch history."
      icon={
        <span className="w-full h-full flex items-center p-4 pb-5">
          <GoHistory className="w-32 h-32" />
        </span>
      }
      route="/history"
    />
  );
}
export default GuestHistory;
