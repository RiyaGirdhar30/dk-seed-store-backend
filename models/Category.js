import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  key: String,
  title: String,
  order: Number,
  active: Boolean,

  //🔒 SOFT DELETE
  deleted: {
    type: Boolean,
    default: false,
  },
}
);

export default mongoose.model("Category", CategorySchema);
