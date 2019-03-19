import axios from "axios";

export const GET_PROFILE = "getProfile";

export const getProfile = () => {
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: `Bearer ${token}`
  };
  const request = axios
    .get("https://api.staging.hemma.sa/api/v1/users/me", { headers })
    .then(response => response.data.data);

  return {
    type: GET_PROFILE,
    payload: request
  };
};
