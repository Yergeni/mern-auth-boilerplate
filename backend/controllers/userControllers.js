import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { JWT_NAME } from "../common/constants.js";

/**
 * Register a new user
 * @description Creates and authenticate a user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExist = await UserModel.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("User email already exist");
	}

	const userDoc = await UserModel.create({
		name,
		email,
		password,
	});

	if (userDoc) {
		generateToken(res, userDoc._id);
		res.status(201).json({
			_id: userDoc._id,
			name: userDoc.name,
			email: userDoc.email,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

/**
 * Login a user
 * @description Authenticate a user
 * @route POST /api/users/auth
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const userDoc = await UserModel.findOne({ email });

	// function added to the model (see userModel.js line 26)
	if (userDoc && (await userDoc.matchPasswords(password))) {
		generateToken(res, userDoc._id);
		res.status(200).json({
			_id: userDoc._id,
			name: userDoc.name,
			email: userDoc.email,
		});
	} else {
		res.status(401);
		throw new Error("Invalid username or password");
	}
});

/**
 * Logout user
 * @description Logouts a user
 * @route POST /api/users/logout
 * @access Public
 */
const logoutUser = asyncHandler(async (_, res) => {
	res.cookie(JWT_NAME, "", { httpOnly: true, expires: new Date(0) });
	res.status(200).json({ message: "User logged out" });
});

/**
 * Profile user
 * @description Get a user's profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};

	res.status(200).json(user);
});

/**
 * Update user
 * @description Update a user's profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	const userDoc = await UserModel.findById(req.user._id);

	if (userDoc) {
		userDoc.name = req.body.name || userDoc.name;
		userDoc.email = req.body.email || userDoc.email;

		if (req.body.password) {
			userDoc.password = req.body.password;
		}

		const updatedUser = await userDoc.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
