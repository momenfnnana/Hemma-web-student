import { combineReducers } from "redux";
import { profileReducer } from "./profile.reducer";
import { reducer as formReducer } from "redux-form";

export const hemmaReducer = combineReducers({
  form: formReducer,
  profile: profileReducer
});
