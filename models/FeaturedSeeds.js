import mongoose from "mongoose";

const FeaturedSeedsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "FeaturedSeeds", // ✅ EXACT name
    timestamps: true,
  }
);

export default mongoose.model("FeaturedSeeds", FeaturedSeedsSchema);
