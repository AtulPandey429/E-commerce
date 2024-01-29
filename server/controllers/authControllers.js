import { comparePassword, hashpassword } from "../helper/authHelper.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

//register Post req

export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, address, password, answer } = req.body;

    if (!name || !email || !mobile || !address || !password || !answer) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
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
      answer,
      password: newPassword,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Registration successful", user: user });
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
        success: false,
        message: "please enter email and password",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "invalid email",
      });
    }
    const matchPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
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
        answer: existingUser.answer,
        answer: existingUser.role,
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

//forget password

export const forgetPassword = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    if (!email || !answer || !newpassword) {
      return res.status(400).json({ message: "all fields are mandatory" });
    }
    const findDetails = await User.findOne({ email, answer });
    if (!findDetails) {
      return res.status(400).json({ message: "email or answer is wrong" });
    }
    const newPassword = await hashpassword(newpassword);
    const updatePassword = await User.findByIdAndUpdate(findDetails._id, {
      password: newPassword,
    });
    updatePassword.save();
    return res
      .status(200)
      .json({ success: true,message:"successfull", user: { email: findDetails.email } });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in forgetpassword" });
  }
};
