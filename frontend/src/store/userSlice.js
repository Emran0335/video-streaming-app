import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userVideo: [],
  userPlaylist: null,
  userTweets: [],
  userLikedVideos: [],
  userHistory: [],
  userSubscribed: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addUserVideo: (state, action) => {
      state.userVideo = [...state.userVideo, ...action.payload];
    },
    removeUserVideo: (state) => {
      state.userVideo = [];
    },
    addUserPlaylist: (state, action) => {
      state.userPlaylist = action.payload;
    },
    addUserTweets: (state, action) => {
      state.action = [...state.userTweets, ...action.payload];
    },
    removeUserTweets: (state) => {
      state.userTweets = [];
    },
    addUserLikedVideos: (state, action) => {
      state.userLikedVideos = [...state.userLikedVideos, ...action.payload];
    },
    removeUserLikedVideos: (state) => {
      state.userLikedVideos = [];
    },
    addUserHistory: (state, action) => {
      state.userHistory = [...state.userHistory, ...action.payload];
    },
    removeUserHistory: (state) => {
      state.userHistory = [];
    },
    addUserSubscribed: (state, action) => {
      state.userSubscribed = action.payload;
    },
    // channels property is added to userSubscribed object
    toggleUserSubscribe: (state, action) => {
      state.userSubscribed.channels = state.userSubscribed.channles.map(
        (profile) =>
          profile._id === action.payload.profileId
            ? {
                ...profile,
                isSubscribed: action.payload.isSubscribed,
                subscribersCount: action.payload.subscribersCount,
              }
            : profile
      );
    },
  },
});
export const {
  addUser,
  addUserVideo,
  removeUserVideo,
  addUserPlaylist,
  removeUserHistory,
  addUserTweets,
  removeUserTweets,
  removeUserLikedVideos,
  addUserLikedVideos,
  addUserHistory,
  addUserSubscribed,
  toggleUserSubscribe,
} = userSlice.actions;

export default userSlice.reducer;
