import request from '@/utils/request'
export function queryCheckPlanList(params) {
    return request({
        url: `/wms/check-plan/queryCheckPlanList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params
    })
}

export function queryWarehouseColDropDown(params) {
    return request({
        url: '/wms/basWarehouseVirtually/queryWarehouseColDropDown',
        method: "post",
        data: params,
    })
}
// 
export function create(params){
    return request({
        url:"/wms/check-plan/create",
        method:"post",
        data:params,
    })
}

export function checkPlanDelete(params){
    return request({
        url:"/wms/check-plan/delete",
        method:"delete",
        data:params
    })
}

// 
export function queryCheckPlanDetailList(mainCode){
    return request({
        url:`/wms/check-plan-detail/queryCheckPlanDetailList/${mainCode}`,
        method:"get",
        // data:params
    })
}

// 
export function editCheckPlanDetail(params){
    return request({
        url:"/wms/check-plan-detail/editCheckPlanDetail",
        method:"put",
        data:params
    })
}

export function sysUserGetUserList(params) {
    return request({
        url: '/wms/sysUser/getUserList',
        method: "get",
        params,
    })
}

export function queryCheckPlanDetailListByQrCode(qrCode){
    return request({
        url:`/wms/check-plan-detail/queryCheckPlanDetailListByQrCode/${qrCode}`,
        method:"get",
    })
}
// export function queryWarehouseColDropDown(params) {
//     return request({
//         url: '/wms/basWarehouseVirtually/queryWarehouseColDropDown',
//         method: "post",
//         data: params,
//     })
// }