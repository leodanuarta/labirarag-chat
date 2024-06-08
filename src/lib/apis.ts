import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.publicapis.org/entries',
  headers: {
    'Access-Control-Allow-Origin': '*', // Set the allowed origin, '*' for all or specify your domain
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Specify the allowed HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Specify the allowed headers
  },
};

const api = axios.create(axiosConfig);

export default api;
