import axios from "axios";

const baseInstance = axios.create({
  baseURL: "https://rockbotstaging.com/api",
});

export default baseInstance;
