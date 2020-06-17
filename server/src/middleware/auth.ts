import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import connection from "../database/connection";
const authConfig = require("../config/auth.json");

interface verifiedResponse {
  id?: string;
}

export default class {
  Auth = (req: Request, res: Response, next: Function) => {
    const { authorization } = req.headers;
  
    if (!authorization)
      return res.status(401).json({ error: { message: "Token not provided" } });
  
    let parts = authorization.split(" ");
  
    if (parts.length !== 2)
      return res.status(401).json({ error: { message: "Token error" } });
  
    let [schema, token] = parts;
  
    if (!/^Bearer$/.test(schema))
      return res.status(401).json({ error: { message: "Token malformated." } });
  
    jwt.verify(
      token,
      authConfig.secret,
      (err: VerifyErrors | null, decoded: verifiedResponse | undefined) => {
        if (err)
          return res.status(401).json({ error: { message: "Invalid token" } });
  
        req.body.id = decoded?.id;

        return next();
      }
    );
  };

  adminAuth = async (req: Request, res: Response, next: Function) => {
    const { id } = req.body;

    const [isAdmin] = await connection("users").select("adminPermission").where({
      id,
      adminPermission: true,
    });

    if (isAdmin?.adminPermission)
      return next();

    return res.status(401).json({
      error: {
        message: "User doesn't have admin privileges."
      }
    });
  }
}
