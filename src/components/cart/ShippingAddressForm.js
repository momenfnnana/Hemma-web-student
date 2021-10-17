import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../shared/inputs/inputField";
import { textareaField } from "../shared/inputs/textareaField";
import { Api } from "../../api";
import { withRouter } from "react-router-dom";
import { selectField } from "../../components/shared/inputs/selectField";
import swal from "@sweetalert/with-react";
import * as yup from "yup";
import { Formik } from "formik";

const mobileError = "رقم الهاتف يجب أن يحتوي 10 ارقام وان يبدأ ب05";
const requiredError = "هذا الحقل مطلوب";

const required = (value) => (value ? undefined : "يجب تعبئة هذه الخانة");

const phoneValue = (value) => {
  value = value || "";
  const trimmed = value.replace(/\s/g, "");
  const valid = /^05\d{8}$/.test(trimmed);

  return valid ? undefined : "رقم الهاتف يجب أن يحتوي 10 ارقام وان يبدأ ب05";
};

let schema = yup.object().shape({
  shippingRecipient: yup.string("").required(requiredError),
  shippingPhone: yup
    .string()
    .required(requiredError)
    .matches(/^05\d{8}$/, mobileError),
  shippingCityId: yup.string().required(requiredError),
  shippingAddress: yup.string().required(requiredError),
});

class ShippingAddressFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingCities: [],
      values: {
        shippingRecipient: "",
        shippingPhone: "",
        shippingCityId: "",
        shippingAddress: "",
      },
      isDisabled: true,
      errors: {},
    };
  }

  componentDidMount() {
    Api.cart
      .getCities()
      .then((cities) => this.setState({ shippingCities: cities }));
  }

  onChangeVal = (key, e) => {
    const value = e.target.value;
    const newValues = {
      ...this.state.values,
      [key]: value,
    };
    // this.setState({values : newValues },()=>{
    //   schema.validate({shippingAddress : 'lfkdnfk'}).then(()=>{
    //     this.setState({errors :{
    //       ...this.state.errors,
    //       [key] : ''
    //     }})
    //   }).catch(err =>{
    //     console.log({err : err.errors?.[0]});
    //     this.setState({errors :{
    //       ...this.state.errors,
    //       [key] : err.errors?.[0] || ''
    //     }})
    //   })
    // });
    this.isSubmitButtonDisabled();
  };

  onBlur(name) {
    const inputData = {
      [name]: true,
    };
    this.setState({
      touched: {
        ...this.state.touched,
        ...inputData,
      },
    });
  }

  paymentAllowPopup() {
    swal("بامكانك ادخال بيانات الدفع لتأكيد الاشتراك بشكل كامل", {
      buttons: {
        ok: "تأكيد",
      },
    }).then((value) => {
      switch (value) {
        case "ok":
          this.props.onFillShippingAddress(this.state.values);
        default:
          break;
      }
    });
  }

  isSubmitButtonDisabled = () => {
    if (
      this.state.shippingRecipient &&
      this.state.shippingPhone &&
      this.state.shippingCityId &&
      this.state.shippingAddress
    ) {
      this.setState({ isDisabled: !this.state.isDisabled });
    }
  };

  validate(name, value) {}

  confirmationPopup = (e, values) => {
    e.preventDefault();
    this.setState({ values }, () => {
      swal(
     /*   `لا يمكن الانسحاب
        من الدورة بعد طلب الملزمة
        */
        `بعد طلب الملزمة
        غير مسموح بالانسحاب من الدورة
        هل أنت متأكد من هذا الرقم  (${this.state.values?.shippingPhone})؟`,
        {
          buttons: {
            ok: "تأكيد",
            cancel: "الغاء",
          },
        }
      ).then((value) => {
        switch (value) {
          case "ok":
            setTimeout(() => this.paymentAllowPopup(), 700);
          default:
            break;
        }
      });
    });
  };
  /**
   * Helper to render the cities list
   */
  renderCities() {
    return this.state.shippingCities.map((city) => (
      <option key={city.id} value={city.id}>
        {city.nameAr}
      </option>
    ));
  }

  isTouched(name) {
    return this.state.touched?.[name];
  }

  getMeta(name) {
    return {
      error: this.state.errors?.[name],
      touched: this.isTouched(name),
    };
  }

  render() {
    const cart = this.props.cart;

    if (!cart || !cart.requireShippingAddress) {
      return null;
    }

    return (
      <>
        <Formik
          initialValues={{
            ...this.state.values,
          }}
          validationSchema={schema}
        >
          {({
            errors,
            touched,
            setFieldValue,
            setTouched,
            values,
            setFieldTouched,
          }) => (
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
                      onBlur={() => setFieldTouched("shippingRecipient", true)}
                      meta={{
                        error: errors?.["shippingRecipient"],
                        touched: touched?.["shippingRecipient"],
                      }}
                      value={values?.shippingRecipient}
                      onChange={({ target: { value } }) =>
                        setFieldValue("shippingRecipient", value)
                      }
                      className="form-control border-left-0 pl-0"
                      placeholder="اسم المستلم"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      fieldName="shippingPhone"
                      name="shippingPhone"
                      component={inputField}
                      className="form-control border-left-0 pl-0 ltr-input en-input"
                      placeholder="051 234 5678"
                      type="number"
                      onBlur={() => setFieldTouched("shippingPhone", true)}
                      meta={{
                        error: errors?.["shippingPhone"],
                        touched: touched?.["shippingPhone"],
                      }}
                      value={values?.shippingPhone}
                      onChange={({ target: { value } }) =>
                        setFieldValue("shippingPhone", value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      component={selectField}
                      className="form-control"
                      validate={required}
                      name="shippingCityId"
                      onBlur={() => setFieldTouched("shippingCityId", true)}
                      meta={{
                        error: errors?.["shippingCityId"],
                        touched: touched?.["shippingCityId"],
                      }}
                      value={values?.shippingCityId}
                      onChange={({ target: { value } }) =>
                        setFieldValue("shippingCityId", value)
                      }
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
                      onBlur={() => setFieldTouched("shippingAddress", true)}
                      meta={{
                        error: errors?.["shippingAddress"],
                        touched: touched?.["shippingAddress"],
                      }}
                      value={values?.shippingAddress}
                      onChange={({ target: { value } }) =>
                        setFieldValue("shippingAddress", value)
                      }
                    />
                  </div>
                  <button
                    className="btn light-outline-btn w-100 ml-1"
                    disabled={
                      !(
                        !Object.keys(errors).length &&
                        Object.keys(touched).length
                      )
                    }
                    onClick={(e) => this.confirmationPopup(e, values)}
                  >
                    تأكيد بيانات التوصيل
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    formValues: state.form.cart && state.form.cart.values,
  };
}

export const ShippingAddressForm = connect(mapStateToProps)(
  reduxForm({
    form: "cart",
    destroyOnUnmount: true,
  })(withRouter(ShippingAddressFormComponent))
);
