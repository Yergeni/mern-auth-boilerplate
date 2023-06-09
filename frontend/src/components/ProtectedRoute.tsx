import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../common/constants";

export default function ProtectedRoute() {
	const { userInfo } = useAuth();

	return userInfo ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
}
