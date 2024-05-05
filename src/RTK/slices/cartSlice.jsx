import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.find((item) => {
        return item.id === action.payload.id;
      });

      !isExist && state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => {
        // console.log(item, "item");
        return item.id !== action.payload;
      });
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
