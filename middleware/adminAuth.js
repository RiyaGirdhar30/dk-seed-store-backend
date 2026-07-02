//middleware/adminAuth.js
 import jwt from "jsonwebtoken"; 
 import User from "../models/User.js";
 
export const adminAuth = async (req, res, next)=> { try
   { const auth = req.headers.authorization; 

    if (!auth) 
      return res.status(401).json({ message: "Missing Authorization header" });
    
    const token = auth.split(" ")[1]; 
    if (!token) return res.status(401).json({ message: "Invalid token" }); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SEED_STORE_SECRET_KEY"); 

    const user = await User.findById(decoded.id);
    
    if (!user) return res.status(401).json({ message: "User not found" }); 
    
    if (user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    
    req.user = user; // optional: use in controllers 
next(); 
} catch (err) {
   console.log("adminAuth error:", err);
    res.status(401).json({ message: "Unauthorized" }); 
  } };