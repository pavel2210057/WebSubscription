import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { SessionRepository } from "../data/repository/SessionRepository";

export const logoutUser = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)
        await SessionRepository.clearSession(session)
        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}
