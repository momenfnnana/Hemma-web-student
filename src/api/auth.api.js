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

  signup: (
    countryCode,
    phoneNumber,
    email,
    password,
    name,
    gender,
    educationalLevel,
    educationalEntityId,
    saCityId
  ) =>
    getUnAuthenticatedAxios()
      .post("auth/register", {
        countryCode,
        phoneNumber,
        email,
        password,
        name,
        gender,
        educationalLevel,
        educationalEntityId,
        saCityId
      })
      .then(getDataFromResponse),

  getCities: () =>
    getAuthenticatedAxios()
      .get(`SACities/lookup`)
      .then(getDataFromResponse)
};
