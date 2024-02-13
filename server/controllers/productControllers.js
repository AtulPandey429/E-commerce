import Product from "../models/productModel.js";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    console.log("Request Fields:", req.body);
    console.log("Request File:", req.file);
    const { name, price, description, quantity, category } = req.body;
    const { file } = req;

    if (!name || !price || !description || !quantity || !category) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (!file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    if (file.size > 10000000) {
      return res.status(400).send({ error: "Photo size should be less than 10MB" });
    }

    const photoUrl = await uploadOnCloudinary(file.path);
    console.log("Photo URL:", photoUrl);

    const product = new Product({
      name,
      price,
      description,
      quantity,
      category,
      file: photoUrl,
      slug: slugify(name)
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error: error.message,
    });
  }
};
