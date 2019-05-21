import { CustomerAction } from '../consts/action';

import { get, post, del } from '../utils/request';

export const getCustomers = (filters) => {
  return {
    type: CustomerAction.GET_CUSTOMERS,
    promise: get('/customers', filters)
  }
}

export const updateCustomer = (data) => {
  return {
    type: CustomerAction.UPDATE_CUSTOMER,
    promise: post('/customers', data)
  }
}

export const deleteCustomer = (id) => {
  return {
    type: CustomerAction.DELETE_CUSTOMER,
    promise: del('/customers', {id})
  }
}