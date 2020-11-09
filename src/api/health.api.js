import { getDataFromResponse,getUnAuthenticatedAxios } from "./helpers";

export const readyApiEndpoints = {
  checkAppHealthy: () =>
  getUnAuthenticatedAxios()
      .get('ready')
      .then(getDataFromResponse)
};
