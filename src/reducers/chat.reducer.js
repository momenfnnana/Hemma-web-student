import { CHANGE_CHANNEL } from "../actions";

const initialState = {
  channelType: null,
  channelId: 0
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return action.payload;

    default:
      return state;
  }
};
