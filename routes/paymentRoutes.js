import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Razorpay order
router.post("/razorpay-order", protect, createRazorpayOrder);

// Verify Razorpay payment
router.post("/verify", protect, verifyRazorpayPayment);

export default router;
