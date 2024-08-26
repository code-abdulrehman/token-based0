import { createSlice } from "@reduxjs/toolkit";
import { buyerFav, buyerNote, fetchBuyers } from "./apis";

const initialState = {
  error: null,
  data: [], // Array to hold buyer data
  loading: false,
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
        // Update the specific field in the buyer object
        state.data[index] = {
          ...state.data[index],
          ...data, // Merge the existing buyer data with the new data
        };
        console.log(state.data[index], "local"); 
      } else {
        state.data.push({ id, ...data });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBuyers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(buyerFav.fulfilled, (state, action) => {
        // console.log("Buyer Fav updated:", action.payload);
        state.data = state.data.map(buyer =>
            buyer.id === action.payload.id ? action.payload : buyer
        );
        state.loading = false;
    })
      .addCase(buyerNote.fulfilled, (state, action) => {
        // console.log("Buyer note updated:", action.payload);
        state.data = state.data.map(buyer =>
            buyer.id === action.payload.id ? action.payload : buyer
        );
        state.loading = false;
    })
    
  },
});

export const { updateBuyer } = buyersSlice.actions;
export const buyersReducer = buyersSlice.reducer;
