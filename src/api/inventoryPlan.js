import request from '@/utils/request'

export function createCheckPlan(params) {
    return request({
        url: '/wms/check-plan/create',
        method: "post",
        data: params
    })
}

export function queryCheckPlanList(params) {
    return request({
        url: `/wms/check-plan/queryCheckPlanList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request
    })
}

export function queryCheckPlanDetailList(mainCode) {
    return request({
        url: `/wms/check-plan-detail/queryCheckPlanDetailList/${mainCode}`,
        method: "get",
    })
}

export function editCheckPlanDetail(params) {
    return request({
        url: '/wms/check-plan-detail/editCheckPlanDetail',
        method: "put",
        data: params,
    })
}

export function checkPlanDelete(params) {
    return request({
        url: '/wms/check-plan/delete',
        method: "delete",
        data: params,
    })
}
// /wms/sysUser/getUserList
export function sysUserGetUserList(params) {
    return request({
        url: '/wms/sysUser/getUserList',
        method: "get",
        params,
    })
}