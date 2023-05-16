import { Request, Response } from "express";
import { sendError, sendResult } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { OrderRepository } from "../data/repository/OrderRepository";
import { SessionRepository } from "../data/repository/SessionRepository";

export const getSubscriptionList = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)

        const userId = await SessionRepository.getUserIdBySession(session)
        const subscriptions = await OrderRepository.getAllOrdersByUser(userId)

        sendResult(response, subscriptions)
    } catch (e: any) {
        sendError(response, e)
    }
}
