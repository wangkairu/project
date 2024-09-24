<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'100px'"
                size="mini"
                :maxShow="3"
                @search="search"
                @reset="reset"
            >
                <!-- <el-form-item label="ID">
                    <el-input
                        size="mini"
                        v-model="id"
                        placeholder="请输入ID"
                        @change="handelID"
                        clearable
                    ></el-input>
                </el-form-item> -->
                <el-form-item label="创建时间">
                <div class="time">
                    <el-date-picker
                    size="mini"
                    v-model="query.createdTime"
                    type="date"
                    placeholder="请选择创建时间"
                    @change="handelCreatedTime"
                    >
                    </el-date-picker>
                </div>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input
                        size="mini"
                        v-model="query.createdBy"
                        placeholder="请输入创建人"
                        @change="handelCreatedBy"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="更新人">
                    <el-input
                        size="mini"
                        v-model="query.updatedBy"
                        placeholder="请输入更新人"
                        @change="handelUpdatedBy"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="更新时间">
                    <div class="time">
                        <el-date-picker
                        size="mini"
                        v-model="query.updatedTime"
                        type="date"
                        placeholder="请选择更新时间"
                        @change="handelUpdatedTime"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="占用上限">
                    <el-input
                        size="mini"
                        v-model="query.upperLimit"
                        placeholder="请输入箱号"
                        @change="handelUpperLimit"
                        clearable
                ></el-input>
                </el-form-item>
                <el-form-item label="占用下限">
                    <el-input
                        size="mini"
                        v-model="query.lowerLimit"
                        placeholder="请输入占用下限"
                        @change="handelLowerLimit"
                        clearable
                ></el-input>
                </el-form-item>
                <el-form-item label="库列">
                    <el-input
                        size="mini"
                        v-model="query.onlyCodeCategory"
                        placeholder="请输入库列"
                        @change="handeLonlyCodeCategory"
                        clearable
                ></el-input>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <div class="enteringButton">
                <el-button
                type="primary"
                @click="dialogVisible = true"
                size="mini"
                >新增</el-button
            >
            <el-button
                type="primary"
                @click="handelBatchDelete"
                size="mini"
                >批量删除</el-button
            >
            </div>
            <el-table
                ref="table"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                :data="data"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column fixed label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="id" label="ID"> </el-table-column>
                <el-table-column
                    prop="onlyCodeCategory"
                    label="库列"
                    width="360"
                    fixed
                >
                </el-table-column>
                <el-table-column fixed prop="normsSimpleCode" label="规格名称" width="120"> </el-table-column>
                <el-table-column fixed prop="customerShortName" label="客户简称" width="120"> </el-table-column>
                <el-table-column fixed prop="meterLength" label="米长"> </el-table-column>
                <el-table-column fixed prop="leftRightSidesEnum" label="左右面"> </el-table-column>
                <el-table-column fixed prop="wheelType" label="轮型"> </el-table-column>
                <el-table-column  prop="createdBy" label="创建人" >
                </el-table-column>
                <el-table-column
                prop="createdTime"
                label="创建时间"
                width="300"
                >
                </el-table-column>
                <el-table-column
                prop="lowerLimit"
                label="占用下限"
                >
                </el-table-column>
                <el-table-column prop="upperLimit" label="占用上限">
                </el-table-column>
                <el-table-column prop="updatedBy" label="更新人"> </el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" width="300">
                </el-table-column>
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
        <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="40%"
        @close="dialogVisible=false">
        <el-form ref="form" :model="create" :rules="rules" label-width="100px">
            <el-form-item label="占用上限" prop="upperLimit">
                <el-input v-model="create.upperLimit" placeholder="请输入占用上限"></el-input>
            </el-form-item>
            <el-form-item label="占用下限" prop="lowerLimit">
                <el-input v-model="create.lowerLimit" placeholder="请输入占用下限"></el-input>
            </el-form-item>
            <el-form-item label="库列" prop="onlyCodeCategory">
                <el-button type="primary" size="small" @click="dialogTableVisible=true">选择库列</el-button>
                <el-table style="margin-top: 10px;" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" v-if="checkedGh&&checkedGh.length>0" :data="checkedGh">
                    <el-table-column property="normsSimpleCode" label="规格简称" width="150"></el-table-column>
                    <el-table-column property="customerShortName" label="客户简称" width="200"></el-table-column>
                    <el-table-column property="wheelType" label="轮型"></el-table-column>
                    <el-table-column property="leftRightSidesEnum" label="左右面"></el-table-column>
                    <el-table-column property="meterLength" label="米长"></el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handelCreate">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="编辑"
        :visible.sync="edit"
        width="30%"
        :before-close="handleCancel">
        <el-form ref="form" :model="update" label-width="80px">
            <el-form-item label="更新人">
                <el-input v-model="update.updatedBy" placeholder="请输入更新人"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="update.updatedTime" ></el-date-picker>
            </el-form-item>
            <el-form-item label="占用上限">
                <el-input v-model="update.upperLimit" placeholder="请输入占用上限"></el-input>
            </el-form-item>
            <el-form-item label="占用下限">
                <el-input v-model="update.lowerLimit" placeholder="请输入占用下限"></el-input>
            </el-form-item>
            <el-form-item label="库列">
                <el-input v-model="update.onlyCodeCategory" placeholder="请输入库列"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handelUpdate">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="选择库列" :visible.sync="dialogTableVisible" @close="dialogTableVisible=false">
            <el-table ref="tb" :data="gridData" @selection-change="handleRadioChange">
                <el-table-column type="selection" width="55" align="center" :reserve-selection="true" />
                <el-table-column type="index" label="#" width="55" align="center" />
                <el-table-column property="normsSimpleCode" label="	规格简称" width="150"></el-table-column>
                <el-table-column property="customerShortName" label="客户简称" width="200"></el-table-column>
                <el-table-column property="meterLength" label="米长"></el-table-column>
                <el-table-column property="leftRightSidesEnum" label="左右面"></el-table-column>
                <el-table-column property="wheelType" label="轮型"></el-table-column>
            </el-table>
            <div class="pagenation">
                <PageNation
                    v-show="totals > 0"
                    :total="totals"
                    :page.sync="listQuerys.pageNum"
                    :limit.sync="listQuerys.pageSize"
                    @pagination="pageChange1"
                />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handelSelectCancel">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import {queryNormsList} from '@/api/specification'
