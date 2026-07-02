import express from "express";
import {
  getUserCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserCart);
router.post("/", protect, addToCart);
router.put("/increase", protect, increaseQty);
router.put("/decrease", protect, decreaseQty);
router.put("/remove", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;