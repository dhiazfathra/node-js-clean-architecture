import { User } from "../../../data/models/User";
import {
  DigitalEnvisionClient,
  IDigitalEnvisionClient,
} from "../../axios/digital-envision/DigitalEnvisionClient";
import { AxiosHttpClient } from "../../axios/HttpClient";

export const JobHandlers = {
  sendBirthdayEmail: async (
    job: { attrs: { data: User } },
    done: () => void
  ) => {
    const { data } = job.attrs;
    const httpClient = new AxiosHttpClient();
    const digitalEnvisionClient: IDigitalEnvisionClient =
      new DigitalEnvisionClient(httpClient);
    digitalEnvisionClient.sendEmail({
      email: data.email,
      message: "Hey, ${data.fullName} it’s your birthday",
    });
    done();
  },
};
