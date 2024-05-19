import { basePath, sendEmailPath } from "../../../data/constants/Config";
import {
  SendEmailRequest,
  SendEmailResponse,
} from "../../../data/models/Email";
import { AxiosRetryClient } from "../AxiosRetryClient";

export interface IDigitalEnvisionClient {
  sendEmail(req: SendEmailRequest): Promise<SendEmailResponse>;
}

export class DigitalEnvisionClient implements IDigitalEnvisionClient {
  constructor(private readonly httpClient: AxiosRetryClient) {}

  async sendEmail(req: SendEmailRequest): Promise<SendEmailResponse> {
    const url = `${basePath}/${sendEmailPath}`;
    const response = await this.httpClient.post<SendEmailResponse>(url, req);
    return response.data;
  }
}
