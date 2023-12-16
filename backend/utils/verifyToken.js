import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

/**
 * Verify if user is authenticate by checking the token
 * @param req The request
 * @param res The response
 * @param next function that go the the next step
 */
export const verifyToken = (req, res, next) => {
    {/* 1. Get the token from cookie */}
    const token = req.cookies.access_token;
    {/* 2. Check if token exist */}
    if (!token) return next(errorHandler(401, "Unauthorized"));

    {/* 3. Verify the token:
        success: store the userId to the req.user
        fail: Return the corresponding error
    */}
    jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        if (error) return next(errorHandler(403, 'Something went wrong'));
        req.userId = payload.id;
        next();
    })

}