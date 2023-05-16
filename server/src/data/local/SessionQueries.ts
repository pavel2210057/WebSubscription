import { RowDataPacket } from "mysql2"
import { connectSql } from "../../utils/sql"

export namespace SessionQueries {

    interface ISession extends RowDataPacket {
        session: string,
        user_id: string
    }

    export const upsertSession = async (session: string, userId: string) => {
        await clearSessionByUserId(userId)
        await insertSession(session, userId)

        return session
    }

    export const clearSession = async (session: string) => {
        const sql = await connectSql()
        await sql.execute("DELETE FROM SESSIONS WHERE session=?", [ session ])
        sql.end()
    }

    export const getUserIdBySession = async (session: string) => {
        const sql = await connectSql()
        const [sessions] = await sql.execute<ISession[]>("SELECT user_id FROM SESSIONS WHERE session=?", [ session ])
        sql.end()
        return sessions[0].user_id
    }

    const insertSession = async (session: string, userId: string) => {
        const sql = await connectSql()
        await sql.execute("INSERT INTO SESSIONS(session, user_id) VALUES (?, ?)", [ session, userId ])
        sql.end()
    }

    const clearSessionByUserId = async (userId: string) => {
        const sql = await connectSql()
        await sql.execute("DELETE FROM SESSIONS WHERE user_id=?", [ userId ])
        sql.end()
    }
}
