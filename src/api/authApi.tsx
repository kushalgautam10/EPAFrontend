import { baseApi } from "./baseApi";
import { setUser } from "../store/authSlice";

interface LoginResponse {
  data: {
    id: string;
    userName: string;
    email: string;
    roles: string[];
    isVerified: boolean;
    jwToken: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/Auth/login",
        method: "POST",
        body: credentials
      }),


      
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    try {
      const { data } = await queryFulfilled;
      const user = data.data;
      // Save to Redux slice
      dispatch(
            setUser({
              user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                roles: user.roles
              },
              token: user.jwToken
            })
          );
      // Save to localStorage if you want persistence
      // Save to localStorage
          localStorage.setItem("token", user.jwToken);
          localStorage.setItem("user", JSON.stringify(user));

    } catch (err) {
      console.error("Login error:", err);
    }
  }
    }),
    register: builder.mutation({
      query: (userInfo) => {
        console.log("Logging in with:", userInfo);
        return {
          url: "/ASuth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    forgetpassword: builder.mutation({
      query: (userInfo) => {
        console.log("Logging in with:", userInfo);
        return {
          url: "/auth/forgetpassword",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const { useLoginMutation,useForgetpasswordMutation,useRegisterMutation } = authApi;