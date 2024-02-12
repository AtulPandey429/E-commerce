import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import { createProduct } from "../controllers/productControllers.js";

const routes = express.Router();

routes.post(
  "/create-product",
  formidable(),
  requireSignIn,
  isAdmin,
  createProduct
);

export default routes;
