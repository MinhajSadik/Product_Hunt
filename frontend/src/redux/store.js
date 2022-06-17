import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/productSlice";
import UserReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    products: ProductReducer,
  },
});
