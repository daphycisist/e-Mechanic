import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import path from 'path'
import pg from 'pg'
import indexRouter from './routes/index'
import userRouter from "./routes/user";
// import database from './utilities/pg-config'
import serviceRouter from "./routes/service";


// const { auth } = database;
const app = express();



// app.use("/signup", signup);
// app.use("/login", login);
// app.use("/refresh", refresh);

app.use(logger('tiny'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))



app.use("/", indexRouter);
app.use("/api/users", userRouter);
app.use("/", userRouter);
app.use("/", serviceRouter);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(process.env["POSTGRES_URL"]);

    console.log(`Server started on http://localhost:${port}`)
})

export default app;