import { combineReducers } from "redux";
import { profileReducer } from "./profile.reducer";
import { reducer as formReducer } from "redux-form";
import { cartReducer } from "./cart.reducer";
import { authReducer } from "./auth.reducer";
import { userReducer } from "./user.reducer";
import { twilioReducer } from "./twilio.reducer";
import { chatReducer } from "./chat.reducer";

export const hemmaReducer = combineReducers({
  form: formReducer,
  profile: profileReducer,
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
  twilio: twilioReducer,
  chat: chatReducer
});
