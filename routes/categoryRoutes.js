import express from "express";
import { getCategories,
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  toggleCategory,
  reorderCategories,
  deleteCategory,
 } from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getCategories);
router.get("/admin", protect, admin, getAllCategoriesAdmin);
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.put("/toggle/:id", protect, admin, toggleCategory);
router.put("/reorder/all", protect, admin, reorderCategories);
router.delete("/:id", protect, admin, deleteCategory);

export default router;