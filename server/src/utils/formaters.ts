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

const urlFormater = (route: string) => {
  const options = {
    dev: `http://localhost:${process.env.PORT}/`,
    production: ``,
  };

  return options[process.env.ENVIRONMENT as "dev" | "production"] + route;
};

export { dateFormater, urlFormater };
