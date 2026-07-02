import Notification from "../models/Notification.js";

// ✅ Get logged-in user's notifications
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// ✅ Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // security check
    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// ✅ Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};

// 🧹 Clear all notifications of logged-in user
export const clearAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({
      userId: req.user._id,
    });

    res.json({ message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear notifications" });
  }
};
