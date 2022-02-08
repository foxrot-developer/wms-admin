import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const admin_login = (data, navigation) => (dispatch) => {
  data.checkin_date_time = formatDateToString(new Date());
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
      console.log(error.response.data.message);
    });
};

export const getAllUserCheckIn = (id) => (dispatch) => {
  Axios.get(`admin/checkin/${id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_USER_CHECKIN,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
};

function formatDateToString(date) {
  var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

  var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

  return `${date.getFullYear()}-${MM}-${dd} ${date.getUTCHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
