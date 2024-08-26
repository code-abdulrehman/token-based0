import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWithToken } from "../../../api/with_token";
import { apiWithoutToken } from "../../../api/without_token";

export const fetchBuyers = createAsyncThunk(
    'buyers/fetchBuyers',
    async (_, { rejectWithValue }) => {
        try {
            // Use apiWithoutToken for login request
            const response = await apiWithToken.get('/api/buyers');

            // Return user data or other information
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateBuyer = createAsyncThunk(
    'buyers/updateBuyer',
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiWithToken.put(`/api/buyer/${id}`, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
export const buyerFav = createAsyncThunk(
    'buysers/buyerFav',
      async ({id,data}, { rejectWithValue }) => {
        try {
            // Use apiWithoutToken for login request
            const response = await apiWithToken.post(`/api/favourite_buyer/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
    });
    export const buyerNote = createAsyncThunk(
      'buyers/buyerNote',
      async ({ id, data }, { rejectWithValue }) => {
        try {
          // Check if id or data is undefined or null
          if (!id || !data) {
            throw new Error("ID or data is missing");
          }
    
          const response = await apiWithToken.post(`/api/buyer_note/${id}`, { content: data });
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
        }
      }
    );
    