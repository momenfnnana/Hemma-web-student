import React, { Component } from "react";
import ReactCodeInput from "react-code-input";

export class Verification extends Component {
  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="row align-items-center h-100">
          <div className="col-md-6 col-12">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/verify-artwork.png"}
              width="100%"
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="text-center mb-3">
              <h6 className="light-text">تأكيد حسابك</h6>
              <h6 className="dark-text">
                أدخل رمز التحقق الذي أرسلناه إلى جوالك
              </h6>
            </div>
            <form className="centered">
              <div className="mb-3">
                <ReactCodeInput fields={6} />
              </div>

              <button type="submit" className="btn dark-outline-btn w-100">
                تحقق من الرمز{" "}
              </button>
            </form>

            <div className="text-center pt-4">
              <a href="" className="dark-text small">
                لم يصلك رمز التحقق؟{" "}
                <a href="" className="light-text">
                  إعادة إرسال
                </a>{" "}
              </a>
            </div>
            <div className="text-center pt-1">
              <a href="" className="dark-text small light-text">
                تخطى تأكيد الحساب{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
