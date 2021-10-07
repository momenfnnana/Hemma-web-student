import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import { textareaField } from "../shared/inputs/textareaField";
import { Api } from "../../api";
import { withRouter } from "react-router-dom";
import { selectField } from "../shared/inputs/selectField";
import swal from "@sweetalert/with-react";
import {Formik} from 'formik'

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");
const phoneValue = value => {
  value = value || "";
  const trimmed = value.replace(/\s/g, "");
  const valid = /^05\d{8}$/.test(trimmed);

  return valid ? undefined : "رقم الهاتف يجب أن يحتوي 10 ارقام وان يبدأ ب05";
};
class OnlineShippingAddressFormComponent extends Component {
  state = {
    shippingCities: [],
    shippingRecipient:null,
    shippingPhone:null,
    shippingCityId:null,
    shippingAddress:null,
    isDisabled:true,
  };

  componentDidMount() {
    Api.cart
      .getCities()
      .then(cities => this.setState({ shippingCities: cities }));
  }
  onChangeVal =(key,e)=>{
    const value = e.target.value;
    this.setState({[key] :value });
    this.isSubmitButtonDisabled();
  };

  isSubmitButtonDisabled = () => {
    if(this.state.shippingRecipient &&
        this.state.shippingPhone &&
        this.state.shippingCityId &&
        this.state.shippingAddress)
    {
      this.setState({isDisabled :!this.state.isDisabled})
    }
  };


  confirmationPopup =(e) => {
    e.preventDefault();
    swal(
        `هل أنت متأكد من هذا الرقم (${this.state.shippingPhone})؟`,
        {
          buttons: {
            ok: "تأكيد",
            cancel: "الغاء",
          },
        }
    ).then((value) => {
      switch (value) {
        case "ok":
          this.props.onFillShippingAddress()

        default:
          break;
      }
    });
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
      <Formik>

      <form>
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
                validate={required}
                onChange={(e)=>this.onChangeVal('shippingRecipient',e)}
                value={this.state.shippingRecipient}
                />
            </div>
            <div className="form-group">
              <Field
                fieldName="shippingPhone"
                name="shippingPhone"
                component={inputField}
                className="form-control border-left-0 pl-0 ltr-input en-input"
                validate={[required, phoneValue]}
                placeholder="051 234 5678"
                type="number"
                onChange={(e)=>this.onChangeVal('shippingPhone',e)}
                value={this.state.shippingPhone}
                />
            </div>
            <div className="form-group">
              <Field
                component={selectField}
                className="form-control"
                validate={required}
                name="shippingCityId"
                onChange={(e)=>this.onChangeVal('shippingCityId',e)}
                value={this.state.shippingCityId}
                >
                <option value="" selected disabled>
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
                onChange={(e)=>this.onChangeVal('shippingAddress',e)}
                value={this.state.shippingAddress}
                />
            </div>
            <button
                className="btn light-outline-btn w-100 ml-1"
                disabled={this.state.isDisabled}
                onClick={this.confirmationPopup}
                >
              تأكيد بيانات التوصيل
            </button>
          </div>
        </div>
      </form>
              </Formik>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    formValues: state.form.onlinePayment && state.form.onlinePayment.values
  };
}

export const OnlineShippingAddressForm = connect(mapStateToProps)(
  reduxForm({
    form: "onlinePayment",
    destroyOnUnmount: false
  })(withRouter(OnlineShippingAddressFormComponent))
);
