import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR
} from "../actions/login.actions";
import jwtDecode from "jwt-decode";

export const authReducer = (state = null, action) => {
  if (!state) {
    // check if user is logged in
    const token = localStorage.getItem("token");
    const state = {
      ...extractTokenInfo(token),
      authenticated: token !== null
    };

    return state;
  }

  switch (action.type) {
    case AUTHENTICATED:
      // store the token
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...extractTokenInfo(action.payload.token),
        token: action.payload.token,
        authenticated: true
      };
    case UNAUTHENTICATED:
      // remove the token
      return { ...state, token: null, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
};

function extractTokenInfo(token) {
  if (!token) {
    return {
      phoneNumberConfirmed: false
    };
  }
  // decode token
  try {
    let decodedToken = jwtDecode(token);
    return {
      phoneNumberConfirmed: decodedToken.phoneNumberConfirmed
    };
  } catch (ex) {}
}
