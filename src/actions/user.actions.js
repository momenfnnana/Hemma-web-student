import { Api } from "../api";

export const GET_USER = "getUser";
export const SET_DESIGN_TYPE = "SET_DESIGN_TYPE";

export const setDeisgnType = (designType)=>({
  type : SET_DESIGN_TYPE,
  designType
})

export const getUser = () => {
  return {
    type: GET_USER,
    payload: Api.user.getUser()
  };
};
