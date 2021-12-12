import { GET_SUBSCRIPTION, ADD_RATE_VALUE } from "../actions";
const initialState = {
  rateValue: {},
};
export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION:
      if (action.error) return state;

      const subscription = action.payload;
      const ratingStatus = action.payload.ratingStatus;
      return {
        subscription,
        ratingStatus,
      };
    case ADD_RATE_VALUE:
      return { ...state, rateValue: action.payload };

    default:
      return state;
  }
};
