import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controller.js";
import { checkUser } from "../middlewares/openAuth.middleware.js";

const router = Router();

router.route("/stats/:userId").get(checkUser, getChannelStats);
router.route("/videos").get(verifyJWT, getChannelVideos);

export default router;
