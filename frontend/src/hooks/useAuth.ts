import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../context/slices/authSlice";

export function useAuth() {
	const userInfo = useSelector(selectCurrentUser);

	return useMemo(() => ({ userInfo }), [userInfo]);
}
