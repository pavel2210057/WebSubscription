import { Request, Response } from 'express'
import { AddressRepository } from '../data/repository/AddressRepository';
import { Status, sendResult, sendError } from '../utils/statuses';

const searchAddress = async (request: Request, response: Response) => {
    const query = request.query['query']?.toString() || ''
    
    try {
        const addresses = await AddressRepository.getAddressesByQuery(query)
        sendResult(response, addresses)
    } catch (e: any) {
        sendError(response, e as Status)
    }
}


export default searchAddress;
