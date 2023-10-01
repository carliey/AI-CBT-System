import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "/user/login",
        method: "POST",
        body: { ...values },
      }),
    }),

    signup: builder.mutation({
      query: (values) => ({
        url: "/creator/create",
        method: "POST",
        body: { ...values },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
