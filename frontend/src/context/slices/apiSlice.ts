/**
 * More info: https://redux-toolkit.js.org/rtk-query/overview
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" }); // Empty string since there is a proxy in line #9 from `vite.config.ts`

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"],
	endpoints: () => ({}),
});
