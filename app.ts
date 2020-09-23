import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import path from 'path'

import indexRouter from './routes/index'
import userRouter from "./routes/user";
import serviceRouter from "./routes/service";

const app = express();

app.use(logger('tiny'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))


app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", serviceRouter);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(process.env["POSTGRES_URL"]);

    console.log(`Server started on http://localhost:${port}`)
})

export default app;