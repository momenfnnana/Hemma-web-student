import { Api } from "../api";

export const GET_COMPETITION_DETAILS = "getCompetitionDetails";

export const getCompetitionDetails = competitionId => {
  return {
    type: GET_COMPETITION_DETAILS,
    payload: Api.categories.getCompetitionDetails(competitionId)
  };
};
