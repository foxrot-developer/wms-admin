import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const admin_login = (data, navigation) => (dispatch) => {
  Axios.post('admin/login', data)
    .then((response) => {
      console.log({ response });
      toast.success('Admin Login Successfully');
      dispatch({
        type: actionTypes.ADMIN_LOGIN,
        payload: response.data.user,
      });
      navigation('dashboard');
    })
    .catch((error) => {
      console.log({ error });
      toast.error(error);
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
