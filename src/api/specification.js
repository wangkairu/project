import request from '@/utils/request'
// /wms/bas-customer/queryCustomerList
export function queryNormsList(params){
    return request({
        url:`/wms/bas-norms/queryNormsList?page=${params.page}&size=${params.size}`,
        method:"post",
        data:params.request
    })
}

export function saveOrUpdateGoods(params){
    return request({
        url:'/wms/bas-norms/saveOrUpdateGoods',
        method:"post",
        data:params
    })
}

export function basNormsExport(params){
    return request({
        url:'/wms/bas-norms/export',
        method:"post",
        responseType: 'blob',
        data: params,
    })
}
// 
export function importNorms(params){
    return request({
        url:"/wms/bas-norms/importNorms",
        method:"post",
        responseType: 'blob',
        data:params
    })
}
export function exportTemplate(){
    return request({
        url:"/wms/bas-norms/exportTemplate",
        method: "get",
        // params,
        responseType: 'blob',
    })
}