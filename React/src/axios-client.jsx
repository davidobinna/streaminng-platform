import axios from "axios";
import { Navigate } from "react-router-dom";


const serverUrl = 'http://localhost:8000'
const axiosClient = axios.create({
  baseURL: `${serverUrl}/api`
})
axiosClient.defaults.headers['Content-Type'] = 'application/json';
axiosClient.defaults.headers['Accept'] = 'application/json';
axiosClient.defaults.headers['header'] = 'application/json';
axiosClient.withCredentials = true;

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
    if(error.response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('ACCESS_ADMIN')
        localStorage.removeItem('ACCESS_DEFAULT')
        throw error.response.statusText;
    }
    if(error.response.status === 404){
        throw error.response.statusText;
    }
    if(error.response.status === 500){
        throw error.response.statusText;
    }
    if(error.response.status === 403){
        localStorage.removeItem('ACCESS_TOKEN')
        throw error.response.statusText;
    }
    if(error.response.status === 422){
        throw error.response.data;
    }
})

export default axiosClient
