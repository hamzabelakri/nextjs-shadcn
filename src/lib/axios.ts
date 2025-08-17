import { useAuthStore } from '@/store/auth-store';
import axios, { AxiosInstance } from 'axios';

const axiosApi: AxiosInstance  = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Optional: Request interceptor
axiosApi.interceptors.request.use(
  (config) => {
  const token = useAuthStore.getState().token;


    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle common error statuses globally here
    return Promise.reject(error);
  }
);

export default axiosApi;

