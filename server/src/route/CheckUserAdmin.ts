import { Request, Response } from "express";
import { sendError, sendResult } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { UserRepository } from "../data/repository/UserRepository";

export const checkUserAdmin = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)

        const user = await UserRepository.getUserBySession(session)
        
        sendResult(response, { is_admin: user.is_admin })
    } catch (e: any) {
        sendError(response, e)
    }
}
