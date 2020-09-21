import express, { Request, Response, NextFunction } from "express";
// import userAuth from "../controller/userAuth";
import  { UserAuthentication }  from "../controller/userAuth";

const router = express.Router();

router.post("/login", function userPage(req: Request, res: Response) {
  res.send("login is alive man");
  
});

router.post("/register", UserAuthentication.signup);


export default router;
