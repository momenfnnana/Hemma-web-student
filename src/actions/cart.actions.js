import { Api } from "../api";

export const GET_CART = "getCart";
export const ADD_COUPON = "addcoupon";
export const REMOVE_COUPON = "removeCoupon";
export const REMOVE_CART_ITEM = "removeCartItem";
export const UPDATE_CART_ITEM = "updateCartItem";
export const CHECKOUT_WITH_BANK_TRANSFER = "checkoutWithBankTransfer";
export const UPLOAD_BANK_SLIP = "uploadBankSlip";

export const getCart = () => {
  return {
    type: GET_CART,
    payload: Api.cart.getCart()
  };
};

export const addCoupon = coupon => {
  return {
    type: ADD_COUPON,
    payload: Api.cart.addCoupon(coupon)
  };
};

export const removeCoupon = coupon => {
  return {
    type: REMOVE_COUPON,
    payload: Api.cart.removeCoupon(coupon)
  };
};

export const removeCartItem = item => {
  return {
    type: REMOVE_CART_ITEM,
    payload: Api.cart.removeCartItem(item)
  };
};

export const updateCartItem = (item, data) => {
  return {
    type: UPDATE_CART_ITEM,
    payload: Api.cart.updateCartItem(item, data)
  };
};

export const checkoutWithBankTransfer = data => {
  return {
    type: CHECKOUT_WITH_BANK_TRANSFER,
    payload: Api.cart.checkoutWithBankTransfer(data)
  };
};

export const uploadBankSlip = bankSlipFile => {
  return {
    type: UPLOAD_BANK_SLIP,
    payload: Api.cart.uploadBankSlip(bankSlipFile)
  };
};
