import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWithToken } from "../../../api/with_token";

export const fetchBuyers = createAsyncThunk(
  'buyers/fetchBuyers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiWithToken.get('/api/buyers');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleBuyer = createAsyncThunk(
  'buyers/fetchSingleBuyer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiWithToken.get(`/api/buyer/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBuyer = createAsyncThunk(
  'buyers/createBuyer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiWithToken.post('/api/buyer/', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const buyerUpdate = createAsyncThunk(
  'buyers/buyerUpdate',
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
  'buyers/buyerFav',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiWithToken.post(`/api/favourite_buyer/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const buyerNote = createAsyncThunk(
  'buyers/buyerNote',
  async ({ id, data }, { rejectWithValue }) => {
    try {
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
