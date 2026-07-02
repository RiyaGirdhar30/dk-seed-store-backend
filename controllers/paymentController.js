// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Order from "../models/Order.js";

// // ✅ CREATE RAZORPAY ORDER
// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const { amount } = req.body;

//     if (!amount) {
//       return res.status(400).json({ message: "Amount is required" });
//     }

//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`,
//       notes: {
//     app: "DK Seed Store",
//   },
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     res.status(200).json(razorpayOrder);
//   } catch (error) {
//     console.error("Create Razorpay Order Error:", error);
//     res.status(500).json({ message: "Failed to create Razorpay order" });
//   }
// };

// // 🔐 VERIFY RAZORPAY PAYMENT
// export const verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !orderId
//     ) {
//       return res.status(400).json({ message: "Missing payment details" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid payment signature" });
//     }

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: razorpay_payment_id,
//       status: "success",
//       method: "razorpay",
//     };

//     await order.save();

//     res.status(200).json({
//       message: "Payment verified successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("Verify Payment Error:", error);
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };






//prior order fix ->> PERFECT now
import Razorpay from "razorpay";
import crypto from "crypto";
//import Order from "../models/Order.js";

// ✅ CREATE RAZORPAY ORDER
export const createRazorpayOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
    app: "DK Seed Store",
  },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// 🔐 VERIFY RAZORPAY PAYMENT (ONLY VERIFY — NO ORDER HERE)
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ ONLY VERIFY — NO DB OPERATION
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
