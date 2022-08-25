import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./../api";

// const Base_Url = "http://localhost:5000";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    { keyword = "", currentPage = 1, price = [0, 2500], category, ratings = 0 },
    { rejectWithValue }
  ) => {
    try {
      let link = `?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (category) {
        link = `?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await api.getProducts(link);
      // console.log("data", data);
      return data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    error: "",
    productDetails: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
