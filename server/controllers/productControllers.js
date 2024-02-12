import fs from "fs";
import Product from "../models/productModel.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, category } = req.fields;
    const { photo } = req.files;

    if (!name || !price || !description || !quantity || !category) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (photo && photo.size > 10000000) { // Adjusted file size limit
      return res.status(400).send({ error: "Photo size should be less than 10MB" });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      fs.readFile(photo.path, (err, data) => {
        if (err) {
          throw err;
        }
        product.photo.data = data;
        product.photo.contentType = photo.type;
        product.save();
      });
    } else {
      await product.save();
    }

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
