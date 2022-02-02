import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: []
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}

export default ProductReducer;
