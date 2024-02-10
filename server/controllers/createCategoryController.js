import slugify from "slugify";
import Category from "../models/createCategory.js";

export const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "name is required",
      });
    }
    const nameExit = await Category.findOne({ name });
    if (nameExit) {
      return res.status(200).send({
        success: true,
        message: "name is alredy exist",
      });
    }

   const newcategory= await Category({
      name,
      slug: slugify(name),
    }).save();
    return res.status(201).send({
      success: true,
      message: `newCategory is created`,
      newcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "somthing wrong ",
    });
  }
};
