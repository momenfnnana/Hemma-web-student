import { GET_CART } from "../actions";

export const cartReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CART:
      if (action.error) return state;

      // sort the cart items before storing them
      const cart = action.payload;
      //cart.items.sort((x, y) => x.id < y.id ? 1 : -1);
      return cart;

    default:
      return state;
  }
};
