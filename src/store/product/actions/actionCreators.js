import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const getAllProducts = () => dispatch => {
    Axios.get('api/product/all')
        .then(response => {
            dispatch({
                type: actionTypes.ALL_PRODUCTS,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.error);
        })
};

export const addProduct = data => dispatch => {
    Axios.post('api/product/add', data)
        .then(response => {
            dispatch(getAllProducts());
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message);
        });
};

export const editProduct = (prodId, data) => dispatch => {
    Axios.post(`api/product/update/${prodId}`, data)
        .then(response => {
            dispatch(getAllProducts());
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message);
        })
};

export const deleteProduct = prodId => dispatch => {
    Axios.delete(`api/product/delete/${prodId}`)
        .then(response => {
            dispatch(getAllProducts());
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message);
        })
};