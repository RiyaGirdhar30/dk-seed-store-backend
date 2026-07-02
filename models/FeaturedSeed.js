//perfect

// import mongoose from "mongoose";

// const FeaturedSeedSchema = new mongoose.Schema(
//   {
//     name: String,
//     price: Number,
//     rating: Number,
//     image: String,
//   },
//   { collection: "featuredSeeds" } // 🔥 THIS IS THE FIX
// );

// export default mongoose.model("FeaturedSeed", FeaturedSeedSchema);






//trying for home bag tab
// import mongoose from "mongoose";

// const FeaturedSeedsSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     rating: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     collection: "FeaturedSeeds", // ✅ EXACT name
//     timestamps: true,
//   }
// );

// export default mongoose.model("FeaturedSeeds", FeaturedSeedsSchema);


//no need of this file