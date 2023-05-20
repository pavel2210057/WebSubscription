import { Request, Response } from "express";
import { sendError, sendResult } from "../utils/statuses";
import { OrderRepository } from "../data/repository/OrderRepository";

export const orderPrice = async (request: Request, response: Response) => {
    try {
        const price = await OrderRepository.getPrice()
        sendResult(response, { price: price })
    } catch (e: any) {
        sendError(response, e)
    }
}
