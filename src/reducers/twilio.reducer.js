import { GET_CHAT_TOKEN } from "../actions";
const Chat = require("twilio-chat");

export const twilioReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CHAT_TOKEN:
      if (action.error) return state;

      const accessToken = action.payload.token;
      return {
        token: accessToken,
        chatClient: Chat.Client.create(accessToken)
      };

    default:
      return state;
  }
};
