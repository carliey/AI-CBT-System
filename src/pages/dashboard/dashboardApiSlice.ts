import { apiSlice } from "../../app/apiSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get a quiz with its participant answers
    getUserStats: builder.mutation<any, void>({
      query: () => `/api/stats`,
    }),
  }),
});

export const { useGetUserStatsMutation } = dashboardApiSlice;
