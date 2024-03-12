import axios from "axios";
import { toast } from "react-toastify";

const baseInstance = axios.create({
  baseURL: "https://rockbotstaging.com/api",
});

baseInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.detail ?? error.message;
    toast.error(message);
  },
);

export const updateBearer = (bearerToken: string) => {
  baseInstance.defaults.headers.common["Authorization"] =
    `Bearer ${bearerToken}`;
};

export default baseInstance;
