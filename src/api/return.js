import request from '@/utils/request'

// 通过箱号二维码获取货物信息
export function getGoodsQrCode(qrCode){
    return request({
        url:`/wms/baseGoods/getGoods/${qrCode}`,
        method:"get"
    })
}

// 通过id返工货物
export function baseGoods(params){
    return request({
        url:'/wms/baseGoods/rework',
        method:"post",
        data:params
    })
}

// 获取返工原因
export function queryLogisticsList(params){
    // page=${params.page}&size=${params.size}
    return request({
        url:'/wms/bas-reason/queryLogisticsList',
        method:"post",
        data:params
    })
}

// 获取返库列表
export function queryTurnBackList(params){
    return request({
        url:"/wms/turn-back/queryTurnBackList",
        method:"post",
        data:params
    })
}

// 开始返库
// 
export function startTurnBack(params){
    return request({
        url:"/wms/turn-back/startTurnBack",
        method:"post",
        data:params
    })
}

// 批量删除
export function deleteTurnBack(params){
    return request({
        url:"/wms/turn-back/delete",
        method:"delete",
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

// 获取发货单列表
export function queryDeliverGoodsList(params) {
    return request({
        url: `/wms/deliver-goods/queryDeliverGoodsList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.query
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