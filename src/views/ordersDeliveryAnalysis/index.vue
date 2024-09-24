<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'150px'"
          size="mini"
          :maxShow="3"
          @search="search"
          @reset="reset"
        >
          <el-form-item label="季度">
            <ElQuarterPicker :value.sync="quarterVal" @on-change="handleChange" placeholder="选择季度" />
          </el-form-item>
          <el-form-item label="半年">
            <ElQuarterHalfYear :value.sync="halfYear" @on-change="handleChange" placeholder="选择半年" />
          </el-form-item>
        </SearchFilter>
      </div>
      <div class="table">
        <el-table
          v-if="data.length>0"
          :data="data"
          style="width: 100%">
          <el-table-column prop="year" > 
            <template slot-scope="scope">
              <div>
                <el-table
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                :data="scope.row.children"
                :summary-method="getSummaries"
                show-summary
                style="width: 100%">
                  <!-- <el-table-column label="#" type="index"></el-table-column> -->
                  <el-table-column :label="scope.row.year" prop="month"></el-table-column>
                  <el-table-column label="订单量" prop="taskNum"></el-table-column>
                  <el-table-column label="交付量" prop="submitNum"></el-table-column>
                  <el-table-column label="交付完成率" prop="submitRatio"></el-table-column>
                  <el-table-column label="订单量同比(月)" prop="submitChain"></el-table-column>
                  <el-table-column label="订单量环比(月)" prop="submitYOY"></el-table-column>
                  <el-table-column label="交付量同比(月)" prop="taskChain"></el-table-column>
                  <el-table-column label="交付量环比(月)" prop="taskYOY"></el-table-column>
                  <el-table-column label="同比（季度）" prop="submitQuarterChain"></el-table-column>
                  <el-table-column label="环比（季度）" prop="submitQuarterYOY"></el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-else style="height: 450px;" description="暂无数据"></el-empty>
      </div>
      <!-- <div class="pagenation">
        <PageNation
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      </div> -->
    </div>
  </template>
  
  <script>
  import SearchFilter from "@/components/SearchFilter";
  import PageNation from "@/components/Pagination";
  import {orderAndAnalaysis} from '@/api/ordersInteractions'
  import ElQuarterPicker from '@/components/ElQuarterPicker'
  import ElQuarterHalfYear from '@/components/ElQuarterPicker/halfYear'
  import {queryEnumList} from '@/api/storeIn'
  export default {
    name: "agvtasks",
    // props: {
    //   wmsTaskType: {
    //     type: String,
    //   }
    // },
    components: {
      PageNation, SearchFilter,ElQuarterPicker,ElQuarterHalfYear
    },
    data() {
      return {
        quarterVal:[],
        halfYear:[],
        data: [],
      }
    },
    mounted() {
      this.orderAndAnalaysis()
    },
    methods: {
      search(){
        this.orderAndAnalaysis(this.quarterVal)
      },
      reset(){
        this.quarterVal=[];
        this.halfYear=[];
        this.orderAndAnalaysis()
      },
      getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          // if (!values.every(value => isNaN(value))) {
            if(index==1){
              data.forEach((v)=>{
                if(v.year==columns[0].label){
                  sums[index] =v.task
                }
              })
            }else if(index==2){
              data.forEach((v)=>{
                if(v.year==columns[0].label){
                  sums[index] =v.submit
                }
              })
            }else if(index==4){
              data.forEach((v)=>{
                if(v.year==columns[0].label){
                  sums[index] =v.taskChainYear
                }
              })
            }else if(index==6){
              data.forEach((v)=>{
                if(v.year==columns[0].label){
                  sums[index] =v.submitChainYear
                  console.log(sums[index])
                }
              })
            }
            // sums[index];
          // } else {
            // sums[index] ;
          // }
        });

        return sums;
      },
      handleChange(val){
        this.orderAndAnalaysis(val)
      },
      async orderAndAnalaysis(val){
        
        const params={
            startTime:val?val[0].start_date:'',
            endTime:val?val[1].end_date:"",
        }
        const res = await orderAndAnalaysis(params)
        if(res.code=='0'){
          let arr=[]
          res.data.forEach((v)=>{
            arr.push(v.year)
          })
          
          this.data=arr.map((v)=>{
            let newArr=[]
            res.data.forEach((i)=>{
              if(i.year==v){
                i.date.forEach((item)=>{
                  item.quarterOfMonths.forEach((val)=>{
                    newArr.push({...val,...item,...i,taskNum:val.task,submitNum:val.submit,submitChainYear:i.submitChain,taskChainYear:i.taskChain})
                  })
                })
              }
            })
            return {
              year:v.toString(),
              children:newArr
            }
          })
        }
      },
      // pageChange(val) {
      //   this.listQuery.pageNum = val.page;
      //   this.listQuery.pageSize = val.limit;
      //   this.queryTaskList();
      // },
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
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 10px;
      .tab_header{
        color:#333;
        padding:0 5px 0 5px;
        height:45px;
        line-height:45px;
        border:1px solid #eee;display:flex;
        justify-content: space-between;
        background:#eef1f6;
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
  ::v-deep .el-table .el-table__cell{
    padding: 0.45rem 0;
  }
  ::v-deep .el-table__fixed::before {
    height: 0px;
  } 
  </style>