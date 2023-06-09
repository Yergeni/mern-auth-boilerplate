import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); // initialized envs
import cookieParser from "cookie-parser";

/* Error Handlers Middleware */
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

/* Routes */
import userRoutes from "./routes/userRoutes.js";

/* MongDB Connection */
import connectDB from "./config/db.js";
connectDB();

const corsOptions = {
	origin: "https://auth-mern-boilerplate.herokuapp.com",
	// origin: process.env.NODE_ENV === "production" ? "https://auth-mern-boilerplate.herokuapp.com" : "http://localhost:5000",
	// credentials: true,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

const app = express();
// To handle Content-type requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To handle cookies
app.use(cookieParser());

app.use("/api/users", userRoutes);

// /* Needed for production deployment where backend and front will be deployed together */
// if (process.env.NODE_ENV === "production") {
// 	const __dirname = path.resolve("../");
//   console.log(__dirname)
// 	// Make the `dist` folder a static folder
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	// point to the index html any route
// 	app.get("*", (_, res) =>
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// 	);
// } else {
// 	app.get("/", (req, res) => res.status(200).json("Server is ready"));
// }

app.get("/", (req, res) => res.status(200).json("Server is ready"));

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
