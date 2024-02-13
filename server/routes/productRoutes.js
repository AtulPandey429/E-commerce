import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import { createProduct } from "../controllers/productControllers.js";
import upload from "../utils/multer.js";

const routes = express.Router();

routes.post(
  "/create-product",
  upload.single("file"),
  requireSignIn,
  isAdmin,
  createProduct
);

export default routes;
