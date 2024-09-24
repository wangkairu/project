<template>
  <div class="warpper">
    <!-- 树状 -->
    <el-card
      class="box-card"
      style="flex: 3; margin: 10px 0"
    >
      <div slot="header" class="clearfix">
        <div class="clearfixLeft">
          <span>入库记录表</span>
          <!-- <el-input style="width: 200px;margin-left: 10px;" size="mini" v-model="query.mesBranchFactory" placeholder="请输入分厂名称"></el-input> -->
        </div>
        <div class="clearfix">
          <el-radio-group
            v-model="store.dateType"
            size="mini"
            style="margin-right: 10px"
            @input="dateTypeStorageChange"
          >
            <el-radio-button label="year">年统计</el-radio-button>
            <el-radio-button label="month">月统计</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-show="store.dateType == 'year'"
            v-model="store.year"
            type="year"
            placeholder="选择年"
            size="mini"
            value-format="yyyy"
            @change="yearChangeStore"
          >
          </el-date-picker>
          <el-date-picker
            v-show="store.dateType == 'month'"
            v-model="store.month"
            type="month"
            placeholder="选择月"
            size="mini"
            value-format="yyyy-M"
            @change="monthChangeStore"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- ref="orderAmount" -->
      <div id="storage"  style="height: 300px"></div>
    </el-card> 
  
    <div class="box" style="display: flex;">
      <el-card
      class="box-card"
      style="flex: 3; margin: 10px 0;margin-right: 20px;"
    >
      <div slot="header" class="clearfix">
        <div class="clearfixLeft">
          <span>出库记录表</span>
        </div>
        <div class="clearfix">
          <el-radio-group
            v-model="query.dateType"
            size="mini"
            style="margin-right: 10px"
            @input="dateTypeChange"
          >
            <el-radio-button label="year">年统计</el-radio-button>
            <el-radio-button label="month">月统计</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-show="query.dateType == 'year'"
            v-model="query.year"
            type="year"
            placeholder="选择年"
            size="mini"
            value-format="yyyy"
            @change="yearChange"
          >
          </el-date-picker>
          <el-date-picker
            v-show="query.dateType == 'month'"
            v-model="query.month"
            type="month"
            placeholder="选择月"
            size="mini"
            value-format="yyyy-M"
            @change="monthChange"
          >
          </el-date-picker>
        </div>
      </div>
      <div id="orderAmount"  style="height: 300px"></div>
    </el-card> 
      <el-card class="box-card" style="flex: 1;margin: 10px 0;">
        <div slot="header" class="clearfix">
            <div class="clearfixLeft">
            <span>全钢半钢(月)</span>
            <!-- <el-input style="width: 200px;margin-left: 10px;" size="mini" v-model="shipping.mesBranchFactory" placeholder="请输入分厂名称"></el-input> -->
            </div>
            <el-date-picker
          v-show="query.dateType == 'month'"
          v-model="obj.month"
          type="month"
          placeholder="选择月"
          size="mini"
          value-format="yyyy-M"
          @change="monthObjChange"
        >
        </el-date-picker>
        </div>
        <div id="allSteel" style="height: 300px; width: 100px"></div>
      </el-card>
    </div>
  
    <!-- 饼状 -->
    <!-- <el-ca   class="box-card" style="flex: 1; margin: 10px 0">
      <div slot="header" class="clearfix">
        <span>出入库比例</span>
      </div>
      <div style="height: 3005px; width: 100%" ref="orderStatus"></div>
    </el-card> -->
  </div>
</template>

