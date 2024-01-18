import { comparePassword, hashpassword } from "../helper/authHelper.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

//register Post req

export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, address, password } = req.body;

    if (!name || !email || !mobile || !address || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists. Please try to login.",
      });
    }

    const newPassword = await hashpassword(password);

    const user = new User({
      name,
      email,
      mobile,
      address,
      password: newPassword,
    });

    await user.save();

    return res.status(201).json({ message: "User created", user: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login Post req
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        message: "please enter email and password",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        message: "invalid email",
      });
    }
    const matchPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!matchPassword) {
      return res.status(200).send({
        message: "invalid password",
      });
    }

    //genrate token

    const token = await JWT.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "login success",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        mobile: existingUser.mobile,
        address: existingUser.address,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "email or password is wrong",
      error: error.message,
    });
  }
};
