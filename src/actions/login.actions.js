import { Api } from "../api";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";
export const GET_USER = "getUser";

export const loginAction = ({ countryCode, phoneNumber, password }) => {
  return {
    type: AUTHENTICATED,
    payload: Api.auth.login(countryCode, phoneNumber, password)
  };
};

export const getUser = () => {
  return {
    type: GET_USER,
    payload: Api.auth.getUser()
  };
};

export const signOutAction = () => {
  return {
    type: UNAUTHENTICATED
  };
};
