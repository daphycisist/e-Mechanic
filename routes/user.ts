import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/user", function userPage(_req: Request, res: Response) {
  res.send("Hope is alive man");
});

export default router;
