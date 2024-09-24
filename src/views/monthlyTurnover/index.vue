<template>
    <div class="monthlyTurnover">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'110px'"
                size="mini"
                :maxShow="5"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="年">
                  <el-date-picker
                    class="time"
                    v-model="query.year"
                    type="year"
                    format="yyyy"
                    value-format="yyyy"
                    @change="handelWheelsType"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="月">
                  <el-date-picker
                    class="time"
                    v-model="query.month"
                    type="month"
                    format="M"
                    value-format="MM"
                    @change="handelWheelsType"
                    placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="MES规格简称">
                  <el-select
                  filterable
                  clearable
                  v-model="query.mesNormName"
                  placeholder="请选择MES规格简称"
                  @change="handelWheelsType"
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
                    clearable
                    filterable
                    v-model="query.mesCustomerShortName"
                    @change="handelWheelsType"
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
                    clearable
                    v-model="query.meterLength"
                    @change="handelWheelsType"
                    placeholder="请选择MES米长"
                    >
                    <el-option
                        v-for="item in mesMeterLength"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                    >
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES轮型">
                    <el-select
                    filterable
                    clearable
                    v-model="query.mesWheelType"
                    @change="handelWheelsType"
                    placeholder="请选择MES轮型"
                    >
                    <el-option
                        v-for="item in mesWheelType"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                    >
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="托盘">
                    <el-select
                    filterable
                    clearable
                    v-model="query.mesTray"
                    @change="handelWheelsType"
                    placeholder="请选择托盘"
                    >
                    <el-option
                        v-for="item in mesTrayOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                    >
                    </el-option>
                    </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <div class="enteringButton">
                <el-button type="primary" size="mini" @click="addFlag=true"
                >新增</el-button
                >
            </div>
            <el-table
                height="600"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
            >
                <el-table-column fixed type="index" label="序号"> </el-table-column>
                <el-table-column prop="mesNormShortName" label="规格简称"> </el-table-column>
                <el-table-column prop="mesCustomerShortName" label="客户简称"></el-table-column>
                <el-table-column prop="mesCustomerSimpleCode" label="客户简码"></el-table-column>
                <el-table-column prop="mesWheelType" label="轮型"></el-table-column>
                <el-table-column prop="mesTray" label="托盘"></el-table-column>
                <el-table-column prop="mesMeterLength" label="米长"></el-table-column>
                <el-table-column prop="time" label="订单时间"></el-table-column>
                <el-table-column prop="taskCount" label="订单量">
                  <template slot-scope="scope">
                    <span v-show="!scope.row.taskCountFlag">{{ scope.row.taskCount }}</span>
                    <el-input v-show="scope.row.taskCountFlag" v-model="scope.row.taskCount" placeholder="请输入订单量"></el-input>
                    <el-button v-show="!scope.row.taskCountFlag" type="text" @click="handelEditCount(scope.row)">修改</el-button>
                    <el-button v-show="scope.row.taskCountFlag" type="text" @click="handelSaveCount">保存</el-button>
                    <el-button v-show="scope.row.taskCountFlag" type="text" @click="handelCancelCount(scope.row)">取消</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="number" label="订单编号">
                  <template slot-scope="scope" >
                    <div v-show="!scope.row.flag">
                      <div v-for="(v,ind) in scope.row.number" :key="ind">{{ v }}</div>
                    </div>
                    <el-input v-show="scope.row.flag" v-model="scope.row.code" placeholder="请输入订单编号"></el-input>
                    <el-button v-show="!scope.row.flag" type="text" @click="handelEditNumber(scope.row)">修改</el-button>
                    <el-button v-show="scope.row.flag" type="text" @click="handelSaveNumber">保存</el-button>
                    <el-button v-show="scope.row.flag" type="text" @click="handelCancelNumber(scope.row)">取消</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <!-- <el-table-column label="操作" width="100">
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
                </el-table-column> -->
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
        :visible.sync="addFlag"
        width="30%"
        @close="handleClose('ruleForm')">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="规格简称" prop="mesNormShortName">
            <el-input v-model="form.mesNormShortName" placeholder="请输入规格简称"></el-input>
          </el-form-item>
          <el-form-item label="客户简称" prop="mesCustomerShortName">
            <el-input v-model="form.mesCustomerShortName" placeholder="请输入客户简称"></el-input>
          </el-form-item>
          <el-form-item label="客户简码" prop="mesCustomerSimpleCode">
            <el-input v-model="form.mesCustomerSimpleCode" placeholder="请输入客户简码"></el-input>
          </el-form-item>
          <el-form-item label="轮型" prop="mesWheelType">
            <el-input v-model="form.mesWheelType" placeholder="请输入轮型"></el-input>
          </el-form-item>
          <el-form-item label="托盘" prop="mesTray">
            <el-input v-model="form.mesTray" placeholder="请输入托盘"></el-input>
          </el-form-item>
          <el-form-item label="米长" prop="mesMeterLength">
            <el-input v-model="form.mesMeterLength" placeholder="请输入米长"></el-input>
          </el-form-item>
          <el-form-item label="订单时间" prop="date">
            <el-date-picker
              v-model="form.date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-M"
              placeholder="选择订单时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单量" prop="count">
            <el-input v-model.number="form.count" placeholder="请输入订单量"></el-input>
          </el-form-item>
          <el-form-item label="订单编号" prop="number">
            <el-input v-model.number="form.number" placeholder="请输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="form.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFlag = false">取 消</el-button>
          <el-button type="primary" @click="insertNumberOrder">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import {seletPage} from '@/api/index'
