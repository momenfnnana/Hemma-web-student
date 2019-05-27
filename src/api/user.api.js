import { getAuthenticatedAxios, getDataFromResponse } from "./helpers";

export const UserApiEndpoints = {
  getUser: () =>
    getAuthenticatedAxios()
      .get("users/me", {})
      .then(getDataFromResponse)
};
