import * as actionType from '../actions/actionTypes';

const initialState = {
  shelfAll: [],
  shelfAllDetail: [],
};

const shelfReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_SHELF:
      return {
        ...state,
        shelfAll: action.payload,
      };
    case actionType.GET_ALL_SHELF_DETAIL:
      return {
        ...state,
        shelfAllDetail: action.payload,
      };
    default:
      return state;
  }
};

export default shelfReducer;
