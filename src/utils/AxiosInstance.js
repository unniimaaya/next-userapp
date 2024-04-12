import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));
console.log("Access", token?.access);
const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // headers: {
    //     allowCredentials: true,
    //     "Content-Type": "application/json",
    //   },
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