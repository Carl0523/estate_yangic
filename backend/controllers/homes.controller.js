import Home from "../models/home.model.js";

/**
 * Create the new Home item and send to MongoDB database and return with the info
 * @param req request from the client-side
 * @param res response to send back to the client-side
 * @param next the next function to handle the error
 */
const createHome = async (req, res, next) => {
    try {
        const home = await Home.create(req.body);
        res.status(201).json(home)
    } catch (error) {
        next(error)
    }
}

/**
 * Response with a list of home item
 * @param req request from the client-side containing the user unique id
 * @param res response the client-side with the list of homes
 * @param next next function handle any error
 */
const getHomeList = async (req, res, next) => {
    if (req.userId === req.params.id)
    {
        try {
            const homes = await Home.find({userRef: req.params.id});
            res.status(200).json(homes)
        } catch (error) {
            next(error);
        }
    }
    else
    {
        next(errorHandler(401, "You're not authenticated!"))
    }
}





export {createHome, getHomeList};