import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Api } from "../../api";
import Cleave from "cleave.js/react";
import Loader from "react-loaders";
import swal from "@sweetalert/with-react";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import "./checkout.styles.sass";

export class OnlinePaymentComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      creditCardType: "",
      creditCardRawValue: "",
      dateRawValue: "",
      cardHolderName: "",
      cvv: "",
      loading: false
    };

    this.onCreditCardChange = this.onCreditCardChange.bind(this);
    this.onCreditCardTypeChanged = this.onCreditCardTypeChanged.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.myFormHandler = this.myFormHandler.bind(this);
  }

  onCreditCardChange(event) {
    this.setState({ creditCardRawValue: event.target.rawValue });
  }

  onCreditCardTypeChanged(type) {
    this.setState({ creditCardType: type });
  }

  onDateChange(event) {
    this.setState({ dateRawValue: event.target.rawValue });
  }

  onNameChange(event) {
    this.setState({ cardHolderName: event.target.value });
  }
  onCodeChange(event) {
    this.setState({ cvv: event.target.value });
  }

  isSubmitButtonDisabled = () => {
    return (
      this.state.creditCardRawValue == "" ||
      this.state.dateRawValue == "" ||
      this.state.cardHolderName == "" ||
      this.state.cvv == ""
    );
  };

  myFormHandler = values => {
    this.setState({ loading: true });
    Api.cart
      .initiateOnlineCheckout({
        callbackUrl: `${window.location.origin}/transactions/{transactionId}`,
        shippingRecipient: this.props.cartValues.shippingRecipient,
        shippingCityId: this.props.cartValues.shippingCityId,
        shippingAddress: this.props.cartValues.shippingAddress,
        shippingPhone: this.props.cartValues.shippingPhone
      })
      .then(result => {
        this.setState({ loading: false });

        // Create and submit the form
        let html = `
          <form id="purchase" style="display: none;" method="POST" action="${
            result.url
          }">
            <input type="hidden" name="MessageID" value="${result.messageID}">
            <input type="hidden" name="TransactionID" value="${
              result.transactionID
            }">
            <input type="hidden" name="MerchantID" value="${result.merchantID}">
            <input type="hidden" name="Amount" value="${result.amount}">
            <input type="hidden" name="CurrencyISOCode" value="${
              result.currencyISOCode
            }">
            <input type="hidden" name="PaymentMethod" value="${
              result.paymentMethod
            }">
            <input type="hidden" name="Language" value="${result.language ||
              ""}">
            <input type="hidden" name="ItemID" value="${result.itemID || ""}">
            <input type="hidden" name="Version" value="${result.version || ""}">
            <input type="hidden" name="Channel" value="${result.channel || ""}">
            <input type="hidden" name="Quantity" value="${result.quantity ||
              ""}">
            <input type="hidden" name="ResponseBackURL" value="${result.responseBackURL ||
              ""}">
            <input type="hidden" name="PaymentDescription" value="${result.paymentDescription ||
              ""}">
            <input type="hidden" name="GenerateToken" value="${result.generateToken ||
              ""}">
            <input type="hidden" name="Token" value="${result.token || ""}">
            <input type="hidden" name="CardNumber" value="${
              this.state.creditCardRawValue
            }">
            <input type="hidden" name="ExpiryDateYear" value="${this.state.dateRawValue.slice(
              -2
            )}">
            <input type="hidden" name="ExpiryDateMonth" value="${this.state.dateRawValue.substring(
              0,
              2
            )}">
            <input type="hidden" name="SecurityCode" value="${this.state.cvv}">
            <input type="hidden" name="CardHolderName" value="${
              this.state.cardHolderName
            }">
            <input type="hidden" name="SecureHash" value="${result.secureHash}">
          </form>
        `;
        document.querySelector("body").innerHTML += html;
        document.getElementById("purchase").submit();
      })
      .catch(error => {
        this.setState({ loading: false });

        switch (error.response.data && error.response.data.error) {
          case "HasPaymentUnderProcessing":
            swal(
              "عفواً",
              "يرجى الانتظار حتى تتمكن من القيام بحركة أخرى",
              "error",
              {
                button: "متابعة"
              }
            );
            break;
          case "Duplicate":
            swal("عفواً", "تم شراء هذه الدورة سابقاً", "error", {
              button: "متابعة"
            });
            break;
          case "ServerError":
            swal("عفواً", "حدث خطأ ما", "error", {
              button: "متابعة"
            });
            break;

          default:
            swal("عفواً", "حدث خطأ ما", "error", {
              button: "متابعة"
            });
            break;
        }
      });
  };
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-center">
          <form className="w-60" onSubmit={handleSubmit(this.myFormHandler)}>
            <div className="row">
              <div className="col-md-8">
                <div>
                  <Cleave
                    placeholder="رقم البطاقة"
                    options={{
                      creditCard: true,
                      onCreditCardTypeChanged: this.onCreditCardTypeChanged
                    }}
                    onChange={this.onCreditCardChange}
                    className="form-control ltr-input position-relative"
                  />
                  {this.state.creditCardType == "mastercard" ? (
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/mastercard.png"
                      }
                      width="30"
                      width="30"
                      className="payment-img"
                    />
                  ) : this.state.creditCardType == "visa" ? (
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/visa.png"}
                      width="30"
                      width="30"
                      className="payment-img"
                    />
                  ) : this.state.creditCardType == "amex" ? (
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/american-express.png"
                      }
                      width="30"
                      width="30"
                      className="payment-img"
                    />
                  ) : this.state.creditCardType == "discover" ? (
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/discover.png"
                      }
                      width="30"
                      width="30"
                      className="payment-img"
                    />
                  ) : null}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <Cleave
                  placeholder="mm/yy"
                  options={{ date: true, datePattern: ["m", "d"] }}
                  className="form-control ltr-input en-input text-center"
                  onChange={this.onDateChange}
                />
              </div>
              <div className="col-md-8">
                <input
                  name="cardHolderName"
                  type="text"
                  className="form-control"
                  placeholder="اسم حامل البطاقة"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  name="cvv"
                  type="text"
                  className="form-control ltr-input en-input text-center"
                  placeholder="CVV"
                  onChange={this.onCodeChange}
                  maxlength="3"
                  pattern="\d{3}"
                />
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-4">
                <button
                  className="btn light-outline-btn w-50"
                  disabled={this.isSubmitButtonDisabled()}
                  style={{ opacity: this.isSubmitButtonDisabled() ? 0.5 : 1 }}
                >
                  {this.state.loading == true ? (
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
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    formValues: state.form.onlinePayment && state.form.onlinePayment.values,
    cartValues: state.form.cart && state.form.cart.values
  };
}

export const OnlinePayment = connect(mapStateToProps)(
  reduxForm({
    form: "onlinePayment",
    destroyOnUnmount: false
  })(withRouter(OnlinePaymentComponent))
);
