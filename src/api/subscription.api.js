import { getAuthenticatedAxios, getDataFromResponse } from "./helpers";

export const SubscriptionApiEndpoints = {
  getSubscription: courseId =>
    getAuthenticatedAxios()
      .get(`/content/${courseId}`, {})
      .then(getDataFromResponse)
};
