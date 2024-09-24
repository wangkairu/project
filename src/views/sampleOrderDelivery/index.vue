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
                <el-form-item label="MES规格简称">
                    <el-select
                        filterable
                        v-model="form.normsName"
                        placeholder="请选择MES规格简称"
                        @change="handelSelect"
                    >
                        <el-option
                        v-for="item in mesNormsNameListOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES客户简称">
                <el-select
                    filterable
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
                <el-form-item label="MES米长">
                    <el-select
                        filterable
                        v-model="form.meterLength"
                        placeholder="请输入MES米长"
                        @change="handelSelect"
                    >
                        <el-option
                        v-for="item in mesMeterLength"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES轮型">
                    <el-select
                        filterable
                        v-model="form.wheelType"
                        placeholder="请输入MES轮型"
                        @change="handelSelect"
                    >
                        <el-option
                        v-for="item in mesWheelType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item >
                <el-form-item label="托盘">
                    <el-select
                        filterable
                        v-model="form.tray"
                        placeholder="请输入托盘"
                        @change="handelSelect"
                    >
                        <el-option
                            v-for="item in mesTrayOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
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
                <el-table-column type="selection" width="70"></el-table-column>
                <el-table-column fixed type="index" label="#"> </el-table-column>
                <el-table-column  fixed prop="normsName" label="规格简称"> </el-table-column>
                <el-table-column  fixed prop="customerShortName" label="客户简称"> </el-table-column>
                <el-table-column  fixed prop="customerSimpleCode" label="客户简码"> </el-table-column>
                <el-table-column  fixed prop="wheelType" label="轮型"> </el-table-column>
                <el-table-column   prop="tray" label="托盘"> </el-table-column>
                <el-table-column   prop="meterLength" label="米长"> </el-table-column>
                <el-table-column   prop="meterLength" label="客户信用等级"> </el-table-column>
                <el-table-column   prop="normsType" label="规格类型"> </el-table-column>
                <el-table-column   prop="deliverType" label="发货类型"> </el-table-column>
                <el-table-column   prop="sampleType" label="样品类型">
                   <template slot-scope="scope">
                        <el-tag type="success" v-show="scope.row.sampleType===0">大样</el-tag>
                        <el-tag v-show="scope.row.sampleType===1">中样</el-tag>
                        <el-tag type="info" v-show="scope.row.sampleType===2">小样</el-tag>
                   </template>
                </el-table-column>
                <el-table-column   prop="orderNumOfRounds" label="订单轮数"> </el-table-column>
                <el-table-column   prop="weight" label="订单重量"> </el-table-column>
                <el-table-column   prop="acceptDate" label="订单接收时间"> </el-table-column>
                <el-table-column   prop="payDate" label="订单交付时间"> </el-table-column>
                <el-table-column   prop="payNumOfRounds" label="交付轮数"> </el-table-column>
                <el-table-column   prop="payWeight" label="交付重量"> </el-table-column>
                <el-table-column label="操作" width="150">
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
        width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
            <div class="main">
                <div class="left">
                    <el-form-item label="订单轮数" prop="orderNumOfRounds">
                        <el-input
                            size="mini"
                            v-model="ruleForm.orderNumOfRounds"
                            placeholder="请输入订单轮数"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="交付轮数" prop="payNumOfRounds">
                        <el-input
                            size="mini"
                            v-model="ruleForm.payNumOfRounds"
                            placeholder="请输入交付轮数"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="交付重量" prop="payWeight">
                        <el-input
                            size="mini"
                            v-model="ruleForm.payWeight"
                            placeholder="请输入交付重量"
                        ></el-input>
                    </el-form-item>
                </div>
                <div class="right">
                    <el-form-item label="订单重量" prop="weight">
                        <el-input
                            size="mini"
                            v-model="ruleForm.weight"
                            placeholder="请输入重量"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="样品类型" prop="sampleType">
                        <el-select size="mini" v-model="ruleForm.sampleType"  placeholder="请选择样品类型">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单接收时间" prop="acceptDate">
                        <el-date-picker class="time" size="mini"
                        v-model="ruleForm.acceptDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择订单接收时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </div>
            <el-button v-show="title!=='编辑'" size="mini" type="primary" @click="handelClickOrder">样品订单</el-button>
            <el-table
            v-show="title!=='编辑'"
            ref="myTable"
            :data="selectedRows"
            style="width: 100%">
            <el-table-column
                prop="mesNormsName"
                label="规格简称">
            </el-table-column>
            <el-table-column
                prop="mesCustomerShortName"
                label="客户简称">
            </el-table-column>
            <el-table-column
                prop="mesWheelType"
                label="轮型">
            </el-table-column>
            <el-table-column
                prop="mesTray"
                label="托盘">
            </el-table-column>
            <el-table-column
                prop="mesMeterLength"
                label="米长">
            </el-table-column>
            <el-table-column
                prop="deliverType"
                label="发货类型">
            </el-table-column>
            <el-table-column
                prop="normsType"
                label="规格类型">
            </el-table-column>
            <el-table-column
                prop="customerSimpleCode"
                label="客户简码">
            </el-table-column>
            <el-table-column
                prop="customerLevel"
                label="客户信用等级">
            </el-table-column>
        </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handelCancel('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="handelConfirm('ruleForm')">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="样品订单"
        @close="handelCancelOrder"
        :visible.sync="order"
        width="50%">
        <el-table
        ref="myTable"
        :data="tableData"
        @selection-change="handleSelectionChangeOrder"
        style="width: 100%">
        <el-table-column type="selection" ></el-table-column>
            <el-table-column
                prop="mesNormsName"
                label="规格简称">
            </el-table-column>
            <el-table-column
                prop="mesCustomerShortName"
                label="客户简称">
            </el-table-column>
            <el-table-column
                prop="mesWheelType"
                label="轮型">
            </el-table-column>
            <el-table-column
                prop="mesTray"
                label="托盘">
            </el-table-column>
            <el-table-column
                prop="mesMeterLength"
                label="米长">
            </el-table-column>
            <el-table-column
                prop="deliverType"
                label="发货类型">
            </el-table-column>
            <el-table-column
                prop="normsType"
                label="规格类型">
            </el-table-column>
            <el-table-column
                prop="customerSimpleCode"
                label="客户简码">
            </el-table-column>
            <el-table-column
                prop="customerLevel"
                label="客户信用等级">
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handelCancelOrder">取 消</el-button>
            <el-button type="primary" @click="handelConfirmOrder">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {queryLogisticsList,saveOrUpdate,deleteSampleOrder,getNormData} from '@/api/ordersInteractions'
export default {
    name:"reason",
    components:{
        SearchFilter,PageNation,
    },
    data(){
        return {
            options:[
                {label:"大样",value:"0",key:"0"},
                {label:"中样",value:"1",key:"0"},
                {label:"小样",value:"2",key:"0"}
            ],
            form:{ },
            data:[],
            tableData:[],
            ruleForm:{},
            rules:{
                orderNumOfRounds:[
                    { required: true, message: '请输入订单轮数', trigger: 'blur' }
                ],
                payNumOfRounds:[
                    { required: true, message: '请输入交付轮数', trigger: 'blur' }
                ],
                payWeight:[
                    { required: true, message: '请输入交付重量', trigger: 'blur' }
                ],
                weight:[
                    { required: true, message: '请输入订单重量', trigger: 'blur' }
                ],
                sampleType:[
                    { required: true, message: '请选择样品类型', trigger: 'blur' }
                ],
                acceptDate:[
                    { required: true, message: '请选择订单接收时间', trigger: 'blur' }
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
            order:false,
            selectedRows:[],
            mesNormsNameListOptions:[],
            mesCustomerOptions:[],
            mesWheelType:[],
            mesTrayOptions:[],
            mesMeterLength:[],
        }
    },
    mounted(){
        this.queryLogisticsList()
        this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods:{
        handelCancelOrder(){},
        handelConfirmOrder(){
            this.order=false
        },
        handleSelectionChangeOrder(val){
            this.selectedRows = val;
            if (val.length > 1) {
                this.$refs.myTable.clearSelection();
                this.$refs.myTable.toggleRowSelection(val.pop());
            }
            // if(val.length != 0){
            //     this.selectProtocolId = val[val.length - 1].id;
            // }
        },
        async handelClickOrder(){
            this.order = true
            const params={}
            const res = await getNormData(params)
            if(res.code==='0'){
                this.tableData = res.data.items
            }
        },
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
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    let params={}
                    if(this.title==='编辑'){
                        params={...this.ruleForm,}
                    }else{
                        const select = this.selectedRows[0]
                        params={...this.ruleForm,
                            customerLevel:select.customerLevel,
                            customerShortName:select.mesCustomerShortName,
                            customerSimpleCode:select.customerSimpleCode,
                            deliverType:select.deliverType,
                            meterLength:select.mesMeterLength,
                            normsName:select.mesNormsName,
                            normsType:select.normsType,
                            wheelType:select.mesWheelType,
                            tray:select.mesTray,}
                    }
                    const res = await saveOrUpdate(params)
                    if(res.code==='0'){
                        this.$message.success(res.msg)
                        this.dialogVisible=false
                        this.ruleForm={}
                        this.selectedRows=[]
                        this.queryLogisticsList()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
          
        },
        handelAdd(){
            this.title='新增'
            this.dialogVisible = true
        },
        handelUpdate(index,row){
            this.title='编辑'
            this.dialogVisible = true
            this.ruleForm = {
                ...row,
                customerShortName:row.customerShortName,
                customerSimpleCode:row.customerSimpleCode,
                meterLength:row.meterLength,
                normsName:row.normsName,
                payNumOfRounds:row.payNumOfRounds,
                payWeight:row.payWeight,
                tray:row.tray,
                wheelType:row.wheelType,
                id:row.id,
            }
        },
        handelDelete(index,row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteSampleOrder([row.id])
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
                this.deleteSampleOrder(this.ids)
            }
        },
        async deleteSampleOrder(id){
            const res = await deleteSampleOrder(id)
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
            this.form={ },
            this.queryLogisticsList()
        },
        handelSelect(){
            this.queryLogisticsList()
        },
        async queryLogisticsList(){
            const params={
                ...this.form,
                pageNumber:this.listQuery.pageNum-1,
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
.main{
    display: flex;
    justify-content: space-around;
}
::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
  width: 300px;
}
::v-deep .el-table {
  .el-table__fixed {
    height: auto !important;
    bottom: 17px !important;
  }
  .el-table__fixed::before {
    height: 0px;
  } 
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