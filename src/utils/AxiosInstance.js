import axios from "axios";

 const NEXT_PUBLIC_BASE_URL="https://interview.enfono.com/api_bcc"

const token = JSON.parse(localStorage.getItem("user"));
console.log("Access", token?.access);
const AxiosInstance = axios.create({
    baseURL: NEXT_PUBLIC_BASE_URL,

  });
  
 export const LoginInstance = axios.create({
    baseURL: NEXT_PUBLIC_BASE_URL,

  });




    AxiosInstance.interceptors.request.use(
        (config) => {
          console.log(config, "Config");
          console.log(localStorage.getItem("AccessToken", "userPermissions"));
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${JSON.parse(
              localStorage.getItem("AccessToken", "userPermissions")
            )}`;
          }
      
          return config;
        },
        (error) => Promise.reject(error)
      );


  


  export default AxiosInstance;

