import { User } from "../../../data/models/User";
import { AxiosRetryClient } from "../../axios/AxiosRetryClient";
import {
  DigitalEnvisionClient,
  IDigitalEnvisionClient,
} from "../../axios/digital-envision/DigitalEnvisionClient";

export const JobHandlers = {
  sendBirthdayEmail: async (
    job: { attrs: { data: User } },
    done: () => void
  ) => {
    const { data } = job.attrs;
    const httpClient = new AxiosRetryClient();
    const digitalEnvisionClient: IDigitalEnvisionClient =
      new DigitalEnvisionClient(httpClient);
    digitalEnvisionClient.sendEmail({
      email: data.email,
      message: `Hey, ${data.fullName} it’s your birthday`,
    });
    done();
  },
};
