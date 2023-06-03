import express from "express";
import dotenv from "dotenv";
dotenv.config(); // initialized envs
import cookieParser from "cookie-parser";

/* Error Handlers Middleware */
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

/* Routes */
import userRoutes from "./routes/userRoutes.js";

/* MongDB Connection */
import connectDB from "./config/db.js";
connectDB();

const port = process.env.PORT || 5000;

const app = express();
// To handle Content-type requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To handle cookies
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.status(200).json("Server is ready"));

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
