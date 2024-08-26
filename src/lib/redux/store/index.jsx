import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
import { buyersReducer } from "../slices/buyersSlice";


export function createStore() {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        buyers: buyersReducer
      }
    });
  
    return store;
  }
  

  
  export const store = createStore();
  