import postgres from "postgres"
//import connect, { sql } from '@databases/pg'
import dotenv from 'dotenv'


dotenv.config()
const connectionString = process.env.POSTGRES_URL as string


const sql = postgres(connectionString);


export default sql
