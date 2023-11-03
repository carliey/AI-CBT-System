import { apiSlice } from "../../app/apiSlice";
import { Quiz, Test } from "../../types/test";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Quizzes"],
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export const quizApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    extractParticipantsFromList: builder.mutation<any, any>({
      query: (values) => ({
        url: "/extract-participants",
        method: "POST",
        body: values,
      }),
    }),

    extractText: builder.mutation<any, any>({
      query: (values) => ({
        url: "/extract-text",
        method: "POST",
        body: values,
      }),
    }),

    // Query to get all quizzes for the logged-in test administrator
    getQuizzes: builder.query<any, void>({
      query: () => "/api/quizzes",
      providesTags: ["Quizzes"],
    }),

    // Query to get a quiz with its participant answers
    getQuizWithAnswers: builder.query<any, number>({
      query: (quizId) => `/api/quizzes/${quizId}`,
    }),

    // Mutation to create a new quiz
    createQuiz: builder.mutation<any, Test>({
      query: (values) => ({
        url: "/api/quizzes",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Quizzes"],
    }),

    // Mutation to update a quiz
    updateQuiz: builder.mutation<Test, { quizId: number; quiz: Test }>({
      query: ({ quizId, quiz }) => ({
        url: `/api/quizzes/${quizId}`,
        method: "PUT",
        body: quiz,
      }),
      invalidatesTags: ["Quizzes"],
    }),

    // Mutation to publish a quiz
    publishQuiz: builder.mutation<Test, number>({
      query: (quizId) => ({
        url: `/api/quizzes/${quizId}/publish`,
        method: "PUT",
      }),
      invalidatesTags: ["Quizzes"],
    }),

    // Mutation to unpublish a quiz
    unpublishQuiz: builder.mutation<Test, number>({
      query: (quizId) => ({
        url: `/api/quizzes/${quizId}/unpublish`,
        method: "PUT",
      }),
      invalidatesTags: ["Quizzes"],
    }),

    // Mutation to delete a quiz
    deleteQuiz: builder.mutation<void, number>({
      query: (quizId) => ({
        url: `/api/quizzes/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizWithAnswersQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  usePublishQuizMutation,
  useUnpublishQuizMutation,
  useDeleteQuizMutation,
  useExtractParticipantsFromListMutation,
  useExtractTextMutation,
} = quizApiSlice;
