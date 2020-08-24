import redis from "redis";
import { Request, Response, NextFunction } from "express";

const redisPort = process.env.REDIS_PORT;

const cacheClient = redis.createClient({
  port: Number(redisPort),
});

const cachefy = (name: string, value: any) =>
  cacheClient.setex(name, 86400, JSON.stringify(value));

const productSpecializedCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;

  cacheClient.get(`product ${name}`, (err, stringifiedData) => {
    if (err || !stringifiedData) return next();

    const response = JSON.parse(stringifiedData as string);

    res.send(response);
  });
};

const cache = (name: string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    cacheClient.get(name, (err, stringifiedData) => {
      if (err || !stringifiedData) return next();

      const response = JSON.parse(stringifiedData as string);

      res.send(response);
    });
  };
};

export { cachefy, cache, productSpecializedCache };
