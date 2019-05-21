import { ProductAction } from '../consts/action';

import { get, post, del } from '../utils/request';

export const getProducts = (filter) => {
  return {
    type: ProductAction.GET_PRODUCTS,
    promise: get('/products', filter)
  }
}

export const updateProduct = (data) => {
  return {
    type: ProductAction.UPDATE_PRODUCT,
    promise: post('/products', data)
  }
}

export const deleteProduct = (id) => {
  return {
    type: ProductAction.DELETE_PRODUCT,
    promise: del('/products', {id})
  }
}