import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import { createProduct, deleteProduct, getAllProducts, getCloudinaryphoto, getSingleProduct, updateProduct } from "../controllers/productControllers.js";
import upload from "../utils/multer.js";

const routes = express.Router();

routes.post(
  "/create-product",
  upload.single("file"),
  requireSignIn,
  isAdmin,
  createProduct
);
//getAllproduct route
routes.get("/get-products", getAllProducts)

//getSingleProduct route

routes.get("/get-product/:slug", getSingleProduct) 
  // deleteProduct route
routes.delete("/delete-product/:id", deleteProduct)

// getPhoto Url 
routes.get("/product-photo/:_id", getCloudinaryphoto)

// update product-route 

routes.put("/update-product/:id", updateProduct)



export default routes;
