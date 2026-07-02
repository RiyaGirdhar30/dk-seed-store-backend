import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// 🔥 ADMIN IMAGE UPLOAD
router.post(
  "/image",
  protect,
  admin,
  upload.single("image"),
  uploadImage
);

export default router;
