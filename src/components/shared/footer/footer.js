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

<section id="footer" className="footer pt-5">
   <div className="hemma-footer">
      <div className="container">
         <div className="row">
            <div className="col-lg-5">
               <h5 className="hemma-msg font-weight-bold mb-4">همة</h5>
               <ul className="hemma-links list-unstyled m-0 p-0">
                  <li><a href="/categories" className="cursor-pointer links-hover mb-1">منصات همة</a></li>
                  <li><a href="/faq" className="cursor-pointer links-hover mb-1">الاسئلة المتكررة</a></li>
                  <li><a className="cursor-pointer links-hover mb-1">متجر همة للكتب</a></li>
                  <li><a href="/banks" className="cursor-pointer links-hover mb-1">الحسابات البنكية</a></li>
               </ul>
            </div>
            <div className="col-lg-5">
               <a className="hemma-logo d-block cursor-pointer my-4">
               <img src={process.env.PUBLIC_URL + "/assets/images/logo-light.png"} alt="Hemma Logo" height="120" />
               </a>
            </div>
            <div className="col-lg-2">
               <h5 className="hemma-msg font-weight-bold text-right mb-4">تواصل معنا</h5>
               <ul className="hemma-socials list-unstyled d-flex align-items-center justify-content-center mb-2">
                  <li>
                     <a onClick={() =>
                       window.open("https://twitter.com/HemmaEdu", "_blank")
                     }  className="socials-links saved-animation cursor-pointer">
                     <i className="fab fa-twitter"></i>
                     </a>
                  </li>
                  <li>
                     <a onClick={() =>
                      window.open( "https://www.instagram.com/hemmaedu/",  "_blank")}  className="socials-links saved-animation cursor-pointer">
                     <i className="fab fa-instagram-square"></i>
                     </a>
                  </li>
               </ul>
               <ul className="hemma-socials list-unstyled d-flex align-items-center justify-content-center mb-2">
                  <li>
                     <a onClick={() =>
                      window.open("https://www.snapchat.com/add/HemmaEdu","_blank")} className="socials-links saved-animation cursor-pointer">
                     <i className="fab fa-snapchat-ghost"></i>
                     </a>
                  </li>
                  <li>
                     <a className="socials-links saved-animation cursor-pointer">
                     <i className="fab fa-youtube"></i>
                     </a>
                  </li>
               </ul>
               <h5 className="hemma-phone d-flex-items-center justify-content-end">
                  <span className="font-weight-bold">هاتف :</span>
                  <span className="font-weight-bold ml-1">920033076</span>
               </h5>
            </div>
         </div>
      </div>
      </div>
   <div className="hemma-copyright">
      <div className="container">
         <div className="text-center font-weight-bold font-size-13 py-3">
            جميع الحقوق محفوظة &copy; منصة <span className="line-yellow">همة</span>
         </div>
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
