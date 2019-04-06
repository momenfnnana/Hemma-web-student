import { GET_CART, ADD_COUPON, REMOVE_COUPON, REMOVE_CART_ITEM, UPDATE_CART_ITEM } from "../actions";

export const cartReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CART:
    case ADD_COUPON:
    case REMOVE_COUPON:
    case REMOVE_CART_ITEM:
    case UPDATE_CART_ITEM:
      if (action.error) return state;

      // sort the cart items before storing them
      const cart = action.payload;
      cart.items.sort((x, y) => x.id < y.id ? 1 : -1);
      return cart;

    default:
      return state;
  }
};
