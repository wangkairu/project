import request from '@/utils/request'
// 外部系统入库
export function warehousing(params) {
    return request({
        url: '/wms/external-service/warehousing',
        method: "post",
        data: params,
    })
}