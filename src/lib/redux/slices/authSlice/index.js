import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, otpVerify, resetPassword, resetPasswordReq, signInUser, userUpdate } from "./apis";
import { showToast } from './../../../../Components/Common/Toast'; // Adjust import as necessary

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
        state.loggedInUser = action.payload.user;
        showToast("Login successfully", 'success'); // Success toast
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.authData = null;
        showToast(action.payload.message || "Login failed", 'error'); // Error toast
      })

      // Sign In
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user;
        showToast("Signed in successfully", 'success'); // Success toast
      })
      
      // Reset Password
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user;
        showToast("Password reset successfully", 'success'); // Success toast
      })

      // Reset Password Request
      .addCase(resetPasswordReq.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user;
        showToast("Password reset request sent", 'success'); // Success toast
      })

      // OTP Verification
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload.data;
        state.loggedInUser = action.payload.user;
        showToast("OTP verified successfully", 'success'); // Success toast
      })
      
      // User Update
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload.user;
        showToast("User updated successfully", 'success'); // Success toast
      })
      .addCase(userUpdate.rejected, (state) => {
        state.loading = false;
        showToast("User update failed", 'error'); // Error toast
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.authData = null;
        state.loggedInUser = null;
        showToast("Logged out successfully", 'success'); // Success toast
      });
  },
});

export const { setLoggedInUser, clearAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
