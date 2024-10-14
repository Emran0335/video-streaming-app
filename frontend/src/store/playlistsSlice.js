import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: null,
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    updatePlaylist: (state, action) => {
      state.playlists = state.playlists.map((playlist) =>
        playlist._id === action.payload.playlistId
          ? {
              ...playlist,
              isVideoPresent: action.payload.isVideoPresent,
            }
          : playlist
      );
    },
  },
});

export const { setPlaylists, updatePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
