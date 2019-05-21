import { AdminCompanyAction} from '../consts/action';
import { get, post, del } from '../utils/request';

export const adminGetCompanies = (filter) => {
  return {
    type: AdminCompanyAction.ADMIN_GET_COMPANIES,
    promise: get('/~admin/companies', filter)
  }
}

export const adminUpdateCompany = (data) => {
  return {
    type: AdminCompanyAction.ADMIN_UPDATE_COMPANY,
    promise: post('/~admin/companies', data)
  }
}