import React, { useEffect, useState } from "react";
import swal from "@sweetalert/with-react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Axios from "axios";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { MdLockOutline } from "react-icons/md";
import Loader from "react-loaders";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";
import Countdown from "react-countdown-now";
import CryptoJS from "react-native-crypto-js";

import { RadioField } from "../shared/inputs/RadioFeild";
import { apiBaseUrl } from "../../api/helpers";
import { VerificationField } from "../shared/inputs/verificationField";
let wrapperClass = "input-group mb-3";
let loginContent = "loginContent";
let registerContent = "registerContent";
let verificationContent = "verificationContent";
let forgetPassword = "forgetPassword";
let confirmCode = "confirmCode";
let resetPassword = "resetPassword";
const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("يجب ادخال اسم")
    .min(3, ({ min }) => `يجب ان لا يقل الاسم عن ${min} حروف`),
  password: yup
    .string()
    .min(8, ({ min }) => `كلمة المرور يجب الا تقل عن ${min} حروف`)
    .required("كلمة المرور مطلوبة"),
  email: yup.string().email("Invalid email"),
});
const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(4, ({ min }) => `كلمة المرور يجب الا تقل عن ${min} حروف`)
    .required("كلمة المرور مطلوبة"),
});
const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(4, ({ min }) => `كلمة المرور يجب الا تقل عن ${min} حروف`)
    .required("كلمة المرور مطلوبة"),
});

const inputField = (props) => {
  let inputClass = props?.className;
  let wrapperClass = "input-group mb-3";
  if (props?.meta?.touched && props?.meta?.error) {
    wrapperClass += " input-error";
  } else if (props?.meta?.touched && props?.meta?.valid) {
    wrapperClass += " input-success";
  } else if (props?.disabled) {
    wrapperClass += " disabled-input";
  }
  return (
    <div className={wrapperClass}>
      <div className="input-group-prepend">
        <div className="input-group-text">{props?.children}</div>
      </div>
      <input
        {...props?.field}
        type={props?.type}
        className={inputClass}
        placeholder={props?.placeholder}
        value={props?.field?.value}
        disabled={props?.disabled}
        maxLength={props?.maxLength}
      />
      <small
        className="w-100 smaller"
        style={{
          opacity: props?.meta?.touched && props?.meta?.error ? 1 : 0,
        }}
      >
        {props?.meta?.error}
      </small>
    </div>
  );
};

const PhoneComponent = (props) => {
  const {
    changePhoneNumber = () => true,
    inputClassName,
    containerClassName,
    defaultCountry,
    fieldName,
    meta,
    type,
    disabled,
    input,
  } = props;
  let inputClass = inputClassName;
  let containerClass = containerClassName;
  let countryCode = defaultCountry;
  let inputName = fieldName;

  const handleChange = (value, country) => {
    changePhoneNumber(value, country?.iso2);
  };
  if (meta?.touched && meta?.error) {
    wrapperClass += " input-error";
  } else if (meta?.touched && meta?.valid) {
    wrapperClass += " input-success";
  }
  return (
    <div className={wrapperClass}>
      <IntlTelInput
        type={type}
        fieldName={inputName}
        containerClassName={containerClass}
        inputClassName={inputClass}
        defaultCountry={countryCode}
        onPhoneNumberChange={(e, value, code) => handleChange(value, code)}
        disabled={disabled}
        defaultValue={input?.value || ""}
        preferredCountries={["sa", "ae", "om", "kw", "qa", "bh", "iq"]}
      />
      {meta?.touched && meta?.error && (
        <small className="w-100 smaller">{meta?.error}</small>
      )}
    </div>
  );
};

