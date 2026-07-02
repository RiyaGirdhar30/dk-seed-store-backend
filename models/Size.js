import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },   // Half KG, Full KG
    multiplier: { type: Number, required: true }, // 0.5, 1
    active: { type: Boolean, default: true },
    order: { type: Number, default: 1 },

  // 🔒 SOFT DELETE
    deleted: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Size", SizeSchema);