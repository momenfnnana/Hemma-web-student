import { GET_USER, SET_DESIGN_TYPE } from "../actions";
const storedDesignType = localStorage.getItem('designType')

const initUserState = {
  designType : +storedDesignType ?? 0
}


export const userReducer = (state = initUserState, action) => {
  switch (action.type) {
    case GET_USER:
      if (action.error) return state;

      const user = action.payload;
      return {...state,...user};
    case SET_DESIGN_TYPE:
      return {
        ...state,
        designType :  action.designType
      }

    default:
      return state;
  }
};
