import request from '@/utils/request'

// 查询订单编号
export function selectNumberOrder(params){
    return request({
        url:"/wms/order/selectNumber",
        method:"get",
        params
    })
}
// 插入订单编号
export function insertNumberOrder(params){
    return request({
        url:"/wms/order/insertNumber",
        method:"get",
        params
    })
}
// 插入指定的订单量 
export function insertOneOrder(params){
    return request({
        url:"/wms/order/insertOne",
        method:"post",
        data:params
    })
}
// 查询年月度订单与交付完成表
export function selectAll(params){
    return request({
        url:"/wms/order/selectAll",
        method:"post",
        data:params
    })
}

// 年规格订单交付表
export function selectNormYearSubmit(params){
    return request({
        url:"/wms/order/selectNormYearSubmit",
        method:"get",
        params
    })
}
// 年客户订单交付表
export function selectCustomerYearSubmit(params){
    return request({
        url:"/wms/order/selectCustomerYearSubmit",
        method:"get",
        params
    })
}
// 年客户订单交付表饼状图
export function selectAllByCustomerNameGraph(params){
    return request({
        url:"/wms/order/selectAllByCustomerNameGraph",
        method:"get",
        params
    })
}
// 年规格订单交付表饼状图
export function selectAllByNormNoGraph(params){
    return request({
        url:"/wms/order/selectAllByNormNoGraph",
        method:"get",
        params
    })
}
// 年规格订单交付表柱状图
export function selectMonthByNorm(params){
    return request({
        url:"/wms/order/selectMonthByNorm",
        method:"get",
        params
    })
}
// 年客户订单交付表柱状图
export function selectMonthByCustomer(params){
    return request({
        url:"/wms/order/selectMonthByCustomer",
        method:"get",
        params
    })
}

// 年客户全程订单交付表
export function selectByCustomer(params){
    return request({
        url:"/wms/order/selectByCustomer",
        method:"get",
        params
    })
}

// 年规格订单交付表（类型）
export function selectByNormNo(params){
    return request({
        url:"/wms/order/selectByNormNo",
        method:"get",
        params
    })
}

// 获取样品订单
export function queryLogisticsList(params){
    return request({
        url:"/wms/sample-order-delivery-completion/queryLogisticsList",
        method:"post",
        data:params
    })
}

// 新增编辑样品订单
export function saveOrUpdate(params){
    return request({
        url:"/wms/sample-order-delivery-completion/saveOrUpdate",
        method:"post",
        data:params
    })
}

// 点击样品订单获取
export function getNormData(params){
    return request({
        url:"/wms/sample-order-delivery-completion/getNormData",
        method:"post",
        data:params
    })
} 

// 删除样品订单
export function deleteSampleOrder(params){
    return request({
        url:"/wms/sample-order-delivery-completion/deleteSampleOrder",
        method:"delete",
        data:params
    })
}

// 订单与交付表
export function orderAndAnalaysis(params){
    return request({
        url:"/wms/order/orderAndAnalaysis",
        method:"get",
        params
    })
}