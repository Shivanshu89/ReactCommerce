import { createSelector } from "reselect";

//input selector
const selectCart = state => state.cart;


//memoize
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

//memoize
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
);