<script>
import {getGraph,getGraphNormTypeWithByMonth} from '@/api/index'
export default {
  data() {
    return {
      yearFinishOrderLoading: false,
      chartsLoading: false,
      salesPerType: "sales",
      obj:{
        month: `${new Date().getFullYear()}-${new Date().getMonth()+1}`,
      },
      query: {
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getFullYear()}-${new Date().getMonth()+1}`,
        dateType: "month",
        mesBranchFactory:"",
        state:0,
      },
      store:{
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
        dateType: "month",
        mesBranchFactory:"",
        state:1,
      },
      inCount:[],
      outCount:[],
      date:[],
    };
  },
  mounted() {
    // this.renderOrderStatus();
    this.updateStare()
    this.updataYearFinishOrder();
    this.getGraphNormTypeWithByMonth()
  },
  methods: {
    monthObjChange(){
      this.getGraphNormTypeWithByMonth()
    },
    async getGraphNormTypeWithByMonth(){
      const params={
        month:this.obj.month.split('-')[1],
        year:this.obj.month.split('-')[0],
      }
      const res = await getGraphNormTypeWithByMonth(params)
      if(res.code===200){
        var chartDom = document.getElementById('allSteel');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                  // text: 'Referer of a Website',
                  // subtext: 'Fake Data',
                  left: 'center'
                },
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
                    data: this.ship,
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
      }
    },
    dateTypeStorageChange() {
      this.updateStare();
    },
    yearChangeStore(){
      this.updateStare()
    },
    monthChangeStore(){
      this.updateStare()
    },
    async getGraph(){
      const val=this.query.month.split("-");
      let params
      if(this.query.dateType==='month'){
        params={
          month:val[1],
          year:val[0],
          state:0,
        }
      }else{
        params={
          year:this.query.year,
          state:0,
        }
      }
      const res = await getGraph(params)
      if(res.code==='0')
      {
        // this.inCount = res.data.inCount
        this.outCount = res.data.Count
        this.renderYearFinishOrder()
      }
    },
    async Storage(){
      const val=this.store.month.split("-");
      let params
      if(this.store.dateType==='month'){
        params={
          state:1,
          month:val[1],
          year:val[0]
        }
      }else{
        params={
          state:1,
          year:this.store.year
        }
      } 
      const res = await getGraph(params)
      if(res.code==='0')
      {
        this.inCount = res.data.Count
        this.renderOrderStatus()
      }
    },
    //订单状态饼图渲染
    renderOrderStatus() {
      if(this.store.dateType==='month'){
        const month=this.store.month.split("-")
        let days = new Date(month[0], month[1], 0).getDate()
        let newDays=[]
        let val=month[1]<10?'0'+month[1]:month[1]
        for(let i=1;i<=days;i++){
          newDays.push(i>=10?month[0]+'-'+val+'-'+i:month[0]+'-'+val+'-'+'0'+i)
        }
        this.date=newDays
      }else{
        let newDays=[]
        for(let i=1;i<=12;i++){
          newDays.push(i>=10?this.store.year+'-'+i:this.store.year+'-'+'0'+i)
        }
        this.date=newDays
      }
      const arr=this.inCount.map((v)=>[v.time,v.count])
      let storage =  this.$echarts.init(document.getElementById('storage'));
      let storageOptions = {
        grid:{
            top:"10%",
            left:"3%",
            right:"4%",
            bottom:"3%",
            containLabel:true,
          },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          // prettier-ignore
          data: this.date,
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            barWidth : '50%',
            data: arr
          },
          {
            type: 'line',
            smooth:true,
            data: arr
          }
        ]
      };
      storage.setOption(storageOptions);
    },
    //成品出库外贸分类概述
    renderYearFinishOrder() {
      if(this.query.dateType==='month'){
        const month=this.query.month.split("-")
        let days = new Date(month[0], month[1], 0).getDate()
        let newDays=[]
        let val=month[1]<10?'0'+month[1]:month[1]
        for(let i=1;i<=days;i++){
          newDays.push(i>=10?month[0]+'-'+val+'-'+i:month[0]+'-'+val+'-'+'0'+i)
        }
        this.date=newDays
      }else{
        let newDays=[]
        for(let i=1;i<=12;i++){
          newDays.push(i>=10?this.query.year+'-'+i:this.query.year+'-'+'0'+i)
        }
        this.date=newDays
      }
      let orderAmount = this.$echarts.init(document.getElementById('orderAmount'));
      const arr=this.outCount.map((v)=>{return [v.time,v.count]})
      let orderAmountOptions = {
        grid:{
          top:"10%",
          left:"3%",
          right:"4%",
          bottom:"3%",
          containLabel:true,
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          // prettier-ignore
          data: this.date,
        },
        yAxis: {},
        series: [
          {
            // name: '销量',
            type: 'bar',
            barWidth : '50%',
            data: arr
          },
          {
            // name: '占比',
            type: 'line',
            smooth:true,
            data: arr
          }
        ]
      };
      orderAmount.setOption(orderAmountOptions);
    },
    dateTypeChange() {
      this.updataYearFinishOrder();
    },
    yearChange(newVal) {
      //重置月选择
      this.updataYearFinishOrder();
    },
    monthChange(newVal) {
      this.updataYearFinishOrder();
    },
    updataYearFinishOrder() {
      switch (this.store.dateType) {
        case "year":
          // query.year = this.query.year;
          this.getGraph();
          break;
        case "month":
          // query.year = this.query.month.split("-")[0];
          // query.month = this.query.month.split("-")[1];
          this.getGraph();
          break;
      }
    },
    updateStare(){
      switch (this.store.dateType) {
        case "year":
          this.Storage();
        break;
        case "month":
          this.Storage();
        break;
      }
    }
  },

};
</script>

<style scoped lang='scss'>
.clearfix
{
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
}

// .warpper{
//   display: flex;
// }

.clearfixLeft{
  display: flex;
  align-items: center;
}
</style>