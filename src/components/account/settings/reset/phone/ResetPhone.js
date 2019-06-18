import React, { Component } from "react";
import { Field, reduxForm, Fields } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { inputField } from "../../../../shared/inputs/inputField";
import { editPhoneField } from "../../../../shared/inputs/editPhoneField";
import { withRouter, Link } from "react-router-dom";
import "../../styles.sass";
import { FaRegUser } from "react-icons/fa";
import { getProfile } from "../../../../../actions";
import { FaRegEnvelope } from "react-icons/fa";
import { apiBaseUrl } from "../../../../../api/helpers";
import {
  Tooltip,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { emailField } from "../../../../shared/inputs/emailField";
import { MdLockOutline } from "react-icons/md";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "يجب تعبئة هذه الخانة";
  } else if (
    !/^[\u0621-\u064Aa-zA-Z]{2,}(\s[\u0621-\u064Aa-zA-Z]{2,})+$/.test(
      values.name
    )
  ) {
    errors.name = "الاسم يجب أن يحتوي على مقطعين على الأقل";
  }
  return errors;
};

class UpdatePhoneComponent extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  myFormHandler = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      countryCode: values.phoneNumber.countryCode,
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password
    };
    axios
      .put(`${apiBaseUrl}/auth/phone`, data, {
        headers
      })
      .then(response => {
        swal("تنبيه", "تم تعديل بياناتك بنجاح", "success", {
          button: "متابعة"
        });
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
          case "InvalidCredentials":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log("other error");
        }
      });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <React.Fragment>
        <h3 className="dark-text">تعديل رقم الهاتف</h3>
        <div className="bg-white box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column mt-3">
          <form className="w-35" onSubmit={handleSubmit(this.myFormHandler)}>
            <Field
              fieldName="phoneNumber"
              name="phoneNumber"
              props={{
                initialCountry:
                  this.props.initialValues &&
                  this.props.initialValues.countryCode,
                initialPhone:
                  this.props.initialValues &&
                  this.props.initialValues.phoneNumber
              }}
              component={editPhoneField}
              containerClassName="intl-tel-input"
              inputClassName="form-control"
              defaultCountry="sa"
            />
            <Field
              name="password"
              type="password"
              component={inputField}
              className="form-control border-left-0 pl-0 ltr-input"
              placeholder="كلمة المرور "
            >
              <MdLockOutline />
            </Field>

            <button
              type="submit"
              className="btn dark-outline-btn w-100 mt-3"
              disabled={submitting}
            >
              حفظ التعديلات{" "}
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.profile,
    entireState: state
  };
}

UpdatePhoneComponent = reduxForm({
  form: "ResetPhone",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  fields: ["email"]
})(UpdatePhoneComponent);

UpdatePhoneComponent = connect(
  mapStateToProps,
  { getProfile }
)(UpdatePhoneComponent);

export const UpdatePhone = withRouter(UpdatePhoneComponent);
