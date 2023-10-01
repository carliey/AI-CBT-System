import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "/login",
        method: "POST",
        body: { ...values },
      }),
    }),

    signup: builder.mutation({
      query: (values) => ({
        url: "/register",
        method: "POST",
        body: { ...values },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
