import { GET_ALL_STOCK } from '../action/actionCreator';

const initialState = {
  stock: [],
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STOCK:
      return {
        ...state,
        stock: action.payload,
      };
    default:
      return state;
  }
};

export default stockReducer;
