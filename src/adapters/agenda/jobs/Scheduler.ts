import { JobAttributesData } from "agenda";
import { User } from "../../../data/models/User";
import { agenda } from "../scheduler";
import moment from "moment";

interface CreateEmail extends JobAttributesData {
  user: User;
}

const getNextBirthdayAt9AMUTC = (user: User): Date => {
  const now = moment().utcOffset(user.timezoneOffset);
  const currentYear = now.year();
  let nextBirthday = moment({
    year: currentYear,
    month: user.dateOfBirth.getMonth(),
    day: user.dateOfBirth.getDate(),
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  }).utcOffset(user.timezoneOffset);

  if (now.isAfter(nextBirthday)) {
    nextBirthday = nextBirthday.add(1, "year");
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
    await agenda.every(cronExpression, "send-birthday-mail", data);
  },
};
