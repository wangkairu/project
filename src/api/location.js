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