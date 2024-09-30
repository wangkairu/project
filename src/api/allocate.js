import request from '@/utils/request'
// 调拨出库获取列表
export function queryAllocateOutList(params){
    return request({
        url:"/wms/allocate-out/queryAllocateOutList",
        method:"post",
        data:params
    })
}
// 
export function complete(id){
    return request({
        url:`/wms/allocate-out/complete/${id}`,
        method:"get",
    })
}

// /wms/allocate-in/queryAllocateInList
export function queryAllocateInList(params){
    return request({
        url:"/wms/allocate-in/queryAllocateInList",
        method:"post",
        data:params
    })
}

// 获取库位编号
export function queryStationCode(params){
    return request({
        url:`/wms/allocate-in/queryStationCode/${params.warehouseCode}/${params.areaCode}/${params.functionType}/${params.functionCode}/${params.functionAreaCode}/${params.colIndexAlias}`,
        method:"get"
    })
}
// 新增入库
//
export function allocateInCreate(params){
    return request({
        url:"/wms/allocate-in/create",
        method:"post",
        data:params
    })
}

// 选择库列编号
export function selectCol(params){
    return request({
        url:"/wms/allocate-out/selectCol",
        method:"post",
        data:params
    })
}

// 创建调拨出库计划
// {
export function allocateOutCreate(params){
    return request({
        url:"/wms/allocate-out/create",
        method:"post",
        data:params
    })
}

// 删除调拨出库单
export function allocateOutDelete(parmas){
    return request({
        url:"/wms/allocate-out/delete",
        method:"delete",
        data:parmas
    })
}