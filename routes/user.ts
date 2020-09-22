import express, { Request, Response, NextFunction } from "express";
import  { Controller }  from "../controller/controller";

const router = express.Router();

router.post("/login", Controller.login);

router.post("/register", Controller.signup);


export default router;
