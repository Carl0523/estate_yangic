import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(errorHandler(500, "The email has already been taken"));
    }

    //encrypt the password that regenerate 10 rounds
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user with this info
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the newUser instance to the MongoDB database collection
    await newUser.save();

    generateToken(res, newUser._id);

    const {password: passCode, ...rest} = newUser._doc;

    // Response with a success message with status code 201
    res.status(201).json(rest);
  } catch (error) {
    // Catch any possible error
    next(error);
  }
};

const signIn = async (req, res, next) => {
  // Fetch the email and password from request's body from client side
  const { email, password } = req.body;
  try {
    // Find the user by the email
    const user = await User.findOne({ email });

    // Check if user existed in the database, if not, return error
    if (!user) return next(errorHandler(404, "Invalid email or password"));

    // Compare the passwords to check if they're matched
    const isPasswordMatched = bcryptjs.compareSync(password, user.password);

    // If passwords does not matched return error
    if (!isPasswordMatched)
      return next(errorHandler(404, "Invalid email or password"));

    const { password: passCode, ...rest } = user._doc;

    generateToken(res, user._id);
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const {name, email, photo} = req.body;
  try {
    const user = await User.findOne({email});
    if (user)
    {
      // Generate the token
      generateToken(res, user._id);
      const {password: passCode, ...rest} = user._doc;
      res.status(200).json(rest);
    }
    else
    {
      // Generate a random 16 digits passwords for user
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Generate a username based on user's name
      const username = name.replaceAll(' ', '').toLowerCase() + Math.random().toString(36).slice(-4);

      const newUser = new User({username, email, password: hashedPassword, avatar: photo})

      await newUser.save();

      generateToken(res, newUser._id);
      const { password: passCode, ...rest } = newUser._doc;

      res.status(200).json(rest);

    }
  } catch (error) {
    next(error)
  }
}

export { register, signIn, googleAuth };
