import { AxiosResponse } from "axios";

export interface HttpClient {
  post<T>(url: string, data: any): Promise<AxiosResponse<T>>;
}
