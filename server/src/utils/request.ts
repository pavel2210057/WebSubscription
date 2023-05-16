import { Request } from "express";
import { Status } from "./statuses";

export const requireQueryParam = (request: Request, name: string) => {
    const param = request.query[name]
    if (!param)
        throw Status.BadRequest
    return param.toString()
}

export const findQueryParam = (request: Request, name: string) => {
    const param = request.query[name]
    if (!param)
        return null
    return param.toString()
}

export const requireBodyParam = (request: Request, name: string) => {
    const param = request.body[name]
    if (!param)
        throw Status.BadRequest
    return param.toString()
}

export const findBodyParam = (request: Request, name: string) => {
    const param = request.body[name]
    if (!param)
        return null
    return param.toString()
}

export const requireSession = (request: Request) => {
    const session = request.signedCookies.session
    if (!session)
        throw Status.Unauthorized
    return session.toString()
}
