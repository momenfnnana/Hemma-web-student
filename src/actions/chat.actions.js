export const CHANGE_CHANNEL = "changeChannel";

export const changeChannel = (channel, id) => {
  return {
    type: CHANGE_CHANNEL,
    payload: { channel, id }
  };
};
