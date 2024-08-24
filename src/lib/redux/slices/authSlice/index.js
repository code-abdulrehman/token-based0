import { createSlice } from "@reduxjs/toolkit";
import { loginUser, userProfile, userUpdate } from "./apis";

const initialState = {
    authData: null,
    loggedInUser: null,
    loading: false,
  }; 
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
    }
})

export const authReducer = authSlice.reducer;