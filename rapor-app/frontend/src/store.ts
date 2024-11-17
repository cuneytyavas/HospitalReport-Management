import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./features/recordSlice";
import technicianReducer from "./features/technicianSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    record: recordReducer,
    technician: technicianReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
