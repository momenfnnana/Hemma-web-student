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
import { RadioField } from "../shared/inputs/RadioFeild";
import { apiBaseUrl } from "../../api/helpers";
import { VerificationField } from "../shared/inputs/verificationField";
let wrapperClass = "input-group mb-3";
let loginContent = "loginContent";
let registerContent = "registerContent";
let verificationContent = "verificationContent";
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
  setCompeted = () => true,
  setError = () => true,
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
  const validatePhoneNumber = () => {
    if (phoneNumber.number?.length < 1) {
      return "يجب ادخال رقم الهاتف";
    } else if (phoneNumber.number?.length < 8) {
      return "رقم الهاتف يجب ان لا يقل عن ٨ ارقام";
    } else {
      return true;
    }
  };
  const selectedTabStyle = {
    textDecoration: "underline",
    textDecorationColor: "#4b3a85",
    textDecorationStyle: "solid",
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
          setCompeted(true);
          setError(false);
          // window.location = "/";
        })
        .catch((error) => {
          setCompeted(false);
          setError(true);
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
      {showContent === verificationContent ? (
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
                setCompeted(false);
                setError(true);
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
              <div
                className="dark-text"
                style={
                  showContent === loginContent ? selectedTabStyle : undefined
                }
              >
                تسجيل دخول
              </div>
            </li>
            <li
              className="list-inline-item small cursor-pointer"
              onClick={() => setShowContent(registerContent)}
            >
              <div
                className="dark-text"
                style={
                  showContent === loginContent ? undefined : selectedTabStyle
                }
              >
                إنشاء حساب
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
                      setCompeted(true);
                      setError(false);
                    })
                    .catch((error) => {
                      setCompeted(false);
                      setError(true);
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
                        setCompeted(false);
                        setError(true);
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
  setCompeted = () => true,
  setError = () => true,
  history,
}) => {
  useEffect(() => {
    swal({
      content: (
        <LoginPopUpContent
          setCompeted={(e) => {
            swal.close();
            setCompeted(e);
          }}
          setError={(e) => {
            swal.close();
            history.push("/auth/login");
            setError(e);
          }}
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
