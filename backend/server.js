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

const port = process.env.PORT || 5000;

const app = express();

// CORS Configuration
const whitelist = ['https://yero-mern-auth-boilerplate.netlify.app', 'http://localhost:3000']

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));

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
