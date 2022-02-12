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
import publicIp from "react-public-ip";
import CryptoJS from "crypto-js";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import "./checkout.styles.sass";

const OnlinePayment = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [tapKey, setTapKey] = useState(null);
  const [tokenRequest, setTokenRequest] = useState({
    number: 0,
    exp_month: 0,
    exp_year: 0,
    cvc: 0,
    name: "",
  });

  useEffect(() => {
    GetPaymentMethods();
  }, []);

  const GetPaymentMethods = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${apiBaseUrl}/cart_v2/GetDefaultPaymentGatewayAndPaymentMethods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          if (
            response.data.data.defaultGatewaySetting.defaultGatewayName.toLowerCase() ===
            "tap"
          ) {
            setPaymentMethods(response.data.data.paymentMethods);
            setTapKey(
              response.data.data.defaultGatewaySetting.publishableApiKey
            );
          }
        }
      });
  };

  const getValidatedClassName = (name, baseClass) => {
    const errorClass = "border-danger";
    const resultClassName = this.state.errors?.[name]
      ? [baseClass, errorClass].join(" ")
      : baseClass;
    return resultClassName;
  };

  const onCreditCardTypeChanged = (type) => {
    console.log(type);
  };

  const encryptString = (string) => {
    const secretKey = "HV_iyU70r|1eSo9/";
    return CryptoJS.AES.encrypt(string, secretKey).toString();
  };

  const handleSubmit = () => {
    debugger;
    axios
      .post("https://api.tap.company/v2/tokens", tokenRequest, {
        headers: { Authorization: `Bearer ${tapKey}` },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="row mt-5">
      <div className="col-12 mada-img">
        {paymentMethods.length > 0 &&
          paymentMethods.map((item) => {
            if (item.id !== 4) {
              return (
                <img
                  className="padding-img"
                  src={process.env.PUBLIC_URL + item.imagePath}
                  width="80"
                  height="80"
                  key={item.id}
                />
              );
            }
          })}
      </div>
      <div className="col-12 d-flex justify-content-center">
        <form className="w-60" onSubmit={() => handleSubmit()}>
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
                    setTokenRequest({
                      ...tokenRequest,
                      number: encryptString(e.target.value),
                    })
                  }
                  className={() =>
                    getValidatedClassName(
                      "credit",
                      "form-control ltr-input position-relative"
                    )
                  }
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
                  setTokenRequest({
                    ...tokenRequest,
                    exp_month: array[0],
                    exp_year: array[1],
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
                  setTokenRequest({
                    ...tokenRequest,
                    name: e.target.value,
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
                  setTokenRequest({
                    ...tokenRequest,
                    cvc: encryptString(e.target.value),
                  })
                }
                maxlength="3"
                pattern="\d{3}"
              />
            </div>
            <div className="col-md-12 d-flex justify-content-center mt-4">
              <button
                className="btn light-outline-btn w-50"
                // disabled={this.isSubmitButtonDisabled()}
                // style={{ opacity: this.isSubmitButtonDisabled() ? 0.5 : 1 }}
              >
                إتمام الدفع
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlinePayment;
