import Splash from "../models/Splash.js";

// GET ACTIVE SPLASH
export const getSplash = async (req, res) => {
  try {
    const splash = await Splash.findOne({ active: true }).sort({ createdAt: -1 });
    res.json(splash);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
