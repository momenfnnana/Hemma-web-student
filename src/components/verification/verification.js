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
      date: 10000,
    };
    this.verifyCode = this.verifyCode.bind(this);
    this.countdownInterval = 0;
  }

  verifyUser = () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${apiBaseUrl}/auth/phone/send_token`, null, {
        headers
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  start() {
    this.countdownInterval = window.setInterval(() => {
      if (this.state.date <= 0) {
        return this.clearInterval();
      }

      this.setState(({ date }) => ({ date: date - 1000 }));
    }, 1000);
  }

  handleUpdate = () => {
    this.forceUpdate();
  };

  clearInterval() {
    window.clearInterval(this.countdownInterval);
  }

  verifyCode(value) {
    if (value.length == 6) {
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
          this.setState({ loading: false, date: 10000 });
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
              <div className="mb-3">
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
                {this.state.date > 0 ? (
                  <Countdown date={this.state.date} controlled={true} zeroPadTime onStart={this.handleUpdate } />
                ) : (
                    <span
                      className="light-text text-decoration-none clickable"
                      onClick={this.verifyUser }
                    >
                      إعادة إرسال
                    </span>
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