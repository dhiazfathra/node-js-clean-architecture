import { JobAttributesData } from "agenda";
import { User } from "../../../data/models/User";
import { agenda } from "../scheduler";

interface CreateEmail extends JobAttributesData {
  user: User;
}

export const schedule = {
  sendBirthdayMail: async (data: CreateEmail): Promise<void> => {
    await agenda.now("send-birthday-mail", data);
  },
};