const LoginPopUpContent = ({
  onSuccess = () => true,
  onError = () => true,
  loginResponse = () => true,
  changeCheckedValue = () => true,
  userData,
  ...props
}) => {
  const [showContent, setShowContent] = useState(loginContent);
  const [phoneNumber, setPhoneNumber] = useState({
    number: "",
    countryCode: "sa",
    error: "",
  });
  const [selectedGender, setSelectedGender] = useState("");
  const [state, setState] = useState({
    loading: false,
    disabled: false,
    code: "",
    date: Date.now() + 59000,
    countdownApi: null,
    showResend: true,
  });
  const [checked, setChecked] = useState(false);
  const [loadingSendCode, setLoadingSendCode] = useState(false);
  const [checkCodeError, setCheckCodeError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [validatePasswordError, setValidatePasswordError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const validatePhoneNumber = () => {
    if (phoneNumber.number?.length < 1) {
      return "يجب ادخال رقم الهاتف";
    } else if (phoneNumber.number?.length < 8) {
      return "رقم الهاتف يجب ان لا يقل عن ٨ ارقام";
    } else {
      return true;
    }
  };

  const verifyUser = () => {
    setState({ date: Date.now() + 59000, showResend: false });
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    Axios.post(`${apiBaseUrl}/auth/phone/send_token`, null, {
      headers,
    })
      .then((res) => console.log({ res }))
      .catch((error) => {
        console.log(error);
      });
  };
  const handleComplete = () => {
    setState({ showResend: true });
  };

  const renderer = ({ seconds }) => {
    return <span>({seconds})</span>;
  };
  const verifyForgetPasswordCode = (value) => {
    setVerificationCode(value);
    if (value.length == 4) {
      let data = {
        countryCode: phoneNumber.countryCode,
        phoneNumber: phoneNumber.number,
        token: value,
      };
      Axios.post(`${apiBaseUrl}/auth/password/reset/phone/check_token`, data)
        .then((response) => {
          setCheckCodeError("");
          setShowContent(resetPassword);
        })
        .catch((error) => {
          switch (error.response.data && error.response.data.error) {
            // validate errors to state and render it all
            case "ValidationError":
              setCheckCodeError("يرجى التحقق من البيانات المدخلة");
              break;
            case "UserNotFound":
              setCheckCodeError("هذا المستخدم غير موجود");
              break;
            case "InvalidConfirmationToken":
              setCheckCodeError("الرمز المدخل غير صحيح");
              break;
            case "VerificationTokenExpired":
              setCheckCodeError("انتهت صلاحية الرمز المدخل");
              break;
            case "FailedToSend":
              setCheckCodeError("حصل خطأ ما");
              break;
            default:
              console.log("other error");
          }
        });
    }
  };
  // next function for confirm verification code
  const verifyCode = (value) => {
    if (value.length === 4) {
      let token = localStorage.getItem("token");
      let data = {
        token: value,
      };
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      setState({ ...state, loading: true });
      Axios.post(`${apiBaseUrl}/auth/phone/verify`, data, {
        headers,
      })
        .then((response) => {
          setState({ ...state, loading: false });
          localStorage.setItem("token", response.data.data.token);
          onSuccess(true);
          onError(false);
          loginResponse(response);
        })
        .catch((error) => {
          onSuccess(false);
          onError(true);
          setState({ ...state, loading: false });
          switch (error.response.data && error.response.data.error) {
            case "ValidationError":
              swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
                button: "متابعة",
              });
              break;
            case "AlreadyVerified":
              swal("عفواً", "تم توثيق الحساب سابقاً", "error", {
                button: "متابعة",
              });
              break;
            case "InvalidConfirmationToken":
              swal("عفواً", "الرمز المدخل خاطئ", "error", {
                button: "متابعة",
              });
              break;
            case "VerificationTokenExpired":
              swal("عفواً", "انتهت صلاحية الرمز المدخل", "error", {
                button: "متابعة",
              });
              break;
            default:
              console.log("other error");
          }
        });
    }
  };

  return (
    <div>
      {showContent === resetPassword ? (
        <>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={resetPasswordSchema}
            onSubmit={(values) => {
              console.log({ values });
              if (!values.confirmPassword?.length) {
                setConfirmPasswordError("يجب تأكيد كلمة المرور");
                return;
              }
              if (values.password !== values.confirmPassword) {
                setConfirmPasswordError(
                  "تأكيد كلمة المرور يجب ان تكون مطابقة  لكلمة المرور"
                );
                return;
              }
              setConfirmPasswordError("");
              let data = {
                phoneNumber: phoneNumber?.number,
                countryCode: phoneNumber?.countryCode,
                token: verificationCode,
                password: values.password,
              };
              Axios.post(
                `${apiBaseUrl}/auth/password/reset/phone/set_new`,
                data
              )
                .then((response) => {
                  swal("تنبيه", "لقد تم تغيير كلمة المرور بنجاح", "success", {
                    button: "متابعة",
                  });
                })
                .catch((error) => {
                  switch (error.response.data && error.response.data.error) {
                    case "ValidationError":
                      setValidatePasswordError(
                        "يرجى التحقق من البيانات المدخلة"
                      );
                      break;
                    case "UserNotFound":
                      setValidatePasswordError("هذا المستخدم غير موجود");
                      break;
                    case "InvalidConfirmationToken":
                      setValidatePasswordError("الرمز المدخل غير صحيح");
                      break;
                    case "VerificationTokenExpired":
                      setValidatePasswordError("انتهت صلاحية الرمز المدخل");
                      break;
                    default:
                      console.log("other error");
                  }
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => {
              return (
                <Form className="centered">
                  <Field
                    name="password"
                    type="password"
                    component={inputField}
                    className="form-control border-left-0 pl-0 ltr-input"
                    placeholder="كلمة المرور"
                  >
                    <MdLockOutline />
                  </Field>
                  {errors?.password?.length ? <>{errors?.password}</> : null}
                  <Field
                    name="confirmPassword"
                    type="password"
                    component={inputField}
                    className="form-control border-left-0 pl-0 ltr-input"
                    placeholder="تأكيد كلمة المرور"
                  >
                    <MdLockOutline />
                  </Field>
                  {confirmPasswordError?.length ? (
                    <>{confirmPasswordError}</>
                  ) : null}
                  {validatePasswordError?.length ? (
                    <>{validatePasswordError}</>
                  ) : null}
                  <button
                    type="submit"
                    className="btn dark-outline-btn w-100"
                  >
                    إرسال
                  </button>
                </Form>
              );
            }}
          </Formik>
        </>
      ) : showContent === confirmCode ? (
        <>
          <div className="text-center mb-3">
            <h6 className="light-text">التحقق من الهوية</h6>
            <h6 className="dark-text w-50 small mx-auto">
              أدخل رمز التحقق المكون من أربعة خانات والمرسل على الرقم{" "}
              <span className="en-text">{phoneNumber.number}</span>
            </h6>
            <Formik
              initialValues={{
                password: "",
              }}
            >
              <Form className="centered">
                <div className="mb-3">
                  <Field
                    name="token"
                    component={VerificationField}
                    onChange={verifyForgetPasswordCode}
                  />
                </div>
                {checkCodeError?.length ? <div>{checkCodeError}</div> : null}
              </Form>
            </Formik>
          </div>
        </>
      ) : showContent === forgetPassword ? (
        <>
          <h6 className="light-text small">نسيت كلمة المرور؟</h6>
          <h6 className="dark-text small">ادخل رقم جوالك لارسال رمز التحقق </h6>
          <Formik
            initialValues={{
              password: "",
            }}
            onSubmit={(values) => {
              if (validatePhoneNumber() === true) {
                setPhoneNumber({ ...phoneNumber, error: "" });
                let data = {
                  countryCode: phoneNumber.countryCode,
                  phoneNumber: phoneNumber.number,
                };
                setLoadingSendCode(true);

                Axios.post(
                  `${apiBaseUrl}/auth/password/reset/phone/send_token`,
                  data
                )
                  .then((response) => {
                    setLoadingSendCode(false);
                    setShowContent(confirmCode);
                  })
                  .catch((error) => {
                    this.setState({ loading: false, disabled: false });
                    switch (error.response.data && error.response.data.error) {
                      case "ValidationError":
                        swal(
                          "عفواً",
                          "يرجى التحقق من البيانات المدخلة",
                          "error",
                          {
                            button: "متابعة",
                          }
                        );
                        break;
                      case "UserNotFound":
                        swal("عفواً", "هذا المستخدم غير موجود", "error", {
                          button: "متابعة",
                        });
                        break;
                      case "TooManyFailedAttempts":
                        swal(
                          "عفواً",
                          "لقد استنفذت عدد المرات الممكن استعادة حسابك بها ",
                          "error",
                          {
                            button: "متابعة",
                          }
                        );
                        break;
                      case "TokenIssuanceInRefractoryPeriod":
                        swal(
                          "عفواً",
                          "يرجى التحقق من البيانات المدخلة",
                          "error",
                          {
                            button: "متابعة",
                          }
                        );
                        break;
                      case "FailedToSend":
                        swal("عفواً", "حصل خطأ ما", "error", {
                          button: "متابعة",
                        });
                        break;
                      default:
                        console.log("other error");
                    }
                  });
              } else {
                setPhoneNumber({
                  ...phoneNumber,
                  error: validatePhoneNumber(),
                });
              }
            }}
          >
            <Form className="centered">
              <Field
                fieldName="phone"
                name="phone"
                component={PhoneComponent}
                changePhoneNumber={(number, countryCode) =>
                  setPhoneNumber({
                    number,
                    countryCode,
                    error: validatePhoneNumber(),
                  })
                }
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
              />
              {phoneNumber.error ? <div>{phoneNumber.error}</div> : null}
              <button
                type="submit"
                className="btn dark-outline-btn w-100"
                disabled={loadingSendCode}
              >
                {loadingSendCode === true ? (
                  <Loader type="ball-clip-rotate" />
                ) : (
                  "إرسال"
                )}
              </button>
            </Form>
          </Formik>
        </>
      ) : showContent === verificationContent ? (
        <>
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={loginSchema}
          >
            <div className="mb-3 text-center">
              <Field
                name="token"
                component={VerificationField}
                onChange={verifyCode}
              />
            </div>
          </Formik>
          <div className="text-center pt-1">
            <div className="text-center pt-4">
              <p className="dark-text small">
                لم يصلك رمز التحقق؟{" "}
                {state.showResend ? (
                  <span
                    className="light-text text-decoration-none clickable cursor-pointer"
                    onClick={verifyUser}
                  >
                    إعادة إرسال
                  </span>
                ) : (
                  <Countdown
                    date={state.date}
                    autoStart={true}
                    key={state.date}
                    onComplete={handleComplete}
                    renderer={renderer}
                  />
                )}
              </p>
            </div>
            <div
              className="dark-text small light-text clickable cursor-pointer"
              onClick={() => {
                onSuccess(false);
                onError(true);
              }}
            >
              تخطى تأكيد الحساب
            </div>
          </div>
        </>
      ) : (
        <>
          <ul className="list-inline underlined-tabs mb-4 text-center">
            <li
              className="list-inline-item small cursor-pointer"
              onClick={() => setShowContent(loginContent)}
            >
              <div className="dark-text">
                تسجيل دخول
                <div
                  className="w-100"
                  style={{
                    height: showContent === loginContent ? 3 : 0,
                    backgroundColor: "#4b3a8599",
                  }}
                />
              </div>
            </li>
            <li
              className="list-inline-item small cursor-pointer"
              onClick={() => setShowContent(registerContent)}
            >
              <div className="dark-text">
                إنشاء حساب
                <div
                  className="w-100"
                  style={{
                    height: showContent === registerContent ? 3 : 0,
                    backgroundColor: "#4b3a8599",
                  }}
                />
                <div />
              </div>
            </li>
          </ul>
          {showContent === loginContent ? (
            <Formik
              initialValues={{
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                if (validatePhoneNumber() === true) {
                  setPhoneNumber({ ...phoneNumber, error: "" });
                  // send login request to api
                  Axios.post(`${apiBaseUrl}/auth/login_with_phone`, {
                    countryCode: phoneNumber.countryCode,
                    phoneNumber: phoneNumber.number,
                    password: values.password,
                  })
                    .then((res) => {
                      if (checked) {
                        const userObject = {
                          ...values,
                          phoneNumber: phoneNumber,
                        };
                        let storedobj = JSON.stringify(userObject);
                        let ciphertext = CryptoJS.AES.encrypt(
                          storedobj,
                          "secret key 123"
                        ).toString();
                        localStorage.setItem("account", ciphertext);
                        localStorage.setItem("checkbox", checked);
                      }
                      // next for getting user data after login process
                      // let headers = {
                      //   Authorization: `Bearer ${res?.data?.data?.token}`,
                      // };
                      // Axios({
                      //   method: "GET",
                      //   url: `${apiBaseUrl}/users/me`,
                      //   headers,
                      // })
                      //   .then((meRes) => console.log({ meRes }))
                      //   .catch((error) => console.log({ error }));
                      localStorage.setItem("token", res?.data?.data?.token);
                      onSuccess(true);
                      loginResponse(res);

                      onError(false);
                    })
                    .catch((error) => {
                      onSuccess(false);
                      onError(true);
                      console.log({ error });
                    });
                } else {
                  setPhoneNumber({
                    ...phoneNumber,
                    error: validatePhoneNumber(),
                  });
                }
              }}
            >
              {({ errors, touched, isSubmitting }) => {
                return (
                  <Form className="centered">
                    <Field
                      fieldName="phone"
                      name="phone"
                      component={PhoneComponent}
                      changePhoneNumber={(number, countryCode) =>
                        setPhoneNumber({
                          number,
                          countryCode,
                          error: validatePhoneNumber(),
                        })
                      }
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      defaultCountry="sa"
                    />
                    {phoneNumber.error ? <div>{phoneNumber.error}</div> : null}
                    <Field
                      name="password"
                      type="password"
                      component={inputField}
                      className="form-control border-left-0 pl-0 ltr-input pw-input"
                      placeholder="كلمة المرور"
                    >
                      <MdLockOutline />
                    </Field>
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                    <div className="d-flex justify-content-start align-items-center m-2">
                      <input
                        type="checkbox"
                        className="mx-2"
                        checked={checked}
                        name="lsRememberMe"
                        onChange={(e) => {
                          changeCheckedValue(e.target.checked);
                          setChecked(e.target.checked);
                        }}
                      />
                      <label className="m-0">تذكرني</label>
                    </div>
                    <div
                      className="text-center mb-2 cursor-pointer"
                      onClick={() => setShowContent(forgetPassword)}
                    >
                      <p className="dark-text small m-0">نسيت كلمة المرور؟</p>
                    </div>
                    <button
                      type="submit"
                      className="btn dark-outline-btn w-100 justify-content-center d-flex align-items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting === true ? (
                        <Loader type="ball-clip-rotate" />
                      ) : (
                        "تسجيل الدخول"
                      )}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                password: "",
                email: "",
                username: "",
              }}
              validationSchema={registerSchema}
              onSubmit={(values) => {
                if (selectedGender?.length) {
                  if (validatePhoneNumber() === true) {
                    Axios.post(`${apiBaseUrl}/auth/register`, {
                      countryCode: phoneNumber.countryCode,
                      phoneNumber: phoneNumber.number,
                      email: values.email,
                      password: values.password,
                      name: values.username,
                      gender: selectedGender,
                      // commented next values to know why
                      // educationalLevel,
                      // educationalEntityId,
                      // saCityId,
                      // nationalityId,
                      // studentId
                    })
                      .then((registerRes) => {
                        setShowContent(verificationContent);
                        localStorage.setItem(
                          "token",
                          registerRes?.data?.data?.token
                        );
                        console.log({ registerRes });
                      })
                      .catch((error) => {
                        onSuccess(false);
                        onError(true);
                        console.log({ error });
                      });
                  }
                } else {
                  return "should add gender value";
                }
              }}
            >
              {({ errors, touched, isSubmitting }) => {
                console.log({ errors });
                return (
                  <Form className="centered">
                    <Field
                      name="username"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="الاسم الكامل"
                    >
                      <FaRegUser />
                    </Field>
                    <div className="mb-3">
                      <label className="pr-2 dark-silver-text mb-0">
                        {" "}
                        أنا:{" "}
                      </label>
                      <Field
                        component={RadioField}
                        name="gender"
                        options={[
                          { title: "ذكر", value: "male" },
                          { title: "أنثى", value: "female" },
                        ]}
                        onChangeGender={(value) => setSelectedGender(value)}
                        input={{ value: selectedGender }}
                      />
                    </div>
                    <Field
                      fieldName="phone"
                      name="phone"
                      component={PhoneComponent}
                      changePhoneNumber={(number, countryCode) =>
                        setPhoneNumber({
                          number,
                          countryCode,
                          error: validatePhoneNumber(),
                        })
                      }
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      defaultCountry="sa"
                    />
                    {phoneNumber.error ? <div>{phoneNumber.error}</div> : null}
                    <Field
                      name="password"
                      type="password"
                      component={inputField}
                      className="form-control border-left-0 pl-0 ltr-input pw-input"
                      placeholder="كلمة المرور"
                    >
                      <MdLockOutline />
                    </Field>
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                    <Field
                      name="email"
                      type="email"
                      component={inputField}
                      className="form-control border-left-0 pl-0 ltr-input"
                      placeholder="البريد الإلكتروني (اختياري)"
                      // validate={emailValue}
                    >
                      <FaRegEnvelope />
                    </Field>
                    <button
                      type="submit"
                      className="btn dark-outline-btn w-100 justify-content-center d-flex align-items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting === true ? (
                        <Loader type="ball-clip-rotate" />
                      ) : (
                        "إنشاء حساب"
                      )}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          )}
        </>
      )}
    </div>
  );
};

export const LoginPopUp = ({
  onSuccess = () => true, // if onSuccess return true the user must be logged in or registered and verified thier phone number
  onError = () => true, // if onError return true somthing went wrong in login or register operation and will auto redirect user to login screen
  loginResponse = () => true,
  changeCheckedValue = () => true,
  userData,
  history, // must pass history object to enable navigation process from this component if not passed the app may going to crash
}) => {
  useEffect(() => {
    swal({
      content: (
        <LoginPopUpContent
          onSuccess={(e) => {
            swal.close();
            onSuccess(e);
          }}
          onError={(e) => {
            swal.close();
            history.push("/auth/login");
            onError(e);
          }}
          loginResponse={(e) => loginResponse(e)}
          changeCheckedValue={(e) => changeCheckedValue(e)}
          {...{ userData }}
        />
      ),
      buttons: false,
      allowOutsideClick: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
  }, []);
  return null;
};
