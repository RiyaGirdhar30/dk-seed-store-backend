// cloudinaryUpload.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// 1️⃣ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2️⃣ Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

// 3️⃣ Path to uploads folder
const uploadsDir = path.join(process.cwd(), "uploads");

// 4️⃣ Upload each image file
const files = fs.readdirSync(uploadsDir);

for (const file of files) {
  const filePath = path.join(uploadsDir, file);
  const baseName = file.split(".")[0]; // filename without extension
  console.log(`Uploading: ${file} ...`);

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "dkseedstore/products",
      public_id: baseName,
    });

    console.log("Uploaded:", result.secure_url);

    // ⭐ 5️⃣ STRICT match: Update ONLY when name exactly matches filename
    // Example: "Hadhu" only matches file "Hadhu.jpeg"
    const updated = await Product.findOneAndUpdate(
      {
        name: { $regex: `^${baseName}$`, $options: "i" }, // exact match
      },
      { image: result.secure_url },
      { new: true }
    );

    console.log("DB Updated:", updated?.name || "NO EXACT MATCH FOUND");
  } catch (err) {
    console.error("Error uploading:", err.message);
  }
}

console.log("✔ DONE: All images uploaded & DB updated.");
process.exit();

