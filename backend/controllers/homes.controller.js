import Home from "../models/home.model.js";
import { errorHandler } from "../utils/error.js";

/**
 * Create the new Home item and send to MongoDB database and return with the info
 * @param req request from the client-side
 * @param res response to send back to the client-side
 * @param next the next function to handle the error
 */
const createHome = async (req, res, next) => {
  try {
    const home = await Home.create(req.body);
    res.status(201).json(home);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a list of home item
 * @param req request from the client-side containing the user unique id
 * @param res response the client-side with the list of homes
 * @param next next function handle any error
 */
const getHomeList = async (req, res, next) => {
  if (req.userId === req.params.id) {
    try {
      const homes = await Home.find({ userRef: req.params.id });
      res.status(200).json(homes);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "You're not authenticated!"));
  }
};

/**
 * Delete the home item with specified id
 * @param req The delete request from the client side
 * @param res the response send back to client side when successfully
 * @param next the function to handle the error
 */
const deleteHomeItem = async (req, res, next) => {
  const homeId = req.params.id;
  // 1. Try to find the home item by id in the database
  const home = await Home.findById(homeId);

  // 2. If not found return not found error
  if (!home) return next(errorHandler(404, "Home is not found"));

  // 3. Check if the user is authenticated
  if (req.userId !== home.userRef) {
    return next(
      errorHandler(401, "You're not authenticated to delete the item")
    );
  }

  try {
    await Home.findByIdAndDelete(homeId);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete the home item with specified id
 * @param req The delete request from the client side
 * @param res the response send back to client side when successfully
 * @param next the function to handle the error
 */
const updateHomeItem = async (req, res, next) => {
  const homeId = req.params.id;

  // 1. Try to find the home item with home ID in database
  const home = await Home.findById(homeId);

  // 2. If home item not found return error
  if (!home) return errorHandler(404, "item not found");

  // 3. Check if user is authenticated
  if (req.userId !== home.userRef)
    return errorHandler(401, "You're not authenticated to edit the item");

  try {
    const updatedHome = await Home.findByIdAndUpdate(homeId, req.body, {
      new: true,
    });
    res.status(200).json(updatedHome);
  } catch (error) {
    next(error)
  }
};

/**
 * Find the home item with specified id
 * @param req The get request from the client side
 * @param res the response should send back the data of home
 * @param next the function to handle the error
 */
const getHomeItem = async (req, res, next) => {
  const home = await Home.findById(req.params.id);

  if (!home) return (errorHandler(404, "The home item is not found"));

  try {
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
}

export { createHome, getHomeList, deleteHomeItem, updateHomeItem, getHomeItem };
