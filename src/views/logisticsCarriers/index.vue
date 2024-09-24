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
                <el-form-item label="MES客户简称">
                <el-select
                    filterable
                    clearable
                    v-model="form.customerShortName"
                    @change="handelSelect"
                    placeholder="请选择MES客户简称"
                >
                    <el-option
                    v-for="item in mesCustomerOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="客户简码">
                    <el-input
                        size="mini"
                        v-model="form.customerSimpleCode"
                        @change="handelSelect"
                        placeholder="请输入客户简码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="物流承运商">
                    <el-input
                        size="mini"
                        v-model="form.logisticsCarrier"
                        @change="handelSelect"
                        placeholder="请输入物流承运商"
                    ></el-input>
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
                height="521"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column fixed type="index" label="#"> </el-table-column>
                <el-table-column prop="customerSimpleCode" label="客户简码"> </el-table-column>
                <el-table-column prop="customerShortName" label="客户简称"> </el-table-column>
                <el-table-column prop="logisticsCarrier" label="物流承运商"> </el-table-column>
                <el-table-column label="操作" width="150">
                <template slot-scope="scope" >
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
            <el-form-item label="客户简称" prop="customerShortName">
                <el-input v-model="ruleForm.customerShortName" placeholder="请输入客户简称"></el-input>
            </el-form-item>
            <el-form-item label="客户简码" prop="customerSimpleCode">
                <el-input v-model="ruleForm.customerSimpleCode" placeholder="请输入客户简码"></el-input>
            </el-form-item>
            <el-form-item label="物流承运商" prop="logisticsCarrier">
                <el-input v-model="ruleForm.logisticsCarrier" placeholder="请输入物流承运商"></el-input>
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
import {queryLogisticsList,saveOrUpdateLogistics,deleteLogistics} from '@/api/logisticsCarriers'
export default {
    name:"logisticsCarriers",
    components:{
        SearchFilter,PageNation,
    },
    data(){
        return {
            form:{},
            data:[],
            ruleForm:{},
            mesCustomerOptions:[],
            rules:{
                customerShortName: [
                    { required: true, message: '请输入客户简称', trigger: 'change' }
                ],
                customerSimpleCode: [
                    { required: true, message: '请输入客户简码', trigger: 'change' }
                ],
                logisticsCarrier: [
                    { required: true, message: '物流承运商', trigger: 'change' }
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
        this.$store.dispatch('realList').then(()=>{
        //   this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
        })
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
        async handelConfirm(){
            const params={
                ...this.ruleForm,
            }
            const res = await saveOrUpdateLogistics(params)
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
                customerShortName:row.customerShortName,
                customerSimpleCode:row.customerSimpleCode,
                logisticsCarrier:row.logisticsCarrier,
                id:row.id,
            }
        },
        handelDelete(index,row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteLogistics([row.id])
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
                this.deleteLogistics(this.ids)
            }
        },
        async deleteLogistics(id){
            const res = await deleteLogistics(id)
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
            this.form={}
            this.queryLogisticsList()
        },
        handelSelect(){this.queryLogisticsList()},
        async queryLogisticsList(){
            const params={
                form:this.form,
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