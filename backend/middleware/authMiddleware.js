import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import { JWT_NAME } from "../common/constants.js";

/**
 * Verifies the token from cookies and add the user to the req based on the decoded token info
 */
const protect = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies[JWT_NAME];

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// Adds the found user to the req for the next call
			req.user = await UserModel.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized, invalid token");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

export { protect };
