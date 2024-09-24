import request from '@/utils/request'

// 创建移库单
export function createMove(params) {
    return request({
        url: "/wms/move/create",
        method: "post",
        data: params,
    })
}

// 删除移库单
export function deleteMove(params) {
    return request({
        url: "/wms/move/delete",
        method: "delete",
        data: params,
    })
}

// 调试Open通过库位编号获取已入库存信息
export function getGoodsByCode(warehouseCode) {
    return request({
        url: `/wms/move/getGoodsByCode/${warehouseCode}`,
        method: "get",
    })
}

// 移库单列表
export function queryMoveList(params) {
    return request({
        url: `/wms/move/queryMoveList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request,
    })
}

// 查询可用的库位
export function queryUsableLocation(goodsId) {
    return request({
        url: `/wms/move/getGoodsByCode/${goodsId}`,
        method: "get",
    })
}

// 获取库位展示需要选择的下拉参数
export function queryWarehouseLocationDropDown(params) {
    return request({
        url: '/wms/move/queryWarehouseLocationDropDown',
        method: "post",
        data: params,
    })
}

// 移库单明细
export function queryMoveDetailList(mainCode) {
    return request({
        url: `/wms/move-detail/queryMoveDetailList/${mainCode}`,
        method: "get",
    })
}

// 选择移库区域的信息
export function getMoveAreaInfo(warehouseCode) {
    return request({
        url:`/wms/move/getMoveAreaInfo/${warehouseCode}`,
        method:"get",
    })
}

// 选择移库起始列的信息
export function getMoveColStartInfo(params) {
    return request({
        url:`/wms/move/getMoveColStartInfo/${params.warehouseCode}/${params.area}`,
        method:"get",
    })
}

// 选择移库终点列的信息
export function getMoveColTargetInfo(params) {
    return request({
        url:`/wms/move/getMoveColTargetInfo/${params.warehouseCode}/${params.onlyCode}`,
        method:"get",
    })
}

// 获取选择的库列货物信息
export function getSelectColGoodsInfo(params) {
    return request({
        url:`/wms/move/getSelectColGoodsInfo/${params.warehouseCode}/${params.onlyCode}`,
        method:"get",
    })
}
// 移库单确认
export function moveConfirm(arr){
    return request({
        url:'/wms/move/confirm',
        method:"post",
        data:arr,
    })
}