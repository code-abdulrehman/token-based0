import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWithToken } from "../../../api/with_token";
import { apiWithoutToken } from "../../../api/without_token";
import { reomoveToken, saveTokenWithExpiration } from "../../../helper";
import { data } from "autoprefixer";

const expirationMinutes = 120;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiWithoutToken.post('/users/log_in', credentials);
      const { token } = response.data.data; // Adjust based on your API response
      saveTokenWithExpiration(token, expirationMinutes);
      return data; // Return both token and user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signInUser = createAsyncThunk(
  'user/signInUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiWithoutToken.post('/users/register', credentials);
      const { token } = response.data.data; // Adjust based on your API response
      saveTokenWithExpiration(token, expirationMinutes);
      return data; // Return both token and user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPasswordReq = createAsyncThunk(
  'user/resetPasswordReq',
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiWithoutToken.post('/users/reset_password', email);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const otpVerify = createAsyncThunk(
  'user/otpVerify',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiWithoutToken.post('/users/reset_password/verify_token', data);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiWithoutToken.put('/users/reset_password/', data);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userUpdate = createAsyncThunk(
  'user/userUpdate',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiWithToken.post('/users/profile', data); // Use apiWithToken for authenticated requests
      return response.data; // Adjust based on your API response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiWithToken.delete('/users/log_out');
      reomoveToken()
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
