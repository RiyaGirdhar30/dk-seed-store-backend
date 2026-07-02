import Product from "../models/Product.js";
import FeaturedSeeds from "../models/FeaturedSeeds.js";  

// ✅ Add Product (Admin use later)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Products by Category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeaturedSeeds = async (req, res) => {
  try {
    const featuredSeeds = await FeaturedSeeds.find()
      .populate("product"); // 🔥 MUST

    res.json(featuredSeeds);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch featured seeds" });
  }
};

// // ✅ Delete Product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // check if already featured
    const existing = await FeaturedSeeds.findOne({ product: productId });

    // if (existing) {
    //   await existing.deleteOne();
    //   return res.json({ message: "Removed from featured" });
    // }


    if (existing) {
  await existing.deleteOne();

  // 🔥 ADD THIS
  await Product.findByIdAndUpdate(productId, {
    isFeatured: false,
  });

  return res.json({ message: "Removed from featured" });
}


    // add to featured
    const featured = await FeaturedSeeds.create({
      product: productId,
      rating: 4.5,
    });

    // 🔥 ADD THIS
await Product.findByIdAndUpdate(productId, {
  isFeatured: true,
});

    res.json({ message: "Added to featured", featured });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
