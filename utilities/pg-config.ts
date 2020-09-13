import connect, { sql } from '@databases/pg'
import dotenv from 'dotenv'

dotenv.config()

const db = connect();


async function auth() {
    await db.query(sql`SELECT 1=1`)
    console.log('Server started succesfully'); 
}

export default { auth, db, sql };
