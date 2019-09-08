import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class OnlinePaymentComponent extends Component {
  render() {
    return (
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-center">
          <form className="w-60">
            <div className="row">
              <div className="col-md-4">
                <Field
                  name="expiry"
                  type="number"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input en-input"
                  placeholder="23 / 45"
                />
              </div>
              <div className="col-md-8">
                <Field
                  name="card"
                  type="number"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input en-input"
                  placeholder="5321 1234 8774 2345"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/mastercard.png"
                    }
                    width="20"
                    width="20"
                  />
                </Field>
              </div>
              <div className="col-md-12">
                <Field
                  name="cardHolderName"
                  type="number"
                  component={inputField}
                  className="form-control border-left-0 pl-0"
                  placeholder="اسم حامل البطاقة"
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="cvv"
                  type="number"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input en-input"
                  placeholder="CVV2"
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="zipCode"
                  type="number"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input en-input"
                  placeholder="ZIP CODE"
                />
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-3">
                <button className="btn light-outline-btn w-50">
                  إتمام الدفع
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
    formValues: state.form.cart && state.form.cart.values
  };
}

export const OnlinePayment = connect(mapStateToProps)(
  reduxForm({
    form: "cart",
    destroyOnUnmount: false
  })(withRouter(OnlinePaymentComponent))
);
