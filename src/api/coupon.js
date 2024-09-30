import request from '@/utils/request'
// /wms/deliver-goods/queryDeliverGoodsList
export function queryDeliverGoodsList(params){
    return request({
        url:"/wms/deliver-goods/queryDeliverGoodsList",
        method:"post",
        data:params,
    })
}
// 
export function turnBack(params){
    return request({
        url:"/wms/deliver-goods/turnBack",
        method:"post",
        data:params,
    })
}

// 

export function queryDeliverGoodsDetailList(mainCode){
    return request({
        url:`/wms/deliver-goods-detail/queryDeliverGoodsDetailList/${mainCode}`,
        method:"get",
    })
}

export function confirmDeliverGoods(params){
    return request({
        url:"/wms/deliver-goods/confirm",
        method:"post",
        data:params,
    })
}

export function cancelDeliverGoods(params){
    return request({
        url:"/wms/deliver-goods/cancel",
        method:"post",
        data:params,
    })
}

// 
// export function confirmDeliverGoods(params){
//     return request({
//         url:"/wms/deliver-goods/confirm",
//         method:"post",
//         data:params
//     })
// }

// 
export function queryDeliverGoodsTypeList(params){
    return request({
        url:`/wms/deliver-goods/queryDeliverGoodsTypeList?page=${params.page}&size=${params.size}`,
        method:"post",
        data:params
    })
}

export function queryEnumList(enumName) {
    return request({
        url: `/wms/common/queryEnumList/${enumName}`,
        method: "get",
    })
}
// 
export function getFreeStockAreaList(type){
    return request({
        url:`/wms/deliver-goods/getFreeStockAreaList/${type}`,
        method:"get",
    })
}
// 
export function queryDeliverGoodsLocationList(params){
    return request({
        url:"/wms/deliver-goods/queryDeliverGoodsLocationList",
        method:"post",
        data:params,
    })
}

export function getStockAreaColInfo(params){
    return request({
        url:`/wms/deliver-goods/getStockAreaColInfo/${params.warehouseCode}/${params.areaCode}`,
        method:'get', 
    })
}
// 
export function createDeliverGoods(params){
    return request({
        url:"/wms/deliver-goods/create",
        method:"post",
        data:params,
    })
}