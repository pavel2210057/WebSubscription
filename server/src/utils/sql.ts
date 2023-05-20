import { Connection, createConnection } from 'mysql2/promise'

export const connectSql = async () => await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export const withSql = async <T> (cb: (sql: Connection) => Promise<T>) => {
    const sql = await connectSql()
    try {
        return await cb(sql)
    } finally {
        sql.end()
    }
}
