import axiosInstance from "../utils/axios.helper.js";
import { toast } from "react-toastify";
import { setVideos } from "../store/dashboardSlice.js";

export const getChannelVideos = async (dispatch) => {
  try {
    const response = axiosInstance.get(`/dashboard/videos`);
    if (response?.data?.data.success) {
      dispatch(setVideos(response.data.data));
    }
  } catch (error) {
    toast.error("Error getting channel videos");
    console.log(error);
  }
};
