import Axios from '../../../axios/axios';
import toast from '../../../shared/toast/toast';

export const GET_ALL_STOCK = 'GET_ALL_STOCK';
export const ADD_STOCK = 'ADD_STOCK';
export const REMOVED_STOCK = 'REMOVED_STOCK';

export const getAllStock = () => (dispatch) => {
  Axios.get('stock/all-stock')
    .then((response) => {
      dispatch({
        type: GET_ALL_STOCK,
        payload: response.data.stock,
      });
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const addStock = (data) => (dispatch) => {
  Axios.post('stock/add', data)
    .then(() => {
      dispatch(getAllStock());
      toast.success('Stock Added Successfully');
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const removeStock = (id) => (dispatch) => {
  Axios.delete(`stock/delete/${id}`)
    .then(() => {
      dispatch(getAllStock());
      toast.success('Stock Removed Successfully');
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
