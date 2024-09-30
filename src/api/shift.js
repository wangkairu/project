import request from '@/utils/request'
export function queryMoveList(params){
    return request({
        url:"/wms/move/queryMoveList",
        method:"post",
        data:params
    })
}

// 开始移库
export function moveConfirm(params){
    return request({
        url:"/wms/move/confirm",
        method:"post",
        data:params,
    })
}

// 批量删除
export function moveDelete(params){
    return request({
        url:"/wms/move/delete",
        method:"delete",
        data:params
    })
}


// 获取移库单明细列表
export function queryMoveDetailList(mainCode){
    return request({
        url:`/wms/move-detail/queryMoveDetailList/${mainCode}`,
        method:"get",
    })
}

// 创建移库单
export function moveCreate(params){
    return request({
        url:"/wms/move/create",
        method:"post",
        data:params,
    })
}
// 库房
export function queryEnumList(enumName) {
    return request({
        url: `/wms/common/queryEnumList/${enumName}`,
        method: "get",
    })
}

// 选择移库区域
export function getMoveAreaInfo(warehouseCode){
    return request({
        url:`/wms/move/getMoveAreaInfo/${warehouseCode}`,
        method:"get",
    })
}

// 选择起始库列
export function  getMoveColStartInfo(params){
    return request({
        url:`/wms/move/getMoveColStartInfo/${params.warehouseCode}/${params.area}`,
        method:"get",
    })
}

// 选择移库终点列的信息
export function getMoveColTargetInfo(params){
    return request({
        url:`/wms/move/getMoveColTargetInfo/${params.warehouseCode}/${params.onlyCode}`,
        method:"get"
    })
}

// 获取选择的库列货物信息
export function getSelectColGoodsInfo(params) {
    return request({
        url:`/wms/move/getSelectColGoodsInfo/${params.warehouseCode}/${params.onlyCode}`,
        method:"get",
    })
}