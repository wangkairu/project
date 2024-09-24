import request from '@/utils/request'

export function queryDeliverGoodsList(params) {
    return request({
        url: `/wms/deliver-goods/queryDeliverGoodsList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request
    })
}

export function queryDeliverGoodsDetailList(mainCode) {
    return request({
        url: `/wms/deliver-goods-detail/queryDeliverGoodsDetailList/${mainCode}`,
        method: "get",
        // data: params
    })
}


export function deliverGoodsConfirm(params) {
    return request({
        url: '/wms/deliver-goods/deliverGoodsConfirm',
        method: "post",
        data: params
    })
}

export function deliverGoodsDetailReport(params) {
    return request({
        url: "/wms/deliver-goods/deliverGoodsDetailReport",
        method: "post",
        data: params
    })
}

export function stockingAreaClean(params) {
    return request({
        url: "/wms/deliver-goods/stockingAreaClean",
        method: "post",
        data: params
    })
}
export function queryEnumList(enumName) {
    return request({
        url: `/wms/common/queryEnumList/${enumName}`,
        method: "get",
    })
}

export function getBoxLeftRightList(params) {
    return request({
        url: `/wms/deliver-goods-detail/getBoxLeftRightList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request
    })
}

export function editDeliverGoodsDetail(params) {
    return request({
        url: "/wms/deliver-goods-detail/editDeliverGoodsDetail",
        method: "put",
        data: params
    })
}
// /wms/deliver-goods/getFreeStockAreaList/{type}
export function getFreeStockAreaList(type) {
    return request({
        url: `/wms/deliver-goods/getFreeStockAreaList/${type}`,
        method: "get",
        // data: params
    })
}
// 
export function queryDeliverGoodsTypeList(params){
    return request({
       url:`/wms/deliver-goods/queryDeliverGoodsTypeList?page=${params.page}&size=${params.size}`,
       method:"post",
       data:params
    })
}

export function createDeliverGoods(params){
    return request({
        url:"/wms/deliver-goods/create",
        method:"post",
        data:params,
    })
}
// /wms/deliver-goods/queryDeliverGoodsLocationList
export function queryDeliverGoodsLocationList(params){
    return request({
        url:"/wms/deliver-goods/queryDeliverGoodsLocationList",
        method:"post",
        data:params
    })
}
// 

// export function getFreeStockAreaListGoods(warehouseCode){
//     return request({
//         url:`/wms/deliver-goods/getFreeStockAreaList/${warehouseCode}`,
//         method:'get',
//     })
// }
// 
export function getStockAreaColInfo(params){
    return request({
        url:`/wms/deliver-goods/getStockAreaColInfo/${params.warehouseCode}/${params.areaCode}`,
        method:'get', 
    })
}

export function deliverConfirm(params){
    return request({
        url:"/wms/deliver-goods/confirm",
        method:"post",
        data:params,
    })
}
export function turnBack(params){
    return request({
        url:"/wms/deliver-goods/turnBack",
        method:"post",
        data:params,
    })
}
// 
export function cancelDeliverGoods(params){
    return request({
        url:"/wms/deliver-goods/cancel",
        method:"post",
        data:params,
    })
}

// 
export function cancelDeliverGoodsDetail(params){
    return request({
        url:"/wms/deliver-goods-detail/cancel",
        method:"post",
        data:params,
    })
}