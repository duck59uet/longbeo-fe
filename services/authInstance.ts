import { config } from '@/const';
import axios from 'axios';
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const instance = axios.create({
  baseURL: config.API_ENDPOINT_URL
});
const TOKEN_PAYLOAD_KEY = 'Authorization';

instance.interceptors.request.use(async (config) => {
  const tokens = localStorage.getItem('accessToken');
  if (tokens) {
    if (config.headers) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${tokens}`;
    }
  }
  return config;
});

export default instance;
