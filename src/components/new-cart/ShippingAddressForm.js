import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import { textareaField } from "../shared/inputs/textareaField";
import { Api } from "../../api";
import { withRouter } from "react-router-dom";
import { selectField } from "../../components/shared/inputs/selectField";

class ShippingAddressFormComponent extends Component {
  state = {
    shippingCities: []
  };

  componentDidMount() {
    Api.cart
      .getShippingCities()
      .then(cities => this.setState({ shippingCities: cities }));
  }

  handleSubmit(event) {
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
        <div className="off-white-bg w-100 border-top-0 border-bottom radius-top-0">
          <div className="p-4">
            <div className="d-flex flex-row align-items-center mb-3">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/box.png"}
                className="contain-img mr-2"
                height="30"
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
              />
            </div>
            <div className="form-group">
              <Field
                fieldName="shippingPhone"
                name="shippingPhone"
                component={phoneField}
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
              />
            </div>
            <div className="form-group">
              {/* <select
                name="shippingCityId"
                // component={selectField}
                className="form-control"
              >
              </select> */}
              <Field
                component={selectField}
                className="form-control"
                // validate={required}
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
              />
            </div>
          </div>
        </div>
      </form>
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
