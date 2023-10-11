import { Pool } from "pg";
import { env } from "~/env.mjs";

const pool = new Pool({
    user: 'postgres',
    host: 'db.tvfdevohokrryuzmcapw.supabase.co',
    database: 'postgres',
    password: `${env.NEXT_PUBLIC_DB_PASSWORD}`,
    port: 5432,
})

export default pool;