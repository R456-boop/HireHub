import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://hirehub-backend-fqbj.onrender.com",
    withCredentials: true
});

export default axiosInstance;