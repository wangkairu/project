import request from '@/utils/request'

export function warehousingGoods(params) {
    return request({
        url: `/wms/baseGoods/warehousingGoods/${params.warehouseCode}`,
        method: 'POST',
        data: params,
    })
}

export function getGoodsByMes(code) {
    return request({
        url: `/wms/baseGoods/getGoodsByMes/${code}`,
        method: "GET",
    })
}

export function getGoods(code){
    return request({
        url:`/wms/baseGoods/getGoods/${code}`,
        method:"GET",
    })
}
// 基础-成品箱货物
// // /wms/baseGoods/getGoodsByMes/{code}
// export function 