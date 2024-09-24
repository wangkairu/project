<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'130px'"
          size="mini"
          :maxShow="5"
          @search="search"
          @reset="reset"
        >
            <el-form-item label="入库日期">
              <!-- <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker> -->
              <el-date-picker
                v-model="form.date"
                type="date"
                class="time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="MES规格简称">
            <el-select
              multiple
              filterable
              v-model="form.mesNormName"
              placeholder="请选择MES规格简称"
              @change="handelNormsSimpleCode"
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
              v-model="form.mesCustomerShortName"
              @change="handelNormsSimpleCode"
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
            <el-form-item label="米长">
              <el-select
                filterable
                v-model="form.meterLength"
                @change="handelNormsSimpleCode"
                placeholder="请输入米长"
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
            <el-form-item label="轮型">
                <el-select
                filterable
                v-model="form.wheelType"
                @change="handelNormsSimpleCode"
                placeholder="请输入轮型"
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
        <!-- <div class="enteringButton">
            <el-button
            type="primary"
            @click="handelAdd"
            size="mini"
            >新增</el-button>
        </div> -->
        <el-table
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          style="width: 100%"
          :data="data"
        >
          <el-table-column fixed type="index" label="#" > </el-table-column>
          <el-table-column fixed label="规格简称" prop="mesNormName"></el-table-column>
          <el-table-column fixed label="客户简称" prop="mesCustomerName"></el-table-column>
          <el-table-column fixed label="轮型" prop="mesWheelType"></el-table-column>
          <el-table-column fixed label="托盘" prop="mesTray"></el-table-column>
          <el-table-column fixed label="米长" prop="mesMeterLength"></el-table-column>
          <el-table-column label="当日入库" >
            <el-table-column label="箱" prop="inCount"></el-table-column>
            <el-table-column label="重量" prop="inWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当日返工" >
            <el-table-column label="箱" prop="inOutCount"></el-table-column>
            <el-table-column label="重量" prop="inOutWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当月累计入库箱数" prop="absoluteInCount"></el-table-column>
          <el-table-column label="当月累计入库重量" prop="absoluteInWeight"></el-table-column>
          <el-table-column label="当日出库" >
            <el-table-column label="箱" prop="outCount"></el-table-column>
            <el-table-column label="重量" prop="outWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当日退货" >
            <el-table-column label="箱" prop="outInCount"></el-table-column>
            <el-table-column label="重量" prop="outInWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当月累计出库箱数" prop="absoluteOutCount"></el-table-column>
          <el-table-column label="当月累计出库重量" prop="absoluteOutWeight"></el-table-column>
          <el-table-column label="当月订单重量" prop="taskWeight"></el-table-column>
          <el-table-column label="订单执行状态" prop="absoluteOutTaskWeight"></el-table-column>
          <el-table-column label="当日结存" >
            <el-table-column label="箱" prop="existcount"></el-table-column>
            <el-table-column label="重量" prop="existWeight"></el-table-column>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handelDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>库存最大最小平均值</span>
            <div class="clearfix time">
              <el-radio-group
                v-model="query.dateType"
                size="mini"
                style="margin-right: 10px"
                @input="dateTypeChange"
              >
              <el-radio-button label="year">年</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-show="query.dateType == 'month'"
                v-model="query.date"
                type="month"
                placeholder="选择月"
                size="mini"
                value-format="yyyy-MM"
                @change="maxMinAverageGraph"
              >
              </el-date-picker>
              <el-date-picker
                v-show="query.dateType == 'year'"
                v-model="query.date"
                type="year"
                placeholder="选择年"
                size="mini"
                value-format="yyyy"
                @change="maxMinAverageGraphYear"
              >
              </el-date-picker>
            </div>
          </div>
          <div v-if="yearData.length>0"  id="yearData" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>总库存重量趋势图</span>
            <div class="time">
              <span>日期：</span>
              <el-date-picker
                v-model="time"
                type="month"
                placeholder="选择月"
                size="mini"
                value-format="yyyy-MM"
                @change="handelWeight"
              >
              </el-date-picker>
            </div>
          </div>
          <div v-if="weightData.length>0"  id="weightData" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>日规格名称库存重量图</span>
            <div class="clearfix filter">
              <div class="time">
                <span>日期：</span>
                <el-date-picker
                  v-model="queryWeight.date"
                  type="month"
                  placeholder="选择月"
                  size="mini"
                  value-format="yyyy-MM"
                  @change="handelChangeWeightMonth"
                >
                </el-date-picker>
              </div>
              <div>
                <span>规格简称：</span>
                <el-select @change="handelNormType"  filterable clearable size="mini" v-model="queryWeight.normType" placeholder="请选择规格简称">
                  <el-option
                    v-for="item in mesNormsNameListOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="location.length>0"  id="location" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <!-- <div style="display: flex;">
         
        </div> -->
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>月库存重量图</span>
            <div class="time">
              <span>年：</span>
              <el-date-picker
                v-model="WeightObj.date"
                type="year"
                placeholder="选择年"
                size="mini"
                value-format="yyyy"
                @change="handelMonthWeight"
              >
              </el-date-picker>
            </div>
          </div>
          <div v-if="monthWeight.length>0"  id="monthWeight" style="width: 100%;height: 300px;"></div>
          <el-empty
            v-else
            description="暂无数据"
          ></el-empty>
        </el-card>
        <!-- margin-left: 10px; -->
          <el-card class="box-card" style="flex: 2;margin: 10px 0;">
            <div slot="header" class="clearfix">
              <span>逐年库存重量图</span>
            </div>
            <div v-if="weightYearly.length>0"  id="weightYearly" style="width: 100%;height: 300px;"></div>
            <el-empty
              v-else
              description="暂无数据"
            ></el-empty>
          </el-card>
      <!-- <div class="pagenation">
        <PageNation
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      </div> -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%">
        <el-table
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          style="width: 100%"
          :data="tableData"
        >
          <el-table-column fixed type="index" label="#" > </el-table-column>
          <el-table-column fixed label="日期" >
            <template slot-scope="scope">
              <span>{{ scope.row.year+'/'+scope.row.month+'/'+scope.row.day }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed label="规格简称" prop="mesNormType"></el-table-column>
          <el-table-column fixed label="客户简称" prop="mesCustomerName"></el-table-column>
          <el-table-column fixed label="轮型" prop="mesWheelType"></el-table-column>
          <el-table-column fixed label="托盘" prop="mesTray"></el-table-column>
          <!-- <el-table-column fixed label="米长" prop="mesMeterLength"></el-table-column> -->
          <el-table-column label="当日入库" >
            <el-table-column label="箱" prop="inCount"></el-table-column>
            <el-table-column label="重量" prop="inWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当日返工" >
            <el-table-column label="箱" prop="inOutCount"></el-table-column>
            <el-table-column label="重量" prop="inOutWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当日出库" >
            <el-table-column label="箱" prop="outCount"></el-table-column>
            <el-table-column label="重量" prop="outWeight"></el-table-column>
          </el-table-column>
          <el-table-column label="当日退货" >
            <el-table-column label="箱" prop="outInCount"></el-table-column>
            <el-table-column label="重量" prop="outInWeight"></el-table-column>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  <script>
  import {
    inOutWareSelectAll,
    weightTrendGraph,
    maxMinAverageGraphYear,
    maxMinAverageGraph,
    selectByDay,
    InOutDetailWeightByYear,
    InOutDetailWeightByMonth,
    InOutDetailWeightByDay} from '@/api/storeIn'
  import SearchFilter from "@/components/SearchFilter";
  import * as echarts from 'echarts';
  import moment from 'moment'
  export default {
    name: "deposit",
    components: {  SearchFilter },
    data() {
      return {
        data: [],
        tableData:[],
        type:"",
        time:`${new Date().getFullYear()}-${new Date().getMonth()+1}`,
        form:{
          date:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        },
        dialogVisible:false,
        mesCustomerOptions:[],
        mesNormsNameListOptions:[],
        yearData:[],
        maxWeight:[],
        allWeight:[],
        averageWeight:[],
        minWeight:[],
        weightData:[],
        mesWheelType:[],
        mesMeterLength:[],
        location:[],
        weightYearly:[],
        monthWeight:[],
        query:{
          dateType:"month",
          date:`${new Date().getFullYear()}-${new Date().getMonth()+1}`
        },
        queryWeight:{
          date:`${new Date().getFullYear()}-${new Date().getMonth()+1}`,
          normType:"",
        },
        WeightObj:{
          date:`${new Date().getFullYear()}`
        },
      };
    },
    mounted() {
        this.$store.dispatch('realList').then(()=>{
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
        })
        this.inOutWareSelectAll()
        this.weightTrendGraph()
        this.dateTypeChange()
        this.InOutDetailWeightByYear()
        this.InOutDetailWeightByMonth()
        this.InOutDetailWeightByDay()
    },
    methods:{
      handelNormType(){
        this.InOutDetailWeightByDay()
      },
      handelChangeWeightMonth(){
        this.queryWeight.normType=''
        this.InOutDetailWeightByDay()
      },
      handelMonthWeight(){
        this.InOutDetailWeightByMonth()
      },
        async handelDetail(row){
          const params={
            mesCustomerName:row.mesCustomerName,
            mesMeterLength:row.mesMeterLength,
            mesNormName:row.mesNormName,
            mesTray:row.mesTray,
            mesWheelType:row.mesWheelType,
            year:this.form.date.split("-")[0],
            month:this.form.date.split("-")[1],
          }
          const res = await selectByDay(params)
          if(res.code=='0'){
              this.tableData=res.data
          }
          this.dialogVisible = true
        },
        search(){
            this.inOutWareSelectAll()
        },
        reset(){
            this.form={}
            this.inOutWareSelectAll()
        },
        async InOutDetailWeightByYear(){
          const res = await InOutDetailWeightByYear()
          if(res.code=='0'){
            let arr=[]
            this.weightYearly=res.data&&res.data.map(v=>{
              arr.push(v.year.toString())
              return [v.year.toString(),v.mesNetWeight]
            })
            if(this.weightYearly!=null&&this.weightYearly.length!=0){
              this.$nextTick(()=>{
                const chartDom = document.getElementById('weightYearly');
                const myChart = echarts.init(chartDom);
                const option = {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'left'
                  },
                  xAxis: {
                    type: 'category',
                    data:arr,
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name: '逐年库存重量图',
                      type: 'line',
                      data: this.weightYearly,
                    }
                  ]
                };
                option && myChart.setOption(option);
              })
            }
          }
        },
        async InOutDetailWeightByMonth(){
          const params={
            year:this.WeightObj.date,
          }
          const res = await InOutDetailWeightByMonth(params)
          if(res.code=='0'){
            this.monthWeight=res.data&&res.data.map(v=>{
              return [this.WeightObj.date.split('-')[0]+'-'+v.month,v.mesNetWeight]
            })
            const arr=[]
            for(let i=1;i<=12;i++){
              arr.push(this.WeightObj.date.split('-')[0]+'-'+i)
            }
            if(this.monthWeight!=null&&this.monthWeight.length!=0){
              this.$nextTick(()=>{
                const chartDom = document.getElementById('monthWeight');
                const myChart = echarts.init(chartDom);
                const option = {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'left'
                  },
                  xAxis: {
                    type: 'category',
                    data:arr,
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name: '月库存重量图',
                      type: 'line',
                      data: this.monthWeight,
                    }
                  ]
                };
                option && myChart.setOption(option);
              })
            }
          }
        },
        async InOutDetailWeightByDay(){
          const params={
            month:this.queryWeight.date.split('-')[1],
            year:this.queryWeight.date.split('-')[0],
            normType:this.queryWeight.normType
          }
          const res = await InOutDetailWeightByDay(params)
          if(res.code=='0'){  
            this.location=res.data&&res.data.map(v=>{
              return [this.queryWeight.date.split('-')[0]+'-'+this.queryWeight.date.split('-')[1]+'-'+v.day,v.mesNetWeight]
            })
            console.log(this.location)
            let day=this.getMonthDays2(this.queryWeight.date)
            const arr=[]
            for(let i=1;i<=day;i++){
              arr.push(this.queryWeight.date.split('-')[0]+'-'+this.queryWeight.date.split('-')[1]+'-'+i)
            }
            if(this.location!=null&&this.location.length!=0){
              this.$nextTick(()=>{
                const chartDom = document.getElementById('location');
                const myChart = echarts.init(chartDom);
                const option = {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'left'
                  },
                  xAxis: {
                    type: 'category',
                    data:arr,
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name: '日规格名称库存重量',
                      type: 'bar',
                      data: this.location,
                    }
                  ]
                };
                option && myChart.setOption(option);
              })
            }
          }
        },
        handelNormsSimpleCode(){
          this.inOutWareSelectAll()
        },
        async inOutWareSelectAll(){
            const params={
                ...this.form,
                year:this.form.date.split("-")[0],
                month:this.form.date.split("-")[1],
                day:this.form.date.split("-")[2],
            }
            const res = await inOutWareSelectAll(params)
            this.data=res.data
        },
        async weightTrendGraph(){
            const params={
                month:this.time.split('-')[1],
                year:this.time.split('-')[0],
            }
            const res = await weightTrendGraph(params)
            this.weightData=res.data.map((v)=>{return [v.year+'-'+v.month+'-'+v.day,v.weight]})
            let day=this.getMonthDays2(this.time)
            const arr=[]
            for(let i=1;i<=day;i++){
                arr.push(this.time.split('-')[0]+'-'+this.time.split('-')[1]+'-'+i)
            }
            if(this.weightData!=null&&this.weightData.length!=0){
              this.$nextTick(()=>{
                const chartDom = document.getElementById('weightData');
                const myChart = echarts.init(chartDom);
                const option = {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'left'
                  },
                  xAxis: {
                    type: 'category',
                    data:arr,
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      name: '总库存重量',
                      type: 'bar',
                      data: this.weightData,
                      
                    }
                  ]
                };
                option && myChart.setOption(option);
              })
            }
        },
        getMonthDays2(time){
            let year = time.split('-')[0];
            let month = time.split('-')[1];
            let date = new Date(year, month, 0); // 这里的month，比我们日常说的几月份小1，10则表示11月份
            return date.getDate();
        },
        handelWeight(){
            this.weightTrendGraph()
        },
        async maxMinAverageGraphYear(){
            const res = await maxMinAverageGraphYear()
            this.yearData=res.data
              res.data&&res.data.forEach((v)=>{
                  this.maxWeight.push(['最大库存',v.maxWeight])
                  this.allWeight.push(['总库存量',v.allWeight])
                  this.averageWeight.push(['平均值',v.averageWeight])
                  this.minWeight.push(['最小库存',v.minWeight])
              })
              if(this.yearData!=null&&this.yearData.length!=0){
              this.$nextTick(()=>{
                  const chartDom = document.getElementById('yearData');
                  console.log(chartDom,'chartDom')
                  const myChart = echarts.init(chartDom);
                  const option = {
                  xAxis: {
                    type: 'category',
                    data: ['最大库存', '总库存量', '平均值', '最小库存']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      data: this.maxWeight,
                      type: 'bar'
                    },
                    {
                      data: this.allWeight,
                      type: 'bar'
                    },
                    {
                      data: this.averageWeight,
                      type: 'bar'
                    },
                    {
                      data: this.minWeight,
                      type: 'bar'
                    }
                  ]
                };
                  option && myChart.setOption(option);
              })
              }
        },
        dateTypeChange(){
          switch(this.query.dateType){
            case "month":
                this.query.date=`${new Date().getFullYear()}-${new Date().getMonth()+1}`
                this.maxMinAverageGraph()
                break;
            case "year":
                this.query.date=`${new Date().getFullYear()}`
                this.maxMinAverageGraphYear()
                break;
          }
        },
        // weightChange(){
        //   switch(this.queryWeight.dateType){
        //     case "month":
        //         this.queryWeight.date=`${new Date().getFullYear()}-${new Date().getMonth()+1}`
        //         this.InOutDetailWeightByDay()
        //         break;
        //     case "year":
        //         this.queryWeight.date=`${new Date().getFullYear()}`
        //         this.InOutDetailWeightByDay()
        //         break;
        //   }
        // },
        async maxMinAverageGraph(){
            const params={
                year:new Date().getFullYear()
            }
            const res = await maxMinAverageGraph(params)
            if(res.code=='0'){
               this.yearData=res.data
               res.data&&res.data.forEach((v)=>{
                    this.maxWeight.push([v.time,v.maxWeight])
                    this.allWeight.push([v.time,v.allWeight])
                    this.averageWeight.push([v.time,v.averageWeight])
                    this.minWeight.push([v.time,v.minWeight])
               })
               let day=this.getMonthDays2(this.time)
                const arr=[]
                for(let i=1;i<=day;i++){
                    arr.push(this.time.split('-')[0]+'-'+this.time.split('-')[1]+'-'+i)
                }
                this.$nextTick(()=>{
                    const chartDom = document.getElementById('yearData');
                    const myChart = echarts.init(chartDom);
                    const option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data:arr,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '最大库存',
                            type: 'bar',
                            data: this.maxWeight,
                        },
                        {
                            name: '最小库存',
                            type: 'bar',
                            data: this.minWeight,
                        },
                        {
                            name: '平均值',
                            type: 'bar',
                            data: this.averageWeight,
                        },
                        {
                            name: '总库存量',
                            type: 'bar',
                            data: this.allWeight,
                        },
                    ]
                    };
                    option && myChart.setOption(option);
                })
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
        display: flex;
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
  }
  ul {
    display: flex;
  }
  .hiden {
    display: inline-block;
    width: calc(100% - 112px);
  }
  .filter{
    display: flex;
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
  ::v-deep .el-table {
    .el-table__fixed {
      height: auto !important;
      bottom: 21px !important;
    }
    .el-table__cell{
      padding: 0.62rem 0;
    }
  }
  ::v-deep .time .el-input__suffix {
    right: 2.6125rem;
  }
  .clearfix{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>