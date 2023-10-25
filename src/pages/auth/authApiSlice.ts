import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "/signin",
        method: "POST",
        body: { ...values },
      }),
    }),

    signup: builder.mutation({
      query: (values) => ({
        url: "/signup",
        method: "POST",
        body: { ...values },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
