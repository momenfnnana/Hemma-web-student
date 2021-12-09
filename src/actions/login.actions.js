import { Api } from "../api";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";
export const AUTHENTICATE_USER = "authenticate_user";
export const SEND_TOKEN = "sendToken";

export const loginAction = ({ countryCode, phoneNumber, password }) => {
  return {
    type: AUTHENTICATED,
    payload: Api.auth.login(countryCode, phoneNumber, password)
  };
};

export const loginFailed = error => {
  return {
    type: AUTHENTICATION_ERROR,
    error
  };
};

export const signupUser = ({
  countryCode,
  phoneNumber,
  email,
  password,
  name,
  gender,
  educationalLevel,
  educationalEntityId,
  saCityId,
    nationalityId,
    studentId
}) => {
  return {
    type: AUTHENTICATE_USER,
    payload: Api.auth.signup(
      countryCode,
      phoneNumber,
      email,
      password,
      name,
      gender,
      educationalLevel,
      educationalEntityId,
      saCityId,
        nationalityId,
        studentId
    )
  };
};

export const signOutAction = () => {
  return {
    type: UNAUTHENTICATED
  };
};

export const sendToken = () => {
  return {
    type: SEND_TOKEN,
    payload: Api.auth.sendToken()
  };
};
