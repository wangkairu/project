import request from '@/utils/request'
export function enableDisableLocation(params){
    return request({
        url:"/wms/basWarehouseVirtually/enableDisableLocation",
        method:"post",
        data:params
    })
}
// 