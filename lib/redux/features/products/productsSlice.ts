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
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Product) => {
    await clientaxiosinstance.get("/sanctum/csrf-cookie");
    const response = await clientaxiosinstance.post("/api/products", product);
    return response.data as Product;
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
      });
  },
});

export default productsSlice.reducer;
