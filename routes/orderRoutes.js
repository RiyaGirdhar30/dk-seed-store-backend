import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getSingleOrder,
  markOrderPaid,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { protect } from "../middleware/authMiddleware.js";

import { createOrderFromCart } from "../controllers/orderController.js";

import { getMyOrders } from "../controllers/orderController.js";


const router = express.Router();

router.post("/", protect, createOrder);

router.get("/user/:userId", getUserOrders);

// Admin: get all orders (protected)
router.get("/", adminAuth, getAllOrders);

// 🔐 Secure: get logged-in user's orders
router.get("/my", protect, getMyOrders);

// Get single order (public for users/admins) — returns single order
router.get("/:orderId", getSingleOrder);

// Mark order paid (could be admin or payment webhook) — protect if you want
router.put("/pay/:id", markOrderPaid);

// Admin: Update order status (admin only)
router.put("/status/:orderId", adminAuth, updateOrderStatus);

// User cancel
router.put("/cancel/:orderId", cancelOrder);

router.post("/from-cart", protect, createOrderFromCart);

export default router;

