import { Request, Response } from "express";
import { sendError } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { UserRepository } from "../data/repository/UserRepository";

export const payOrder = async (request: Request, response: Response) => {
    try {
        const session = await requireSession(request)
        const user = UserRepository.getUserBySession(session)

        
    } catch (e: any) {
        sendError(response, e)
    }
}
