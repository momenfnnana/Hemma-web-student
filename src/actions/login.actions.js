import { Api } from "../api";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";
export const SEND_TOKEN = "sendToken";

export const loginAction = ({ countryCode, phoneNumber, password }) => {
  return {
    type: AUTHENTICATED,
    payload: Api.auth.login(countryCode, phoneNumber, password)
  };
};

export const signupUser = ({
  countryCode,
  phoneNumber,
  email,
  password,
  name,
  gender
}) => {
  return {
    type: UNAUTHENTICATED,
    payload: Api.auth.signup(
      countryCode,
      phoneNumber,
      email,
      password,
      name,
      gender
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
