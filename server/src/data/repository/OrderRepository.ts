import { OrderStatus } from "../../domain/Order"
import { OrderQueries } from "../local/OrderQueries"
import { PriceQueries } from "../local/PriceQueries"
import { OrderRequests } from "../remote/OrderRequests"
import { UserRepository } from "./UserRepository"

export namespace OrderRepository {

    export const getPrice = async () => await PriceQueries.getPrice()

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

        const price = await getPrice()
        const cost = price * monthCount
        
        const orderId = await OrderQueries.insertOrder(
            user.id,
            firstName, 
            lastName,
            patronymic,
            address,
            apartment,
            room,
            cost,
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
            cost: cost,
            status: status
        })
    }

    export const getAllOrders = async () => await OrderQueries.getAllOrders()

    const generatePaymentUrl = (order: OrderQueries.IOrder) => {
        
    }

    export const getAllOrdersByUser = async (userId: string) => {
        const orders = await OrderQueries.getAllOrdersByUser(userId)
        return orders.map(order => 
            order.status == OrderStatus.Accepted ? 
                { ...order, payment_url: generatePaymentUrl(order) } : 
                order    
            )
    }

    export const submitOrder = async (orderId: string) => {
        await OrderQueries.updateOrderStatusAndMessage(orderId, OrderStatus.Accepted, "")
    }

    export const rejectOrder = async (orderId: string, message: string) => {
        await OrderQueries.updateOrderStatusAndMessage(orderId, OrderStatus.Rejected, message)
    }

    export const payOrder = async (orderId: string) => {
        await OrderQueries.updateOrderStatusAndMessage(orderId, OrderStatus.Paid, "")
    }
}
