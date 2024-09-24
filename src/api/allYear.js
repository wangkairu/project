import request from '@/utils/request'

export function selectYearCustomer(params){
    return request({
        url:"/wms/order/selectYearCustomer",
        method:"get",
        params
    })
}

export function selectYearNorm(params){
    return request({
        url:"/wms/order/selectYearCustomer",
        method:"get",
        params
    })
}

// 规格全年订单量趋势图
export function selectNormGraph(params){
    return request({
        url:"/wms/order/selectNormGraph",
        method:"get",
        params,
    })
}
// 客户全年订单量图
export function selectCustomerGraph(params){
    return request({
        url:"/wms/order/selectCustomerGraph",
        method:"get",
        params,
    })
}

// 全年订单量表
export function selectCustomerYearSubmit(params){
    return request({
        url:"/wms/order/selectCustomerYearSubmit",
        method:"get",
        params
    })
}

// 规格全年订单量趋势图
// export function selectNormGraph(params){
//     return request({
//         url:"/wms/order/selectNormGraph",
//         method:"get",
//         params
//     })
// }

// 客户简称全年订单量
// 
export function selectYearByCustomerName(params){
    return request({
        url:"/wms/order/selectYearByCustomerName",
        method:"get",
        params
    })
}

// 客户全程订单量饼图
export function selectCustomerNameGraph(params){
    return request({
        url:"/wms/order/selectCustomerNameGraph",
        method:"get",
        params,
    })
}

export function customerSelectYear(params){
    return request({
        url:"/wms/order/selectYearNorm",
        method:"get",
        params
    })
}