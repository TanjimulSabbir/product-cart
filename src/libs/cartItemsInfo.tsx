import { RootState } from '../redux/store.ts';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
