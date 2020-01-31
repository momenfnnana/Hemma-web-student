import { GET_COMPETITION_DETAILS } from "../actions";

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMPETITION_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
