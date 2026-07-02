//PERFECT + NOTIFICATIONS WORKS
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Notification from "../models/Notification.js";

// Create Order
export const createOrder = async (req, res) => {
  console.log("ORDER BODY RECEIVED:", req.body);
  console.log("🔥 CREATE ORDER API HIT 🔥");
  console.log("USER FROM TOKEN:", req.user);
  console.log("ORDER BODY:", req.body);
   console.log("REQ.HEADERS 👉", req.headers.authorization);

  try {
    const {
     // user,
      products,
      totalAmount,
      address,
      paymentMethod = "COD",
      isPaid = false,
    } = req.body;

    if (!req.user || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate product IDs
    for (const p of products) {
      const prod = await Product.findById(p.product);
      if (!prod)
        return res
          .status(400)
          .json({ message: `Product not found: ${p.product}` });
    }

    const order = new Order({
      user:req.user._id,
      products,
      totalAmount,
      address,
      paymentMethod,
      isPaid,
    });

    await order.save();
console.log("CREATING NOTIFICATION FOR USER:", req.user._id);
// 🔔 Create notification for user (ORDER PLACED)
await Notification.create({
  userId: req.user._id, // 👈 IMPORTANT
  title: "Order Placed",
  message: `Your order #${order._id
    .toString()
    .slice(-6)} has been placed successfully.`,
  type: "order",
});

const saved = await order.populate("products.product");
res.status(201).json(saved);

  } catch (error) {
    console.error("createOrder error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ⭐ NEW: Get a single order by ID
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("getUserOrders error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("getAllOrders error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Mark order paid
export const markOrderPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // 🚫 Block online payment orders
    if (order.paymentMethod !== "COD") {
      return res.status(400).json({
        message: "Online payments are already paid",
      });
    }

    // 🚫 Block double payment
    if (order.isPaid) {
      return res.status(400).json({
        message: "Order is already marked as paid",
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();

// 🔔 PAYMENT SUCCESSFUL NOTIFICATION (NEW)
    await Notification.create({
      userId: order.user,   // 👈 order owner
      title: "Payment Successful",
      message: `Payment received for order #${order._id
        .toString()
        .slice(-6)}. Thank you for shopping with us 💚`,
      type: "payment",
    });


    res.json({ message: "Payment marked as successful" });
  } catch (err) {
    console.error("markOrderPaid error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update order status

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = [
      "Pending",
      "Placed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;

    // 🔔 PREPARE NOTIFICATION
    let notificationTitle = "";
    let notificationMessage = "";

    if (status === "Shipped") {
      notificationTitle = "Order Shipped 🚚";
      notificationMessage = `Your order #${order._id
        .toString()
        .slice(-6)} has been shipped.`;
    }

    if (status === "Out for Delivery") {
      notificationTitle = "Out for Delivery 📦";
      notificationMessage = `Your order #${order._id
        .toString()
        .slice(-6)} is out for delivery.`;
    }

    if (status === "Delivered") {
      notificationTitle = "Order Delivered ✅";
      notificationMessage = `Your order #${order._id
        .toString()
        .slice(-6)} has been delivered successfully.`;
    }

    if (status === "Cancelled") {
      order.cancelledBy = "admin";
      order.cancelledAt = new Date();   // ⭐ ADD THIS
      notificationTitle = "Order Cancelled ❌";
      notificationMessage = `Your order #${order._id
        .toString()
        .slice(-6)} has been cancelled.`;
    }

    await order.save();

    // 🔔 CREATE NOTIFICATION
    if (notificationTitle) {
      await Notification.create({
        userId: order.user,
        title: notificationTitle,
        message: notificationMessage,
        type: "order",
      });
    }

    const updated = await order.populate("products.product");
    res.json(updated);
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    res.status(500).json({ message: err.message });
  }
};


// USER: Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      ["Delivered", "Out for Delivery", "Shipped"].includes(order.status)
    ) {
      return res.status(400).json({
        message: "Order cannot be cancelled now",
      });
    }

    order.status = "Cancelled";
    order.cancelledBy="user"; 
    order.cancelledAt = new Date(); // ⭐ ADD THIS
    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("cancelOrder error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address, paymentMethod = "COD" } = req.body;

    // 1️⃣ Get user cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Prepare order products
    const products = cart.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      size: item.size,
    }));

    // 3️⃣ Calculate total (SAFE: use DB prices)
    let totalAmount = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.product);
      totalAmount += prod.price * item.quantity;
    }

    // 4️⃣ Create order
    const order = new Order({
      user: userId,
      products,
      totalAmount,
      address,
      paymentMethod,
      isPaid: paymentMethod !== "COD",
    });

    await order.save();

    // 5️⃣ Clear cart AFTER order success
    await Cart.findOneAndDelete({ user: userId });

    const savedOrder = await order.populate("products.product");
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("createOrderFromCart error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ NEW: Get orders of logged-in user (SECURE)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("getMyOrders error:", err);
    res.status(500).json({ message: err.message });
  }
};
