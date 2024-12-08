import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://ecommerce-web82-be-1-akaa.onrender.com/api/v1/',
    headers: {
        "Content-Type": 'application/json',
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

export default axiosClient;