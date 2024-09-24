import request from '@/utils/request'
// export function createMove(params) {
//     return request({
//         url: "/wms/move/create",
//         method: "post",
//         data: params,
//     })
// }
export function basearlywarningthresholds(params){
    return request({
        url:"/wms/bas-basearlywarningthresholds/list",
        method:"post",
        data:params,
    })
}

export function basearlywarningthresholdsInfo(id){
    return request({
        url:`/wms/bas-basearlywarningthresholds/info/${id}`,
        method:"get",
    })
}
export function basearlywarningthresholdsDelete(params){
    return request({
        url:"/wms/bas-basearlywarningthresholds/delete",
        method:"delete",
        data:params
    })
}
export function basearlywarningthresholdsSave(params){
    return request({
        url:"/wms/bas-basearlywarningthresholds/save",
        method:"post",
        data:params,
    })
}

export function basearlywarningthresholdsUpdate(params){
    return request({
        url:"/wms/bas-basearlywarningthresholds/update",
        method:"post",
        data:params,
    })
}