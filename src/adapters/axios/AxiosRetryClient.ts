import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosHttpClient, HttpClient } from "./HttpClient";

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

export class AxiosRetryClient extends AxiosHttpClient {
  private readonly maxRetries: number;
  private readonly retryDelay: number;
  private readonly instance: AxiosInstance;

  constructor(
    maxRetries = DEFAULT_MAX_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY
  ) {
    super();
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
    this.instance = axios.create();

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => this.handleRetry(error, this.instance)
    );
  }

  private async handleRetry(
    error: any,
    instance: AxiosInstance,
    retryCount = 0
  ): Promise<AxiosResponse> {
    if (retryCount >= this.maxRetries) {
      // Maximum retries reached, throw the error
      throw error;
    }

    // Wait for the specified retry delay
    await new Promise((resolve) => setTimeout(resolve, this.retryDelay));

    // Retry the original request
    return instance.request(error.config);
  }

  async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data);
  }
}
