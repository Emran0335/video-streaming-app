import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
 // for testing videos in the frontend
 router.route("/").get(getAllVideos)
 router.route("/:videoId").get(getVideoById)
 
router.use(verifyJWT);


// all routes of videos
router
  .route("/")
  .post(
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
router
  .route("/:videoId")
  .delete(deleteVideo)
  .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
