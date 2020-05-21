import request from '@/utils/request'
import { setToken } from '../utils/auth';

export function login(username, password) {
  // console.log(username)
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
