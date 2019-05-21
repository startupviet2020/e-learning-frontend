import { UserAction } from '../consts/action';
import { AdminUserAction} from '../consts/action';
import { get, post, del } from '../utils/request';

export const logout = () => {
  return {
    type: UserAction.LOGOUT,
    promise: del('/auth')
  };
}

export const accountkitAuth = code => {
  return {
    type: UserAction.ACCOUNTKIT_AUTH,
    promise: post('/auth/accountkit', {code})
  };
}

export const verifyAuth = () => {
  return {
    type: UserAction.VERIFY_AUTH,
    promise: get('/auth')
  };
}

export const getUserProfile = () => {
  return {
    type: UserAction.GET_USER_PROFILE,
    promise: get('/users/me')
  }
}

export const updateUserProfile = (data) => {
  return {
    type: UserAction.UPDATE_USER_PROFILE,
    promise: post('/users/me', data)
  }
}

export const getActiveCompany = () => {
  return {
    type: UserAction.GET_COMPANY,
    promise: get('/companies/active')
  }
}

export const updateCompany = (data) => {
  return {
    type: UserAction.UPDATE_COMPANY,
    promise: post('/companies', data)
  }
}

export const switchCompany = (cid) => {
  return {
    type: UserAction.SWITCH_COMPANY,
    promise: post('/companies/active', {cid})
  }
}

export const adminGetUsers = (filter) => {
  return {
    type: AdminUserAction.ADMIN_GET_USERS,
    promise: get('/~admin/users', filter)
  }
}