import request from '@/utils/request'
// 登录
export function getInfo(params) {
    return request({
        url: "/wms/sysUser/userLogin",
        method: "post",
        params,
    })
}

// 系统角色

// 获取角色列表
export function queryRoleList(params) {
    return request({
        url: `/wms/sysRole/queryRoleList?page=${params.page}&size=${params.size}`,
        method: "get",

    })
}

// 新增-编辑角色
export function saveOrUpdateRole(params) {
    return request({
        url: "/wms/sysRole/saveOrUpdateRole",
        method: "post",
        data: params,
    })
}

// 删除角色
export function deleteRole(params) {
    return request({
        url: "/wms/sysRole/deleteRole",
        method: "delete",
        params,
    })
}
// 用户
// 获取用户列表
export function queryUserList(params) {
    return request({
        url: `/wms/sysUser/queryUserList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params,
    })
}



// 新增-编辑系统用户
export function saveOrUpdateUser(params) {
    return request({
        url: "/wms/sysUser/saveOrUpdateUser",
        method: "post",
        data: params,
    })
}

// 修改用户状态
export function changeUserStatus(userId) {
    return request({
        url: `/wms/sysUser/changeUserStatus/${userId}`,
        method: "put",
    })
}

// 组织机构

// 获取部门树
export function queryDeptTree() {
    return request({
        url: `/wms/sysDepart/queryDeptTree`,
        method: "get",
    })
}

// 获取部门列表
export function queryDeptList(params) {
    return request({
        url: `/wms/sysDepart/queryDeptList?page=${params.page}&size=${params.size}`,
        method: "get",
    })
}


// 删除部门树
export function deleteDept() {
    return request({
        url: `/wms/sysDepart/deleteDept`,
        method: "get",
    })
}

// 新增-编辑组织部门
export function saveOrUpdateDept(params) {
    return request({
        url: `/wms/sysDepart/saveOrUpdateDept`,
        method: 'post',
        data: params,
    })
}
