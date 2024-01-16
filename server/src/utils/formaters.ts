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

const urlFormatter = (route: string) => {
  const options = {
    dev: `http://localhost:${process.env.PORT}/`,
    production: `https://ecommerce1-api.herokuapp.com/`,
  };

  return options[process.env.ENVIRONMENT as "dev" | "production"] + route;
};

const frontendUrlFormatter = (route: string) => {
  const options = {
    dev: `http://localhost:${process.env.FE_PORT ?? 3000}/`,
    production: `??`,
  };

  return options[process.env.ENVIRONMENT as "dev" | "production"] + route;
};

export { dateFormater, urlFormatter, frontendUrlFormatter };
