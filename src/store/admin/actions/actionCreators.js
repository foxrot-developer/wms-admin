import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const admin_login = data => dispatch => {
    dispatch({
        type: actionTypes.ADMIN_LOGIN,
        payload: {email: 'admin@gmail.com'}
    });
};