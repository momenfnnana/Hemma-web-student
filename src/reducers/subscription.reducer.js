import { GET_SUBSCRIPTION } from "../actions";

export const subscriptionReducer = (state = null, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION:
      if (action.error) return state;

      const subscription = action.payload;
      const ratingStatus = action.payload.ratingStatus;
      return {
        subscription,
        ratingStatus
      };

    default:
      return state;
  }
};
