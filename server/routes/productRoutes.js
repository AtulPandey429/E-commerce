import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import { createProduct, deleteProduct, getAllProducts, getCloudinaryphoto, getSingleProduct, updateProduct } from "../controllers/productControllers.js";
import upload from "../utils/multer.js";

const routes = express.Router();

// Create product route
routes.post("/create-product", requireSignIn, isAdmin, upload.single("file"), createProduct);

// Get all products route (public)
routes.get("/get-products", getAllProducts);

// Get single product route (public)
routes.get("/get-product/:slug", getSingleProduct);

// Delete product route
routes.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProduct);

// Get photo URL route
routes.get("/product-photo/:_id", getCloudinaryphoto);

// Update product route
routes.put("/update-product/:id", requireSignIn, isAdmin, upload.single("file"), updateProduct);

export default routes;
