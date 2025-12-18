import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../../types/products-state";
import { Product } from "@/types/product";
import clientaxiosinstance from "@/lib/services/clientaxiosinstance";

const initialState: ProductsState = {
  products: [],
  productsLoading: false,
  productsError: null,
  product: {} as Product,
  productLoading: false,
  productError: null,
  pagination: {
    currentPage: 1,
    total: 0,
    last_page: 0,
  },
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: FormData) => {
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      const response = await clientaxiosinstance.post("/products", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data[0] as Product;
    } catch (error: unknown) {
      throw error;
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (page: number = 1) => {
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      const response = await clientaxiosinstance.get(`/products?page=${page}`);
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProduct.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
        state.productError = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.error.message ?? "An error occurred";
      })
      .addCase(getProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload.data || action.payload;
        state.pagination = {
          currentPage: action.payload.current_page || 1,
          total: action.payload.total || 0,
          last_page: action.payload.last_page || 0,
        };
        state.productsError = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.error.message ?? "An error occurred";
      });
  },
});

export default productsSlice.reducer;
