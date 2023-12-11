import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  //encode the password that regenerate 10 rounds
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "Create user successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { register };
