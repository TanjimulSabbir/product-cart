import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/Cart/cartSlice.ts"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
