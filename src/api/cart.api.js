import { getAuthenticatedAxios, getDataFromResponse } from "./helpers";

export const CartApiEndpoints = {
  getCart: () =>
    getAuthenticatedAxios()
      .get("cart")
      .then(getDataFromResponse),

  addCoupon: coupon =>
    getAuthenticatedAxios()
      .post("cart/coupons", { coupon })
      .then(getDataFromResponse),

  removeCoupon: coupon =>
    getAuthenticatedAxios()
      .delete(`cart/coupons/${coupon}`)
      .then(getDataFromResponse),

  removeCartItem: item =>
    getAuthenticatedAxios()
      .delete(`cart/items/${item.id}`)
      .then(getDataFromResponse),

  updateCartItem: (item, data) =>
    getAuthenticatedAxios()
      .put(`cart/items/${item.id}`, data)
      .then(getDataFromResponse),

  getShippingCities: () =>
    getAuthenticatedAxios()
      .get(`cart/shipping_cities`)
      .then(getDataFromResponse),

  uploadBankSlip: file => {
    let data = new FormData();
    data.append("file", file);

    return getAuthenticatedAxios()
      .post(`payments/bank_transfers/uploads`, data)
      .then(getDataFromResponse);
  },

  initiateOnlineCheckout: data =>
    getAuthenticatedAxios()
      .post(`cart/initiate_card_payment`, data)
      .then(getDataFromResponse),

  checkoutWithBankTransfer: data =>
    getAuthenticatedAxios()
      .post(`cart/checkout_with_bank_transfer`, data)
      .then(getDataFromResponse),

  getCities: () =>
    getAuthenticatedAxios()
      .get(`SACities/lookup/all`)
      .then(getDataFromResponse)
};
