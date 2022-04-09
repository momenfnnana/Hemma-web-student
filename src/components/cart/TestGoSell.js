import React, { useState } from "react";
import { GoSellElements } from "@tap-payments/gosell";
import { Api } from "../../api";
import swal from "@sweetalert/with-react";
import Loader from "react-loaders";

const TestGoSell = (props) => {
  const [loading, setLoading] = useState(false);
  const callbackFunc = (response) => {
    InitiateCardPayment(response);
  };

  const InitiateCardPayment = async (cardData) => {

    let itemDetails = [];
    if (props.cart && props.deliveryData) {
      itemDetails = props.cart.items.map((obj) => ({
        id: obj.id,
        shippingRecipient: props.deliveryData.shippingRecipient,
        shippingCityId: props.deliveryData.shippingCityId,
        shippingAddress: props.deliveryData.shippingAddress,
        shippingPhone: props.deliveryData.shippingPhone,
      }));
    }

    const data = {
      callbackUrl: `${window.location.origin}/transactions`,
      cardData: {
        tapToken: cardData.id,
        epireMonth: cardData.card.exp_month,
        epireYear: cardData.card.exp_year,
        cardOwnerName: cardData.card.name,
      },
      checkoutItemDetails: itemDetails,
    };

    setLoading(true);
    Api.cart
      .initiateTapOnlineCheckout(data)
      .then((res) => {
        if (res.amount === 0) {
          swal("عفواً", "حدث خطأ ما", "error", {
            button: "متابعة",
          });
        }
        if (res?.transaction?.url != undefined) {
          window.location.href = res.transaction.url;
        } else {
          window.location.href = res.redirect.url + "?tap_id=" + res.id;
        }
        setLoading(false);
      })
      .catch((err) => {
        swal("عفواً", err.response.data.error, "error", {
          button: "متابعة",
        });
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: "25px" }}>
      <GoSellElements
        gateway={{
          publicKey: props.tabId,
          language: "ar",
          supportedCurrencies: "all",
          supportedPaymentMethods: ["MADA", "VISA", "MASTERCARD"],
          notifications: "msg",
          callback: callbackFunc,
          labels: {
            cardNumber: "Card Number",
            expirationDate: "MM/YY",
            cvv: "CVV",
            cardHolder: "Name on Card",
            actionButton: "Pay",
          },
          style: {
            base: {
              color: "#535353",
              lineHeight: "18px",
              fontFamily: "sans-serif",
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "rgba(0, 0, 0, 0.26)",
                fontSize: "15px",
              },
            },
            invalid: {
              color: "red",
              iconColor: "#fa755a ",
            },
          },
        }}
      />

      <p id="msg"></p>

      <div className="col-md-12 d-flex justify-content-center mt-4">
        <button
          className="btn light-outline-btn w-50"
          onClick={() => {
            GoSellElements.submit();
          }}
        >
          {loading == true ? <Loader type="ball-clip-rotate" /> : "إتمام الدفع"}
        </button>
      </div>
    </div>
  );
};

export default TestGoSell;
