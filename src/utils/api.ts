import axios from 'axios';


export const urlApi = 'http://localhost:3001'
export const axiosInstance = axios.create({
    baseURL: 'https://api-music-two.vercel.app',
    // You can add other default settings here
});


