import axios from "axios";

export const toggleVideoLike = async (videoId) => {
  try {
    const response = await axios.post(
      `/api/v1/likes/toggle/v/${videoId}`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
