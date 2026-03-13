import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  products: [],
  productsLoading: false,
  productsError: null,
  services: [],
  servicesLoading: false,
  servicesError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default cartSlice.reducer;
