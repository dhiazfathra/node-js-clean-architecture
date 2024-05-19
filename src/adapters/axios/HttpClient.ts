import { AxiosResponse } from "axios";
import { AxiosRetryClient } from "./AxiosRetryClient";
import { axiosInstance } from "./AxiosConfig";

export interface HttpClient {
  post<T>(url: string, data: any): Promise<AxiosResponse<T>>;
}

export class AxiosHttpClient implements HttpClient {
  async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return axiosInstance.post<T>(url, data);
  }
}

export const axiosRetryClient = new AxiosRetryClient();
