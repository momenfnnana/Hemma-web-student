import { GET_PROFILE } from "../actions/profile.actions";

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;

    default:
      return state;
  }
};
