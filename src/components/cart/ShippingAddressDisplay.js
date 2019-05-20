import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Api } from "../../api";

class ShippingAddressDisplayComponent extends Component {
  state = {
    shippingCities: []
  };

  render() {
    const cart = this.props.cart;
    const formValues = this.props.formValues || {};

    if (!cart || !cart.requireShippingAddress) {
      return null;
    }

    return (
      <Fragment>
        <div className="silver-bg p-3 d-flex flex-row align-items-center ">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/box.png"}
            className="contain-img mr-2"
            height="30"
          />
          <h6 className="dark-text small mb-0">بيانات التوصيل</h6>
        </div>
        <div className="pt-4">
          <ul className="list-unstyled pl-4 pr-4 mb-0">
            <li className="dark-silver-text small">
              اسم المستلم: {formValues.recipient}
            </li>
            <li className="dark-silver-text small">
              رقم هاتف المستلم: {formValues.number}
            </li>
            <li className="dark-silver-text small">
              المدينة: {formValues.city}
            </li>
            <li className="dark-silver-text small">
              العنوان: {formValues.address}
            </li>
          </ul>
          <hr />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    formValues: state.form.cart && state.form.cart.values
  };
}

export const ShippingAddressDisplay = connect(mapStateToProps)(
  ShippingAddressDisplayComponent
);
