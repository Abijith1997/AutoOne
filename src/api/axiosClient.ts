import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://auto1-mock-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
