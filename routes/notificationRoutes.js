import express from "express";
import { getMyNotifications, markAsRead,markAllAsRead,clearAllNotifications} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔔 Get logged-in user's notifications
router.get("/", protect, getMyNotifications);

// 🔕 Mark notification as read
router.put("/:id/read", protect, markAsRead);

// 🔕 Mark ALL as read
router.put("/read-all", protect, markAllAsRead);

// 🧹 Clear all notifications
router.delete("/clear", protect, clearAllNotifications);

export default router;
