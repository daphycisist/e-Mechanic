import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()



router.get("/", function homepage(_req: Request ,res: Response) {
    res.send("We're live")
})


export default router;