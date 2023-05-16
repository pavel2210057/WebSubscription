import { Order } from "../../domain/Order";
import nodemailer from 'nodemailer'

export namespace OrderRequests {

    export const sendOrderSubmissionEmail = async (order: Order) => {
        const transport = nodemailer.createTransport({
            service: process.env.SERVER_EMAIL_SERVICE,
            auth: {
                user: process.env.SERVICE_EMAIL_NAME,
                pass: process.env.SERVICE_EMAIL_PASSWORD
            }
        })

        await transport.sendMail({
            from: process.env.SERVER_EMAIL_NAME,
            to: process.env.OPERATOR_EMAIL_NAME,
            subject: "Новая заявка на подписку!",
            text: formatEmailOrder(order)
        })
    }

    const formatEmailOrder = (order: Order) => `
        Клиент желает оформить подписку. Ниже представлены данные о заказе.

        ФИО: ${order.user.lastName} ${order.user.firstName} ${order.user.patronymic || ''}
        Email: ${order.user.email}
        Адрес: ${order.address}
        Квартира: ${order.room}
        Комната: ${order.room || 'Пользователь не уточнил'}
        Срок подписки (количество месяцев): ${order.monthCount}
    `
}
