import express, { Request, Response, NextFunction } from "express";
import Controller from "../controller/controller";

const router = express.Router();

router.get("/user", function userPage(_req: Request, res: Response) {
  res.send("Hope is alive man");
});

router.post("/signup", Controller.signup)
router.post("/login", Controller.login);


export default router;