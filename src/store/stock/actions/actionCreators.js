import * as actionTypes from './actionTypes';
import toast from '../../../shared/toast/toast';
import Axios from '../../../axios/axios';

export const getAllStock = () => dispatch => {
    Axios.get('api/stock/all')
        .then(response => {
            dispatch({
                type: actionTypes.ALL_STOCK,
                payload: response.data
            });
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.error);
        })
};

export const addStock = data => dispatch => {
    Axios.post('api/stock/add', data)
        .then(response => {
            dispatch(getAllStock());
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message);
        });
};

export const editStock = (stockId, data) => dispatch => {
    Axios.post(`api/stock/update/${stockId}`, data)
        .then(response => {
            dispatch(getAllStock());
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message);
        })
};