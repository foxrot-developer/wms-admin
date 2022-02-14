import { GET_ALL_REQUEST, GET_ALL_WAREHOUSE } from './actionCreater';

const initialState = {
  warehouse: [],
  request: [],
};

const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WAREHOUSE:
      return {
        ...state,
        warehouse: action.payload,
      };
    case GET_ALL_REQUEST:
      return {
        ...state,
        request: action.payload,
      };
    default:
      return state;
  }
};

export default warehouseReducer;
