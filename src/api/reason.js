import request from '@/utils/request'
// 
export function queryLogisticsList(params){
    return request({
        url:"/wms/bas-reason/queryLogisticsList",
        method:"post",
        data:params
    })
}

// 新增编辑
export function saveOrUpdateReason(params){
    return request({
        url:"/wms/bas-reason/saveOrUpdateReason",
        method:"put",
        data:params
    })
}
// 删除
// 
export function deleteReason(params){
    return request({
        url:"/wms/bas-reason/deleteReason",
        method:"delete",
        data:params
    })
}