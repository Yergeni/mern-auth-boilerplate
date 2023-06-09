/**
 * Catches any error route that does not exist
 */
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error); // call next middleware function
};

const errorHandler = (err, req, res, next) => {
	// It may be the case that there is a response 200 with error, in that case, change it to 500
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	// Handle the mongoose error (CastError)
	if (err.name === "CastError" && err.kind === "ObjectId") {
		statusCode = 404;
		message = "DB Resource not found";
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack, // show error details
	});
};

export { notFound, errorHandler };
