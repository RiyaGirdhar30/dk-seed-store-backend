import express from "express";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controllers/helpController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// USER SIDE
router.get("/", getFAQs);

// ADMIN SIDE
router.post("/", adminAuth, createFAQ);
router.put("/:id", adminAuth, updateFAQ);
router.delete("/:id", adminAuth, deleteFAQ);

export default router;
