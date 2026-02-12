
import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ||'http://localhost:7000',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const protectedRoutes = ['post/create', 'post/updatePost/', 'post/deletePost/','post/toggleLike/'];

    const isProtected = protectedRoutes.some((route) =>
      config.url.includes(route)
    );

    if (isProtected) {
      if (!token) {
        return Promise.reject(new axios.Cancel('Unauthorized: No token found')
   
    );
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;


