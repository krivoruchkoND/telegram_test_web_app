import axios from "axios";
import { toastError } from "@utils/toast";

export type BackendError = {
  detail: {
    name: string;
    message: string;
  };
};

const baseInstance = axios.create({
  baseURL: "https://rockbotstaging.com/api",
});

baseInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error?.response as BackendError | undefined;
    const title = response?.detail.name;
    const message: string = response?.detail.message ?? error.message;
    toastError({ title, message });
  },
);

export const updateBearer = (bearerToken: string) => {
  baseInstance.defaults.headers.common["Authorization"] =
    `Bearer ${bearerToken}`;
};

export default baseInstance;
