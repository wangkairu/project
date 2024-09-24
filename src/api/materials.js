import request from '@/utils/request'
// 
export function exportTemplate(){
    return request({
        url:'/wms/materials/exportTemplate',
        method:"get",
        responseType: 'blob',
    })
}


export function importFinishedMaterials(params){
    return request({
        url:"/wms/materials/importFinishedMaterials",
        method:"post",
        data:params,
        // responseType: 'blob',
        // responseType:'arraybuffer',
    })
}
// 
export function showFinishedMaterials(params){
    return request({
        url:`/wms/materials/showFinishedMaterials/${params.year}/${params.state}`,
        method:"get"
    })
}

// 
export function showFinishedMaterialsMonth(params){
    return request({
        url:`/wms/materials/showFinishedMaterials/${params.year}/${params.month}/${params.state}`,
        method:"get",
    })
}

export function showFinishedMaterialsDay(params){
    return request ({
        url:`/wms/materials/showFinishedMaterials/${params.year}/${params.month}/${params.day}/${params.state}`,
        method:"get",
    })
}