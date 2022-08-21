import { session } from '@v/api/axios'

const createOrder = (prices, otherClaim) => {
  return session.post('/orders/', {
    prices: prices,
    other_claim: otherClaim
  })
}

const orderList = () => {
  return session.get('/orders/')
}

const orderDetail = (id) => {
  return session.get('/orders/' + id)
}

const myOrdersList = () => {
  return session.get('/orders/?only_my_orders=True')
}

const changeStatus = (id, status) => {
  return session.put(`/orders/product/${id}`, {
    status: status
  })
}

export { createOrder, orderList, orderDetail, myOrdersList, changeStatus }
