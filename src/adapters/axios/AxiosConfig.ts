import axios, { AxiosRequestConfig } from "axios";
import https from "https";

const config: AxiosRequestConfig = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

export const axiosInstance = axios.create(config);
