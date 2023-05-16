import { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/statuses';
import { findBodyParam, requireBodyParam, requireSession } from '../utils/request';
import { OrderRepository } from '../data/repository/OrderRepository';
import { OrderStatus } from '../domain/Order';

const postOrder = async (request: Request, response: Response) => {
    try {
        const session = requireSession(request)
        const firstName = requireBodyParam(request, "first_name")
        const lastName = requireBodyParam(request, "last_name")
        const patronymic = requireBodyParam(request, "patronymic")
        const address = requireBodyParam(request, "address")
        const apartment = requireBodyParam(request, "apartment")
        const room = findBodyParam(request, "room")
        const monthCount = Number.parseInt(requireBodyParam(request, "month_count"))

        await OrderRepository.postOrder(session, firstName, lastName, patronymic, address, apartment, room, monthCount, OrderStatus.InProgress)
        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}

export default postOrder;
