import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {

    const existingUser = await User.findOne({email});

    if (existingUser)
    {
      console.log
    }

    //encrypt the password that regenerate 10 rounds
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user with this info
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the newUser instance to the MongoDB database collection
    await newUser.save();
    // Response with a success message with status code 201
    res.status(201).json({ message: "Create user successfully" });
  } catch (error) {
    // Catch any possible error
    next(error);
  }
};

export { register };
