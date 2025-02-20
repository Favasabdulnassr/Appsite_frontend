import axios from "axios";
import { fetchNewAccessToken } from "./refresh";
import { logout } from "../Redux/loginReducer";




const axiosInstance = axios.create({
    baseURL:"http://127.0.0.1:8000/",
});


export const setupAxiosInterceptors = (dispatch) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const tokens  = JSON.parse(localStorage.getItem('authTokens'));
            const token = tokens?.access;
            if (token){
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            
            return response
        },

        async (error) => {
            const originalRequest = error.config;

            if(error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;


                try {
                    const response = await fetchNewAccessToken();
                    const newAccessToken = response.data;
                    const tokens = { access:newAccessToken.access,refresh:newAccessToken.refresh};
                    
                    localStorage.setItem("authTokens",JSON.stringify(tokens));
                    return axiosInstance(originalRequest)
                } catch (error) {
                    console.log('Refresh tokens is invalid. Loggin out....',error)
                    dispatch(logout())

                    return Promise.reject(error);
                    
                }
            }
            return Promise.reject(error);

        }
    );
};

export default axiosInstance