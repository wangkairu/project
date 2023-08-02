
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
        //     'Content-Type': 'application/json'
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



