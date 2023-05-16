import { Request, Response } from "express";
import { Status, sendError, sendResult } from "../utils/statuses";
import { requireSession } from "../utils/request";
import { UserRepository } from "../data/repository/UserRepository";
import { OrderRepository } from "../data/repository/OrderRepository";

export const getOrderList = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)

        const user = await UserRepository.getUserBySession(session)
        if (user.is_admin)
            throw Status.Forbidden

        const orders = await OrderRepository.getAllOrders()
        sendResult(response, orders)
    } catch (e: any) {
        sendError(response, e)
    }
}
