"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/Redux/Slice/cartSlice";

const store =  configureStore({
    reducer: {
        cart: cartReducer,
    }
});

export default store;