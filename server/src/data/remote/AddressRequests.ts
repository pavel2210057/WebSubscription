import superagent from 'superagent'
import { Status } from '../../utils/statuses'

export namespace AddressRequests {

    type Address = {
        id: string,
        name: string
    }

    export const getAddressesByQuery = async (query: string): Promise<Address[]> => {
        const response = await superagent.get(process.env.KLADR_URL || '')
            .query({
                'token': process.env.KLADR_TOKEN,
                'oneString': true,
                'query': query,
                'contentType': process.env.KLADR_DEFAULT_CONTENT_TYPE,
                'cityId': process.env.KLADR_CITY_ID,
                'limit': process.env.KLADR_DEFAULT_LIMIT
            })

        if (!response.ok)
            throw Status.InternalError

        console.log(response.body)
        return parseAddresses(response.body.result || [])
    }

    const parseAddresses = (response: [ { guid: string, fullName: string } ]): Address[] => response.map(parseAddress)

    const parseAddress = (address: { guid: string, fullName: string }): Address => {
        return { id: address.guid, name: address.fullName }
    }
}
