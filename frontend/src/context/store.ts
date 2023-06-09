import { configureStore } from "@reduxjs/toolkit";

/* Slices */
import { apiSlice } from "./slices/apiSlice";

/* Reducers */
import authReducer from "./slices/authSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
