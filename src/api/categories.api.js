import { getAuthenticatedAxios, getDataFromResponse } from "./helpers";

export const CategoriesApiEndpoints = {
  getCompetitions: categoryId =>
    getAuthenticatedAxios()
      .get(`/competitions?category=${categoryId}`, {})
      .then(getDataFromResponse),

  getCompetitionDetails: competitionId =>
    getAuthenticatedAxios()
      .get(`/Competitions/${competitionId}`, {})
      .then(getDataFromResponse)
};
