import Banner from "../models/Banner.js";

/* ===========================
   GET ACTIVE BANNERS (USER)
=========================== */
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ active: true })
      .sort({ order: 1 });

    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===========================
   ADMIN: GET ALL BANNERS
=========================== */
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===========================
   ADMIN: ADD BANNER
=========================== */
export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create({
      image: req.body.image,
      category: req.body.category || "all",
      order: req.body.order || 1,
      active: req.body.active ?? true,
    });

    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ===========================
   ADMIN: DELETE BANNER
=========================== */
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await banner.deleteOne();
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ===========================
   ADMIN: TOGGLE ACTIVE
=========================== */
export const toggleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.active = !banner.active;
    await banner.save();

    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===========================
   ADMIN: UPDATE BANNER
=========================== */
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.image = req.body.image || banner.image;
    banner.category = req.body.category || banner.category;
    banner.order = req.body.order ?? banner.order;
    banner.active = req.body.active ?? banner.active;

    const updated = await banner.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
