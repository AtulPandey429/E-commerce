import Product from "../models/productModel.js";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, category,shipping } = req.body;
    const { file } = req;

    if (!name || !price || !description || !quantity || !category || !shipping) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (!file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    if (file.size > 10000000) {
      return res
        .status(400)
        .send({ error: "Photo size should be less than 10MB" });
    }

    const photoUrl = await uploadOnCloudinary(file.path);
    console.log("Photo URL:", photoUrl);

    const product = new Product({
      name,
      price,
      description,
      quantity,
      category,
      shipping,
      photo: photoUrl,
      slug: slugify(name),
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
      photoUrl,
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

// get all products

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      totalProducts: products.length,
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching products",
      error: error.message,
    });
  }
};

//get single product by slug

export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching product",
      error: error.message,
    });
  }
};

//delete product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error: error.message,
    });
  }
};

//controller function to get product phot url from cloudinary

export const getCloudinaryphoto = async(req,res)=>{
 try {
 
 const product = await Product.findById({_id:req.params._id});

 if(!product && !product.photo){
  res.status(400).send({
    success:false,
    message:"photo or product not found",
  })
 }
res.status(200).send({
    success:true,
    message:"photo fetched successfully",
    photoUrl:product.photo,
})


  
 } catch (error) {
  console.error(error);
  res.status(500).send({
    success:false,
    message:"error in fetching photo",
    error:error.message,
})
 }
}


// update product controller


export const updateProduct = async (req, res) => {
  const { name, price, description, quantity, category,shipping } = req.body;
  const { file } = req;

  try {
    if (![name, price, description, quantity, category, file,shipping].every(Boolean)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (file.size > 10000000) {
      return res.status(400).json({ error: "Photo size should be less than 10MB" });
    }

    const photoUrl = await uploadOnCloudinary(file.path);

    let product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      quantity,
      category,
      shipping,
      photo: photoUrl,
      slug: slugify(name)
    }, { new: true });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
      photoUrl
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in updating product",
      error: error.message
    });
  }
};

