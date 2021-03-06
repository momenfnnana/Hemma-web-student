import axios from "axios";

export const apiBaseUrl = process.env["REACT_APP_API_ENDPOINT"];

export const getAuthenticatedAxios = () => {
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: `Bearer ${token}`
  };

  return axios.create({
    baseURL: apiBaseUrl,
    headers
  });
};

export const getUnAuthenticatedAxios = () => {
  return axios.create({ baseURL: apiBaseUrl });
};

export const getDataFromResponse = response => response.data.data;
