import {
  getAuthenticatedAxios,
  getDataFromResponse,
  getUnAuthenticatedAxios
} from "./helpers";

export const AuthApiEndpoints = {
  login: (countryCode, phoneNumber, password) =>
    getUnAuthenticatedAxios()
      .post("auth/login_with_phone", {
        countryCode,
        phoneNumber,
        password
      })
      .then(getDataFromResponse),

  getUser: () =>
    getAuthenticatedAxios()
      .get("users/me", {})
      .then(getDataFromResponse)
};
