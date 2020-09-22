import express, { Request, Response, NextFunction } from 'express'
import {verifyToken} from "../controller/Auth";

const router = express.Router()

router.get("/", verifyToken, (_req: Request ,res: Response) => {
    res.send("We're live")
})


export default router;