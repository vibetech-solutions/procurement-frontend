import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import merchantsReducer from "./features/merchants/merchantSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      merchants: merchantsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
