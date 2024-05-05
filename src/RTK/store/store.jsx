import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import { getProductsSlice } from "../slices/getProductsApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [getProductsSlice.reducerPath]: getProductsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getProductsSlice.middleware),
});

setupListeners(store.dispatch);
