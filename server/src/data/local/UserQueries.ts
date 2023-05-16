import { connectSql } from "../../utils/sql"
import { OkPacket, RowDataPacket } from 'mysql2'
import { Status } from "../../utils/statuses"

export namespace UserQueries {

    export interface IUser extends RowDataPacket {
        id: string,
        uuid: string,
        username: string,
        email: string,
        password: string,
        is_admin: boolean
    }

    export const registerUser = async (userId: string, username: string, email: string, password: string) => {
        if (await isUserExists(email))
            return Promise.reject(Status.Conflict)

        const sql = await connectSql()
        const [ okPacket ] = await sql.execute<OkPacket>("INSERT INTO USERS (uuid, username, email, password) VALUES (?, ?, ?, ?)", [ userId, username, email, password ])
        sql.end()

        return okPacket.insertId
    }

    export const authUser = async (email: string, password: string) => {
        const sql = await connectSql()
        const [ users ] = await sql.execute<IUser[]>("SELECT * FROM USERS WHERE email=? AND password=?", [ email, password ])
        sql.end()

        if (!users.length)
            return Promise.reject(Status.Gone)

        return users[0].id
    }

    export const getUserById = async (userId: string) => {
        const sql = await connectSql()
        const [users] = await sql.execute<IUser[]>("SELECT * FROM USERS WHERE id=?", [ userId ])
        sql.end()

        if (!users.length)
            return Promise.reject(Status.Gone)

        return users[0]
    }

    const isUserExists = async (email: string) => {
        console.log({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const sql = await connectSql()
        const [ okPacket ] = await sql.execute<OkPacket>("SELECT COUNT(*) FROM USERS WHERE email=?", [ email ])
        sql.end()
        return okPacket.fieldCount > 0
    }
}
