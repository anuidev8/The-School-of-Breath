import axios from 'axios';

//API

export const urlApi = 'https://api-music-two.vercel.app'
export const axiosInstance = axios.create({
    baseURL: 'https://api-music-two.vercel.app',
    // You can add other default settings here
});


