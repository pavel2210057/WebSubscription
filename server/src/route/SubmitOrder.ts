import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/statuses";
import { requireBodyParam, requireSession } from "../utils/request";
import { OrderRepository } from "../data/repository/OrderRepository";
import { UserRepository } from "../data/repository/UserRepository";

const submitOrder = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)

        const user = await UserRepository.getUserBySession(session)
        // if (!user.is_admin)
        //     throw Status.Forbidden

        const orderId = requireBodyParam(request, "order_id")

        await OrderRepository.submitOrder(orderId)
        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}

export default submitOrder
