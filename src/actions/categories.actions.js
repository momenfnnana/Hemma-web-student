import { Api } from "../api";

export const GET_COMPETITIONS = "getCompetitions";
export const GET_COMPETITION_DETAILS = "getCompetitionDetails";

export const getCompetitions = categoryId => {
  return {
    type: GET_COMPETITIONS,
    payload: Api.categories.getCompetitions(categoryId)
  };
};

export const getCompetitionDetails = competitionId => {
  return {
    type: GET_COMPETITION_DETAILS,
    payload: Api.categories.getCompetitionDetails(competitionId)
  };
};
