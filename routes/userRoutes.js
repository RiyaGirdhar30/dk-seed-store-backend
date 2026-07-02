import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  updateAddress,
  getAddress,
  updateUserProfile,
  updateProfilePhoto,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import uploadProfileImage from "../config/cloudinaryProfileUpload.js";

import { removeProfilePhoto } from "../controllers/userController.js";


const router = express.Router();
// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET LOGGED-IN USER (REFRESH USER DATA)
router.get("/me", protect, (req, res) => {
  res.json(req.user);
}); //U


// ✅ UPDATE USER PROFILE
router.put("/update-profile", protect, updateUserProfile);

router.put(
  "/update-profile-photo",
  protect,
  uploadProfileImage.single("image"),
  updateProfilePhoto
);

router.delete("/remove-profile-photo", protect, removeProfilePhoto);


// ✅ SAVE / UPDATE ADDRESS
router.put("/address/:id", updateAddress);
// ✅ GET ADDRESS
router.get("/address/:id", getAddress);
export default router;