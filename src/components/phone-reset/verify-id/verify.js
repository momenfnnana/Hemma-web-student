import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { VerificationField } from "../../shared/inputs/verificationField";
import { apiBaseUrl } from "../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";

const validate = values => {
  const errors = {};
  if (
    !values.phone ||
    !values.phone.phoneNumber ||
    values.phone.phoneNumber.trim() === ""
  ) {
    errors.phone = "يجب تعبئة هذه الخانة";
  } else if (values.phone.phoneNumber.length < 8) {
    errors.phone = "ادخل رقم هاتف صحيح";
  }
  if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  } else if (values.password.length < 8) {
    errors.password = "كلمة المرور يجب أن لا تقل عن ٨ أحرف";
  } else if (values.password.length > 24) {
    errors.password = "كلمة المرور يجب أن لا تزيد عن ٢٤ حرف";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
      values.password
    )
  ) {
    errors.password =
      "كلمة المرور يجب أن تحتوي على أحرف كبيرة، أحرف صغيرة، رموز، و أرقام";
  }
  return errors;
};

class VerifyIdComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      disabled: false,
      code: ""
    };
    this.verifyCode = this.verifyCode.bind(this);
  }

  verifyCode(value) {
    if (value.length == 4) {
      const { userInfo } = this.props.location;
      let data = {
        countryCode: userInfo.countryCode,
        phoneNumber: userInfo.phoneNumber,
        token: value
      };
      this.setState({ loading: true, disabled: true });
      axios
        .post(`${apiBaseUrl}/auth/password/reset/phone/check_token`, data)
        .then(response => {
          this.setState({ loading: false, disabled: false });
          this.props.history.push({
            pathname: "/reset-password",
            userData: data
          });
        })
        .catch(error => {
          this.setState({ loading: false, disabled: false });
          switch (error.response.data && error.response.data.error) {
            case "ValidationError":
              swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
                button: "متابعة"
              });
              break;
            case "UserNotFound":
              swal("عفواً", "هذا المستخدم غير موجود", "error", {
                button: "متابعة"
              });
              break;
            case "InvalidConfirmationToken":
              swal("عفواً", "الرمز المدخل غير صحيح", "error", {
                button: "متابعة"
              });
              break;
            case "VerificationTokenExpired":
              swal("عفواً", "انتهت صلاحية الرمز المدخل", "error", {
                button: "متابعة"
              });
              break;
            case "FailedToSend":
              swal("عفواً", "حصل خطأ ما", "error", {
                button: "متابعة"
              });
              break;
            default:
              console.log("other error");
          }
        });
    }
  }

  resendCode = () => {
    const { userInfo } = this.props.location;
    let data = {
      countryCode: userInfo.countryCode,
      phoneNumber: userInfo.phoneNumber
    };

    axios
      .post(`${apiBaseUrl}/auth/password/reset/phone/send_token`, data)
      .then(response => {
        console.log("sent");
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "UserNotFound":
            swal("عفواً", "هذا المستخدم غير موجود", "error", {
              button: "متابعة"
            });
            break;
          case "TooManyFailedAttempts":
            swal(
              "عفواً",
              "لقد استنفذت عدد المرات الممكن استعادة حسابك بها ",
              "error",
              {
                button: "متابعة"
              }
            );
            break;
          case "TokenIssuanceInRefractoryPeriod":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;
          case "FailedToSend":
            swal("عفواً", "حصل خطأ ما", "error", {
              button: "متابعة"
            });
            break;
          default:
            console.log("other error");
        }
      });
  };

  render() {
    const { userInfo } = this.props.location;
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container pt-5 pb-5">
        <div
          className="row align-items-center justify-content-center"
          style={{ minHeight: 550 }}
        >
          <div className="col-md-6 col-12 order-md-1 order-2">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/verify-artwork.png"}
              height="350"
              className="artwork-img"
            />
          </div>
          <div className="col-md-6 col-12 order-md-2 order-1">
            <div className="text-center mb-3">
              <h6 className="light-text">التحقق من الهوية</h6>
              <h6 className="dark-text w-50 small mx-auto">
                أدخل رمز التحقق المكون من ستة خانات والمرسل على الرقم{" "}
                <span className="en-text">{userInfo.phoneNumber}</span>
              </h6>
            </div>

            <form className="text-center">
              <div className="mb-3">
                <Field
                  name="token"
                  component={VerificationField}
                  onChange={this.verifyCode}
                />
              </div>
            </form>

            <div className="text-center pt-4">
              <span href="" className="dark-text small">
                لم يصلك رمز التحقق؟{" "}
              </span>
              <span className="light-text small" onClick={this.resendCode}>
                إعادة إرسال
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.VerifyId && state.form.VerifyId.values
  };
}

VerifyIdComponent = reduxForm({
  form: "VerifyId",
  validate
})(VerifyIdComponent);

VerifyIdComponent = connect(mapStateToProps)(VerifyIdComponent);

export const VerifyId = VerifyIdComponent;
