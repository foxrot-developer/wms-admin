import Axios from '../../../axios/axios';
import toast from '../../../shared/toast/toast';
import * as actionTypes from './actionTypes';

export const getAllShelf = () => (dispatch) => {
  Axios.get('shelf/all')
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_SHELF,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getAllShelfDetail = () => (dispatch) => {
  Axios.get('shelf/all-shelf')
    .then((value) => {
      dispatch({
        type: actionTypes.GET_ALL_SHELF_DETAIL,
        payload: value.data.response,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const addShelfProduct = (data) => (dispatch) => {
  Axios.post('shelf/add', data)
    .then((response) => {
      toast.success(response.data.message);
      dispatch(getAllShelf());
      dispatch(getAllShelfDetail());
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const editShelfProduct = (prodId, data) => (dispatch) => {
  Axios.patch(`shelf/update/${prodId}`, data)
    .then((response) => {
      toast.success(response.data.message);
      dispatch(getAllShelf());
      dispatch(getAllShelfDetail());
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const deleteShelfProduct = (prodId) => (dispatch) => {
  Axios.delete(`shelf/delete/${prodId}`)
    .then((response) => {
      toast.success(response.data.message);
      dispatch(getAllShelf());
      dispatch(getAllShelfDetail());
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};
