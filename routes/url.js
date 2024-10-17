import express from "express";
import {
  handleGenerateShortUrl,
  handleGetAnalytics,
  handleGetRedirectUrl,
  handleGetAllData,
} from "../controllers/url.js";
const router = express.Router();

router.route("/")
  .get(handleGetAllData)
  .post(handleGenerateShortUrl);
router.get("/:shortId", handleGetRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
