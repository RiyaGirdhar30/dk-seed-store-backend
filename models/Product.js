import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    stock: { type: Number, default: 100 },
    description: { type: String, default: "" },

      // 🔥 NEW
    isFeatured: {
      type: Boolean,
      default: false,
    },
    
  },
  
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
