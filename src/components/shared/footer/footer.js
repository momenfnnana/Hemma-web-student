import React, { Component } from "react";
import "./styles.sass";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../../api/helpers";

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
  return errors;
};

const renderPhoneField = props => {
  let inputClass = props.inputClassName;
  let containerClass = props.containerClassName;
  let countryCode = props.defaultCountry;
  let inputName = props.fieldName;
  let wrapperClass = "input-group mb-3";
  if (props.meta.touched && props.meta.error) {
    wrapperClass += " input-error";
  } else if (props.meta.touched && props.meta.valid) {
    wrapperClass += " input-success";
  }

  const handleBlur = (valid, value, country) => {
    props.input.onBlur({
      phoneNumber: value,
      countryCode: country.iso2
    });
  };

  const handleChange = (valid, value, country) => {
    props.input.onChange({
      phoneNumber: value,
      countryCode: country.iso2
    });
  };

  return (
    <React.Fragment>
      <div className={wrapperClass}>
        <IntlTelInput
          {...props.IntlTelInput}
          type={props.type}
          fieldName={inputName}
          containerClassName={containerClass}
          inputClassName={inputClass}
          defaultCountry={countryCode}
          onPhoneNumberBlur={handleBlur}
          onPhoneNumberChange={handleChange}
        />
        {props.meta.touched && props.meta.error && (
          <small className="w-100">{props.meta.error}</small>
        )}
      </div>
    </React.Fragment>
  );
};

class FooterComponent extends Component {
  state = {
    valid: null,
    visibility: true
  };

  myFormHandler = values => {
    let data = {
      countryCode: values.subscribe.countryCode,
      phoneNumber: values.subscribe.phoneNumber
    };
    axios
      .post(`${apiBaseUrl}/newsletters/subscriptions`, data)
      .then(response => {
        this.setState({ valid: true, visibility: false });
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "ValidationError":
            this.setState({ valid: false, visibility: false });

            break;
          case "Duplicate":
            this.setState({ valid: false, visibility: false });

            break;
          case "InvalidCountry":
            this.setState({ valid: false, visibility: false });

            break;

          default:
            console.log("other error");
        }
      });
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      // <div className="footer">
      //   <div className="container top-border pt-4 pb-4">
      //     <div className="row h-100 d-flex align-items-start">
      //       <div className="col-md-8 col-12">
      //         {/* <ul className="list-inline mb-1">
      //           <li className="list-inline-item light-font-text small">
      //             <a href="" className="dark-text">
      //               تعرف علينا
      //             </a>
      //           </li>
      //        <li className="list-inline-item light-font-text small">
      //             <a href="" className="dark-text">
      //               الأسئلة المتكررة
      //             </a>
      //           </li>
      //          <li className="list-inline-item light-font-text small">
      //             <a href="" className="dark-text">
      //               انضم كأستاذ
      //             </a>
      //           </li>
      //         </ul> */}
      //         <p className="light-font-text small dark-text mb-1 mt-0">
      //           جميع الحقوق محفوظة <span className="en-text">© {(new Date().getFullYear())}</span>
      //         </p>

      //         <div className="d-inline-flex align-items-center">
      //           <p className="mid-text small mb-0">خلينا على تواصل</p>
      //           <ul className="list-inline pl-2 mb-0">
      //             <li
      //               className="list-inline-item clickable"
      //               onClick={() =>
      //                 window.open(
      //                   "https://www.snapchat.com/add/HemmaEdu",
      //                   "_blank"
      //                 )
      //               }
      //             >
      //               <img
      //                 src={
      //                   process.env.PUBLIC_URL +
      //                   "/assets/images/snapchat-dark.png"
      //                 }
      //                 height="15"
      //                 alt="Snapchat"
      //               />
      //             </li>
      //             <li
      //               className="list-inline-item clickable"
      //               onClick={() =>
      //                 window.open(
      //                   "https://www.instagram.com/hemmaedu/",
      //                   "_blank"
      //                 )
      //               }
      //             >
      //               <img
      //                 src={
      //                   process.env.PUBLIC_URL +
      //                   "/assets/images/instagram-dark.png"
      //                 }
      //                 height="15"
      //                 alt="Instgram"
      //               />
      //             </li>
      //             <li
      //               className="list-inline-item clickable"
      //               onClick={() =>
      //                 window.open("https://twitter.com/HemmaEdu", "_blank")
      //               }
      //             >
      //               <img
      //                 src={
      //                   process.env.PUBLIC_URL +
      //                   "/assets/images/twitter-dark.png"
      //                 }
      //                 height="15"
      //                 alt="Twitter"
      //               />
      //             </li>
      //           </ul>
      //         </div>
      //       </div>
      //       <div className="col-md-4 col-12 d-flex flex-column justify-content-end">
      //         <p className="light-font-text small dark-text w-75 text-break">
      //           قم بترك بيانات التواصل الخاصة بك وسوف نقوم بارسال اشعارات حول
      //           الدورات المجانية
      //         </p>

