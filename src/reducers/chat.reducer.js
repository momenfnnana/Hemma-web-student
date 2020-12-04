import { SET_CURRENT_CHANNEL } from "../actions";

const initialChannelState = {
  currentChannel: null,
};

export const channelReducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };

    default:
      return state;
  }
};