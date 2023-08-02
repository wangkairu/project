
// 操作日志
import request from '@/utils/request'
export function queryLogList(params) {
    return request({
        url: `/wms/sys-log/queryLogList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request,
    })
}