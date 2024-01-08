import User from '../models/userModel.js'

const registerUser = async (req, res) => {
  try {
    const { name, email ,mobile,address,password} = req.body;

    // Create a new user using the User model
    const newUser = new User({ name, email ,mobile,address,password});

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default registerUser;
