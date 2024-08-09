import axios from 'axios';
// import setAuthorization from './setAuthorization';
// import refresh from './refresh';

const BASE_URL = import.meta.env.VITE_API_PREFIX;

const axiosRequestConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

const axiosWithCredentialConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
};

console.log(BASE_URL)
// 일반 요청을 위한 인스턴스
export const axiosCommonInstance = axios.create(axiosRequestConfig);

// 인증이 필요한 요청을 위한 인스턴스
export const axiosWithCredentialInstance = axios.create(axiosWithCredentialConfig);

// // 요청 인터셉터 설정
axiosCommonInstance.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem("ACCESS_TOKEN");
    if(token){
      config.headers.Authorization = localStorage.getItem("ACCESS_TOKEN");
    }
    return config;
  }
);
// axiosWithCredentialInstance.interceptors.request.use(setAuthorization);

// // 응답 인터셉터 설정 (토큰 갱신)
// axiosWithCredentialInstance.interceptors.response.use(
//   response => response,
//   error => refresh(error)
// );