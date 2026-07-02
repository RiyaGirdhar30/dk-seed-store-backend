import Category from "../models/Category.js";
import Product from "../models/Product.js";

// GET categories for Categories tab
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ active: true,deleted:false }).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

//add category
export const createCategory = async (req, res) => {
  const { key, title, order } = req.body;

  const exists = await Category.findOne({ key });
  if (exists) {
    return res.status(400).json({ message: "Category key already exists" });
  }

  const category = await Category.create({
    key,
    title,
    order,
    active: true,
  });

  res.status(201).json(category);
};

//update category
export const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  category.title = req.body.title ?? category.title;
  category.key = req.body.key ?? category.key;
  category.order = req.body.order ?? category.order;

  await category.save();
  res.json(category);
};

//toggle active
export const toggleCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  category.active = !category.active;
  await category.save();

  res.json({ active: category.active });
};

//reorder
export const reorderCategories = async (req, res) => {
  const { orders } = req.body; // [{id, order}]

  for (let item of orders) {
    await Category.findByIdAndUpdate(item.id, { order: item.order });
  }

  res.json({ message: "Order updated" });
};

//del with protection(imp)
export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const used = await Product.findOne({ category: category.key });

  if (used) {
    return res.status(400).json({
      message: "Category is used by products. Deactivate instead.",
    });
  }

    // 🔒 SOFT DELETE
  category.deleted = true;
  category.active = false;
  await category.save();

// await category.deleteOne();

  res.json({ message: "Category deleted" });
};

// 🔐 ADMIN: get all categories (active + inactive, not deleted)
export const getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await Category.find({ deleted: false })
      .sort({ order: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
