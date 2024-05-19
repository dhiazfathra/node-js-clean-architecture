import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AxiosHttpClient } from "./HttpClient";

const DEFAULT_MAX_RETRIES = 50;
const DEFAULT_RETRY_DELAY = 100; // 0.1 second
const DEFAULT_BACKOFF_FACTOR = 2;

export class AxiosRetryClient extends AxiosHttpClient {
  private readonly maxRetries: number;
  private readonly retryDelay: number;
  private readonly backoffFactor: number;
  private readonly instance: AxiosInstance;

  constructor(
    maxRetries = DEFAULT_MAX_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    backoffFactor = DEFAULT_BACKOFF_FACTOR
  ) {
    super();
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
    this.backoffFactor = backoffFactor;
    this.instance = axios.create();

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => this.handleRetry(error, this.instance, this.retryDelay)
    );
  }

  private async handleRetry(
    error: any,
    instance: AxiosInstance,
    retryDelay: number,
    retryCount = 0
  ): Promise<AxiosResponse> {
    if (retryCount >= this.maxRetries) {
      // Maximum retries reached, throw the error
      throw error;
    }

    // Wait for the specified retry delay with exponential backoff
    const delay = retryDelay * Math.pow(this.backoffFactor, retryCount);
    await new Promise((resolve) => setTimeout(resolve, delay));

    return instance.request(error.config);
  }

  async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data);
  }
}
