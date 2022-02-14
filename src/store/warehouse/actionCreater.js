import Axios from '../../axios/axios';
import toast from '../../shared/toast/toast';
export const GET_ALL_WAREHOUSE = 'GET_ALL_WAREHOUSE';
export const GET_ALL_REQUEST = 'GET_ALL_REQUEST';

export const getAllWarehouse = () => (dispatch) => {
  Axios.get('warehouse/all-warehouses')
    .then((res) => {
      dispatch({
        type: GET_ALL_WAREHOUSE,
        payload: res.data.warehouses,
      });
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
export const addWarehouse = (data) => (dispatch) => {
  Axios.post('warehouse/add', data)
    .then(() => {
      toast.success('Warehouse Added Successfully');
      dispatch(getAllWarehouse());
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
export const removeWarehouse = (id) => (dispatch) => {
  Axios.delete(`warehouse/delete/${id}`)
    .then(() => {
      toast.success('Warehouse Removed Successfully');
      dispatch(getAllWarehouse());
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const allWarehouseRequest = () => (dispatch) => {
  Axios.get('warehouse/all-requests')
    .then((res) => {
      dispatch({
        type: GET_ALL_REQUEST,
        payload: res.data.requests,
      });
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const requestStatus = (id, status) => (dispatch) => {
  Axios.patch(`warehouse/handle-request/${id}`, {
    approve: status,
  })
    .then(() => {
      toast.success('Request Updated Successfully');
      dispatch(allWarehouseRequest());
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
