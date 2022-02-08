import * as actionTypes from '../actions/actionTypes';

const initialState = {
  admin: {},
  loggedIn: false,
  users: [],
  checkin: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload,
        loggedIn: true,
      };
    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.GET_ALL_USER_CHECKIN:
      return {
        ...state,
        checkin: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
