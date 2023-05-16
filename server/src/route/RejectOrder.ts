import { Request, Response } from "express";
import { Status, sendError, sendSuccess } from "../utils/statuses";
import { requireBodyParam, requireSession } from "../utils/request";
import { UserRepository } from "../data/repository/UserRepository";
import { OrderRepository } from "../data/repository/OrderRepository";

export const rejectOrder = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)

        const user = await UserRepository.getUserBySession(session)
        // if (!user.is_admin)
        //     throw Status.Forbidden

        const orderId = requireBodyParam(request, "order_id")
        const message = requireBodyParam(request, "message")

        await OrderRepository.rejectOrder(orderId, message)
        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}
