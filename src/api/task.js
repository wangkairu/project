import request from '@/utils/request'
export function queryTaskList(params,query){
    return request({
        url:`/wms/taskStatistics/queryTaskList?size=${query.size}&page=${query.page}`,
        method:"post",
        data:params
    })
}
// 
export function taskStatisticsExport(params)
{
    return request({
        url:"/wms/taskStatistics/export",
        method:"post",
        data:params
    })
}
// 
export function queryAutoArtificialTaskList(params){
    return request({
        url:`/wms/baseGoods/queryAutoArtificialTaskList?page=${params.page}&size=${params.size}`,
        method:"post",
        data:params.request
    })
}