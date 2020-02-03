import { Api } from "../api";

export const GET_SUBSCRIPTION = "getSubscription";

export const getSubscription = courseId => {
  return {
    type: GET_SUBSCRIPTION,
    payload: Api.subscription.getSubscription(courseId)
  };
};
