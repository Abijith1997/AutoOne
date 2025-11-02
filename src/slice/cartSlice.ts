// src/store/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CarProps } from "../types";

interface CartState {
  items: CarProps[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CarProps>) => {
      if (
        !state.items.find(
          (item) => item.stockNumber === action.payload.stockNumber
        )
      ) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.stockNumber !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
