import express from "express";
// import formidable from "formidable";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import { createProduct } from "../controllers/productControllers.js";

const routes = express.Router();

routes.post(
  "/create-product",
//   async (req, res, next) => {
//     try {
//       await formidable()(req, res, next);
//     } catch (error) {
//       return res.status(500).send({ error: "Error parsing form data" });
//     }
//   },
  requireSignIn,
  isAdmin,
  createProduct
);

export default routes;
