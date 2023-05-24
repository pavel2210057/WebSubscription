import { createHash, randomUUID } from "crypto"
import { UserQueries } from "../local/UserQueries"
import { SessionRepository } from "./SessionRepository"
import { Status } from "../../utils/statuses"

export namespace UserRepository {

    export const registerUser = async (username: string, email: string, password: string) => {
        if (!validateUser(username, password, email))
            throw Status.BadRequest

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

    const validateUser = (username: string, password: string, email: string) => 
        validateUsername(username) && validatePassword(password) && validateEmail(email)

    const validateUsername = (username: string) => username.length >= 8 && username.length <= 24

    const validatePassword = (password: string) => password.length >= 8 && password.length <= 64

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

    const makeUserId = () => randomUUID()

    const encryptPassword = (password: string) => createHash('sha256').update(password).digest('hex')
}
