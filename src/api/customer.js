import request from '@/utils/request'
// /wms/bas-customer/queryCustomerList
export function queryCustomerList(params){
    return request({
        url:`/wms/bas-customer/queryCustomerList?page=${params.page}&size=${params.size}`,
        method:"post",
        data:params.request
    })
}
export function basCustomerExport(params){
    return request({
        url:"/wms/bas-customer/export",
        method:'post',
        data:params,
        responseType: 'blob',
    })
}

// 客户货物
// 
export function queryGoodsList(params,page){
    return request({
        url:`/wms/base-customer-goods/queryGoodsList?size=${page.pageSize}&pageNumber=${page.pageNum}`,
        method:"post",
        data:params
    })
}

// 修改货物类型
export function changeWMSDeliveryStatus(params){
    return request({
        url:`/wms/base-customer-goods/changeWMSDeliveryStatus/${params.id}/${params.status}`,
        method:"put",
    })
}
// 修改全钢半钢
export function changeNormType(params){
    return request({
        url:`/wms/base-customer-goods/changeNormType/${params.id}/${params.status}`,
        method:"put",
    })
}

// 修改货物的客户信用级
export function changeCustomerLevel(params){
    return request({
        url:`/wms/base-customer-goods/changeCustomerLevel/${params.id}/${params.status}`,
        method:"put"
    })
}

export function changeLogisticsCarriers(params){
    return request({
        url:`/wms/base-customer-goods/changeLogisticsCarriers/${params.id}/${params.status}`,
        method:"put"
    })
}
// 客户信用等级
export function credit(){
    return request({
        url:'/wms/credit/selectAll',
        method:"get"
    }) 
}
// 
export function importCustomer(params){
    return request({
        url:"/wms/bas-customer/importCustomer",
        method:"post",
        responseType: 'blob',
        data:params
    })
}