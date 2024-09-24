
import request from '@/utils/request'
// 成品箱货物
export function queryGoodsList(params) {
    return request({
        url: `/wms/baseGoods/queryGoodsList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request
    })
}

export function exportBaseGoods(params) {
    return request({
        url: '/wms/baseGoods/export',
        method: "post",
        data: params,
        responseType: 'blob',
        // headers: {
        //     'Content-Type': 'APPLICATION/OCTET-STREAM'
        // }
    })
}



// 出入库成品箱货物
export function warehousingGoods(params) {
    return request({
        url: '/wms/baseGoods/warehousingGoods',
        method: "post",
        data: params,
    })
}

// 
export function setHeight(params){
    return request({
        url:"/wms/baseGoods/setHeight",
        method:"post",
        data:params
    })
}


export function deleteRole(id) {
    return request({
        url: `/wms/basWarehouseVirtually/delete/${id}`,
        method: "get",
    })
}

// 
export function editRemark(params){
    return request({
        url:"/wms/baseGoods/editRemark",
        method:"post",
        data:params
    })
}

// 补全信息
export function dataComplete(id){
    return request({
        url:`/wms/baseGoods/dataComplete/${id}`,
        method:"get",
    })
}