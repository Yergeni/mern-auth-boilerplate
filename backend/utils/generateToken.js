import jwt from "jsonwebtoken";
import { JWT_NAME } from "../common/constants.js";

/**
 * Generates a token based on the user ID and set it to the browser cookies
 * @param {*} res The response
 * @param {*} userId The user ID to validate
 */
const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

  res.cookie(JWT_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
  })
};

export default generateToken;
