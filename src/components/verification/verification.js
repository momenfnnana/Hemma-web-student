import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { VerificationField } from "../shared/inputs/verificationField";
import { Link, withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import Countdown from "react-countdown-now";

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

class VerificationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      disabled: false,
      code: "",
      date: Date.now() + 59000,
      countdownApi: null,
      showResend: false
    };
    this.verifyCode = this.verifyCode.bind(this);
  }

  verifyUser = () => {
    this.setState({ date: Date.now() + 59000, showResend: false });
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${apiBaseUrl}/auth/phone/send_token`, null, {
        headers
      })
      .then()
      .catch(error => {
        console.log(error);
      });
  };

  handleComplete = () => {
    this.setState({ showResend: true });
  };

  handleUpdate = () => {
    this.forceUpdate();
  };

  setRef = countdown => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  verifyCode(value) {
    if (value.length == 4) {
      let token = localStorage.getItem("token");
      let data = {
        token: value
      };
      let headers = {
        Authorization: `Bearer ${token}`
      };
      this.setState({ loading: true });
      axios
        .post(`${apiBaseUrl}/auth/phone/verify`, data, {
          headers
        })
        .then(response => {
          this.setState({ loading: false });
          localStorage.setItem("token", response.data.data.token);
          window.location = "/";
        })
        .catch(error => {
          this.setState({ loading: false });
          switch (error.response.data && error.response.data.error) {
            case "ValidationError":
              swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
                button: "متابعة"
              });
              break;
            case "AlreadyVerified":
              swal("عفواً", "تم توثيق الحساب سابقاً", "error", {
                button: "متابعة"
              });
              break;
            case "InvalidConfirmationToken":
              swal("عفواً", "الرمز المدخل خاطئ", "error", {
                button: "متابعة"
              });
              break;
            case "VerificationTokenExpired":
              swal("عفواً", "انتهت صلاحية الرمز المدخل", "error", {
                button: "متابعة"
              });
              break;

            default:
              console.log("other error");
          }
        });
    }
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    const renderer = ({ seconds }) => <span>({seconds})</span>;
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
              <h6 className="light-text small">تأكيد حسابك</h6>
              <h6 className="dark-text small">
                أدخل رمز التحقق الذي أرسلناه إلى جوالك
              </h6>
            </div>

            <form className="centered">
              <div className="mb-3 text-center">
                <Field
                  name="token"
                  component={VerificationField}
                  onChange={this.verifyCode}
                />
              </div>
            </form>

            <div className="text-center pt-4">
              <p className="dark-text small">
                لم يصلك رمز التحقق؟{" "}
                {this.state.showResend ? (
                  <span
                    className="light-text text-decoration-none clickable"
                    onClick={this.verifyUser}
                  >
                    إعادة إرسال
                  </span>
                ) : (
                  <Countdown
                    date={this.state.date}
                    autoStart={true}
                    key={this.state.date}
                    ref={this.setRef}
                    onMount={this.handleUpdate}
                    onComplete={this.handleComplete}
                    renderer={renderer}
                  />
                )}
              </p>
            </div>
            <div className="text-center pt-1">
              <Link to="/" className="dark-text small light-text clickable">
                تخطى تأكيد الحساب{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Verification && state.form.Verification.values
  };
}

VerificationComponent = reduxForm({
  form: "Verification",
  validate
})(VerificationComponent);

VerificationComponent = connect(mapStateToProps)(VerificationComponent);

export const Verification = withRouter(VerificationComponent);
