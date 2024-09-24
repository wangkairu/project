<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'120px'"
          size="mini"
          :maxShow="3"
          @search="search"
          @reset="reset"
        >
        <el-form-item label="年份">
          <el-date-picker
            v-model="form.year"
            type="year"
            class="time"
            @keyup.enter.native="selectBlur"
            @change="selectBlur"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker> 
          </el-form-item>
          <el-form-item label="月份">
            <el-date-picker
            v-model="form.month"
            type="month"
            class="time"
            @keyup.enter.native="selectBlur"
            @change="selectBlur"
            value-format="MM"
            format="MM"
            placeholder="选择月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES规格简称">
            <el-select
              clearable
              filterable
              v-model="form.NormName"
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
          :summary-method="getSummaries"
          show-summary
        >
          <!-- <el-table-column fixed type="index" label="序号"> </el-table-column> -->
          <el-table-column fixed prop="customerVo" label="客户全称" width="400"> </el-table-column>
          <el-table-column
            v-for="(v,ind) in column"
            :key="ind"
            :label="v.label"
          >
            <template slot-scope="scope">
              <span v-show="v.value==='taskNumber'&&!scope.row.flag&&!v.check">{{ scope.row.contentList[v.index].task}}</span>
              <span v-show="v.value==='submitNumber'">{{ scope.row.contentList[v.index].submit}}</span>
              <span v-show="v.value==='finishRatio'">{{ scope.row.contentList[v.index].finishRatio}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="task" label="合计订单量"> </el-table-column>
          <el-table-column prop="submit" label="合计交付量"> </el-table-column>
          <!-- <el-table-column prop="ratio" label="合计订单完成率"> </el-table-column> -->
        </el-table>
      </div>
      <div class="graph">
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>年客户订单量</span>
          </div>
          <div v-if="graphTask.length>0"  id="graphTask" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>年客户订单交付量</span>
          </div>
          <div v-if="graphSubmit.length>0" id="graphSubmit" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix" style="display: flex;">
            <span>年客户订单量柱状图</span>        
          </div>
          <div v-if="barTask.length>0" id="barTask" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix" style="display: flex;">
            <span>年客户订单交付柱状图</span>  
          </div>
          <div v-if="barSubmit.length>0" id="barSubmit" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
      </div>
    </div>
  </template>
  <script>
  import {selectByCustomer,selectAllByCustomerNameGraph,selectMonthByCustomer} from '@/api/ordersInteractions'
  import SearchFilter from "@/components/SearchFilter";
  import * as echarts from 'echarts';
  export default {
    name: "shifting",
    components: {  SearchFilter, },
    data() {
      return {
        title:"",
        detail:"",
        dialogVisible_1: false,
        dialogVisible: false,
        data: [],
        graphTask:[],
        graphSubmit:[],
        column:[],
        column1:[],
        column2:[],
        column3:[],
        ruleForm:{},
        options:[],
        detailObj:{},
        form: {
          year:`${new Date().getFullYear()}`,
          month:`${new Date().getMonth()+1}`
        },
        barTask:[],
        barSubmit:[],
        rules:{
          number: { required: true, message: '请输入订单编号', trigger: ['change','blur'] }
        },
        mesCustomerOptions:[],
        mesNormsNameListOptions:[],
      };
    },
    mounted() {
      this.selectByCustomer();
      this.selectAllByCustomerNameGraph()
      this.selectMonthByCustomer()
      this.$store.dispatch('realList').then(()=>{
        this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
        this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
      })
    },
    methods: {
      getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const arr = data.map(item => item.contentList); 
          let values  = arr.flat(1)
          let sum =0 
          let total=0
          if(column.label.includes('订单量')){
            values.forEach((v)=>{
              if(index===1&&v.date===1){
                sum+=v.task
                sums[index] = sum
              } else if(index===4&&v.date===2){
                sum+=v.task
                sums[index] = sum
              } else if(index===7&&v.date===3){
                sum+=v.task
                sums[index] = sum
              } else if(index===10&&v.date===4){
                sum+=v.task
                sums[index] = sum
              } else if(index===13&&v.date===5){
                sum+=v.task
                sums[index] = sum
              } else if(index===16&&v.date===6){
                sum+=v.task
                sums[index] = sum
              } else if(index===19&&v.date===7){
                sum+=v.task
                sums[index] = sum
              } else if(index===22&&v.date===8){
                sum+=v.task
                sums[index] = sum
              } else if(index===25&&v.date===9){
                sum+=v.task
                sums[index] = sum
              } else if(index===28&&v.date===10){
                sum+=v.task
                sums[index] = sum
              } else if(index===31&&v.date===11){
                sum+=v.task
                sums[index] = sum
              } else if(index===34&&v.date===12){
                sum+=v.task
                sums[index] = sum
              }
            })
            data.forEach((v)=>{
              if(index===37){
                total+=v.task
                sums[index] = total
              }
            })
          } else if(column.label.includes('交付量')){
            values.forEach((v)=>{
              if(index===2&&v.date===1){
                sum+=v.submit
                sums[index] = sum
              } else if(index===5&&v.date===2){
                sum+=v.submit
                sums[index] = sum
              } else if(index===8&&v.date===3){
                sum+=v.submit
                sums[index] = sum
              } else if(index===11&&v.date===4){
                sum+=v.submit
                sums[index] = sum
              } else if(index===14&&v.date===5){
                sum+=v.submit
                sums[index] = sum
              } else if(index===17&&v.date===6){
                sum+=v.submit
                sums[index] = sum
              } else if(index===20&&v.date===7){
                sum+=v.submit
                sums[index] = sum
              } else if(index===23&&v.date===8){
                sum+=v.submit
                sums[index] = sum
              } else if(index===26&&v.date===9){
                sum+=v.submit
                sums[index] = sum
              } else if(index===29&&v.date===10){
                sum+=v.submit
                sums[index] = sum
              } else if(index===32&&v.date===11){
                sum+=v.submit
                sums[index] = sum
              } else if(index===35&&v.date===12){
                sum+=v.submit
                sums[index] = sum
              }
            })
            data.forEach((v)=>{
              if(index===38){
                total+=v.submit
                sums[index] = total
              }
            })
          }
        });
        return sums;
      },
      async selectMonthByCustomer(){
        const res = await selectMonthByCustomer(this.form)
        if(res.code === '0'){
          let taskArr=[], submitArr =[]
          this.barTask = res.data.map((v)=>{
            taskArr.push(v.customerName)
            return {
              name:v.customerName,
              type:"bar",
              data:[v.allTask,v.customerName],
            }
          })
          this.barSubmit = res.data.map((v)=>{
            submitArr.push(v.customerName)
            return {
              name:v.customerName,
              type:"bar",
              data:[v.allSubmit,v.customerName],
            }
          })
          this.$nextTick(()=>{
            let chartDom1 = document.getElementById('barTask');
            let myChart1 = echarts.init(chartDom1);
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              xAxis: {
                type: 'category',
                data: taskArr
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: this.barTask,
                  type: 'bar'
                }
              ]
            };
            option1 && myChart1.setOption(option1);
            // barTask
            let chartDom = document.getElementById('barSubmit');
            let myChart = echarts.init(chartDom);
            let option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              xAxis: {
                type: 'category',
                data: submitArr
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: this.barSubmit,
                  type: 'bar'
                }
              ]
            };
            option && myChart.setOption(option);
          })
        }
      },
      async selectAllByCustomerNameGraph(){
        const res = await selectAllByCustomerNameGraph(this.form)
        if(res.code==='0')
        {
          this.graphTask = res.data.map((v)=>{return {value:v.allTask,name:v.customerName}})
          this.graphSubmit = res.data.map((v)=>{return {value:v.allSubmit,name:v.customerName}})
          this.$nextTick(()=>{
            let chartDom = document.getElementById('graphTask');
            let myChart = echarts.init(chartDom);
            let option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  orient: 'vertical',
                  left: 'left'
                },
                series: [
                  {
                    // name: 'Access From',
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
            let chartDom1 = document.getElementById('graphSubmit');
            let myChart1 = echarts.init(chartDom1);
            let option1 = {
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
                    // name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: this.graphSubmit,
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
            option1 && myChart1.setOption(option1);
          })
        }
      },
      search() {
        this.selectByCustomer();
      },
      reset() {
        this.form = {
          CustomerName:"",
          NormName:"",
          year: `${new Date().getFullYear()}`,
          month:`${new Date().getMonth()+1}`
        };
        this.selectByCustomer();
        this.selectAllByCustomerNameGraph()
        this.selectMonthByCustomer()
      },
      selectBlur() {
        this.selectByCustomer();
      },
      async selectByCustomer() {
        const params = {
          ...this.form,
        };
        const res = await selectByCustomer(params);
        if (res.code === "0") {
          this.data = res.data.map((v)=>{return {...v,flag:false}})
          let arr=[]
          res.data.forEach((v)=>{
            arr=v.contentList.map((item,ind)=>{
              return [
                {label:item.date+'月订单量',index:ind,value:"taskNumber",date:item.date,check:false},
                {label:item.date+'月交付量',index:ind,value:"submitNumber",date:item.date,},
                {label:item.date+'月完成率',index:ind,value:"finishRatio",date:item.date,},
              ]
            })
          })
          this.column =arr.flat(1)
        } 
      },
    },
  };
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
  </style>