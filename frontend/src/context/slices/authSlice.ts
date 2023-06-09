import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import type { UserInfo } from "../../common/types";

const USER_INFO_KEY = "userInfo";

type SliceState = {
	userInfo: UserInfo | null;
};

const userInfo = localStorage.getItem(USER_INFO_KEY);

const initialState: SliceState = {
	userInfo: userInfo ? JSON.parse(userInfo) : null,
};

/**
 * Controls the localstore user information
 */
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<SliceState>) => {
			state.userInfo = action.payload.userInfo;
			localStorage.setItem(
				USER_INFO_KEY,
				JSON.stringify(action.payload.userInfo)
			);
		},
		clearCredentials: (state) => {
			state.userInfo = null;
			localStorage.removeItem(USER_INFO_KEY);
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.userInfo;
