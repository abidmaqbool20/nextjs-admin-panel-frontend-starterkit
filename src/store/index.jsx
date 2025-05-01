import { configureStore } from "@reduxjs/toolkit";
import seoReducer from "@/slices/seoSlice";
import sidebarSlice from "@/slices/sidebarSlice";
import userSlice from "@/slices/userSlice";
import authSlice from "@/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    pages: seoReducer,
    sidebar: sidebarSlice,
    user: userSlice,
  },
});
