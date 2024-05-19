import {
  DigitalEnvisionClient,
  IDigitalEnvisionClient,
} from "../../axios/digital-envision/DigitalEnvisionClient";
import { AxiosHttpClient } from "../../axios/HttpClient";

export const JobHandlers = {
  sendBirthdayEmail: async (
    job: { attrs: { data: any } },
    done: () => void
  ) => {
    const { data } = job.attrs;
    const httpClient = new AxiosHttpClient();
    const digitalEnvisionClient: IDigitalEnvisionClient =
      new DigitalEnvisionClient(httpClient);
    // TODO: Implement proper send birthday email logic
    digitalEnvisionClient.sendEmail({
      email: "test@digitalenvision.com.au",
      message: "Test Message",
    });
    done();
  },
};
