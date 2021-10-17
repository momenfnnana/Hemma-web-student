import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import { withRouter } from "react-router-dom";
import Loader from "react-loaders";
import { apiBaseUrl } from "../../api/helpers";
import CryptoJS from "react-native-crypto-js";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import {
  loginAction,
  sendToken,
  loginFailed,
  
} from "../../actions/login.actions";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./index.scss"

const validate = values => {
  const errors = {};
  if (
    !values.phone ||
    !values.phone.phoneNumber ||
    values.phone.phoneNumber.trim() === ""
  ) {
    errors.phone = "يجب تعبئة هذه الخانة";
  } else if (!/^[0-9]*$/.test(values.phone.phoneNumber)) {
    errors.phone = "هذه الخانة يجب أن تحتوي على أرقام فقط";
  } else if (!/^0\d{9}$/.test(values.phone.phoneNumber)  && values.phone.countryCode !="eg") {
    errors.phone = "رقم الهاتف يجب أن يحتوي 10 ارقام وان يبدأ بصفر";
  } 
 else if (!/^0\d{10}$/.test(values.phone.phoneNumber) && values.phone.countryCode =="eg") {
  errors.phone = "رقم الهاتف يجب أن يحتوي 11 ارقام وان يبدأ بصفر";
 }
  if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

class LoginComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
      password: "",
        loading: false,
        isChecked: false,
      subscriptions: [],
      nextPageUrl: `${apiBaseUrl}/courses/purchased?Page=1&Limit=50&SubscriptionStatus=${this.props.subscriptionStatus}`
    };
    this.togglePasswordShow = this.togglePasswordShow.bind(this);
    this.handlePendingActions = this.handlePendingActions.bind(this);
  }
  componentDidMount() {
    document.getElementsByName("phone")[0].maxLength=11;
    const checked= localStorage.getItem('checkbox');
    if (checked ) {
        this.setState({
            isChecked: true,
        })
        let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('account'), 'secret key 123');
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        {this.myFormHandler(decryptedData)}
       
    }
}

async moveToCart(){
  this.props.history.push("/cart")
}

alertError(errorMsg){
  swal("عفواً", errorMsg, "error", {
    button: "متابعة"
  });
}


clearPendingActions(){
  localStorage.removeItem("PostCardAction");
}

async handlePendingActions(onNoPendingActions = ()=>{}) {
  let postCardActionstr = localStorage.getItem("PostCardAction");

  if(postCardActionstr){
    let postCardActions = JSON.parse(postCardActionstr);
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let promiseArray = []
    postCardActions.forEach((postCardAction, index) =>{  
      const promise = axios.post(postCardAction.url, postCardAction.body, {headers})
      promiseArray.push(promise)
    })
      Promise.allSettled(promiseArray)
        .then((results) => {
          results.forEach(({status,value,reason}) =>{
            if(reason){
              const {response : {data: {error}}} = reason
              if(error)
              this.alertError(error)
            }
          })
          this.clearPendingActions()
          this.moveToCart()
        })
        .catch((err) => {
        });
  }else {
    onNoPendingActions()
  }
}

  togglePasswordShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  myFormHandler = values => {
    const request = this.props.loginAction({
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber,
      password: values.password
    });
    this.setState({ loading: true });

    request
      .then(action => {

     //   GetUserSubscriptions(this.props);
        this.setState({ loading: false });
        if (!this.props.phoneNumberConfirmed) {
          this.props
            .sendToken()
            .then(response => {
              this.props.history.push("/verify");
            })
            .catch(error => {
              this.handlePendingActions(()=>this.props.history.push("/"))
            }).finally(()=>{
            })
        } else {
          this.handlePendingActions(()=>{
            if (this.state.isChecked) {
                let storedobj=  JSON.stringify(values);
                let ciphertext = CryptoJS.AES.encrypt(storedobj, 'secret key 123').toString();
                localStorage.setItem('account',ciphertext);
                localStorage.setItem('checkbox', this.state.isChecked);
            }
            else{
              this.props.history.goBack();
            }
          })
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        this.props.loginFailed(error);
        switch (error.response.data && error.response.data.error) {
          case "InvalidCredentials":
            swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log(error);
        }
      });
  };
  onChangeCheckbox = (e) => {
    this.setState({
      isChecked : e.target.checked
    })
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>تسجيل الدخول | منصّة همّة التعليمية</title>
          <meta
            name="description"
            content="قم بتسجيل الدخول لحسابك الخاص وابدأ دوراتك الآن! "
          />
        </Helmet>
        <form className="centered" onSubmit={handleSubmit(this.myFormHandler)}>
          <Field
            fieldName="phone"
            name="phone"
            component={phoneField}
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            defaultCountry="sa"
          />

          <div className="position-relative">
            <Field
              name="password"
              type={this.state.hidden ? "text" : "password"}
              component={inputField}
              className="form-control border-left-0 pl-0 ltr-input pw-input"
              placeholder="كلمة المرور"
            >
              <MdLockOutline />
            </Field>
              <img
                src={process.env.PUBLIC_URL + `/assets/images/${this.state.hidden ? 'closed-' : ''}eye.png`}
                width="100%"
                width="20"
                className="position-absolute show-password-icon z-5"
                onClick={this.togglePasswordShow}
                style={{top:'11px',left:'7px',zIndex:10}}
              />
          </div>
          <div>
          <input type="checkbox" checked={this.state.isChecked} name="lsRememberMe" onChange={this.onChangeCheckbox} />
          <label>تذكرني</label>
          </div>
          <button
            type="submit"
            className="btn dark-outline-btn w-100 justify-content-center d-flex align-items-center"
            disabled={submitting}
          >
            {this.state.loading == true ? (
              <Loader type="ball-clip-rotate" />
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Login && state.form.Login.values,
    phoneNumberConfirmed: state.auth.phoneNumberConfirmed,
    authenticated: state.auth.authenticated
  };
}

function GetUserSubscriptions(prop)
{ 
  let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
      axios 
        .get(`${apiBaseUrl}/courses/purchased?Page=1&Limit=50&SubscriptionStatus=Active`, { headers })
        .then(response => {
;
          if (!prop.phoneNumberConfirmed) {
            prop
              .sendToken() 
              .then(response => {
                prop.history.push("/verify");

              })
              .catch(error => {
            
                //GetUserSubscriptions();
                //this.props.history.push("/");
              });
          } else {
        
            // if(response.data.data.data==undefined||
            //   response.data.data.data.length==0)
            //   {
            //     prop.history.push("/categories");
                
            //   }
            //   else
            //   {
            //     prop.history.push("/course/content");
            //   }
            ;
            this.props.history.push("/");
          }

        
        }).catch(err=>{
          

        });

}
LoginComponent = reduxForm({
  form: "Login",
  validate
})(LoginComponent);

LoginComponent = connect(
  mapStateToProps,
  { loginAction, sendToken, loginFailed }
)(LoginComponent);

export const Login = withRouter(LoginComponent);
