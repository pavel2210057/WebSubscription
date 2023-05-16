import { OrderStatus } from "../../domain/Order"
import { OrderQueries } from "../local/OrderQueries"
import { OrderRequests } from "../remote/OrderRequests"
import { UserRepository } from "./UserRepository"

export namespace OrderRepository {

    export const postOrder = async (
        session: string,
        firstName: string,
        lastName: string,
        patronymic: string | null,
        address: string, 
        apartment: string, 
        room: string | null, 
        monthCount: number,
        status: OrderStatus
    ) => {
        const user = await UserRepository.getUserBySession(session)
        
        const orderId = await OrderQueries.insertOrder(
            user.id,
            firstName, 
            lastName,
            patronymic,
            address,
            apartment,
            room,
            monthCount,
            status
        )

        await OrderRequests.sendOrderSubmissionEmail({
            id: orderId.toString(),
            user: {
                firstName: firstName,
                lastName: lastName,
                patronymic: patronymic,
                email: user.email
            },
            address: address,
            apartment: apartment,
            room: room,
            monthCount: monthCount,
            status: status
        })
    }

    export const getAllOrders = async () => await OrderQueries.getAllOrders()

    export const getAllOrdersByUser = async (userId: string) => await OrderQueries.getAllOrdersByUser(userId)

    export const submitOrder = async (orderId: string) => {
        await OrderQueries.updateOrderStatusAndMessage(orderId, OrderStatus.Accepted, "")
    }

    export const rejectOrder = async (orderId: string, message: string) => {
        await OrderQueries.updateOrderStatusAndMessage(orderId, OrderStatus.Rejected, message)
    }
}
