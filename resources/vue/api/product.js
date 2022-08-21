import { session } from '@v/api/axios'

const getProductList = () => {
  return session.get('/products/?with_prices=True')
}

const getProductAllList = () => {
  return session.get('/products/')
}

const getProductInfo = (id) => {
  return session.get(`/products/${id}/`)
}

const createProduct = (name, quantityType) => {
  return session.post('/products/', {
    name: name,
    quantity_type: quantityType,
  })
}

const removeProduct = (id) => {
  return session.delete(`/products/${id}/`)
}

const updateProduct = (id, name, quantityType) => {
  return session.put(`/products/${id}/`, {
    name: name,
    quantity_type: quantityType,
  })
}

const createPrice = (productId, price, activeFrom) => {
  return session.post('/products/price/', {
    price: price,
    product_id: productId,
    active_from: activeFrom,
  })
}

const updatePrice = (id, price) => {
  return session.put(`/products/price/${id}/`, {
    price: price,
  })
}

export {
  getProductInfo,
  getProductList,
  getProductAllList,
  createProduct,
  updateProduct,
  removeProduct,
  createPrice,
  updatePrice,
}
