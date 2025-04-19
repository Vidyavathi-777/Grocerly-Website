import axios from "axios";
import { baseURL } from "/src/common/SummaryApi.js";
import SummaryApi from "../common/SummaryApi";


const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
    (response)=>{
        return response
    },
    async(error) =>{
        let originalRequest = error.config

        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')

            if(refreshToken){
                const newaccessToken = await refreshAccessToken(refreshToken)
                if(newaccessToken){
                    originalRequest.headers.Authorization = `Bearer ${newaccessToken}`
                    return Axios(originalRequest)
                }
    
            }

        }
        return Promise.reject(error)

        
    }
)

const refreshAccessToken = async(refreshToken)=>{
    try{
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers:{
                Authorization : `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.dat.accessToken
        // console.log(response)
        localStorage.setItem('accessToken',accessToken)
        return accessToken
    }catch(error){
        console.log(error)
    }

}

export default Axios;
