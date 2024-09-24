<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'130px'"
          size="mini"
          :maxShow="3"
          @search="search"
          @reset="reset"
        >
        <el-form-item label="年份">
          <el-date-picker
            class="time"
            v-model="form.year"
            type="year"
            @keyup.enter.native="selectBlur"
            @change="selectBlur"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker> 
          </el-form-item>
          <el-form-item label="MES规格简称">
            <el-select
              clearable
              filterable
              v-model="form.NormType"
              placeholder="请选择MES规格简称"
              @change="selectBlur"
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
              v-model="form.CustomerName"
              @change="selectBlur"
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
        </SearchFilter>
      </div>
        <div class="table">
            <el-table
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            style="width: 100%"
            :data="data"
            :cell-class-name="cellStyle"
            >
                <el-table-column   label="月份">
                  <template slot-scope="scope">
                    <span v-show="scope.row.date!=='20月'&&scope.row.date!=='50月'">{{ scope.row.date }}</span>
                    <span v-show="scope.row.date==='20月'">平均值</span>
                    <span v-show="scope.row.date==='50月'">合计</span>
                  </template>
                </el-table-column>
                <el-table-column v-for="(v,ind) in column" :key="v+ind" :label="(ind+1)>9?ind+'':'0'+(ind+1)">
                    <el-table-column :label="v">
                        <template slot-scope="scope">
                          <span v-for="(item) in scope.row.contents" :key="item.name">
                            <span>{{ item.name===v?item.taskNumber:""}}</span>
                          </span>
                        </template>
                    </el-table-column> 
                </el-table-column>
                <el-table-column  prop="orderSum" label="订单合计"> </el-table-column>
            </el-table>
  
        </div>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>年客户订单量</span>
            <div class="clearfix time">
              <el-radio-group
                v-model="query.dateType"
                size="mini"
                style="margin-right: 10px"
                @input="dateTypeChange"
              >
                <el-radio-button label="month">月订单合计</el-radio-button>
                <el-radio-button label="year">年订单合计</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-show="query.dateType == 'month'"
                v-model="query.date"
                type="month"
                placeholder="选择月"
                size="mini"
                value-format="yyyy-MM"
                @change="monthChange"
              >
              </el-date-picker>
              <el-date-picker
                v-show="query.dateType == 'year'"
                v-model="query.date"
                type="year"
                placeholder="选择年"
                size="mini"
                value-format="yyyy"
                @change="dayChange"
              >
              </el-date-picker>
            </div>
          </div>
          <div v-if="graphTask.length>0"  id="graphTask" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
    </div>
  </template>
  
  <script>
  import {customerSelectYear,selectCustomerNameGraph} from '@/api/allYear'
  import SearchFilter from "@/components/SearchFilter";
  import * as echarts from 'echarts';
  export default{
    components:{
        SearchFilter
    },
    data(){
        return {
          query:{
            dateType:"month",
            date:`${new Date().getFullYear()}-${new Date().getMonth()+1}`
          },
          form:{
            year:`${new Date().getFullYear()}`
          },
          data:[],
          column:[],
          graphTask:[],
          mesCustomerOptions:[],
          mesNormsNameListOptions:[],
        }
    },
    mounted(){
        this.customerSelectYear()
        this.dateTypeChange()
        this.selectCustomerNameGraph()
        this.$store.dispatch('realList').then(()=>{
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods:{
        cellStyle({row,column,rowIndex,columnIndex}){
        if(row.date==='50月'){
          if(row.contents.length+1===columnIndex){
            return "success-row"
          }
        }
      },
      dateTypeChange(){
        switch(this.query.dateType){
          case "month":
            this.query.date=`${new Date().getFullYear()}-${new Date().getMonth()+1}`
            this.monthChange()
            break;
          case "year":
            this.query.date=`${new Date().getFullYear()}`
            this.dayChange()
            break;
        }
      },
      monthChange(){
        this.selectCustomerNameGraph()
      },
      dayChange(){
        this.selectCustomerNameGraph()
      },
      async selectCustomerNameGraph(){
        const params={
          year:this.query.date.split('-')[0],
          month:this.query.date.split('-')[1],
        }
        const res = await selectCustomerNameGraph(params)
        if(res.code==='0'){
          let sum=0
          this.graphTask=res.data.map((v,ind)=>{
            if(ind<10){
              return {value:v.taskNumber,name:v.customerName}
            }else{
              sum+=v.taskNumber
            }
          })
          this.graphTask.push({value:sum,name:'其他'})
          this.$nextTick(()=>{
            const chartDom = document.getElementById('graphTask');
            const myChart = echarts.init(chartDom);
            const option = {
              // title: {
              //   text: 'Referer of a Website',
              //   subtext: 'Fake Data',
              //   left: 'center'
              // },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '订单合计',
                  type: 'pie',
                  radius: '50%',
                  data: this.graphTask,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            option && myChart.setOption(option);
          })
        }
      },
        reset(){ this.customerSelectYear()},
        search(){ this.customerSelectYear()},
        selectBlur(){
            this.customerSelectYear()
        },
        async customerSelectYear(){
          let arr=[]
            const res = await customerSelectYear(this.form)
            if(res.code === '0'){
                this.data = res.data.map((v)=>{
                  let sum = 0
                  v.contents.forEach((item,index)=>{
                    sum+=item.taskNumber
                    arr.push(item.name)
                  })
                  return {
                    ...v,
                    date:v.date+"月",
                    orderSum:sum
                  }
                })
              this.column=new Set(arr)
            }
        }
    },
   
  }
  </script>
  <style lang="scss" scoped>
  .warpper {
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 10px;
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
  .start{
    h4{
      padding: 4px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 6px;
    }
  }
  .end{
    margin-top: 10px;
    h4{
      padding: 4px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 6px;
    }
  }
  }
  .clearfix{
  display: flex;
  justify-content: space-between;
  }
  ul {
  display: flex;
  }
  .hiden {
  display: inline-block;
  width: calc(100% - 112px);
  }
  .orderNum{
  height: 30px;
  line-height: 30px;
  }
  ::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
  }
  ::v-deep .el-descriptions-item__content {
  width: 100px;
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
  .el-table ::v-deep .DisableSelection > .cell {
  display: none;
  }
  ::v-deep .el-table .success-row{
   color: blue;
 }
  </style>