import Address from "../models/Address.js";

// ✅ GET USER ADDRESS (AUTH BASED)
export const getAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user._id });
    res.json({ address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ CREATE / UPDATE ADDRESS (AUTH BASED)
export const saveAddress = async (req, res) => {
  try {
    const { name, phone, address, city, pincode } = req.body;

    const updated = await Address.findOneAndUpdate(
      { user: req.user._id }, // 🔥 from token
      {
        user: req.user._id,
        name,
        phone,
        address,
        city,
        pincode,
      },
      { new: true, upsert: true }
    );

    res.json({ address: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

