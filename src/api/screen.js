import request from '@/utils/request'

// 备货区显示屏计划

export function stockingAreaPlan(params) {
    return request({
        url: "/wms/display-screen/stockingAreaPlan",
        method: "get",
        params,
    })
}