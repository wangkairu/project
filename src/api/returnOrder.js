import request from '@/utils/request'
export function queryTurnBackList(params){
    return request({
        url:"/wms/turn-back/queryTurnBackList",
        method:"post",
        data:params
    })
}
// 创建返库单
export function turnBackCreate(params){
    return request({
        url:"/wms/turn-back/create",
        method:"post",
        data:params
    })
}
// 开始返库
export function startTurnBack(params){
    return request({
        url:"/wms/turn-back/startTurnBack",
        method:"post",
        data:params
    })
}
// 删除返库单
export function deleteTurnBack(params){
    return request({
        url:"/wms/turn-back/delete",
        method:"DELETE",
        data:params
    })
}

// 返库单明细
export function queryTurnBackDetailList(mainCode){
    return request({
        url:`/wms/turn-back-detail/queryTurnBackDetailList/${mainCode}`,
        method:"get",
    })
}