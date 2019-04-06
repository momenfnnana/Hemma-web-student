import { combineReducers } from "redux";
import { profileReducer } from "./profile.reducer";
import { reducer as formReducer } from "redux-form";
import { cartReducer } from "./cart.reducer";

export const hemmaReducer = combineReducers({
  form: formReducer,
  profile: profileReducer,
  cart: cartReducer
});
