import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";//new

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from './routes/productRoutes.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});  //new
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import authRoutes from "./routes/authRoutes.js";

import categorySectionRoutes from "./routes/categorySectionRoutes.js"

import categoryRoutes from "./routes/categoryRoutes.js";

import sizeRoutes from "./routes/sizeRoutes.js";

import bannerRoutes from "./routes/bannerRoutes.js";

import splashRoutes from "./routes/splashRoutes.js";

import addressRoutes from "./routes/addressRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";  //new

import helpRoutes from "./routes/helpRoutes.js";

import wishlistRoutes from "./routes/wishlistRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

//app.use(express.json());
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
// app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/category-sections",categorySectionRoutes);

app.use("/api/categories",categoryRoutes);

app.use("/api/sizes",sizeRoutes);

app.use("/api/banners", bannerRoutes);

app.use("/api/splash",splashRoutes);

app.use("/api/address",addressRoutes);

app.use("/api/notifications", notificationRoutes); //new

app.use("/api/help", helpRoutes);

app.use("/api/wishlist",wishlistRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.send("DK SEED STORE BACKEND RUNNING ✅");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000 ✅");
});


