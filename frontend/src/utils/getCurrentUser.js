import axios from "axios";
import {addCurrentUser} from "../store/userSlice";

export const getCurrentUser = async (dispach) => {
  try {
    const response = await axios.get("/api/v1/users/current-user", {
      withCredentials: true,
    });
    if (response?.data?.data) {
      dispach(addCurrentUser(response.data.data));
      return response.data;
    }
  } catch (error) {
    console.log(error)
  }
};

/* 
	withCredentials: true }: The withCredentials option is set to true, which means the request will include credentials (like cookies, HTTP authentication, or client-side SSL certificates). This is particularly important if you’re dealing with sessions or authentication cookies that need to be sent along with the request.
*/
