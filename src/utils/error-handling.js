import errorResource from "../errors.json";

export const getErrorMsg = (errorID) => {
  let msg = errorResource?.[errorID] || "";
  return msg;
};
