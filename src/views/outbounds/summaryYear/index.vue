<template>
  <div class="warpper">
      <div class="table-filter">
      <SearchFilter
        :labelWidth="'150px'"
        size="mini"
        :maxShow="5"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="入库日期">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="query.time"
              type="year"
              placeholder="请选择入库日期"
              format="yyyy"
              value-format="yyyy"
              @change="handelTime"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES规格简称">
          <el-select
            multiple
            filterable
            v-model="query.mesNormName"
            placeholder="请选择MES规格简称"
            @change="handelMesNormName"
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
            multiple
            filterable
            v-model="query.mesCustomer"
            @change="handelMesCustomer"
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
              @change="handelMeterLength"
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
            v-model="query.wheelsType"
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
      </SearchFilter>
    </div>
    <div class="table">
      <el-table
        ref="table"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="data"
      >
        <!-- <el-table-column fixed type="index" label="#"> </el-table-column> -->
        <el-table-column fixed prop="month" label="月份" >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesNormName"
          label="MES规格名称"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesCustomerName"
          label="MES客户简称"
          width="350"
        >
        </el-table-column>
        <el-table-column prop="wheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="mesTray" label="MES托盘" > </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <!-- <el-table-column prop="mesNumOfRounds" label="返工净重" width="70">
        </el-table-column> -->
        <el-table-column prop="reWorkWeight" label="退货净重">
        </el-table-column>
        <el-table-column prop="reWorkRatio" label="退货净重环比%">
        </el-table-column>
        <el-table-column
          prop="mesInOutWeight"
          label="出库净重"
        >
        </el-table-column>
        <el-table-column
          prop="mesInOutRatio"
          label="出库净重环比%"
          show-overflow-tooltip
        >
        </el-table-column>

      </el-table>
    </div>
    <div style="margin-top: 10px;">
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
              <div class="clearfixLeft">
                <span>年度环比曲线图</span>
              </div>
              <!-- <div class="clearfix"></div> -->
          </div>
          <div v-if="ratioYear.length>0" id="main" class="line" style="height: 300px; width: 100%"></div>
          <el-empty v-else description="暂无数据" style="height: 320px; width: 100%"></el-empty>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;">
          <div slot="header" class="clearfix">
              <div class="clearfixLeft">
                <span>年度月净重合计曲线图</span>
              </div>
              <!-- <div class="clearfix"></div> -->
          </div>
          <div v-if="weightYear.length>0" id="mainWeight" class="line" style="height: 300px; width: 100%"></div>
          <el-empty v-else description="暂无数据" style="height: 320px; width: 100%"></el-empty>
        </el-card>
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
import * as echarts from 'echarts';
// import PageNation from "@/components/Pagination";
import {
  OutDetailWithYear,
  getCustomerAndSpecification,
  StatisticsReportsRatioYear,
  StatisticsReportsWeightYear} from '@/api/storeOut'
export default {
  name:"summaryMonth",
  components:{
      SearchFilter,
      // PageNation
  },
  data(){
      return {
          query:{
              time:`${new Date().getFullYear()}`,
              mesCustomer:[],
              mesNormName:[],
              meterLength:"",
              wheelsType:"",
          },
          listQuery:{
              pageNum:0,
              pageSize:10,
          },
          total:0,
          data:[],
          mesNormsNameListOptions:[],
          mesCustomerOptions:[],
          mesWheelType:[],
          mesTrayOptions:[],
          mesMeterLength:[],
          ratioYear:[],
          weightYear:[],
      }
  },
  mounted(){
      this.OutDetailWithYear()
      this.StatisticsReportsWeightYear()
      this.StatisticsReportsRatioYear()
      this.$store.dispatch('realList').then(()=>{
        this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
        this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
        this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
        this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
        this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
      })
  },
  methods:{
    async StatisticsReportsWeightYear(){
        const params={
          flag:true,
          year:Number(this.query.time),
        }
        const res = await StatisticsReportsWeightYear(params)
        if(res.code==='0')
        {
          let name=[]
          this.weightYear=res.data&&res.data.map(v=>{
            name.push(v.name)
            let arr = v.counts.map(item => {
              return [item.date.toString(),item.count]
            })
            return {
              name:v.name,
              type:"line",
              data:arr
            }
          })
          this.$nextTick(()=>{
            const chartDom = document.getElementById('mainWeight');
            if(chartDom){
              const myChart = echarts.init(chartDom);
              const option = {
                tooltip: {
                  trigger: 'axis'
                },
                // legend: {
                //   data: name
                // },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: [1,2,3,4,5,6,7,8,9,10,11,12]
                },
                yAxis: {
                  type: 'value'
                },
                series: this.weightYear,
              };
              option && myChart.setOption(option);
            }
          })
        }else{
          this.weightYear=[]
        }
      },
      async StatisticsReportsRatioYear(){
        const params={
          flag:true,
          year:Number(this.query.time),
        }
        const res = await StatisticsReportsRatioYear(params)
        if(res.code==='0')
        {
          let name=[]
          this.ratioYear=res.data&&res.data.map(v=>{
            name.push(v.name)
            let arr = v.counts.map(item => {
              return [item.date.toString(),item.count]
            })
            return {
              name:v.name,
              type:"line",
              data:arr
            }
          })
          this.$nextTick(()=>{
            const chartDom = document.getElementById('main');
            if(chartDom){
              const myChart = echarts.init(chartDom);
              const option = {
                tooltip: {
                  trigger: 'axis'
                },
                // legend: {
                //   data: name
                // },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: [1,2,3,4,5,6,7,8,9,10,11,12]
                },
                yAxis: {
                  type: 'value'
                },
                series: this.ratioYear,
              };
              option && myChart.setOption(option);
            }
          })
        }else{
          this.ratioYear=[]
        }
      },
  
      handelTime(){
        this.OutDetailWithYear()
        this.StatisticsReportsWeightYear()
        this.StatisticsReportsRatioYear()
      },
      handelMesCustomer(){
          // console.log(this.query.mesCustomer)
        this.OutDetailWithYear()
      },
      handelMesNormName(){
        this.OutDetailWithYear()
      },
      handelMeterLength(){
        this.OutDetailWithYear()
      },
      handelWheelsType(){
          this.OutDetailWithYear()
      },
      pageChange(val){
          this.listQuery.pageNum = val.page ;
          this.listQuery.pageSize = val.limit;
          this.OutDetailWithYear()
      },
      search(){
        this.OutDetailWithYear()
      },
      reset(){
          this.query={
            time:`${new Date().getFullYear()}`,
            mesCustomer:[],
            mesNormName:[],
            meterLength:"",
            wheelsType:"",
          },
          this.OutDetailWithYear()
      },
      async OutDetailWithYear(){
          const params={
              year:this.query.time,
              mesCustomer:this.query.mesCustomer+'',
              mesNormName:this.query.mesNormName+'',
              meterLength:this.query.meterLength,
              page:this.listQuery.pageNum,
              size:this.listQuery.pageSize,
              wheelsType:this.query.wheelsType,
          }
          const res = await OutDetailWithYear(params)
          if(res.code==='0'){
              this.data=res.data
              // this.total = res.data.total
          }
      }
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
  .total {
    padding: 4px 0;
    margin-top: 4px;
    .totalItem {
      display: inline-block;
      margin-left: 20px;
    }
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
</style>