import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/shopAdministration/getShopList',
    method:'post',
    params:params
  })
}
