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

/*
    •   Request Body: An empty object {} is sent as the request body, indicating that no additional data needs to be sent with the request.
	•	withCredentials: The { withCredentials: true } option ensures that cookies (like session cookies) are included with the request. This is typically necessary when dealing with authenticated actions, such as liking a video.
	•	Awaiting the Response: The await keyword pauses the execution of the function until the request completes. The response from the server is then stored in the response variable.
*/
