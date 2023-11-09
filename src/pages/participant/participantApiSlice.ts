import { apiSlice } from "../../app/apiSlice";
import { Quiz, QuizData, Test } from "../../types/test";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Quiz"],
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export const participantApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all quizzes for the logged-in test administrator
    getQuiz: builder.query<
      QuizData,
      { quiz_id: number; participant_id: number }
    >({
      query: ({ quiz_id, participant_id }) =>
        `/quiz?quiz_id=${quiz_id}&participant_id=${participant_id}`,
      providesTags: ["Quiz"],
    }),

    // Mutation to create a new quiz
    createQuiz: builder.mutation<any, Test>({
      query: (values) => ({
        url: "/quizzes",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const { useGetQuizQuery } = participantApiSlice;
