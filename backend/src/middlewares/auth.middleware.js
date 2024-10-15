import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // if res is not used, we can use _ instead of res
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthrized request!");
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return next(new ApiError(401, "TokenExpiredError"));
          }
          return next(new ApiError(401, "Invalid access token"));
        }

        const user = await User.findById(decodedToken?._id).select(
          "-password -refreshToken"
        );

        if (!user) {
          throw new ApiError(401, "Invalid AccessToken");
        }

        // new object should be added to the req object.
        req.user = user;
        next();
      }
    );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token!");
  }
});

// select all and then trycatch suggestion should be used to get all the code into the tryandcatch block. It's a shortcut way of using trycatch block if we forget to use it from the beginning.
