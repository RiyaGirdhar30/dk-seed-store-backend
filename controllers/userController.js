import User from "../models/User.js";
// ✅ UPDATE ADDRESS
export const updateAddress = async (req, res) => {
  try {
    const { name, phone, addressLine, city, pincode } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.address = {
      name,
      phone,
      addressLine,
      city,
      pincode,
    };

    await user.save();

    res.json({
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ADDRESS
export const getAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ address: user.address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE USER PROFILE (NAME & EMAIL)
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // user comes from protect middleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();


    res.json(updatedUser);  //U

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE PROFILE PHOTO
export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // req.user comes from protect middleware
    const user = req.user;

    user.profileImage = req.file.path; // Cloudinary URL
    await user.save();

    res.json({
      profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ REMOVE PROFILE PHOTO
export const removeProfilePhoto = async (req, res) => {
  try {
    const user = req.user;

    user.profileImage = "";
    await user.save();

    res.json({ message: "Profile photo removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
