import React from "react";
import ReactDOM from "react-dom/client";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import { ROUTES } from "./common/constants";

import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

/* Context Global State */
import store from "./context/store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			{/* Routes that will be replaced by <Outlet /> */}
			<Route index={true} path={ROUTES.HOME} element={<HomePage />} />
			<Route path={ROUTES.LOGIN} element={<LoginPage />} />
			<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
			{/* Protected Routes */}
			<Route path="" element={<ProtectedRoute />}>
				<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
