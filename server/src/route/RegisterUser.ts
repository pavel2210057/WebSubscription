import { Request, Response } from 'express'
import { UserRepository } from '../data/repository/UserRepository'
import { requireBodyParam } from '../utils/request'
import { sendError, sendSuccess } from '../utils/statuses'

const registerUser = async (request: Request, response: Response) => {
    try {
        const username = requireBodyParam(request, 'username')
        const email = requireBodyParam(request, 'email')
        const password = requireBodyParam(request, 'password')

        await UserRepository.registerUser(username, email, password)
        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}

export default registerUser;
