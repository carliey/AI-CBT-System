import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../../app/apiSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface UsersState {
  user: any;
  token: string | null;
}

const initialState: UsersState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UsersState>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("credentials", JSON.stringify(action.payload));
    },
    setProfile: (state, action: PayloadAction<{ user: any }>) => {
      const { user } = action.payload;
      const credentials = JSON.parse(localStorage.getItem("credentials") || "");
      const token = credentials.token;
      if (token && user) {
        state.user.name = user.name;
        state.user.about = user.about;
        localStorage.setItem(
          "credentials",
          JSON.stringify({ token, user: state.user })
        );
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("credentials");
      localStorage.removeItem("overview");
      apiSlice.util.resetApiState();
    },
  },
});

export const { login, logout, setProfile } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
