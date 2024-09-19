import axios from "axios";

export const getUserProfile = async (dispatch, username) => {
  try {
    const response = await axios.get(`/api/v1/users/c/${username}`, {
      withCredentials: true,
    });
    if (response?.data?.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
