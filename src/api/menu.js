import request from '@/utils/request'

export function queryFolderLayerList(params) {
    return request({
        url: "/wms/sysMenu/queryFolderLayerList",
        method: "get",
        params,
    })
}

export function saveOrUpdateMenuFolder(params) {
    return request({
        url: "/wms/sysMenu/saveOrUpdateMenuFolder",
        method: "post",
        data: params,
    })
}

export function queryUsableMenus(params) {
    return request({
        url: "/wms/sysMenu/queryUsableMenus",
        method: "get",
        params,
    })
}


export function queryBindMenus(folderId) {
    return request({
        url: `/wms/sysMenu/queryBindMenus/${folderId}`,
        method: "get",
        // params,
    })
}

export function deleteFolder(params) {
    return request({
        url: '/wms/sysMenu/deleteFolder',
        method: "delete",
        params,
    })
}


export function bindMenuToFolder(params) {
    return request({
        url: '/wms/sysMenu/bindMenuToFolder',
        method: "post",
        data: params,
    })
}

export function sysRoleQueryUnBindMenus(roleId) {
    return request({
        url: `/wms/sysRole/queryUnBindMenus/${roleId}`,
        method: "get",
        // data: params,
    })
}

export function bindMenuToRole(params) {
    return request({
        url: '/wms/sysRole/bindMenuToRole',
        method: "post",
        data: params,
    })
}

export function sysRoleQueryBindMenus(roleId) {
    return request({
        url: `/wms/sysRole/queryBindMenus/${roleId}`,
        method: "get",

    })
}


export function cancelBindMenu(menuId) {
    return request({
        url: `/wms/sysMenu/cancelBindMenu/${menuId}`,
        method: "put",
    })
}