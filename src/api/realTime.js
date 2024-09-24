import request from '@/utils/request.js'

export function getCountByIsAge(params){
    return request({
        url:"/wms/real-time/getCountByIsAge",
        method:'post',
        data:params,
    })
}

export function getCountByTime(params){
    return request({
        url:"/wms/real-time/getCountByTime",
        method:"post",
        data:params,
    })
}

// 实时筛选条件展示
export function getCustomerAndSpecification(){
    return request({
        url:"/wms/real-time/getCustomerAndSpecification",
        method:"get",
        // data:
    })
}

export function getCountByTimeGetAll(params){
    return request({
        url:'/wms/real-time/getCountByTime/getAll',
        method:"get",
        params
    })
}

// export function getCustomerAndSpecification(){
//     return request({
//         url:"/wms/real-time/getCustomerAndSpecification",
//         method:"get",
//     })
// }