import request from '@/utils/request'

// 备货区显示屏计划
// url: `/wms/move-detail/queryMoveDetailList/${mainCode}`,
export function stockingAreaPlan(params) {
    return request({
        url: `/wms/display-screen/stockingAreaPlan/${params}`,
        method: "get",
        // params,
    })
}