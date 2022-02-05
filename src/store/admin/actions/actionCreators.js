import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const admin_login = (data) => (dispatch) => {
  Axios.post('api/admin/login', data)
    .then((response) => {
      dispatch({
        type: actionTypes.ADMIN_LOGIN,
        payload: response.data,
      });
      toast.success('Admin Login Successfully');
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getAllUsers = () => (dispatch) => {
  Axios.get('user/all-users')
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        payload: response.data.users,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
