import axios from "axios";

const baseUrl = "https://prod.rockbotstaging.com"; // https://rockbotstaging.com for stage env
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
