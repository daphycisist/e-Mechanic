import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import path from 'path'
import pg from 'pg'
import indexRouter from './src/index'
import userRouter from "./src/user";
import database from './utilities/pg-config'

const { auth } = database;
const app = express();

app.use("/", indexRouter);
app.use("/", userRouter);



app.use(logger('tiny'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(process.env["DATABASE_URL"]);

    auth()
    console.log(`Server started on http://localhost:${port}`)
})

export default app;