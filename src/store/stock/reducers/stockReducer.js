import * as actionTypes from '../actions/actionTypes';

const initialState = {
    stock: []
};

const StockReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_STOCK:
            return {
                ...state,
                stock: action.payload
            };
        default:
            return state;
    }
}

export default StockReducer;
