import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";


export function createStore() {
    const store = configureStore({
      reducer: {
        auth: authReducer
      }
    });
  
    return store;
  }
  

  
  export const store = createStore();
  