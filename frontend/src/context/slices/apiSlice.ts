/**
 * More info: https://redux-toolkit.js.org/rtk-query/overview
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../common/constants";

// Empty string since there is a proxy in line #9 from `vite.config.ts`
// const baseQuery = fetchBaseQuery({ baseUrl: "" }); 
const baseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"],
	endpoints: () => ({}),
});
