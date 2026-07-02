//new one
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { forgotPassword, resetPassword } from "../controllers/authController.js";
const router = express.Router();

// REGISTER -> now returns token + user (auto-login)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      // role will default to "user" as per your schema
    });

    // create jwt token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "SEED_STORE_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("REGISTER ERR:", err);
    res.status(500).json({ message: err.message });
  }
});

// LOGIN (keep your existing login code)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

     console.log("PASSWORD RECEIVED:", `"${password}"`);  //->

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    console.log("compare",match,password,user.password);  //->
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "SEED_STORE_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("LOGIN ERR:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router;