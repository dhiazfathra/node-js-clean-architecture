import { basePath, sendEmailPath } from "../../../data/constants/Config";
import {
  SendEmailRequest,
  SendEmailResponse,
} from "../../../data/models/Email";
import { AxiosRetryClient } from "../AxiosRetryClient";
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export interface IDigitalEnvisionClient {
  sendEmail(req: SendEmailRequest): Promise<SendEmailResponse>;
}

export class DigitalEnvisionClient implements IDigitalEnvisionClient {
  constructor(private readonly httpClient: AxiosRetryClient) {}

  async sendEmail(req: SendEmailRequest): Promise<SendEmailResponse> {
    const url = `${basePath}/${sendEmailPath}`;
    let response: SendEmailResponse;

    try {
      const result = await this.httpClient.post<SendEmailResponse>(url, req);
      response = result.data;
      this.logResponse(req.email, response, true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        response = error.response.data;
      } else {
        response = { message: (error as Error).message };
      }
      this.logResponse(req.email, response, false);
      throw error;
    }

    return response;
  }

  private logResponse(email: string, response: SendEmailResponse, success: boolean): void {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const status = success ? 'success' : 'error';
    const logFilename = `${timestamp}_${email}_${status}.log`;
    const logFilePath = path.join(__dirname, 'logs', logFilename);

    const logContent = JSON.stringify(response, null, 2);

    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    fs.writeFileSync(logFilePath, logContent, 'utf8');
  }
}
