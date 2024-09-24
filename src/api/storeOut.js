import request from '@/utils/request'

export function queryDetailList(params){
    return request({
        url:`/wms/out-detail/queryDetailList?page=${params.page}&size=${params.size}`,
        method:"post",
        data:params.request
    })
}
export function getCustomerAndSpecification(){
    return request({
        url:"/wms/real-time/getCustomerAndSpecification",
        method:"get"
    })
}

export function OutDetailWithDay(params){
    return request({
        url:`/wms/StatisticsReports/OutDetailWithDay/${params.year}/${params.month}/${params.day}`,
        method:"get",
        params,
    })
}

// 
export function OutDetailWithMonth(params){
    return request({
        url:`/wms/StatisticsReports/OutDetailWithMonth/${params.year}/${params.month}`,
        method:"get",
        params,
    })
}
// 
export function OutDetailWithYear(params){
    return request({
        url:`/wms/StatisticsReports/OutDetailWithYear/${params.year}`,
        method:"get",
        params,
    })
}
// 
export function OutDetailWithYearly(params){
    return request({
        url:"/wms/StatisticsReports/OutDetailWithYears",
        method:"get",
        params,
    })
}

export function StatisticsReportsRatioYear(params){
    return request({
        url:"/wms/StatisticsReports/RatioYear",
        method:"get",
        params
    })
}
// /wms/StatisticsReports/WeightYear
export function StatisticsReportsWeightYear(params){
    return request({
        url:"/wms/StatisticsReports/WeightYear",
        method:"get",
        params
    })
}

// 创建调拨出库计划-选择库列编号
export function selectCol(params){
    return request({
        url:"/wms/allocate-out/selectCol",
        method:"post",
        data:params
    })
}

// 获取调拨出库列表
export function queryAllocateOutList(params){
    return request({
        url:"/wms/allocate-out/queryAllocateOutList",
        method:"post",
        data:params
    })
}

// 删除调拨出库单
export function deleteAllocate(params){
    return request({
        url:"/wms/allocate-out/delete",
        method:"delete",
        data:params
    })
}

// 创建调拨出库单
export function createAllocate(params){
    return request({
        url:"/wms/allocate-out/create",
        method:"post",
        data:params
    })
}

// 调拨出库完成
export function completeAllocate(id){
    return request({
        url:`/wms/allocate-out/complete/${id}`,
        method:'get',
    })
}

