import { Router } from "express";
import {
  getAllVideos,
  getVideoById,
  publishAVideo,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// all routes of videos
router.route("/videos").get(getAllVideos);
router.route("/:userId").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);
router.route("/:videoId").get(getVideoById);

export default router;
