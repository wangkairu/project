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

// 车辆信息列表
// 
export function queryVehicleList(){
    return request({
        url:"/wms/park-manage/queryVehicleList",
        method:"get",
    })
}

// 调整待命点顺序
export function moveVehicle(params){
    return request({
        url:`/wms/park-manage/moveVehicle/${params.id}/${params.vehicleName}/${params.move}`,
        method:"get",
    })
}

// 待命点车辆移除
// 
export function removeVehicle(id){
    return request({
        url:`/wms/park-manage/removeVehicle/${id}`,
        method:"get",
    })
}

// 统计图
export function getGraph(params){
    return request({
        url:"/wms/index/getGraph",
        method:"post",
        data:params,
    })
}
// 实时总数量
// 
export function realTimeCount(){
    return request({
        url:"/wms/index/realTimeCount",
        method:"get",
        // data:params,
    })
}
// 出入库比列图
// 
export function getRatio(params){
    return request({
        url:"/wms/index/getRatio",
        method:"post",
        data:params,
    })
}
// \
// 
export function getRankingList(params){
    return request({
        url:"/wms/index/getRankingList",
        method:"get",
        params
    })
}
// 排行榜根据客户区分（日）
export function getLeaderBoardByCustomerWithDay(params){
    return request({
        url:`/wms/leaderboard/getLeaderBoardByCustomerWithDay/${params.year}/${params.month}/${params.day}`,
        method:"get",
    })
}
// 
export function getLeaderBoardByCustomerWithMonth(params){
    return request({
        url:`/wms/leaderboard/getLeaderBoardByCustomerWithMonth/${params.year}/${params.month}`,
        method:"get",
    })
}

// 排行榜根据客户区分的（年）
export function getLeaderBoardByCustomerWithYear(params){
    return request({
        url:`/wms/leaderboard/getLeaderBoardByCustomerWithYear/${params.year}`,
        method:"get",
    })
}

// 排行榜根据规格区分(日)
export function getLeaderBoardByMesNormNameWithDay(params){
    return request({
        url:`/wms/leaderboard/getLeaderBoardByMesNormNameWithDay/${params.year}/${params.month}/${params.day}`,
        method:"get",
    })
}

// 排行榜根据规格区分的（月）
export function getLeaderBoardByMesNormNameWithMonth(params){
    return request({
        url:`/wms/leaderboard/getLeaderBoardByMesNormNameWithMonth/${params.year}/${params.month}`,
        method:"get",
    })
}

// 排行榜根据规格区分的 （年）
export function getLeaderBoardByMesNormNameWithYear(params){
    return request({
        url:`/wms/leaderboard/getLeaderBoardByMesNormNameWithYear/${params.year}`,
        method:"get",
    })
}

// 成品入库全钢或半钢前十排名(月)
export function inNorm(params){
    return request({
        url:`/wms/in-out-Norm/inNorm/${params.year}/${params.month}/${params.state}`,
        method:"get",
    })
}

// 成品出库全钢或半钢规格前十排名(月)
export function outNorm(params){
    return request({
        url:`/wms/in-out-Norm/outNorm/${params.year}/${params.month}/${params.state}`,
        method:"get",
    })
}

// 发货方式根据汇总
export function getGraphWMSDeliverByYear(params){
    return request({
        url:`/wms/graph/getGraphWMSDeliverByYear/${params.year}`,
        method:"get",
    })
}

export function getGraphWMSDeliverByMonth(params){
    return request({
        url:`/wms/graph/getGraphWMSDeliverByMonth/${params.year}/${params.month}`,
        nethod:"get"
    })
}

// 
export function getGraphNormTypeWithByMonth(params){
    return request({
        url:`/wms/graph/getGraphNormTypeWithByMonth/${params.year}/${params.month}`,
        method:"get",
    })
}

export function selectMonth(params){
    return request({
        url:'/wms/in-out-month/selectMonth',
        method:"get",
        params,
    })
}

export function selectYear(params){
    return request({
        url:'/wms/in-out-month/selectYear',
        method:"get",
        params,
    })
}

// 
export function IsExist(params){
    return request({
        url:"/wms/baseGoods/IsExist",
        method:"post",
        data:params
    })
}

// 月度订单流水记录
export function seletPage(params){
    return request({
        url:"/wms/order/seletPage",
        method:"post",
        data:params
    })
}

// 
export function bindRole(params){
    return request({
        url:"/wms/sysUser/bindRole",
        method:"post",
        data:params
    })
}

// 
export function queryBindRole(userId){
    return request({
        url:`/wms/sysUser/queryBindRole/${userId}`,
        method:"get",
    })
}
// 
export function editUserPassword(params){
    return request({
        url:"/wms/sysUser/editUserPassword",
        method:"post",
        data:params
    })
}