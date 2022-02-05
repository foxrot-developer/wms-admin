import * as actionTypes from '../actions/actionTypes';

const initialState = {
  floorProducts: [],
  pallentProducts: [],
  shelfProducts: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_FLOOR_PRODUCTS:
      return {
        ...state,
        floorProducts: action.payload,
      };
    case actionTypes.GET_ALL_PALLENT_PRODUCTS:
      return {
        ...state,
        pallentProducts: action.payload,
      };
    case actionTypes.GET_ALL_SHELF_PRODUCTS:
      return {
        ...state,
        shelfProducts: action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
