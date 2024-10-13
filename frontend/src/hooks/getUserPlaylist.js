import axiosIntance from "../utils/axios.helper.js";
import { addUserPlaylist } from "../store/userSlice";

export const getUserPlaylist = async (dispatch, userId) => {
  try {
    const response = await axiosIntance.get(`/playlist/user/${userId}`);
    if (response?.data?.data) {
      dispatch(addUserPlaylist(response.data.data));
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
