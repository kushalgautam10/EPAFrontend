import React from "react";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { setUser, clearUser } from "../store/authSlice";



const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7232/api",
  //credentials: "include", IMPORTANT if refresh token is in cookie
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

/**
 * Wrapper to handle token refresh
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // Access token expired
  if (result.error?.status === 401) {
     const refreshToken = localStorage.getItem("refreshToken");
     
    if (!refreshToken) {
      api.dispatch(clearUser());
      return result;
    }

    // Call refresh token endpoint
    const refreshResult = await baseQuery(
      {
        url: "/Auth/refresh-token",
        method: "POST",
        params: {refreshToken}
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as any;

      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        api.dispatch(clearUser());
        return result;
      }

      const user = JSON.parse(storedUser);

      // Update redux + storage
      api.dispatch(
        setUser({
          user,
          token: data.data.jwToken
        })
      );

      localStorage.setItem("token", data.data.jwToken);

      // 🔁 Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // ❌ Refresh failed → force logout
      api.dispatch(clearUser());
    }
  }

  return result;
};



export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: () => ({})
});