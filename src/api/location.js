import request from '@/utils/request'

export function exportTemplate(params) {
    return request({
        url: '/wms/basWarehouseVirtually/exportTemplate',
        method: "get",
        params,
        responseType: 'blob',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
}


export function importWarehouseVirtually(params) {
    return request({
        url: '/wms/basWarehouseVirtually/importWarehouseVirtually',
        method: "post",
        data: params,
        responseType: 'blob',
    })
}

export function queryWarehouse(params) {
    return request({
        url: '/wms/basWarehouseVirtually/queryWarehouse',
        method: "post",
        data: params,
    })
}

export function queryWarehouseColList(params) {
    return request({
        url: '/wms/basWarehouseVirtually/queryWarehouseColList',
        method: "post",
        data: params,
    })
}

export function queryWarehouseColDropDown(params) {
    return request({
        url: '/wms/basWarehouseVirtually/queryWarehouseColDropDown',
        method: "post",
        data: params,
    })
}

export function queryColBindRuleList(params) {
    return request({
        url: '/wms/basWarehouseVirtually/queryColBindRuleList',
        method: 'post',
        data: params,
    })
}

export function bindColWarehousingRules(params) {
    return request({
        url: '/wms/basWarehouseVirtually/bindColWarehousingRules',
        method: 'post',
        data: params,
    })
}

export function queryEnumList(enumName) {
    return request({
        url: `/wms/common/queryEnumList/${enumName}`,
        method: 'get',
    })
}
// /wms/basWarehouseVirtually/enableDisableLocation
export function enableDisableLocation(params) {
    return request({
        url: '/wms/basWarehouseVirtually/enableDisableLocation',
        method: 'post',
        data: params,
    })
}

export function getWarehouseShow(params) {
    return request({
        url: '/wms/basWarehouseVirtually/getWarehouseShow',
        method: 'post',
        data: params,
    })
}
// 
export function getWarehouseShowGroupByRule(params) {
    return request({
        url: '/wms/basWarehouseVirtually/getWarehouseShowGroupByRule',
        method: 'post',
        data: params,
    })
}
// 
export function getGoodsByLocationCode(stationCode) {
    return request({
        url: `/wms/bas-warehouse-real/getGoodsByLocationCode/${stationCode}`,
        method: 'get',
        // data: params,
    })
}

// 
export function clearLocation(params) {
    return request({
        url: "/wms/manual-operation/clearLocation",
        method: 'post',
        data: params
    })
}

// 
export function occupyrResourceShow(code){
    return request({
        url:`/wms/basWarehouseVirtually/occupy-resource-show/${code}`,
        method:"get",
    })
}
// /wms/occupy-resource/release/{resourceId}
export function occupyResourceRelease(resourceId){
    return request({
        url:`/wms/occupy-resource/release/${resourceId}`,
        method:"get",
    })
}
// 
export function enableColRule(params){
    return request({
        url:`/wms/bas-warehousing-rules/enableColRule/${params.warehouseCode}/${params.onlyCode}/${params.enable}`,
        method:"get",
    })
}
// /wms/Warehouse/getWarehouseCount
// export function getWarehouseCount(){
//     return request({
//         url:`/wms/Warehouse/getWarehouseCount`,
//         method:"get",
//     })
// }

// 备货区展示
// basWarehouseVirtually/getReadyShow
export function basWarehouseVirtually(params){
    return request({
        url:"/wms/basWarehouseVirtually/getReadyShow",
        method:"post",
        data:params,
    })
}

// 
export function getReadyGoodsByLocationCode(stationCode){
    return request({
        url:`/wms/bas-warehouse-real/getReadyGoodsByLocationCode/${stationCode}`,
        method:"get",
        // data:params,
    })
}
// 
export function clearLocationWithoutGoods(locationCodeStr){
    return request({
        url:`/wms/manual-operation/clearLocationWithoutGoods/${locationCodeStr}`,
        method:"get",
    })
}



// 库列及库位统计
export function getWarehouseCount(){
    return request({
        url:"/wms/Warehouse/getWarehouseCount",
        method:"get"
    })
}

// 
export function getGoodsLocation(params){
    return request({
        url:`/wms/baseGoods/getGoodsLocation/${params.qrCode}`,
        method:"get",
    })
}
// 
export function selectClearReady(params){
    return request({
        url:'/wms/basWarehouseVirtually/selectClearReady',
        method:"post",
        data:params,
    })
}
// 
export function addRule(params){
    return request({
        url:"/wms/bas-stock-up-area-rule/addRule",
        method:"post",
        data:params
    })
}

// 
export function queryStockUpList(params){
    return request({
        url:"/wms/bas-stock-up-area-rule/queryStockUpList",
        method:"post",
        data:params
    })
}

// 
export function enableStockUpRule(params){
    return request({
        url:`/wms/bas-stock-up-area-rule/enableStockUpRule/${params.id}/${params.enable}`,
        method:"get",
    })
}
// 
export function deleteStockUpRule(ids){
    return request({
        url:`/wms/bas-stock-up-area-rule/deleteStockUpRule`,
        method:"delete",
        data:ids
    })
}

// 
export function deleteColRule(params){
    return request({
        url:`/wms/bas-warehousing-rules/deleteColRule/${params.warehouseCode}/${params.onlyCode}`,
        method:"get",
    })
}

export function batchClearLocation(params){
    return request({
        url:"/wms/manual-operation/batchClearLocation",
        method:"post",
        data:params
    })
}
// 
export function exportInDetail(params){
    return request({
        url:"/wms/in-detail/export",
        method:"post",
        data:params,
        responseType: 'arraybuffer',
    })
}
// 
export function queryLocationHighlight(params){
    return request({
        url:"/wms/basWarehouseVirtually/queryLocationHighlight",
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

// 输入二维码
// 
export function getGoodsByMes(code){
    return request({
        url:`/wms/baseGoods/getGoodsByMes/${code}`,
        method:"get"
    })
}

// 启用库位导出

export function enableLocationExport(paramas){
    return request({
        url:"/wms/basWarehouseVirtually/enableLocationExport",
        method:"post",
        data:paramas,
        responseType:"blob"
    })
}