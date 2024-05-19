import { JobAttributesData } from "agenda";
import { User } from "../../../data/models/User";
import { agenda } from "../scheduler";
import moment from "moment";
import { JobHandlers } from "./Handlers";

interface CreateEmail extends JobAttributesData {
  user: User;
}

const getNextBirthdayAt9AMUTC = (user: User): Date => {
  const now = moment().utcOffset(user.timezoneOffset);
  const currentYear = now.year();
  const month = user.dateOfBirth.getMonth();
  const day = user.dateOfBirth.getDate();

  let nextBirthday = moment({
    year: currentYear,
    month: month,
    date: day,
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  }).utcOffset(user.timezoneOffset);

  // Check if the user's birthday is February 29
  // If the user's birthday is February 29 and the current year is not a leap year
  if (month === 1 && day === 29 && !nextBirthday.isLeapYear()) {
    // Set next birthday to February 28 in non-leap years
    nextBirthday = moment({
      year: currentYear,
      month: 1,
      date: 28,
      hour: 9,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).utcOffset(user.timezoneOffset);
  }

  // If the current time is after the next birthday, move to the next year
  if (now.isAfter(nextBirthday)) {
    nextBirthday.add(1, "year");
    // Adjust for leap year again if the next year is not a leap year
    if (month === 1 && day === 29 && !nextBirthday.isLeapYear()) {
      nextBirthday = moment({
        year: nextBirthday.year(),
        month: 1,
        date: 28,
        hour: 9,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).utcOffset(user.timezoneOffset);
    }
  }

  return nextBirthday.utc().toDate();
};

const getCronExpressionFromDate = (
  date: Date,
  timezoneOffset: number
): string => {
  const momentDate = moment(date).utcOffset(timezoneOffset);
  const minute = momentDate.minute();
  const hour = momentDate.hour();
  const day = momentDate.date();
  const month = momentDate.month() + 1; // Cron months are 1-based

  // Cron expression for the specific date at 9 AM in user's local time
  return `${minute} ${hour} ${day} ${month} *`;
};

export const schedule = {
  sendBirthdayMail: async (data: CreateEmail): Promise<void> => {
    const nextBirthdayUTC = getNextBirthdayAt9AMUTC(data.user);
    const cronExpression = getCronExpressionFromDate(
      nextBirthdayUTC,
      data.user.timezoneOffset
    );
    agenda.define(
      `send-birthday-mail-to-${data.user.email}`,
      JobHandlers.sendBirthdayEmail
    );
    await agenda.every(
      cronExpression,
      `send-birthday-mail-to-${data.user.email}`,
      data
    );
  },
};
