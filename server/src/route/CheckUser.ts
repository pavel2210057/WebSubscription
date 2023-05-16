import { Request, Response } from "express";
import { Status, sendError, sendSuccess } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { SessionRepository } from "../data/repository/SessionRepository";

export const checkUser = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)
        await SessionRepository.getUserIdBySession(session)
        sendSuccess(response)
    } catch(e: any) {
        console.log(e)
        sendError(response, Status.Unauthorized)
    }
}
