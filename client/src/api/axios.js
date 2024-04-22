import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http://localhost:5000/',
});

export default axiosClient;
