import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const addProduct = (data) => (dispatch) => {
  Axios.post('product/add', data)
    .then((response) => {
      dispatch(getAllProducts());
      toast.success(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const editProduct = (prodId, data) => (dispatch) => {
  Axios.patch(`product/update/${prodId}`, data)
    .then((response) => {
      dispatch(getAllProducts());
      toast.success(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const deleteProduct = (prodId) => (dispatch) => {
  Axios.delete(`product/delete/${prodId}`)
    .then((response) => {
      dispatch(getAllProducts());
      toast.success(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getAllProducts = () => (dispatch) => {
  dispatch(getAllFloorProducts());
  dispatch(getAllPallentProducts());
  dispatch(getAllShelfProducts());
};

export const getAllShelfProducts = () => (dispatch) => {
  Axios.get('product/all-shelf')
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_SHELF_PRODUCTS,
        payload: response.data.products,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_ALL_SHELF_PRODUCTS,
        payload: [],
      });
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getAllPallentProducts = () => (dispatch) => {
  Axios.get('product/all-pallet')
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_PALLENT_PRODUCTS,
        payload: response.data.products,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_ALL_PALLENT_PRODUCTS,
        payload: [],
      });
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getAllFloorProducts = () => (dispatch) => {
  Axios.get('product/all-floor')
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ALL_FLOOR_PRODUCTS,
        payload: response.data.products,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_ALL_FLOOR_PRODUCTS,
        payload: [],
      });
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getProductReport = (data) => (dispatch) => {
  Axios.post('product/product-report', data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_REPORT,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_REPORT,
        payload: [],
      });
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getProductNearToExpire = () => (dispatch) => {
  Axios.post('product/product-expiry', {
    today_date: formatDateToString(new Date()),
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_NEAR_TO_EXPIRE,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_NEAR_TO_EXPIRE,
        payload: [],
      });
      console.log(error);
      toast.error(error.response.data.message);
    });
};

export const getProductByBarcode = (barcode) => (dispatch) => {
  Axios.post('product/barcode-reader', {
    barcode: barcode,
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_BY_BARCODE,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_BY_BARCODE,
        payload: [],
      });
      console.log(error);
      toast.error(error.response.data.message);
    });
};

const formatDateToString = (date) => {
  var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

  var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

  return `${date.getFullYear()}-${MM}-${dd}`;
};
