import axios, { AxiosRequestHeaders } from 'axios';
import cookies from 'react-cookies';
import { API_URLS_V1 } from './constants';

const BASE_URL = '/api/';

export const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

refreshApi.interceptors.request.use(
  async (config) => {
    config.headers = await createAuthHeaders();
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

authApi.interceptors.request.use(
  async (config) => {
    config.headers = await createAuthHeaders();
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const accessToken = await Promise.resolve(cookies.load('accessToken'));

    /**
     * authApi로 reissue 요청이 오면 ininite request가 발생할 수 있음
     * 해당 authApi interceptor로 reissue 요청은 강제 reject
     * reissue는 별도의 refreshApi interceptor를 통해 요청
     */
    if (
      error.response?.status === 401 &&
      originalRequest === API_URLS_V1.REISSUE
    ) {
      return Promise.reject(error);
    }

    /**
     * 인증 에러 발생 시 쿠키에 토큰 정보가 있다면 새로운 토큰 발급 요청
     */
    if (error.response?.status === 401 && accessToken) {
      try {
      } catch (error) {}
    }

    return Promise.reject(error);
  },
);

async function createAuthHeaders(): Promise<AxiosRequestHeaders> {
  const accessToken = await Promise.resolve(cookies.load('accessToken'));
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}
