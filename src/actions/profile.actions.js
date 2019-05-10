import axios from "axios";
import { apiBaseUrl } from "../api";

export const GET_PROFILE = "getProfile";

export const getProfile = () => {
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: `Bearer ${token}`
  };
  const request = axios
    .get(`${apiBaseUrl}/users/me`, { headers })
    .then(response => response.data.data);

  return {
    type: GET_PROFILE,
    payload: request
  };
};
