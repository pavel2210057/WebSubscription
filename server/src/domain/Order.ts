import { User } from "./User"

export enum OrderStatus {
    InProgress = 0,
    Accepted = 1,
    Rejected = 2,
    Paid = 3,
}

export type Order = {
    id: string,
    user: User,
    address: string,
    apartment: string,
    room: string | null,
    monthCount: number,
    status: OrderStatus
}
