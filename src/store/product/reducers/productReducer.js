import * as actionTypes from '../actions/actionTypes';

const initialState = {
  floorProducts: [],
  pallentProducts: [],
  shelfProducts: [],
  productReport: [],
  productNearToExpire: [],
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
    case actionTypes.GET_PRODUCT_REPORT:
      return {
        ...state,
        productReport: action.payload,
      };
    case actionTypes.GET_PRODUCT_NEAR_TO_EXPIRE:
      return {
        ...state,
        productNearToExpire: action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