      //         {this.state.valid ? (
      //           <div className="d-flex flex-row w-75 align-items-center">
      //             <img
      //               src={
      //                 process.env.PUBLIC_URL + "/assets/images/square-check.png"
      //               }
      //               height="30"
      //               alt="Success"
      //               className="mr-2"
      //             />
      //             <h6 className="light-text small mb-0">
      //               تم تسجيلك بنجاح بالقائمة البريدية!
      //             </h6>
      //           </div>
      //         ) : null}

      //         {this.state.valid == false ? (
      //           <div className="d-flex flex-row w-75 align-items-center">
      //             <img
      //               src={
      //                 process.env.PUBLIC_URL + "/assets/images/red-check.png"
      //               }
      //               height="30"
      //               alt="Success"
      //               className="mr-2"
      //             />
      //             <h6 className="red-text small mb-0">
      //               فشل التسجيل، أنت مسجل مسبقاً{" "}
      //             </h6>
      //           </div>
      //         ) : null}

      //         {this.state.visibility ? (
      //           <form onSubmit={handleSubmit(this.myFormHandler)}>
      //             <div className="d-flex flex-row w-75">
      //               <div className="input-group-prepend">
      //                 <button className="btn position-absolute br-5 phone-button">
      //                   <FaAngleRight color="#FFF" />
      //                 </button>
      //               </div>
      //               <Field
      //                 fieldName="subscribe"
      //                 name="subscribe"
      //                 component={renderPhoneField}
      //                 containerClassName="intl-tel-input"
      //                 inputClassName="form-control"
      //                 defaultCountry="sa"
      //               />
      //             </div>
      //           </form>
      //         ) : null}
      //       </div>
      //     </div>
      //   </div>
      // </div>

    <section id="footer" className="footer pt-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-3">
              <a className="hemma-logo d-block cursor-pointer">
                <img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} height="80"/>
              </a>
            </div>
            <div className="col-lg-3">
              <ul className="hemma-links list-unstyled">
                <li><a  href="/categories" className="font-weight-bold main-color cursor-pointer link-hover">منصات همة</a></li>
                <li><a  href="/banks" className="font-weight-bold main-color cursor-pointer link-hover">حسابات البنوك</a></li>
                <li><a  href="/faq" className="font-weight-bold main-color cursor-pointer link-hover">ألاسئلة المتكررة</a></li>
                <li><a className="font-weight-bold main-color cursor-pointer link-hover">بيع الملازم</a></li>
                <li><a className="font-weight-bold main-color cursor-pointer link-hover">أنضم كمدرب</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <h5 className="hemma-msg font-weight-bold main-color text-center mb-2 ml-5">خلينا على تواصل</h5>
          <ul className="hemma-socials list-unstyled d-flex align-items-center justify-content-end m-0 mb-2">
            <li>
              <a className="cursor-pointer mr-2"><img src={process.env.PUBLIC_URL + "/assets/images/whatsapp.png"} className="social-hover" width="30" alt="Whatsapp"/></a>
            </li>
            <li><a  onClick={() =>
                      window.open("https://www.snapchat.com/add/HemmaEdu","_blank")}className="cursor-pointer mx-2"><img  src={process.env.PUBLIC_URL + "/assets/images/snapchat.png"} className="social-hover" width="25" alt="Snapchat"/></a></li>
            <li><a onClick={() =>
                      window.open( "https://www.instagram.com/hemmaedu/",  "_blank")} className="cursor-pointer mx-2"><img src={process.env.PUBLIC_URL + "/assets/images/instagram.png"} className="social-hover" width="25" alt="Instagram"/></a></li>
            <li><a onClick={() =>
                       window.open("https://twitter.com/HemmaEdu", "_blank")
                     } className="cursor-pointer mx-2"><img src={process.env.PUBLIC_URL + "/assets/images/twitter.png"} className="social-hover" width="30" alt="Twitter"/></a></li>
            <li><a className="cursor-pointer ml-2"><img src={process.env.PUBLIC_URL + "/assets/images/youtube.png"} className="social-hover" width="30" alt="Youtube"/></a></li>
          </ul>
          <h5 className="hemma-phone d-flex align-items-center justify-content-end">
            <span className="font-weight-bold main-color mr-4">920033076</span>
            <img  src={process.env.PUBLIC_URL + "/assets/images/phone-call.png"}  width="20" alt="Phone Number"/>
          </h5>
        </div>
      </div>
      <div className="text-center text-muted font-weight-bold py-3">
        جميع الحقوق محفوظة &copy; منصة <span className="line-yellow">همة</span>
      </div>
    </div>
  </section>

    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Footer && state.form.Footer.values
  };
}

FooterComponent = reduxForm({
  form: "Footer",
  validate
})(FooterComponent);

FooterComponent = connect(mapStateToProps)(FooterComponent);

export const Footer = withRouter(FooterComponent);
