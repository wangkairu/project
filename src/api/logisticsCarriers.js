import request from '@/utils/request'

export function queryLogisticsList(params){
    return request({
        url:`/wms/bas-logistics/queryLogisticsList?page=${params.page}&size=${params.pageSize}`,
        method:"post",
        data:params.form,
    })
}

// 新增编辑物流承运商
export function saveOrUpdateLogistics(params){
    return request({
        url:"/wms/bas-logistics/saveOrUpdateLogistics",
        method:"post",
        data:params
    })
}

export function deleteLogistics(params){
    return request({
        url:"/wms/bas-logistics/deleteLogistics",
        method:"delete",
        data:params
    })
}