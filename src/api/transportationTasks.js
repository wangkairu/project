import request from '@/utils/request'

export function queryTaskList(params) {
    return request({
        url: `/wms/transport-task/queryTaskList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request,
    })
}

export function manualOperationPickUp(params) {
    return request({
        url: '/wms/manual-operation/pickUp',
        method: "post",
        data: params,
    })
}
// 
export function batchPickUp(params) {
    return request({
        url: '/wms/manual-operation/batchPickUp',
        method: "post",
        data: params,
    })
}
// 
export function queryTaskHistoryList(params){
    return request({
        url:`/wms/transport-task/queryTaskHistoryList?page=${params.page}&size=${params.size}`,
        method:"post",
        data:params.request
    })
}
// 
export function taskQueryTaskList(params){
    return request({
        url:"/wms/transport-task/queryTaskList",
        method:"post",
        data:params,
    })
}
// 
export function setMixArea(id){
    return request({
        url:`/wms/transport-task/setMixArea/${id}`,
        method:"get"
    })
}