import axiosInstance from "../utils/axios.helper.js";
import { addUserSubscribed } from "../store/userSlice.js";

export const getUserSubscribed = async (dispatch, subscriberId) => {
  try {
    const response = await axiosInstance.get(
      `/subscriptions/u/${subscriberId}`
    );
    if (response?.data?.data) {
      dispatch(addUserSubscribed(response.data.data));
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
