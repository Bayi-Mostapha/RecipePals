import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.BACKEND_URL,
});

export default axiosClient;
