import CategorySection from "../models/CategorySection.js";

export const getCategorySections = async (req, res) => {
  try {
    const categories = await CategorySection
      .find({ active: true })
      .sort({ order: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const addCategorySection = async (req, res) => {
  const { key, name, image, order } = req.body;

  const exists = await CategorySection.findOne({ key });
  if (exists) {
    return res.status(400).json({ message: "Key already exists" });
  }

  const category = await CategorySection.create({
    key,
    name,
    image,
    order,
  });

  res.status(201).json(category);
};

export const updateCategorySection = async (req, res) => {
  const category = await CategorySection.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  category.name = req.body.name || category.name;
  category.image = req.body.image || category.image;
  category.key = req.body.key || category.key;

  await category.save();
  res.json(category);
};

export const toggleCategorySection = async (req, res) => {
  const category = await CategorySection.findById(req.params.id);
  category.active = !category.active;
  await category.save();

  res.json({ active: category.active });
};

export const reorderCategorySections = async (req, res) => {
  const { orders } = req.body; // [{id, order}]

  for (let item of orders) {
    await CategorySection.findByIdAndUpdate(item.id, {
      order: item.order,
    });
  }

  res.json({ message: "Order updated" });
};

export const deleteCategorySection = async (req, res) => {
  try {
    const section = await CategorySection.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Category section not found" });
    }

    await section.deleteOne();

    res.json({ message: "Category section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category section" });
  }
};

export const getAllCategorySectionsAdmin = async (req, res) => {
  try {
    const categories = await CategorySection
      .find()               // 🔥 no active filter
      .sort({ order: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category sections" });
  }
};
