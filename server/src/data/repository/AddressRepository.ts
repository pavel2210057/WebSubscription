import { AddressRequests } from "../remote/AddressRequests";

export namespace AddressRepository {
    
    export const getAddressesByQuery = async (query: string) => await AddressRequests.getAddressesByQuery(query)
}
