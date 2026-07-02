import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  products: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
],

  address: {
     name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true }
    },
    
    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending", // Pending, Shipped, Delivered
    },
    paymentMethod: {
  type: String,
  enum: ["COD", "RAZORPAY"], //new added
  default: "COD"
},

isPaid: {
  type: Boolean,
  default: false
},

paidAt: {
  type: Date
},

cancelledBy: {
  type: String,
  enum: ["user", "admin"],
  default: null,
},  
cancelledAt: {
  type: Date,
},   //new


  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
