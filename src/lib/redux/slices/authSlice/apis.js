import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWithToken } from "../../../api/with_token";
import { apiWithoutToken } from "../../../api/without_token";

import { saveTokenWithExpiration } from "../../../helper";
const expirationMinutes = 120;

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            // Use apiWithoutToken for login request
            const response = await apiWithoutToken.post('/users/log_in', credentials);
            // // Assuming the response contains a token
            const { token } = response.data.data;
            // console.log(token)
            // // Save token to local storage or session storage
            saveTokenWithExpiration(token, expirationMinutes);
            // Return user data or other information
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userUpdate = createAsyncThunk(
    'user/userUpdate',
    async (data, { rejectWithValue }) => {
        try {
            // Use apiWithoutToken for login request
            const response = await apiWithoutToken.post('/users/profile', data);
            // Assuming the response contains a token
            const { token } = response.data;
            // Save token to local storage or session storage
            saveTokenWithExpiration(token, expirationMinutes);
            // Return user data or other information
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userProfile = createAsyncThunk(
    'user/userProfile',
    async (id, { rejectWithValue }) => {
        try {
            // Use apiWithoutToken for login request
            const response = await apiWithToken.get(`/user/${id}`);
            // Return user data or other information
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);