import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

category: {
      type: String,
      default: "all",
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 1,
    },

  },
  { timestamps: true }
);


export default mongoose.model("Banner", bannerSchema);
