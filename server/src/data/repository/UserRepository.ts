import { createHash, randomUUID } from "crypto"
import { UserQueries } from "../local/UserQueries"
import { SessionRepository } from "./SessionRepository"

export namespace UserRepository {

    export const registerUser = async (username: string, email: string, password: string) => {
        const userId = makeUserId()
        const encryptedPassword = encryptPassword(password)
        await UserQueries.registerUser(userId, username, email, encryptedPassword)
    }

    export const authUser = async (email: string, password: string) => {
        const encryptedPassword = encryptPassword(password)

        const userId = await UserQueries.authUser(email, encryptedPassword)

        const session = await SessionRepository.upsertSession(userId)
        return session
    }

    export const getUserBySession = async (session: string) => {
        const userId = await SessionRepository.getUserIdBySession(session)
        return await UserQueries.getUserById(userId)
    }

    const makeUserId = () => randomUUID()

    const encryptPassword = (password: string) => createHash('sha256').update(password).digest('hex')
}
