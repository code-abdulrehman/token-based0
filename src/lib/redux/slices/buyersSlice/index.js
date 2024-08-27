import { createSlice } from "@reduxjs/toolkit";
import { 
  buyerFav, 
  buyerNote, 
  createBuyer, 
  fetchBuyers, 
  fetchSingleBuyer, 
  buyerUpdate 
} from "./apis";
import { showToast } from './../../../../Components/Common/Toast'; // Adjust import as necessary

const initialState = {
  byId: {},
  data: [],
  loading: false,
  error: null,
  status: 'idle',
};

export const buyersSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {
    updateBuyer: (state, action) => {
      const { id, data } = action.payload;
      const index = state.data.findIndex(buyer => buyer.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...data };
      } else {
        state.data.push({ id, ...data });
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Buyers
    builder
      .addCase(fetchBuyers.pending, (state) => {
        state.loading = true;
        showToast("Fetching buyers...", 'info'); // Info toast
      })
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        showToast("Buyers fetched successfully", 'success'); // Success toast
      })
      .addCase(fetchBuyers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        showToast(action.error.message || "Failed to fetch buyers", 'error'); // Error toast
      })

      // Buyer Favorite
      .addCase(buyerFav.fulfilled, (state, action) => {
        state.data = state.data.map(buyer =>
          buyer.id === action.payload.id ? action.payload : buyer
        );
        state.loading = false;
        showToast("Buyer favorited successfully", 'success'); // Success toast
      })

      // Buyer Note
      .addCase(buyerNote.fulfilled, (state, action) => {
        state.data = state.data.map(buyer =>
          buyer.id === action.payload.id ? action.payload : buyer
        );
        state.loading = false;
        showToast("Note added to buyer successfully", 'success'); // Success toast
      })

      // Create Buyer
      .addCase(createBuyer.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.loading = false;
        showToast("Buyer created successfully", 'success'); // Success toast
      })

      // Fetch Single Buyer
      .addCase(fetchSingleBuyer.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
        state.loading = false;
        showToast("Buyer details fetched successfully", 'success'); // Success toast
      })

      // Update Buyer
      .addCase(buyerUpdate.fulfilled, (state, action) => {
        state.data = state.data.map(buyer =>
          buyer.id === action.payload.id ? action.payload : buyer
        );
        state.loading = false;
        showToast("Buyer updated successfully", 'success'); // Success toast
      });
  },
});

export const { updateBuyer } = buyersSlice.actions;
export const buyersReducer = buyersSlice.reducer;

