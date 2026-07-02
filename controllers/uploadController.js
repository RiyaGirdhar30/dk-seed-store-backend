// controllers/uploadController.js

export const uploadImage = async (req, res) => {
   console.log("🔥 UPLOAD HIT");
  console.log("FILE:", req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Cloudinary URL comes from multer
    res.json({
      url: req.file.path,
    });
  } catch (err) {
    console.error("UPLOAD IMAGE ERROR:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
};
