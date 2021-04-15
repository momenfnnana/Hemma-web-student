export const SET_CURRENT_CHANNEL = "setCurrentChannel";

export const setCurrentChannel = channel => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  };
};