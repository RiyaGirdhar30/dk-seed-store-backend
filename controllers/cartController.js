//BACKEND CART
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
// GET USER CART
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product");

    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { product, size = "Full KG", quantity = 1 } = req.body;
    const user = req.user._id;

    const validProduct = await Product.findById(product);
    if (!validProduct) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({
        user,
        products: [{ product, size, quantity }],
      });
    } else {
      const item = cart.products.find(
        (p) => p.product.toString() === product && p.size === size
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.products.push({ product, size, quantity });
      }
    }

    await cart.save();
    res.json(await cart.populate("products.product"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// INCREASE QTY
export const increaseQty = async (req, res) => {
  const { product, size } = req.body;
  const user = req.user._id;

  const cart = await Cart.findOne({ user });

  const item = cart.products.find(
    (p) => p.product.toString() === product && p.size === size
  );

  if (item) item.quantity += 1;

  await cart.save();
  res.json(await cart.populate("products.product"));
};

// DECREASE QTY
export const decreaseQty = async (req, res) => {
  const { product, size } = req.body;
  const user = req.user._id;

  const cart = await Cart.findOne({ user });

  const item = cart.products.find(
    (p) => p.product.toString() === product && p.size === size
  );

  if (item) item.quantity = Math.max(1, item.quantity - 1);

  await cart.save();
  res.json(await cart.populate("products.product"));
};


// REMOVE ITEM
export const removeFromCart = async (req, res) => {
  const { product, size } = req.body;
  const user = req.user._id;

  const cart = await Cart.findOne({ user });

  cart.products = cart.products.filter(
    (p) => !(p.product.toString() === product && p.size === size)
  );

  await cart.save();
  res.json(await cart.populate("products.product"));
};


// CLEAR CART
export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Cart cleared" });
};
