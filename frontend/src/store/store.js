import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import videosSlice from "./videosSlice";
import videoSlice from "./videoSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    videos: videosSlice,
    user: userSlice,
    video: videoSlice
  },
});

export default store;
