import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import connection from "../database/connection";
import AppError from "../errors/AppError";

interface verifiedResponse {
  id?: string;
}

export default class {
  Auth = (req: Request, res: Response, next: Function) => {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError("Token not provided", 401);

    let parts = authorization.split(" ");

    if (parts.length !== 2) throw new AppError("Token error", 401);

    let [schema, token] = parts;

    if (!/^Bearer$/.test(schema)) throw new AppError("Token malformated.", 401);

    jwt.verify(
      token,
      process.env.JWT_SESSION_TOKEN_SECRET as string,
      (err: VerifyErrors | null, decoded: verifiedResponse | undefined) => {
        if (err) throw new AppError("Invalid token", 401);

        req.user = {
          id: decoded?.id as string,
        };

        return next();
      }
    );
  };

  adminAuth = async (req: Request, res: Response, next: Function) => {
    const { id } = req.user;

    const [isAdmin] = await connection("users")
      .select("adminPermission")
      .where({
        id,
        adminPermission: true,
      });

    if (isAdmin?.adminPermission) return next();

    throw new AppError("User doesn't have admin privileges.", 401);
  };
}
