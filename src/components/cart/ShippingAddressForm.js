import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { textareaField } from "../shared/inputs/textareaField";
import { Api } from "../../api";
import { withRouter } from "react-router-dom";
import { selectField } from "../../components/shared/inputs/selectField";

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");

class ShippingAddressFormComponent extends Component {
  state = {
    shippingCities: []
  };

  componentDidMount() {
    Api.cart
      .getCities()
      .then(cities => this.setState({ shippingCities: cities }));
  }

  /**
   * Helper to render the cities list
   */
  renderCities() {
    return this.state.shippingCities.map(city => (
      <option key={city.id} value={city.id}>
        {city.nameAr}
      </option>
    ));
  }

  render() {
    const cart = this.props.cart;

    if (!cart || !cart.requireShippingAddress) {
      return null;
    }

    return (
      <>
        <form>
          <div className="off-white-bg w-100 border-top-0 border-bottom radius-top-0">
            <div className="p-4">
              <div className="d-flex flex-row align-items-center mb-3">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/box.png"}
                  className="contain-img mr-2"
                  height="30"
                  alt="box"
                />
                <h6 className="dark-text small mb-0">بيانات التوصيل</h6>
              </div>
              <div className="form-group">
                <Field
                  name="shippingRecipient"
                  type="text"
                  component={inputField}
                  className="form-control border-left-0 pl-0"
                  placeholder="اسم المستلم"
                  validate={required}
                />
              </div>
              <div className="form-group">
                <Field
                  fieldName="shippingPhone"
                  name="shippingPhone"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input en-input"
                  validate={required}
                  placeholder="051 234 5678"
                  type="number"
                />
              </div>
              <div className="form-group">
                <Field
                  component={selectField}
                  className="form-control"
                  validate={required}
                  name="shippingCityId"
                >
                  <option selected disabled>
                    اختر المدينة
                  </option>
                  {this.renderCities()}
                </Field>
              </div>
              <div className="form-group mb-0">
                <Field
                  className="form-control small"
                  placeholder="عنوان التوصيل"
                  rows="6"
                  name="shippingAddress"
                  component={textareaField}
                  validate={required}
                />
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    formValues: state.form.cart && state.form.cart.values
  };
}

export const ShippingAddressForm = connect(mapStateToProps)(
  reduxForm({
    form: "cart",
    destroyOnUnmount: false
  })(withRouter(ShippingAddressFormComponent))
);
