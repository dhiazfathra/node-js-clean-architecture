import Agenda from "agenda";
import { JobHandlers } from "../Handlers";

export const mailDefinitions = (agenda: Agenda) => {
  agenda.define("send-birthday-mail", JobHandlers.sendBirthdayEmail);
};
