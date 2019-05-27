import { GET_USER } from "../actions";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER:
      if (action.error) return state;

      const user = action.payload;
      return user;

    default:
      return state;
  }
};
