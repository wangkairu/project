import request from '@/utils/request'

export function userAppLogin(params) {
    return request({
        url: "/wms/sysUser/userAppLogin",
        method: 'post',
        // data: params,
        params
    })
}
// 
export function changeLocation(params){
    return request({
        url:"/wms/baseGoods/changeLocation",
        method:"post",
        data:params,
    })
}

export function queryEnumList(enumName) {
    return request({
        url: `/wms/common/queryEnumList/${enumName}`,
        method: "get",
    })
}

// /wms/manual-operation/handInTask
export function handInTask(params){
    return request({
        url:"/wms/manual-operation/handInTask",
        method:"post",
        data:params,
    })
}

// 发货完成
// 
export function completeDeliver(code){
    return request({
        url:`/wms/deliver-goods/completeDeliver/${code}`,
        method:"get"
    })
}


// APP巡检
export function queryGoodsList(params) {
    return request({
        url: `/wms/baseGoods/queryGoodsList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request
    })
}

// 返库异常
export function exceptionAgvTask(params){
    return request({
        url:"/wms/manual-operation/exceptionAgvTask",
        method:"post",
        data:params
    })
}