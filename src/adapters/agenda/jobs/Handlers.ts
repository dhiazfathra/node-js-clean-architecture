export const JobHandlers = {
  sendBirthdayEmail: async (
    job: { attrs: { data: any } },
    done: () => void
  ) => {
    const { data } = job.attrs;
    // TODO: Hit 3rd party API to send email
    // await mailService.birthday(data);
    done();
  },
};
