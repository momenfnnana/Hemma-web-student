import { Api } from "../api";

export const GET_CHAT_TOKEN = "getChatToken";

export const getChatToken = () => {
  return {
    type: GET_CHAT_TOKEN,
    payload: Api.twilio.getChatToken()
  };
};
