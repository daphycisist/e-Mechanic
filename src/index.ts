import express, { Request, Response, NextFunction } from 'express'
// import client from '../utilities/dbConnect'
import database from '../utilities/pg-config'

const { db, sql } = database;
const router = express.Router()



router.get("/", function homepage(_req: Request ,res: Response) {
    res.send("We're live")
})


export default router;