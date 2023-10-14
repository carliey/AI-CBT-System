import { apiSlice } from "../../app/apiSlice";
import { Test } from "../../types/test";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Quizes"],
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export const profileApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getQuizes: builder.query<any, void>({
      query: () => `/quiz`,
      providesTags: ["Quizes"],
    }),
    createQuiz: builder.mutation<any, Test>({
      query: (values) => ({
        url: "/quiz",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Quizes"],
    }),
    updatePassword: builder.mutation<any, { password: string }>({
      query: (values) => ({
        url: "/reset-password",
        method: "PATCH",
        body: { ...values },
      }),
      invalidatesTags: ["Quizes"],
    }),
  }),
});

export const {
  useGetQuizesQuery,
  useCreateQuizMutation,
  useUpdatePasswordMutation,
} = profileApiSlice;
