import { Api } from "../api";

export const GET_USER = "getUser";

export const getUser = () => {
  return {
    type: GET_USER,
    payload: Api.user.getUser()
  };
};
