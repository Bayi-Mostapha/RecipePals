import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http://localhost:5000/',
});
axiosClient.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
})

export default axiosClient;
