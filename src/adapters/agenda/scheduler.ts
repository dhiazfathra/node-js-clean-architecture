import Agenda from "agenda";
import { allDefinitions } from "./jobs/definitions";
import { mongoConnectionString } from "../../data/constants/Config";

// Init Singleton Agenda
export const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: "agendaJobs",
  },
});
allDefinitions(agenda);
agenda
  .on("ready", () => console.log("Agenda started!"))
  .on("error", () => console.log("Agenda connection error!"));

module.exports = agenda;
