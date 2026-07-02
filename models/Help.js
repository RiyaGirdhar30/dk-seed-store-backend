import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "general", // orders, payments, delivery, etc
    },
  },
  { timestamps: true }
);

export default mongoose.model("Help", helpSchema);
