import { createSelector } from "reselect";

//input selector
const selectCart = state => state.cart;


//memoize
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectcartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

//memoize
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
)
