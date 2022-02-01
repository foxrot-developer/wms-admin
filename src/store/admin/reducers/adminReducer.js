
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    admin: {},
    loggedIn : false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN:
            return {
                ...state,
                admin: action.payload,
                loggedIn: true
            }
        default:
            return state;
    }
}

export default adminReducer;