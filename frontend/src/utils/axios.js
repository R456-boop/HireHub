import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://hire-hub-rust.vercel.app",
    withCredentials: true
});
export default axiosInstance;


