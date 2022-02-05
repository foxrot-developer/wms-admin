import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://wmsss.herokuapp.com/api/',
});

export default Axios;
