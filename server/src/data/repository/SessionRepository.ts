import { randomUUID } from "crypto"
import { SessionQueries } from "../local/SessionQueries"

export namespace SessionRepository {

    export const upsertSession = async (userId: string) => await SessionQueries.upsertSession(makeSession(), userId)

    export const clearSession = async (session: string) => await SessionQueries.clearSession(session)

    export const getUserIdBySession = async (session: string) => await SessionQueries.getUserIdBySession(session)

    const makeSession = () => randomUUID()
}
