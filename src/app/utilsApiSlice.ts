import { apiSlice } from "./apiSlice";

export const utilsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (values) => ({
        url: "/upload/add",
        method: "POST",
        body: values,
      }),
    }),
    deleteFile: builder.mutation({
      query: (values) => ({
        url: `/upload/remove/${values.url}`,
        method: "DELETE",
        body: values,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = utilsApiSlice;
