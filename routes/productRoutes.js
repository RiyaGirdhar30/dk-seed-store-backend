import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedSeeds,
  deleteProduct,  
  updateProduct,
  toggleFeaturedProduct,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
/* 🔥 STATIC ROUTES FIRST */
 router.get("/featured", getFeaturedSeeds);

router.get("/category/:category", getProductsByCategory);

router.put(
  "/featured/:id",
  protect,
  admin,
  toggleFeaturedProduct
);


/* admin ROUTES */
router.post("/",protect, admin,createProduct);
router.get("/", getAllProducts);
router.put("/:id",protect,admin, updateProduct); 
router.delete("/:id",protect,admin, deleteProduct);
 
/* 🔥 DYNAMIC ROUTE LAST */
router.get("/:id", getProductById);

export default router;












