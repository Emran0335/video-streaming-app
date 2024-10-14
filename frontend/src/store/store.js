import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import tweetsSlice from "./tweetsSlice";
import videoSlice from "./videoSlice";
import userSlice from "./userSlice";
import playlistSlice from "./playlistSlice";
import playlistsSlice from "./playlistsSlice";
import dashboardSlice from "./dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    video: videoSlice,
    tweets: tweetsSlice,
    playlist: playlistSlice,
    playlists: playlistsSlice,
    dashboard: dashboardSlice,
  },
});

export default store;
