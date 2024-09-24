<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
            :labelWidth="'110px'"
            :maxShow="4"
            :collapsiable="false"
            @search="search"
            @reset="reset"
            >
                <el-form-item label="任务编号">
                    <el-input
                    size="mini"
                    v-model="form.agvTaskNo"
                    @change="handelAgvTaskNo"
                    placeholder="请输入任务编号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="MES规格名称">
                    <el-input
                    size="mini"
                    v-model="form.mesNormsName"
                    @change="handelMesNormsName"
                    placeholder="请输入MES规格名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="任务状态">
                    <el-select
                        v-model="form.agvTaskStatus"
                        @change="handelStatus"
                        placeholder="请选择任务状态"
                        size="mini"
                    >
                        <el-option
                        v-for="item in agvTaskStatusOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务类型">
                    <el-select
                        v-model="form.agvTaskType"
                        @change="handelAgvTaskType"
                        placeholder="请选择任务类型"
                        size="mini"
                    >
                        <el-option
                        v-for="item in agvTaskTypeOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <div class="enteringButton">
            <el-button
                type="primary"
                v-permission="{ name: 'isExport' }"
                @click="handelExport"
                size="mini"
                >导出Excel</el-button
            >
            <el-popover placement="right" width="500" trigger="click">
                <el-checkbox-group v-model="checkedTableColumns">
                <el-row>
                    <el-col v-for="(item, i) in columns" :key="i" :span="12">
                        <el-checkbox :label="item.attr">
                            {{ item.label }}
                        </el-checkbox>
                    </el-col>
                </el-row>
                </el-checkbox-group>
                <el-button
                style="margin-left: 10px"
                type="primary"
                size="mini"
                slot="reference"
                >列筛选</el-button
                >
                <!-- <el-button
                size="small"
                type="text"
                @click.native="filterFunHandle('allchecked')"
                >全选</el-button
            >
            <el-button
                size="small"
                type="text"
                @click.native="filterFunHandle('cancel')"
                >取消全选</el-button
            > -->
            </el-popover>
            </div>
            <el-table
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            style="width: 100%"
            :data="data"
            >
            <el-table-column fixed type="index" label="#"> </el-table-column>
            <template v-for="(col, index) in bindTableColumns">
                <template v-if="col.label === 'AGV任务编号'">
                    <el-table-column
                        :fixed="col.fixed || false"
                        :key="index"
                        :prop="col.attr"
                        :label="col.label"
                    >
                        <template slot-scope="scope">
                        <span>
                            {{ scope.row.agvTaskNo?scope.row.agvTaskNo:'暂无' }}
                        </span>
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column
                        :fixed="col.fixed || false"
                        :key="index"
                        :prop="col.attr"
                        :label="col.label"
                        :show-overflow-tooltip="col.tooltip || false"
                    >
                    </el-table-column>
                </template>
            </template>
            </el-table>
        </div>
        <div class="pagenation">
            <PageNation
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="pageChange"
            />
      </div>
    </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {taskStatisticsExport,queryTaskList} from '@/api/task'
import { uploadExcel } from "@/utils/uploadExcel";
export default{
    components: {PageNation,  SearchFilter },
    data(){
        return {
            columns: [
                {
                    label: "AGV任务编号",
                    attr: "agvTaskNo",
                    show: true,
                    fixed: true,
                },
                {
                    label: "MES规格名称",
                    attr: "mesNormsName",
                    show: true,
                    fixed: true,
                },
                {
                    label: "MES客户简称",
                    attr: "mesCustomerShortName",
                    show: true,
                    tooltip: true
                },
                {
                    label: "MES轮型",
                    attr: "mesWheelType",
                    show: true,
                },
                {
                    label: "MES米长",
                    attr: "mesMeterLength",
                    show: true,
                },
                {
                    label: "MES左右面",
                    attr: "leftRightSidesEnum",
                    show: true,
                },
                {
                    label: "AGV任务状态",
                    attr: "agvTaskStatusEnum",
                    show: true,
                },
                {
                    label: "WMS任务类别",
                    attr: "agvTaskTypeEnum",
                    show: true,
                },
        
            ],
            agvTaskStatusOptions:[
                {
                    value:'无',
                    key:0
                },
                {
                    value:'进行中',
                    key:1
                },
                {
                    value:'已完成',
                    key:2
                },
                {
                    value:'已取消',
                    key:3
                },
                {
                    value:'出错',
                    key:4
                }
            ],
            agvTaskTypeOptions:[
                {
                    key:"IN_REQUEST_TASK",
                    value:"入库"
                }, {
                    key:"OUT_REQUEST_TASK",
                    value:"备货"
                },{
                    key:"TURN_BACK_REQUEST_TASK",
                    value:"返库"
                },{
                    key:"REWORK_REQUEST_TASK",
                    value:"返工"
                }
            ],
            form:{
                agvTaskNo:"",
                mesNormsName:"",
                agvTaskStatus:"",
                agvTaskType:""
            },
            total: 0,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            data:[],
        }
    },
    computed: {
        bindTableColumns() {
            return this.columns.filter((column) => column.show);
        },
        checkedTableColumns: {
            get() {
                return this.bindTableColumns.map((column) => column.attr);
            },
            set(checked) {
                this.columns.forEach((column) => {
                    if (checked.includes(column.attr)) {
                        column.show = true;
                    } else {
                        column.show = false;
                    }
                });
            },
        },
    },
    mounted(){
        this.queryTaskList()
    },
    methods:{
        pageChange(val) {
            this.listQuery.pageNum = val.page;
            this.listQuery.pageSize = val.limit;
            this.queryTaskList();
        },
        handelExport() {
            const params={
                ...this.form
            }
            // this.bindTableColumns &&
            // this.bindTableColumns.length > 0 &&
            // this.bindTableColumns.forEach((v) => {
            //     params[`${v.attr}`]=''
            // });
            taskStatisticsExport(params).then((res) => {
                const blob = new Blob([res], { type: "application/vnd.ms-excel" });
                const fileName = "任务统计报表.xlsx";
                uploadExcel(fileName, blob);
            });
        },
        async queryTaskList(){
            const query={
                size:this.listQuery.pageSize,
                page:this.listQuery.pageNum-1,
            }
            const res= await queryTaskList(this.form,query)
            if(res.code==='0'){
                this.total=res.data.total
                this.data=res.data.items
            }
        },
        search(){
            this.queryTaskList()
        },
        reset(){
            this.form={
                agvTaskNo:"",
                mesNormsName:"",
                agvTaskStatus:"",
                agvTaskType:""
            }
            this.queryTaskList()
        },
        handelStatus(){
            this.queryTaskList()
        },
        handelAgvTaskType(){  this.queryTaskList()},
        handelAgvTaskNo(){ this.queryTaskList()},
        handelMesNormsName(){ this.queryTaskList()}
    }
}
</script>

<style lang="scss" scoped>
.warpper{
    .table-filter {
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px 0;
        .search-coloct {
        height: 48px;
        overflow: hidden;
        }
    }

    .table {
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 10px;
        .enteringButton {
        margin-bottom: 10px;
        }
    }
    .pagenation {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        background-color: #fff;
        margin-top: 10px;
        padding: 6px;
    }
}
 
</style>