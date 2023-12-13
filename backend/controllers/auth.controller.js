import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    // Response with a success message with status code 201
    res.status(201).json({ message: "Create user successfully" });
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

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: '30d'
  });

    const {password: passCode, ...rest} = user._doc;

    res
      .cookie("access_token", token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export { register, signIn };
