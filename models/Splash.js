import mongoose from "mongoose";

const splashSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Splash", splashSchema);
