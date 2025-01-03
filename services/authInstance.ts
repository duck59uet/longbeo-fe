import { config } from '@/const';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const secret = process.env.NEXTAUTH_SECRET;

const authInstance = axios.create({
  baseURL: config.API_ENDPOINT_URL
});
const TOKEN_PAYLOAD_KEY = 'Authorization';

authInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;
  
  if (token) {
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${token}`;
    }
  }
  return config;
});

export default authInstance;
