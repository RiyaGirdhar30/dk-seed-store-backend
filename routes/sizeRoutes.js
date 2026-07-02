import express from "express";
import {
  getSizes,
  getAllSizesAdmin,
  createSize,
  updateSize,
  toggleSize,
  deleteSize,
} from "../controllers/sizeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSizes);
router.get("/admin", protect, admin, getAllSizesAdmin);
router.post("/", protect, admin, createSize);
router.put("/:id", protect, admin, updateSize);
router.put("/toggle/:id", protect, admin, toggleSize);
router.delete("/:id", protect, admin, deleteSize);

export default router;
