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
                <el-form-item label="月份">
                    <div class="time">
                        <el-date-picker
                        size="mini"
                        v-model="form.date"
                        type="month"
                        placeholder="请选择月份"
                        value-format="yyyy-MM-dd"
                        @change="handelSelect"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="盘点人">
                    <el-input
                        size="mini"
                        v-model="form.checkPlanUser"
                        @change="handelSelect"
                        placeholder="请输入盘点人"
                    ></el-input>
                </el-form-item>
                <el-form-item label="客户简称">
                    <el-select
                        v-model="form.customerShortNameList"
                        multiple
                        filterable
                        allow-create
                        size="mini"
                        @change="handelSelect"
                        default-first-option
                        placeholder="请输入客户简称">
                        <el-option
                        v-for="item in mesCustomerOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="左右面">
                    <el-input
                        size="mini"
                        v-model="form.mesLeftRightSides"
                        @change="handelSelect"
                        placeholder="请输入左右面"
                    ></el-input>
                </el-form-item>
                <el-form-item label="米长">
                    <el-select
                        v-model="form.mesMeterLength"
                        filterable
                        clearable
                        size="mini"
                        @change="handelSelect"
                        placeholder="请输入米长">
                        <el-option
                        v-for="item in mesMeterLength"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES规格名称">
                    <el-select
                        v-model="form.mesNormsNameList"
                        multiple
                        filterable
                        allow-create
                        size="mini"
                        @change="handelSelect"
                        default-first-option
                        placeholder="请输入MES规格名称">
                        <el-option
                        v-for="item in mesNormsNameListOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮型">
                    <el-select
                        v-model="form.mesWheelType"
                        filterable
                        clearable
                        size="mini"
                        @change="handelSelect"
                        placeholder="请输入轮型">
                        <el-option
                        v-for="item in mesWheelType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <el-table
                height="600"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
            >
                <el-table-column fixed type="index" label="#"> </el-table-column>
                <el-table-column prop="mesNormsName" label="规格简称"> </el-table-column>
                <el-table-column prop="customerShortName" label="客户简称"> </el-table-column>
                <el-table-column prop="mesWheelType" label="轮型"> </el-table-column>
                <el-table-column prop="mesMeterLength" label="米长"> </el-table-column>
                <el-table-column prop="mesLeftRightSidesEnum" label="左右面"> </el-table-column>
                <el-table-column prop="mesTray" label="托盘" >
                </el-table-column>
                <el-table-column prop="columnCode" label="库列编号" width="110"> </el-table-column>
                <el-table-column prop="realityCount" label="实际箱数" >
                </el-table-column>
                <el-table-column prop="checkPlanCount" label="盘点箱数">
                </el-table-column>
                <el-table-column prop="checkPlanProfit" label="盘盈数量">
                </el-table-column>
                <el-table-column prop="checkPlanLoss" label="盘亏数量">
                </el-table-column>
                <el-table-column prop="checkPlanFinishedTime" label="盘点完成时间">
                </el-table-column>
                <el-table-column prop="checkPlanUser" label="盘点人">
                </el-table-column>
                <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    @click="handelUpdate(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!--         :before-close="handleClose" -->
        <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="盘点箱数" prop="checkPlanCount">
                <el-input v-model="ruleForm.checkPlanCount"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择状态">
                    <el-option label="未完成" value="0"></el-option>
                    <el-option label="已完成" value="1"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="操作人名称" prop="status">
              <el-input v-model="ruleForm.userName" placeholder="操作人名称"></el-input>
            </el-form-item>
            <el-form-item label="操作人工号" prop="status">
              <el-input v-model="ruleForm.userName" placeholder="操作人工号"></el-input>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handelConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import {queryCheckPlanMonthList,editCheckPlanMonth} from '@/api/inventoryPlan'
export default {
    components:{
        SearchFilter
    },
    data(){
        return {
            form:{
                date:`${new Date().getFullYear()}-${new Date().getMonth()}`
            },
            data:[],
            // optionsNormsName:[],
            // options:[],
            ruleForm:{},
            rules:{},
            dialogVisible:false,
            mesCustomerOptions:[],
            mesWheelType:[],
            mesNormsNameListOptions:[],
            mesMeterLength:[],
        }
    },
    mounted(){
        const obj = JSON.parse(localStorage.getItem('data'))
        this.ruleForm.userName=obj.username
        this.ruleForm.workNo=obj.workNo
        this.queryCheckPlanMonthList()
        this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
        //   this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods:{
        async handelConfirm(){
            const params={
                ...this.ruleForm,
                status:this.ruleForm.status==='已完成'?1:0,
            }
            const res = await editCheckPlanMonth(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.dialogVisible=false
                this.queryCheckPlanMonthList()
            }
        },
        handelUpdate(index,row){
            this.dialogVisible = true
            this.ruleForm = {
                ...this.ruleForm,
                checkPlanCount:row.checkPlanCount,
                status:row.status===1?'已完成':"未完成",
                id:row.id,
            }
        },
        search(){
            this.queryCheckPlanMonthList()
        },
        reset(){
            this.form={
                date:`${new Date().getFullYear()}-${new Date().getMonth()}`
            }
            this.queryCheckPlanMonthList()
        },
        handelSelect(){this.queryCheckPlanMonthList()},
        async queryCheckPlanMonthList(){
            const params={
                ...this.form,
                month:this.form.date.split('-')[1],
                year:this.form.date.split('-')[0],
            }
            const res = await queryCheckPlanMonthList(params)
            if(res.code==='0'){
                this.data = res.data&&res.data.map((v)=>{
                    return {
                        ...v,
                        columnCode:v.warehouseName+'-'+v.functionAreaCode+v.colIndexAlias
                    }
                })
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