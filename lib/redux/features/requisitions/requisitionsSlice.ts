import { createSlice } from "@reduxjs/toolkit";

const initialState: RequisitionsState = {
  requisition: null,
  requisitionLoading: false,
  requisitionError: null,
  requisitions: [],
  requisitionsLoading: false,
  requisitionsError: null,
};

const requisitionsSlice = createSlice({
  name: "requisitions",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default requisitionsSlice.reducer;
