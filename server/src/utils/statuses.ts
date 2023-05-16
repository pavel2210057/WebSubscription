import { Response, response } from "express"

export enum Status {
    Ok,
    Unauthorized,
    Conflict,
    Gone,
    BadRequest,
    Forbidden,
    InternalError
}

const toHttpStatusCode = (status: Status): number => {
    switch (status) {
        case Status.Ok: return 200
        case Status.Unauthorized: return 401
        case Status.Conflict: return 409
        case Status.Gone: return 404
        case Status.BadRequest: return 400
        case Status.Forbidden: return 403
        case Status.InternalError: return 500
        default: return 500
    }
}

export const sendResult = (response: Response, body: any) => {
    response.statusCode = toHttpStatusCode(Status.Ok)
    response.send(body)
}

export const sendSuccess = (response: Response) => {
    sendResult(response, null)
}

export const sendError = (response: Response, error: any) => {
    const status = toHttpStatusCode(error)
    if (status)
        response.statusCode = status
    
    console.log("Error: " + error + "; Status: " + status)
    response.send()
}
