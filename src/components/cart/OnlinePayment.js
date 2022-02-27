import React, { useState, useEffect, useRef } from "react";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Api } from "../../api";
import { apiBaseUrl } from "../../api/helpers";
import axios from "axios";
import Cleave from "cleave.js/react";
import Loader from "react-loaders";
import swal from "@sweetalert/with-react";
import CryptoJS from "crypto-js";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import "./checkout.styles.sass";

const OnlinePayment = (props) => {
  
  const [cardData, setCardData] = useState({
    encriptedCardNumber: "",
    epireMonth: 0,
    epireYear: 0,
    encriptedCVC: "",
    cardOwnerName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const InitiateCardPayment = () => {
    const itemDetails = [];
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
      cardData: cardData,
      checkoutItemDetails: itemDetails,
    };
    
    setLoading(true);
    Api.cart.initiateTapOnlineCheckout(data)
      .then((res) => {
        if(res.amount === 0) {
          swal("عفواً", "حدث خطأ ما", "error", {
            button: "متابعة",
          });
        }
        window.location.href = res.transaction.url;
        console.log(res.transaction.url);
        setLoading(false);
      })
      .catch((err) => {
        swal("عفواً", "حدث خطأ ما", "error", {
          button: "متابعة",
        });
        setError(err);
        setLoading(false);
      });
  };

  const onCreditCardTypeChanged = (type) => {
    console.log(type);
  };

  const encryptString = (string) => {
    var key = CryptoJS.enc.Utf8.parse("HV_iyU70r|1eSo9/");
    var iv = CryptoJS.enc.Utf8.parse("HV_iyU70r|1eSo9/");
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(string), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    InitiateCardPayment();
  };
  const IsSubmitButtonDisabled = () => {
    // check for errors
    const disabled =
      cardData.cardOwnerName == "" ||
      cardData.encriptedCVC == "" ||
      cardData.encriptedCardNumber == "" ||
      cardData.epireMonth == 0 ||
      cardData.epireYear == 0;

    return disabled;
  };
  return (
    <div className="row mt-5">
      <div className="col-12 mada-img">
        {props.paymentMethods.length > 0 &&
          props.paymentMethods.map((item) => {
            if (item.id !== 4) {
              return (
                <img
                  className="padding-img"
                  src={process.env.PUBLIC_URL + "/assets/" + item.imagePath}
                  width="80"
                  height="80"
                  key={item.id}
                />
              );
            }
          })}
      </div>
      <div className="col-12 d-flex justify-content-center">
        <form className="w-60" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <div>
                <Cleave
                  placeholder="رقم البطاقة"
                  options={{
                    creditCard: true,
                    onCreditCardTypeChanged: onCreditCardTypeChanged,
                  }}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      encriptedCardNumber: encryptString(e.target.value),
                    })
                  }
                  className="form-control ltr-input position-relative"
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <Cleave
                placeholder="mm/yy"
                options={{ date: true, datePattern: ["m", "d"] }}
                className="form-control ltr-input en-input text-center"
                onChange={(e) => {
                  const array = e.target.value.split("/");
                  setCardData({
                    ...cardData,
                    epireMonth: array[0],
                    epireYear: array[1],
                  });
                }}
              />
            </div>
            <div className="col-md-8">
              <input
                name="cardHolderName"
                type="text"
                className="form-control"
                placeholder="اسم حامل البطاقة"
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardOwnerName: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <input
                name="cvv"
                type="text"
                className="form-control ltr-input en-input text-center"
                placeholder="CVV"
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    encriptedCVC: encryptString(e.target.value),
                  })
                }
                maxlength="3"
                pattern="\d{3}"
              />
            </div>
            <div className="col-md-12 d-flex justify-content-center mt-4">
              <button
                className="btn light-outline-btn w-50"
                disabled={() => IsSubmitButtonDisabled()}
                style={{ opacity: IsSubmitButtonDisabled() ? 0.5 : 1 }}
              >
                {loading == true ? (
                  <Loader type="ball-clip-rotate" />
                ) : (
                  "إتمام الدفع"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlinePayment;
