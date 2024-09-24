import request from '@/utils/request'

// 获取入库明细
export function queryDetailList(params) {
    return request({
        url: `/wms/in-detail/queryDetailList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params.request,
    })
}

// 入库异常列表
export function queryExceptionList(params) {
    return request({
        url: `/wms/in-detail-exception/queryExceptionList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params,
    })
}

// 入库明细表每天
export function queryList(params) {
    return request({
        url: `/wms/in-out-day/queryList?page=${params.page}&size=${params.size}`,
        method: "post",
        data: params,
    })
}

// 成品入库规格前十排名（日累计）
export function getRankBar(params) {
    return request({
        url: `/wms/in-out-day/getNormsRankBar/${params.type}/${params.year}/${params.month}/${params.date}`,
        method: "get",
        // data: params,
    })
}
// 成品规格前十排名(月累计)
export function getNormsRankBarByMonth(params){
    return request({
        url:`/wms/in-out-day/getNormsRankBarByMonth/${params.type}/${params.year}/${params.month}`,
        method:"get",
    })
}
// 成品规格前十排名(年累计)
export function getNormsRankBarByYear(params){
    return request({
        url:`/wms/in-out-day/getNormsRankBarByYear/${params.type}/${params.year}`,
        method:"get",
    })
}
// 日合计
export function getDayAmount(params) {
    return request({
        url: `/wms/in-out-day/getDayAmount/${params.type}/${params.year}/${params.month}/${params.date}`,
        method: "get",
        // data: params,
    })
}

// 客户排名
export function getCustomerRank(params) {
    return request({
        url: `/wms/in-out-day/getCustomerRank/${params.type}/${params.year}/${params.month}/${params.date}`,
        method: "get",
    })
}

// 净重合计日
export function getNetWeight(params) {
    return request({
        url: `/wms/in-out-day/getNetWeight/${params.type}/${params.year}/${params.month}`,
        method: "get",
    })
}
// 净重合计月
export function getNetWeightBYMonth(params){
    return request({
        url:`/wms/in-out-day/getNetWeightBYMonth/${params.type}/${params.year}`,
        method:"get",
    })
}
// 净重合计年
export function getNetWeightByYear(params){
    return request({
        url:`/wms/in-out-day/getNetWeightByYear/${params.type}/${params.year}`,
        method:"get",
    })
}
// 获取 筛选条件
export function getFilterConditions(params) {
    return request({
        url: '/wms/in-out-day/getFilterConditions',
        method: "post",
        data: params,
    })
}


// 入库规则
export function queryRulesList(paramas){
    return request({
        url:`/wms/bas-warehousing-rules/queryRulesList?page=${paramas.page}&size=${paramas.size}`,
        method:"post",
        data:paramas,
    })
}
// 
export function queryRulesDetailList(params){
    return request({
        url:'/wms/bas-warehousing-rules/queryRulesDetailList',
        method:"post",
        data:params
    })
}

export function queryEnumList(enumName){
    return request({
        url:`/wms/common/queryEnumList/${enumName}`,
        method:"get",
    })
}
// 
export function InDetailWithDay(params){
    return request({
        url:`/wms/StatisticsReports/InDetailWithDay/${params.year}/${params.month}/${params.day}`,
        method:"get",
        params,
    })
}

// 
export function getCustomerAndSpecification(){
    return request({
        url:"/wms/real-time/getCustomerAndSpecification",
        method:"get"
    })
}

// 
export function InDetailWithMonth(params){
    return request({
        url:`/wms/StatisticsReports/InDetailWithMonth/${params.year}/${params.month}`,
        method:"get",
        params,
    })
}
// 
export function InDetailWithYear(params){
    return request({
        url:`/wms/StatisticsReports/InDetailWithYear/${params.year}`,
        method:"get",
        params,
    })
}

// 
export function InDetailWithYearly(params){
    return request({
        url:"/wms/StatisticsReports/InDetailWithYears",
        method:"get",
        params,
    })
}

export function StatisticsReports(params){
    return request({
        url:"/wms/StatisticsReports/choice",
        method:"get",
        params,
    })
}

export function StatisticsReportsRatioYear(params){
    return request({
        url:"/wms/StatisticsReports/RatioYear",
        method:"get",
        params
    })
}
// /wms/StatisticsReports/WeightYear
export function StatisticsReportsWeightYear(params){
    return request({
        url:"/wms/StatisticsReports/WeightYear",
        method:"get",
        params
    })
}


// 新增调拨入库
export function createAllocate(params){
    return request({
        url:"/wms/allocate-in/create",
        method:"post",
        data:params
    })
}

// 获取调拨入库列表
export function queryAllocateInList(params){
    return request({
        url:"/wms/allocate-in/queryAllocateInList",
        method:"post",
        data:params
    })
}

// 获取库位编号
export function queryStationCode(params){
    return request({
        url:`/wms/allocate-in/queryStationCode/${params.warehouseCode}/${params.areaCode}/${params.functionType}/${params.functionCode}/${params.functionAreaCode}/${params.colIndexAliasList}`,
        method:"get",
    })
}

// 出入存日汇总表
export function inOutWareSelectAll(params){
    return request({
        url:"/wms/in-out-ware/selectAll",
        method:"post",
        data:params
    })
}

// 总库存重量趋势图
export function weightTrendGraph(params){
    return request({
        url:"/wms/in-out-ware/weight-trend-graph",
        method:"get",
        params
    })
}

// 年最大最小平均值的柱状图
export function maxMinAverageGraphYear(){
    return request({
        url:"/wms/in-out-ware/max-min-average-graph-year",
        method:"get"
    })
}

// 月最大最小平均值的柱状图
export function maxMinAverageGraph(params){
    return request({
        url:"/wms/in-out-ware/max-min-average-graph",
        method:"get",
        params
    })
}

export function selectByDay(params){
    return request({
        url:"/wms/in-out-ware/selectByDay",
        method:"post",
        data:params
    })
}

export function InOutDetailWeightByYear(){
    return request({
        url:"/wms/StatisticsReports/InOutDetailWeightByYear",
        method:"get",

    })
}

// 
export function InOutDetailWeightByMonth(params){
    return request({
        url:"/wms/StatisticsReports/InOutDetailWeightByMonth",
        method:"get",
        params
    })
}

// 
export function InOutDetailWeightByDay(params){
    return request({
        url:"/wms/StatisticsReports/InOutDetailWeightByDay",
        method:"get",
        params
    })
}