import {
    basearlywarningthresholdsInfo,
    basearlywarningthresholds,
    basearlywarningthresholdsDelete,
    basearlywarningthresholdsSave,
    basearlywarningthresholdsUpdate} from '@/api/warn'
export default {
    name:"warn",
    components:{
        SearchFilter,
        PageNation
    },
    data(){
        return {
            query:{
                createdBy: "",
                createdTime: "",
                // deleteFlag: 0,
                lowerLimit: '',
                onlyCodeCategory: "",
                updatedBy: "",
                updatedTime: "",
                upperLimit: '',
            },
            create:{
                lowerLimit: '',
                onlyCodeCategory: "",
                upperLimit: '',
            },
            update:{
                createdBy: "",
                createdTime: "",
                deleteFlag: 0,
                lowerLimit: '',
                onlyCodeCategory: "",
                updatedBy: "",
                updatedTime: "",
                upperLimit: '',
            },
            listQuery:{
                pageNum:1,
                pageSize:10,
            },
            total:0,
            data:[],
            dialogVisible:false,
            edit:false,
            batchDelete:[],
            id:"",
            gridData:[],
            dialogTableVisible:false,
            checkedGh:[],
            listQuerys:{
                pageNum:1,
                pageSize:10,
            },
            totals:0,
            rules: {
                upperLimit: [
                    { required: true, message: '请填写占用上限', trigger: 'blur' },
                ],
                lowerLimit: [
                    { required: true, message: '请填写占用下限', trigger: 'blur' },
                ],
                onlyCodeCategory:[
                    { required: true, message: '请选择库列', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        this.basearlywarningthresholds()
        this.queryNormsList()
    },
    methods:{
        // async handelID(){
        //     const res = await basearlywarningthresholdsInfo(this.id)
        //     console.log(res,'res')
        // },
        handelSelectCancel(){
            this.dialogTableVisible = false;
            this.checkedGh = [];
            this.$refs.tb.clearSelection();
        },
        pageChange1(){
            this.listQuerys.pageNum = val.page;
            this.listQuerys.pageSize = val.limit;
            this.queryNormsList()
        },
        async queryNormsList(){
            const params={
                ...this.listQuerys,
                request:{}
            }
            const res = await queryNormsList(params)
            if(res.code==='0'){
                this.gridData=res.data.items
                this.totals=res.data.total
            }
        },
        handleRadioChange(selection){
            this.checkedGh = selection;
            if (selection.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(selection.pop());
            }
        },
        async handelCreate(){
            const val=this.checkedGh.map((v)=>v.onlyCodeCategory)
            this.create.onlyCodeCategory=val[0]
            const params={
                ...this.create,
                // onlyCodeCategory:val[0]
            }
            const res= await basearlywarningthresholdsSave(params)
            if(res.code==='0')
            {
                this.dialogVisible = false
                this.checkedGh=[]
                this.$refs.tb.clearSelection();
                this.create={
                    lowerLimit: '',
                    onlyCodeCategory: "",
                    upperLimit: '',
                }
                this.$message.success(res.msg)
                this.basearlywarningthresholds()
            }else {
                this.$message.error(res.msg)
            }
        },
        handleClose(){
            this.checkedGh=[]
            this.$refs.tb.clearSelection();
            this.create={
                lowerLimit: '',
                onlyCodeCategory: "",
                upperLimit: '',
            }
            this.dialogVisible = false
        },
        async handleDelete(row){
            this.$confirm("确定要删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                const res = await basearlywarningthresholdsDelete([row.id]);
                if (res.code === "0") {
                this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                })
                this.basearlywarningthresholds();
                } else {
                this.$message({
                    message: res.msg,
                    type: 'error',
                    duration: 1000
                })
                }
            });
        },
        handelBatchDelete(){
            this.$confirm("确定要删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                const res = await basearlywarningthresholdsDelete(this.batchDelete);
                if (res.code === "0") {
                this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                })
                this.basearlywarningthresholds();
                } else {
                this.$message({
                    message: res.msg,
                    type: 'error',
                    duration: 1000
                })
                }
            });
        },
        handleSelectionChange(val){
            const arr=[]
            val.forEach((v)=>{
                arr.push(v.id)
            }) 
            this.batchDelete=[...new Set(arr)]
        },
        handleEdit(row){
           this.edit=true;
           this.update=row;
           console.log(this.update,'update')
        },
        async handelUpdate(){
            const params={
                ...this.update
            }
            const res = await basearlywarningthresholdsUpdate(params)
            if(res.code==='0')
            {
                this.edit = false
                this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                })
                this.update={
                    createdBy: "",
                    createdTime: "",
                    deleteFlag: 0,
                    lowerLimit: '',
                    onlyCodeCategory: "",
                    updatedBy: "",
                    updatedTime: "",
                    upperLimit: '',
                },
                this.basearlywarningthresholds()
            }else {
                this.$message({
                    message: res.msg,
                    type: 'error',
                    duration: 1000
                })
            }
        },
        handleCancel(){
            this.update={
                createdBy: "",
                createdTime: "",
                deleteFlag: 0,
                lowerLimit: '',
                onlyCodeCategory: "",
                updatedBy: "",
                updatedTime: "",
                upperLimit: '',
            }
            this.edit = false
        },
        handelCreatedTime(){
            this.basearlywarningthresholds()
        },
        handelCreatedBy(){
            this.basearlywarningthresholds()
        },
        handelUpdatedBy(){
            this.basearlywarningthresholds()
        },
        handelUpdatedTime(){
            this.basearlywarningthresholds()
        },
        handelUpperLimit(){
            this.basearlywarningthresholds()
        },
        handelLowerLimit(){
            this.basearlywarningthresholds()
        },
        async handeLonlyCodeCategory(){
            this.basearlywarningthresholds()
        },
        pageChange(val){
            this.listQuery.pageNum = val.page ;
            this.listQuery.pageSize = val.limit;
            this.basearlywarningthresholds()
        },
        search(){
            this.basearlywarningthresholds()
        },
        reset(){
            this.query={
                createdBy: "",
                createdTime: "",
                // deleteFlag: 0,
                lowerLimit: '',
                onlyCodeCategory: "",
                updatedBy: "",
                updatedTime: "",
                upperLimit: '',
            },
            this.basearlywarningthresholds()
        },
        async basearlywarningthresholds(){
            const params={
                ...this.query,
                pageNumber:this.listQuery.pageNum,
                pageSize:this.listQuery.pageSize,
            }
            const res = await basearlywarningthresholds(params)
            if(res.code==='0'){
                this.data=res.data.items
                this.total = res.data.total
            }
        },
       
    }
}
</script>

<style lang="scss" scoped>
.warpper {
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 10px;
  }
  .table {
    padding: 6px 6px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    .enteringButton {
        margin-bottom: 10px;
      }
  }
  .echarts {
    display: flex;
    .box-card {
      margin-top: 10px;
      ::v-deep .el-card.is-always-shadow {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }
    .saleRank {
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        .sort {
          display: flex;
          align-items: center;
        }
      }
      .client {
        display: inline-block;
        width: 240px;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .index {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 1.5px;
        margin-right: 16px;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        background-color: #ccc;
        border-radius: 20px;
      }
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
::v-deep .el-table {
  .el-table__fixed {
    height: auto !important;
    bottom: 10px !important;
  }
  .el-table__fixed::before {
    height: 0px;
  } 
  .el-table__cell{
    padding: 0.5rem 0;
  }
}
.time {
  ::v-deep .el-input__suffix {
    right: 0.325rem;
  }
}

::v-deep .el-date-editor.el-input{
    width: 12.25rem;
}
::v-deep .el-table__header-wrapper  .el-checkbox{
    //找到表头那一行，然后把里面的复选框隐藏掉
	display:none
}
</style>