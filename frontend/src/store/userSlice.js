import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  currentUser: null,
  userVideo: null,
  userPlaylist: null,
  userTweets: null,
  userLikedVideos: null,
  userHistory: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addCurrentuser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUserVideo: (state, action) => {
      state.userVideo = action.payload;
    },
    addUserPlaylist: (state, action) => {
      state.userPlaylist = action.payload;
    },
    addUserTweets: (state, action) => {
      state.action = action.payload;
    },
    addUserLikedVideos: (state, action) => {
      state.userLikedVideos = action.payload;
    },
    addUserHistory: (state, action) => {
      state.userHistory = action.payload;
    },
  },
});
export const {
  addUser,
  addCurrentuser,
  addUserVideo,
  addUserPlaylist,
  addUserTweets,
  addUserLikedVideos,
  addUserHistory,
} = userSlice.actions;

export default userSlice.reducer;
