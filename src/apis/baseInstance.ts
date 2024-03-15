import axios from "axios";

export type DetailedError = {
  detail: {
    name: string;
    message: string;
  };
};

const baseInstance = axios.create({
  baseURL: "https://prod.rockbotstaging.com",
});

export const updateBearer = (bearerToken: string) => {
  baseInstance.defaults.headers.common["Authorization"] =
    `Bearer ${bearerToken}`;
};

export default baseInstance;
