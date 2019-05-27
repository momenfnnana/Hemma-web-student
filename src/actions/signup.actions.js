import { Api } from "../api";

export const SIGNUP_USER = "signupUser";

export const signupUser = ({
  countryCode,
  phoneNumber,
  email,
  password,
  name,
  gender
}) => {
  return {
    type: SIGNUP_USER,
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
