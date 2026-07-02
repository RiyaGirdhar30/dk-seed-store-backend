export const updateProfilePhoto = async (req, res) => {
  try {
    console.log("🔥 PROFILE PHOTO HIT");
    console.log("FILE:", req.file);
    console.log("USER:", req.user?._id);

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = req.user;
    user.profileImage = req.file.path;
    await user.save();

    res.json({ profileImage: user.profileImage });
  } catch (err) {
    console.error("❌ UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
