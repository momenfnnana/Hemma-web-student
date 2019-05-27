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

  sendToken: () =>
    getAuthenticatedAxios()
      .post("auth/phone/send_token")
      .then(getDataFromResponse),

  signup: (countryCode, phoneNumber, email, password, name, gender) =>
    getUnAuthenticatedAxios()
      .post("auth/register", {
        countryCode,
        phoneNumber,
        email,
        password,
        name,
        gender
      })
      .then(getDataFromResponse)
};
