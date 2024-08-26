import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, otpVerify, resetPassword, resetPasswordReq, signInUser, userUpdate } from "./apis";

const initialState = {
  authData: null,
  loggedInUser: null,
  loading: false,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    clearAuthData: (state) => {
      state.authData = null;
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user; // Adjust as needed based on your API response
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.authData = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user; 
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user; 
      })
      .addCase(resetPasswordReq.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user; 
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user; 
      })
      
      // User Update
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload.user; // Adjust as needed based on your API response
      })
      .addCase(userUpdate.rejected, (state) => {
        state.loading = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.authData = null;
        state.loggedInUser = null;
      });
  },
});

export const { setLoggedInUser, clearAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
