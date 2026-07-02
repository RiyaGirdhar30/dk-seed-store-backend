import express from "express";
import {
  getBanners,
  getAllBanners,
  createBanner,
  deleteBanner,
  toggleBanner,
  updateBanner,
} from "../controllers/bannerController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* USER */
router.get("/", getBanners);

/* ADMIN */
router.get("/admin", protect, admin, getAllBanners);
router.post("/", protect, admin, createBanner);
router.put("/:id", protect, admin, updateBanner); // ✅ EDIT BANNER
router.delete("/:id", protect, admin, deleteBanner);
router.put("/toggle/:id", protect, admin, toggleBanner);

export default router;
