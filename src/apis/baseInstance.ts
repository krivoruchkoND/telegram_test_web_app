import axios from "axios";

const baseUrl = "https://rockbotstaging.com"; // "https://prod.rockbotstaging.com"; for prod env
const apiUrl = `${baseUrl}/api`;

export type DetailedError = {
  detail: {
    name: string;
    message: string;
  };
};

const baseInstance = axios.create({
  baseURL: apiUrl,
});

export const updateBearer = (bearerToken: string) => {
  baseInstance.defaults.headers.common["Authorization"] =
    `Bearer ${bearerToken}`;
};

export default baseInstance;
