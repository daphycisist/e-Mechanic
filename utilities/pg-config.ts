import postgres from "postgres"
import dotenv from 'dotenv'

dotenv.config()
const connectionstring = process.env.DATABASE_URL as string; 

const sql = postgres(connectionstring);
console.log("Connected to Database");
export default sql
