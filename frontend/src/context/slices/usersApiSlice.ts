import { UserInfo } from "../../common/types";
import { apiSlice } from "./apiSlice";

const USERS_PATH = "/api/users";

export type RegisterRequest = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type UserResponse = {
	userInfo: UserInfo;
};

export type ProfileRequest = Partial<RegisterRequest>;

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<UserResponse, RegisterRequest>({
			query: (credentials) => ({
				url: `${USERS_PATH}`,
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: `${USERS_PATH}/auth`,
				method: "POST",
				body: credentials,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_PATH}/logout`,
				method: "POST",
			}),
		}),
		updateProfile: builder.mutation<UserResponse, ProfileRequest>({
			query: (credentials) => ({
				url: `${USERS_PATH}/profile`,
				method: "PUT",
				body: credentials,
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useUpdateProfileMutation,
} = usersApiSlice;
