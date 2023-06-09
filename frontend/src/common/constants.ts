// import.meta.env.VITE_SERVER_URL will get the values from the Heroku backend deployment
// https://auth-mern-boilerplate.herokuapp.com
export const API_BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/register",
	PROFILE: "/profile",
};
