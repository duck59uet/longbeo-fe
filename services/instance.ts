import { config } from '@/const';
import axios from 'axios';

const instance = axios.create({
  baseURL: config.API_ENDPOINT_URL
});

instance.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export default instance;
