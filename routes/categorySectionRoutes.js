import express from "express";
import {
  getCategorySections,
  getAllCategorySectionsAdmin,
  addCategorySection,
  updateCategorySection,
  toggleCategorySection,
  reorderCategorySections,
  deleteCategorySection
} from "../controllers/categorySectionController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// APP (Home)
router.get("/", getCategorySections);

// ADMIN
router.get("/admin", protect, admin, getAllCategorySectionsAdmin);
router.post("/", protect, admin, addCategorySection);
router.put("/:id", protect, admin, updateCategorySection);
router.delete("/:id", protect, admin, deleteCategorySection);
router.put("/toggle/:id", protect, admin, toggleCategorySection);
router.put("/reorder/all", protect, admin, reorderCategorySections);

export default router;
