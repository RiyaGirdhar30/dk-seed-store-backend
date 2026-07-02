import mongoose from "mongoose";
const CategorySectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },     // agricultural / vegetable
    name: { type: String, required: true },    // display name
    image: { type: String, required: true },   // cloudinary URL

// 🔥 ADD THESE
    active: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("CategorySection", CategorySectionSchema,"categorySections");