import PageNation from "@/components/Pagination";
import SearchFilter from '@/components/SearchFilter'
import {insertNumberOrder,insertOneOrder} from '@/api/ordersInteractions'
export default {
    name:"monthlyTurnover",
    components: {PageNation,  SearchFilter },
    data(){
        return {
            addFlag:false,
            data:[],
            rules:{},
            query:{
                mesCustomerShortName: "",
                mesCustomerSimpleShortCode: "",
                mesNormName: "",
                mesTray: "",
                mesWheelType: "",
                meterLength: "",
                month: `${new Date().getMonth()}`,
                year: `${new Date().getFullYear()}`
            },
            form:{
              count:"",
              mesCustomerShortName:"",
              mesCustomerSimpleCode:"",
              mesMeterLength:"",
              mesNormShortName:"",
              mesTray:"",
              mesWheelType:"",
              number:"",
              remark:"",
              date:"",
            },
            listQuery:{
              pageNum:1,
              pageSize:10,
            },
            total:0,
            mesWheelType:[],
            mesCustomerOptions:[],
            mesNormsNameListOptions:[],
            mesTrayOptions:[],
            mesMeterLength:[],
            editNumber:{},
            editCount:{},
            editData:[],
        }
    },
    mounted(){
        this.$store.dispatch('realList').then(()=>{
            this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
            this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
            this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
            this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
            this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
        this.seletPage()
    },
    methods:{
      handelEditCount(row){
        this.editCount=row
        row.taskCountFlag=true
      },
      async handelSaveCount(){
        const params={
          ...this.editCount,
          count:this.editCount.taskCount,
          number:this.editCount.number.join(';'),
          year:this.editCount.time.split("-")[0],
          month:this.editCount.time.split("-")[1]
        }
        const res = await insertNumberOrder(params)
        if(res.code==0){
          this.$message.success(res.msg)
          this.seletPage()
        }else{
          this.$message.error(res.msg)
        }
      },
      handelCancelCount(row){
        row.taskCountFlag=false
        this.editData.forEach((v)=>{
          if(v.id==row.id){
            row.taskCount=v.taskCount
          }
        })
      },
      handelEditNumber(row){
        this.editNumber=row
        row.flag=true
      },
      async handelSaveNumber(){
        this.editNumber.number.push(this.editNumber.code)
        const params={
          ...this.editNumber,
          count:this.editNumber.taskCount,
          number:this.editNumber.number.join(';'),
          year:this.editNumber.time.split("-")[0],
          month:this.editNumber.time.split("-")[1]
        }
        const res = await insertNumberOrder(params)
        if(res.code==0){
          this.$message.success(res.msg)
          this.seletPage()
        }else{
          this.$message.error(res.msg)
        }
      },
      handelCancelNumber(row){
        row.flag=false
        this.editData.forEach((v)=>{
          if(v.id==row.id){
            row.number=v.number
          }
        })
      },
      handleClose(formName){
        this.addFlag=false
        this.$refs[formName].resetFields();
      },
      async insertNumberOrder(){
        const params={
          ...this.form,
          year:this.form.date.split('-')[0],
          month:this.form.date.split('-')[1],
        }
        const res = await insertNumberOrder(params)
        if(res.code==0){
          this.addFlag=false
          this.seletPage()
        }
      },
        pageChange(val){
          this.listQuery.pageNum = val.page;
          this.listQuery.pageSize = val.limit;
          this.seletPage()
        },
        search(){
            this.seletPage()
        },
        handelWheelsType(){
            this.seletPage()
        },
        reset(){
            this.query={
                mesCustomerShortName: "",
                mesCustomerSimpleShortCode: "",
                mesNormName: "",
                mesTray: "",
                mesWheelType: "",
                meterLength: "",
                month: 0,
                year: 0
            }
            this.seletPage()
        },
        async seletPage(){
          const params={
            ...this.query,
            page:this.listQuery.pageNum,
            pageSize:this.listQuery.pageSize
          }
            const res = await seletPage(params)
            if(res.code==0){
              this.editData=res.data.orderLists
                this.data=res.data.orderLists.map((v)=>{
                  return {
                    ...v,
                    flag:false,
                    taskCountFlag:false,
                    code:"",
                  }
                })
                console.log(this.data,'data')
                this.total=res.data.total
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.monthlyTurnover {
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