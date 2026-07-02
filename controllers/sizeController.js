import Size from "../models/Size.js";

export const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find({ active: true,deleted:false }).sort({ order: 1 });
    res.json(sizes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sizes" });
  }
};

export const createSize = async (req, res) => {
  const { label, multiplier, order } = req.body;

  const exists = await Size.findOne({ label });
  if (exists) {
    return res.status(400).json({ message: "Size already exists" });
  }

  const size = await Size.create({
    label,
    multiplier,
    order,
    active: true,
    deleted: false,
  });

  res.status(201).json(size);
};

export const updateSize = async (req, res) => {
  const size = await Size.findById(req.params.id);

  if (!size) {
    return res.status(404).json({ message: "Size not found" });
  }

  size.label = req.body.label ?? size.label;
  size.multiplier = req.body.multiplier ?? size.multiplier;
  size.order = req.body.order ?? size.order;

  await size.save();
  res.json(size);
};

export const toggleSize = async (req, res) => {
  const size = await Size.findById(req.params.id);
  size.active = !size.active;
  await size.save();

  res.json({ active: size.active });
};

export const deleteSize = async (req, res) => {
  const size = await Size.findById(req.params.id);

  if (!size) {
    return res.status(404).json({ message: "Size not found" });
  }

  size.deleted = true;
  size.active = false;
  await size.save();

  res.json({ message: "Size archived successfully" });
};

export const getAllSizesAdmin = async (req, res) => {
  try {
    const sizes = await Size.find({ deleted: false })
      .sort({ order: 1 });
    res.json(sizes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sizes" });
  }
};
