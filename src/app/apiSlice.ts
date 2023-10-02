import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  prepareHeaders: (headers) => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const { token } = JSON.parse(credentials);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const baseQuerywithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    //unauthorized
    alert("unauthorized");
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQuerywithAuth,
  endpoints: () => ({}),
});
