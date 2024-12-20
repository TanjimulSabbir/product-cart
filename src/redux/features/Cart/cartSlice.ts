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
        }

    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
