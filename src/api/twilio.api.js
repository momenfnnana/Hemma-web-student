import { getAuthenticatedAxios, getDataFromResponse } from "./helpers";

export const TwilioApiEndpoints = {
  getChatToken: () =>
    getAuthenticatedAxios()
      .post("auth/twilio/token", {})
      .then(getDataFromResponse)
};
