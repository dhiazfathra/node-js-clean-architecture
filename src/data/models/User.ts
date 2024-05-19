export interface User {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  /** The difference in minutes between Universal Coordinated Time (UTC) and the user local time. */
  timezoneOffset: number;
}
