import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

/**
 * Update the user's info
 * @param req The request from the client side and verifyToken function
 * @param res The response sending back to the client side
 * @param next mainly used for calling the middleware error handler
 */
const updateUser = async (req, res, next) => {
  if (req.userId != req.params.id)
    return next(errorHandler(401, "UnAuthenticated"));

    
  if (req.body.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(errorHandler(500, "The email has already been taken"));
    }
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    {
      /* $set will make sure the user params only update if they're present */
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete the user from the database
 * @param req The request from the client side and verifyToken function
 * @param res The response sending back to the client side
 * @param next mainly used for calling the middleware error handler
 */
const deleteUser = async (req, res, next) => {
  if (req.userId !== req.params.id) return next(errorHandler(401, "Unmatched token and user account"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.cookie("access_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({message: "The account is deleted"});
  } catch (error)
  {
    next(error)
  }
}

export { updateUser, deleteUser };
