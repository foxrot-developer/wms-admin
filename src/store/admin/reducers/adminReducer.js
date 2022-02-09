import * as actionTypes from '../actions/actionTypes';

const initialState = {
  admin: {},
  loggedIn: false,
  users: [],
  checkin: [],
  invoice: {},
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
    case actionTypes.GET_CUSTOMER_INVOICE:
      return {
        ...state,
        invoice: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
