// import { UserModel } from "../../src/user/user.model";
import { } from "../express";


declare global {
  namespace Express {
    interface Request {
        token: token
        userData: object | string
    }
  }
}
