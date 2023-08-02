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