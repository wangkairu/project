<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'110px'"
                size="mini"
                :maxShow="5"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="原因">
                    <el-input
                        size="mini"
                        v-model="form.reason"
                        @change="handelSelect"
                        placeholder="请输入原因"
                    ></el-input>
                </el-form-item>
                <el-form-item label="原因类型">
                    <el-select v-model="form.type" @change="handelSelect" placeholder="请选择原因类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <div class="enteringButton">
                <el-button type="primary" size="mini" @click="handelAdd"
                >新增</el-button
                >
                <el-button type="primary" size="mini" @click="handelBatchDelate"
                >批量删除</el-button
                >
            </div>
            <el-table
                height="600"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column fixed type="index" label="#"> </el-table-column>
                <el-table-column prop="reason" label="原因内容"> </el-table-column>
                <el-table-column prop="type" label="原因类型">
                    <template slot-scope="scope">
                        <el-tag v-show="scope.row.type==='REWORK'">返工原因</el-tag>
                        <el-tag type="success" v-show="scope.row.type==='RELOCATION'">返库原因</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    @click="handelUpdate(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                    type="text"
                    @click="handelDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
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
        :title="title"
        @close="handelCancel('ruleForm')"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原因类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择原因类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="原因内容" prop="reason">
                <el-input v-model="ruleForm.reason" placeholder="请输入原因内容"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handelCancel('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="handelConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {queryLogisticsList,saveOrUpdateReason,deleteReason} from '@/api/reason'
export default {
    name:"reason",
    components:{
        SearchFilter,PageNation,
    },
    data(){
        return {
            form:{ type:"REWORK" },
            options:[
                {value:"REWORK",label:"返工原因"},
                {value:"RELOCATION",label:"返库原因"}
            ],
            data:[],
            ruleForm:{},
            rules:{
                reason: [
                    { required: true, message: '请输入返库原因', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请输入原因类型', trigger: 'change' }
                ],
            },
            dialogVisible:false,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            total:0,
            ids:[],
            title:"",
        }
    },
    mounted(){
        this.queryLogisticsList()
    },
    watch:{
        type:{
            handler(val){
                const newVal= localStorage.getItem("selectType")
                if(newVal){
                    this.form.type = newVal
                }
            },
            immediate:true,
        }
    },
    methods:{
        handelCancel(formName){
            this.dialogVisible = false
            this.$refs[formName].resetFields();
        },
        pageChange(val){
            this.listQuery.pageNum = val.page;
            this.listQuery.pageSize = val.limit;
            this.queryLogisticsList()
        },
        async handelConfirm(formName){
            const params={
                ...this.ruleForm,
            }
            const res = await saveOrUpdateReason(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.dialogVisible=false
                this.ruleForm={}
                this.queryLogisticsList()
            }
        },
        handelAdd(){
            this.title='新增'
            this.dialogVisible = true
        },
        handelUpdate(index,row){
            this.title='编辑'
            this.dialogVisible = true
            this.ruleForm = {
                reason:row.reason,
                type:row.type,
                id:row.id,
            }
        },
        handelDelete(index,row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteReason([row.id])
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleSelectionChange(select){
            this.ids=select.map((v)=>{
                return v.id
            })
        },
        handelBatchDelate(){
            if(this.ids.length<=0){
                this.$message.info("请先选择删除的数据")
            }else{
                this.deleteReason(this.ids)
            }
        },
        async deleteReason(id){
            const res = await deleteReason(id)
            if(res.code==='0'){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.queryLogisticsList()
            }
        },
        search(){
            this.queryLogisticsList()
        },
        reset(){
            this.form={ type:"REWORK" },
            this.queryLogisticsList()
        },
        handelSelect(val){
            if(val==='REWORK'||val==='RELOCATION'){
                localStorage.setItem("selectType",val)
            }
            this.queryLogisticsList()
        },
        async queryLogisticsList(){
            const params={
                ...this.form,
                page:this.listQuery.pageNum-1,
                pageSize:this.listQuery.pageSize,
            }
            const res = await queryLogisticsList(params)

            if(res.code==='0'){
                this.data = res.data.items
                this.total=res.data.total
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
    padding: 10px 0;
    .form {
      display: flex;
      justify-content: space-around;
    }
  }
  .row {
    margin-top: 20px;
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
  .button {
    float: right;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    padding: 6px;
  }
  .background {
    background: #f5f5f5;
    border-radius: 10px;
    padding: 8px 10px;
    .backgroundItem {
      padding: 15px 10px;
      margin-bottom: 10px;
      background: #f0f0f0;
      border-radius: 10px;
      position: relative;
    }
    .iconfont {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 20px;
    }
  }
}
ul {
  display: flex;
}
.hiden {
  display: inline-block;
  width: calc(100% - 112px);
}
::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
  width: 300px;
}
::v-deep span.el-tooltip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 4px !important;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
  width: 180px;
}
.time {
  ::v-deep .el-input__suffix {
    right: 2.6125rem;
  }
}
</style>