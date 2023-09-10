import axios from 'axios';

export const ClientAxios = axios.create({
  baseURL: '/api',
  responseType: 'json',
});

export const ServerAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL + '/api',
  responseType: 'json',
});
