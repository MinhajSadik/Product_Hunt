import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./../api";

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
      return data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.getProductDetails(id);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
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
    [getProductDetails.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productDetails = payload;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
