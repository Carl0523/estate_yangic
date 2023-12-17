import Home from "../models/home.model.js";

const createHome = async (req, res, next) => {
    try {
        const home = await Home.create(req.body);
        res.status(201).json(home)
    } catch (error) {
        next(error)
    }
}





export {createHome};