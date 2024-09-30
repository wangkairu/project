import request from '@/utils/request'
// /wms/manual-operation/pickUp
export function manualOperationPickUp(code) {
    return request({
        url: `/wms/manual-operation/getGoods/${code}`,
        method: "GET",
    })
}
// 
export function manualOperation(params) {
    return request({
        url: '/wms/manual-operation/pickUp',
        method: "POST",
        data: params,
    })
}