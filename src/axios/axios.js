import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://wmsss.herokuapp.com/',
});

export default Axios;