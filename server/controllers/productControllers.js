import fs from "fs";
import Product from "../models/productModel.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, shipping, category } = req.fields;
    const { photo } = req.files;

    if (!name || !price || !description || !quantity || !category) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (photo && photo.size > 10000000) { // 10 MB
      return res.status(400).send({ error: "Photo size should be less than 10 MB" });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;

      // Cleanup: Delete the temporary file
      fs.unlinkSync(photo.path);
    }

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
