import { Api } from "../api";

export const GET_SUBSCRIPTION = "getSubscription";
export const ADD_RATE_VALUE = "addRateValue";

export const getSubscription = (courseId) => {
  return {
    type: GET_SUBSCRIPTION,
    payload: Api.subscription.getSubscription(courseId),
  };
};

export const addRateValue = (data) => {
  return {
    type: ADD_RATE_VALUE,
    payload: data,
  };
};
