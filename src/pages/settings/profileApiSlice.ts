import { apiSlice } from "../../app/apiSlice";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Profile"],
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export const profileApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, { name?: string; about?: string }>({
      query: (values) => ({
        url: "/update-profile",
        method: "PATCH",
        body: { ...values },
      }),
      invalidatesTags: ["Profile"],
    }),
    updatePassword: builder.mutation<any, { password: string }>({
      query: (values) => ({
        url: "/reset-password",
        method: "PATCH",
        body: { ...values },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useUpdateProfileMutation, useUpdatePasswordMutation } =
  profileApiSlice;
