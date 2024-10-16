import { parseCookies } from 'nookies';
import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor to include the latest auth_token
axios.interceptors.request.use(
    (config) => {
        const cookies = parseCookies();
        const auth_token = cookies.auth_token;
        if (auth_token) {
            config.headers['Authorization'] = `Bearer ${auth_token}`;
        } else {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;
