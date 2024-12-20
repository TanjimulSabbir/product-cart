// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItemIndex = state.items.findIndex(
                (item) =>
                    item.id === action.payload.id &&
                    item.size === action.payload.size &&
                    item.color === action.payload.color
            );

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex] = action.payload;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<CartItem>) {
            state.items = state.items.filter(item =>
                item.id !== action.payload.id ||
                item.color !== action.payload.color ||
                item.size !== action.payload.size
            );
        },
        increaseQuantity: (state, action: PayloadAction<{ id: number; color: string; size: string }>) => {
            const { id, color, size } = action.payload;
            const item = state.items.find((item) => item.id === id && item.color === color && item.size === size);
            if (item) item.quantity += 1;
        },

        decreaseQuantity: (state, action: PayloadAction<{ id: number; color: string; size: string }>) => {
            const { id, color, size } = action.payload;
            const item = state.items.find((item) => item.id === id && item.color === color && item.size === size);
            if (item) item.quantity = Math.max(item.quantity - 1, 1);
        },


    },
});

export const { addToCart, removeFromCart,increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
