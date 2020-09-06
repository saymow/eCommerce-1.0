const dateFormater = {
  apiToDb(date: string) {
    const [day, month, year] = date.split("-");

    return `${year}-${month}-${day}`;
  },
  dbToApi: (date: Date) =>
    `${date.getUTCDate()}-${
      date.getUTCMonth() + 1 // UTCMonth is 0 indexed
    }-${date.getFullYear()}`,
};

export { dateFormater };
