import { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/statuses';
import { requireBodyParam } from '../utils/request';
import { UserRepository } from '../data/repository/UserRepository';

const loginUser = async (request: Request, response: Response) => {
    try {
        const email = requireBodyParam(request, 'email')
        const password = requireBodyParam(request, 'password')

        const session = await UserRepository.authUser(email, password)
        
        const inAWeek = new Date()
        inAWeek.setDate(new Date().getDate() + 7)
        response.cookie('session', session, { signed: true, expires: inAWeek })
        
        sendSuccess(response)
    } catch (e: any) {
        sendError(response, e)
    }
}

export default loginUser;
