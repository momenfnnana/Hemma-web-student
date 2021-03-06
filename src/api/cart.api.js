import { getAuthenticatedAxios, getDataFromResponse } from "./helpers";

export const CartApiEndpoints = {
  getCart: () =>
    getAuthenticatedAxios()
      .get("cart_v2")
      .then(getDataFromResponse),

  addCoupon: coupon =>
    getAuthenticatedAxios()
      .post("cart_v2/coupons", { coupon })
      .then(getDataFromResponse),

  removeCoupon: couponId =>
    getAuthenticatedAxios()
      .delete(`cart_v2/coupons/${couponId}`)
      .then(getDataFromResponse),

  addCourse: courseId =>
    getAuthenticatedAxios()
      .post(`cart_v2/items/courses`, { courseId })
      .then(getDataFromResponse),

  addBooklet: (bookletId, type) =>
    getAuthenticatedAxios()
      .post(`cart_v2/items/booklets`, { bookletId, type })
      .then(getDataFromResponse),
 addBookletForSale: (bookletId, type) =>
      getAuthenticatedAxios()
        .post(`cart_v2/items/bookletsForSale`, { bookletId, type })
        .then(getDataFromResponse),
  addInstallment: (subscriptionId, amount = null) =>
    getAuthenticatedAxios()
      .post(`cart_v2/items/installments`, { subscriptionId, amount })
      .then(getDataFromResponse),

  removeCartItem: itemId =>
    getAuthenticatedAxios()
      .delete(`cart_v2/items/${itemId}`)
      .then(getDataFromResponse),

  setPackageOption: (itemId, value) =>
    getAuthenticatedAxios()
      .put(`cart_v2/items/${itemId}/packageOption`, { value })
      .then(getDataFromResponse),

  setInstallment: (itemId, installment) =>
    getAuthenticatedAxios()
      .put(`cart_v2/items/${itemId}/installment`, { installment })
      .then(getDataFromResponse),

  setBookletType: (bookletId, type) =>
    getAuthenticatedAxios()
      .put(`cart_v2/items/${bookletId}/bookletType`, { type })
      .then(getDataFromResponse),

  updateCartItem: (item, data) =>
    getAuthenticatedAxios()
      .put(`cart/items/${item.id}`, data)
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
      .post(`cart_v2/initiate_card_payment`, data)
      .then(getDataFromResponse),
  initiateTapOnlineCheckout: data =>
      getAuthenticatedAxios()
        .post(`cart_v2/InitiateCardPaymentGateway`, data)
        .then(getDataFromResponse),    
  GetTapPaymentDetailsCheckout: id =>
        getAuthenticatedAxios()
          .post(`cart_v2/GetTapPaymentDetails?chargeId=${id}`)
          .then(getDataFromResponse), 
  getCardType: ()=>
      getAuthenticatedAxios()
        .get(`cart_v2/Get_Card_type`)
        .then(getDataFromResponse),
  checkoutWithBankTransfer: data =>
    getAuthenticatedAxios()
      .post(`cart_v2/checkout_with_bank_transfer`, data)
      .then(getDataFromResponse),

  getCities: () =>
    getAuthenticatedAxios()
      .get(`SACities/lookup/all`)
      .then(getDataFromResponse)
};
