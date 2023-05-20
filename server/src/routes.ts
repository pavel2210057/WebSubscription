import { Express } from 'express'
import loginUser from './route/LoginUser'
import registerUser from './route/RegisterUser'
import searchAddress from './route/SearchAddress'
import postOrder from './route/PostOrder'
import newspaperList from './route/NewspaperList'
import submitOrder from './route/SubmitOrder'
import { logoutUser } from './route/LogoutUser'
import { checkUser } from './route/CheckUser'
import { getSubscriptionList } from './route/GetSubscriptionList'
import { getOrderList } from './route/GetOrderList'
import { rejectOrder } from './route/RejectOrder'
import { checkUserAdmin } from './route/CheckUserAdmin'
import { orderPrice } from './route/OrderPrice'
import { payOrder } from './route/PayOrder'

const setupRoutes = (app: Express) => {

    app.post('/user/register', registerUser)
    app.post('/user/login', loginUser)
    app.post('/user/logout', logoutUser)
    app.get('/user/check', checkUser)
    app.get('/address/search', searchAddress)
    app.get('/order/price', orderPrice)
    app.post('/order/post', postOrder)
    app.get('/order/payment/success', payOrder)
    app.get('/order/list', getSubscriptionList)
    app.get('/archive/list', newspaperList)

    app.get('/user/check-admin', checkUserAdmin)

    //private
    app.get('/private/order/list', getOrderList)
    app.post('/private/order/submit', submitOrder)
    app.post('/private/order/reject', rejectOrder)
}

export default setupRoutes
