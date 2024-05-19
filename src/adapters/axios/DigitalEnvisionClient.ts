import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { basePath, sendEmailPath } from "../../data/constants/Config";
import https from "https";
import { SendEmailRequest, SendEmailResponse } from "../../data/models/Email";

const config: AxiosRequestConfig = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

export const digitalEnvisionClient = {
  sendEmail: async (
    req: SendEmailRequest
  ): Promise<AxiosResponse<SendEmailResponse, any>> => {
    const response = await axios.post<SendEmailResponse>(
      `${basePath}/${sendEmailPath}`,
      <SendEmailRequest>req,
      config
    );
    return response;
  },
};
