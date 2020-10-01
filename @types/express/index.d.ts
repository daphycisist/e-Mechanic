import { } from "../express";

declare global {
  namespace Express {
    interface Request {
        token: token
        userData: userData
    }
  }
}
