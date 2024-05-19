import Agenda from "agenda";
import { mailDefinitions } from "./Mails";

const definitions = [mailDefinitions];

export const allDefinitions = (agenda: Agenda) => {
  definitions.forEach((definition) => definition(agenda));
};
