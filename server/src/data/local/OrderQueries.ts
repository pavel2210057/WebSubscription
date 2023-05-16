import { OkPacket, RowDataPacket } from "mysql2"
import { connectSql } from "../../utils/sql"
import { OrderStatus } from "../../domain/Order"

export namespace OrderQueries {

    export interface IOrder extends RowDataPacket {
        id: string,
        user_id: string,
        first_name: string,
        last_name: string,
        patronymic: string | null,
        address: string,
        apartment: string,
        room: string | null,
        month_count: number,
        status: OrderStatus
    }

    export const insertOrder = async (
        userId: string,
        firstName: string,
        lastName: string,
        patronymic: string | null,
        address: string, 
        apartment: string,
        room: string | null,
        monthCount: number,
        status: OrderStatus
    ) => {
        const sql = await connectSql()

        const [okPacket] = await sql.execute<OkPacket>(`
            INSERT INTO ORDERS (first_name, last_name, patronymic, address, apartment, room, month_count, user_id, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ firstName, lastName, patronymic, address, apartment, room, monthCount, userId, status ])         
        sql.end()

        return okPacket.insertId
    }

    export const updateOrderStatusAndMessage = async (orderId: string, status: OrderStatus, message: string) => {
        const sql = await connectSql()

        await sql.execute('UPDATE ORDERS SET status = ?, message = ? WHERE id = ?', [ status, message, orderId ])
        sql.end()
    }

    export const getAllOrders = async () => {
        const sql = await connectSql()

        const [orders] = await sql.execute<IOrder[]>("SELECT * FROM ORDERS")
        sql.end()

        return orders
    }

    export const getAllOrdersByUser = async (userId: string) => {
        const sql = await connectSql()

        const [orders] = await sql.execute<IOrder[]>("SELECT * FROM ORDERS WHERE user_id=?", [ userId ])
        sql.end()

        return orders
    }
}
