import { Request, Response } from "express";
import { Status, sendError, sendSuccess } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { UserRepository } from "../data/repository/UserRepository";

export const checkUserAdmin = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)

        const user = await UserRepository.getUserBySession(session)
        if (user.is_admin)
            throw Status.Forbidden

        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}
