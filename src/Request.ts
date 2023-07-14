import { Request as Req } from "express";
import { Connection } from "typeorm";
import { Response, NextFunction } from "express";
import session from "express-session";

let connect: Connection = null;
export function setConnect(conn: Connection) {
  connect = conn;
}

export function AppUse(req: Request, res: Response, next: NextFunction) {
  req.connect = connect;
  next();
}

export interface Session extends session.Session {
  isAuth: boolean;
}

export interface Request extends Req {
  connect: Connection;
  session: Session;
}
