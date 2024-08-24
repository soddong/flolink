import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_PREFIX;

const axiosRequestConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

console.log(BASE_URL)

export const axiosCommonInstance = axios.create(axiosRequestConfig);

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/reissue`, {}, {
      withCredentials: true
    });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("ACCESS_TOKEN", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    localStorage.removeItem("ACCESS_TOKEN");
    document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login';
    throw error;
  }
};

//엑세스 토큰 체크 로직
axiosCommonInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }
);

axiosCommonInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const newAccessToken = await refreshAccessToken();
      
      if (newAccessToken) {
        console.log("accessToken 재발급 받음")
        console.log("새 accessToken")
        console.log(newAccessToken)
        localStorage.setItem("ACCESS_TOKEN",newAccessToken);
        originalRequest.headers.Authorization = newAccessToken;
        return axiosCommonInstance(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);