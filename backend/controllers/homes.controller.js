import Home from "../models/homes.model.js";
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
const getUserHomeList = async (req, res, next) => {
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
    next(error);
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

  if (!home) return errorHandler(404, "The home item is not found");

  try {
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch a list of houses from database based on the provided search term and filters
 * @param req The request containing the search term and filter from client side
 * @param res The list of houses
 * @param next Middleware function to take care of the errors
 */
const getHomeList = async (req, res, next) => {
  try {
    // 1. The limit and starting index for each query
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // 2. The filter for home type: sale, rent, or both
    let type = req.query.type;
    // If the type filter is not specified or is set to "all", include homes of both types: rent and sale.
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    // 3. The filter for parking
    let hasParking = req.query.parking;
    // If the parking filter is not specified or is unchecked, include homes with or without parking.
    if (hasParking === undefined || hasParking === "false") {
      hasParking = { $in: [true, false] };
    }

    // 4. The filter for furnished
    let isFurnished = req.query.furnished;
    // If the furnished filter is not specified or is unchecked, include homes with or without furniture.
    if (isFurnished === undefined || isFurnished === "false") {
      isFurnished = { $in: [true, false] };
    }

    // 5. Search keyword entered by the user
    const searchWords = req.query.searchWords || "";

    // 6. Sort type. Default: sort based on the created time
    const sort = req.query.sort || "createdAt";

    // 7. Sorting order: ascending or descending. Default: descending
    const order = req.query.order || "desc";

    // Find the list of homes based on the filters and search words
    const homeList = await Home.find({
      name: { $regex: searchWords, $options: "i" },
      furnished: isFurnished,
      parking: hasParking,
      type: type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(homeList);
  } catch (error) {
    next(error);
  }
};

export {
  createHome,
  getUserHomeList,
  deleteHomeItem,
  updateHomeItem,
  getHomeItem,
  getHomeList,
};
