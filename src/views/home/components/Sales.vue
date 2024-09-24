<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-11 16:35:59
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-30 14:57:07
 * @FilePath: \wms-client\src\view\index\Sales.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div style="display: flex;">
      <el-card class="box-card" style="flex: 1.8;margin: 10px 0;margin-right: 20px;">
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>出入库比例</span>
            <!-- <el-input style="width: 200px;margin-left: 10px;" size="mini" v-model="query.mesBranchFactory" placeholder="请输入分厂名称"></el-input> -->
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
        <div id="inventory" style="height: 300px; width: 100%"></div>
      </el-card>
      <el-card class="box-card" style="flex: 1;margin: 10px 0;margin-right: 20px;">
            <div slot="header" class="clearfix">
                <div class="clearfixLeft">
                <span>发货方式</span>
                <!-- <el-input style="width: 200px;margin-left: 10px;" size="mini" v-model="shipping.mesBranchFactory" placeholder="请输入分厂名称"></el-input> -->
                </div>
                <div class="clearfix">
                <el-radio-group
                    v-model="shipping.dateType"
                    size="mini"
                    style="margin-right: 10px"
                    @input="dateTypeChangeShip"
                >
                    <el-radio-button label="year">年统计</el-radio-button>
                    <el-radio-button label="month">月统计</el-radio-button>
                </el-radio-group>
                <el-date-picker 
                    v-show="shipping.dateType == 'year'"
                    v-model="shipping.year"
                    type="year"
                    placeholder="选择年"
                    size="mini"
                    value-format="yyyy"
                    @change="yearChangeShip"
                >
                </el-date-picker>
                <el-date-picker
                    v-show="shipping.dateType == 'month'"
                    v-model="shipping.month"
                    type="month"
                    placeholder="选择月"
                    size="mini"
                    value-format="yyyy-M"
                    @change="monthChangeShip"
                >
                </el-date-picker>
                </div>
            </div>
            <div id="shipping" style="height: 300px; width: 100%"></div>
      </el-card>
    </div>
    <div style="display: flex;">
      <el-card class="box" style="flex: 2;margin: 10px 0;margin-right: 20px;">
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>入库排行报表</span>
          </div>
        </div>
        <el-table
        :data="InRank"
        style="width: 100%">
        <el-table-column
            label="序号"
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
          label="客户全称"
          prop="name">
        </el-table-column>
          <el-table-column
            label="总计"
            prop="total"
            width="60">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-date-picker
               style="width: 170px;"
                v-model="value1"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handelChange">
              </el-date-picker>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box" style="flex: 2;margin: 10px 0;">
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>出库排行报表</span>
          </div>
        </div>
        <el-table
        :data="outRank"
        style="width: 100%">
        <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            label="客户全称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="总计"
            prop="total"
            width="60">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-date-picker
                style="width: 170px;"
                v-model="value2"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handelChangeOut">
              </el-date-picker>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div style="display: flex;">
      <el-card class="box" style="flex: 2;margin: 10px 0;margin-right: 20px;">
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>入库排行柱状图</span>
          </div>
          <el-date-picker
            v-model="value3"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handelChangeIn">
          </el-date-picker>
        </div>
        <div id="inRank" style="height: 200px; width: 100%"></div>
      </el-card>
      <el-card class="box" style="flex: 2;margin: 10px 0;">
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>出库排行柱状图</span>
          </div>
          <el-date-picker
            v-model="value4"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handelChangedate">
          </el-date-picker>
        </div>
        <div id="outRank" style="height: 200px; width: 100%"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {getGraphWMSDeliverByYear,getGraphWMSDeliverByMonth,} from '@/api/index'
import {getRatio,getRankingList} from '@/api/index'
import * as echarts from "echarts";
import moment from 'moment'
export default {
  data() {
    return {
      chartsLoading: false,
      salesPerType: "sales",
      query: {
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getMonth()==0?new Date().getFullYear()-1:new Date().getFullYear()}-${new Date().getMonth()==0?12:new Date().getMonth()}`,
        dateType: "month",
        mesBranchFactory:"",
      },
      arr: [
        {
          name: "设备箱",
          splifice: "213",
        },
        {
          name: "设备箱",
          splifice: "200",
        },
        {
          name: "设备箱",
          splifice: "190",
        },
        {
          name: "设备箱",
          splifice: "173",
        },
        {
          name: "设备箱",
          splifice: "140",
        },
        // {
        //   name: "设备箱",
        //   splifice: "135",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "105",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "98",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "90",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "50",
        // },
      ],
      newDate:[],
      data:[],
      tableData:[],
      value1:[`${new Date()}`,`${new Date()}`],
      value2:[`${new Date()}`,`${new Date()}`],
      InRank:[],
      outRank:[],
      value3:[`${new Date()}`,`${new Date()}`],
      value4:[`${new Date()}`,`${new Date()}`],
      RankIn:[],
      RankOut:[],
      shipping: {
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getMonth()==0?new Date().getFullYear()-1:new Date().getFullYear()}-${new Date().getMonth()==0?12:new Date().getMonth()}`,
        dateType: "month",
      },
      ship:[],
    };
  },
  mounted() {
    this.updateStare();
    this.updateStareShip();
    this.getRankingList()
    this.getRankingListOut()
    this.getRankingListIn()
    this.getRankingListOutRank()
    // this.dateTypeChangeShip()
  },
  methods: {
    dateTypeChangeShip() {
      this.updateStareShip();
    },
    yearChangeShip(newVal) {
    //重置月选择
      this.updateStareShip();
    },
    monthChangeShip(newVal) {
      this.updateStareShip();
    },
    updateStareShip(){
        switch (this.shipping.dateType) {
            case "year":
            this.getGraphWMSDeliverByYear();
            break;
            case "month":
            this.getGraphWMSDeliverByMonth();
            break;
        }
    },
    async getGraphWMSDeliverByYear(){
        const params={
            year:this.shipping.year
        }
        const res = await getGraphWMSDeliverByYear(params)
        this.ship=res.data.map((v)=>{
            return {
                ...v,
                value:v.count
            }
        })
        if(res.code === '0'){
            var chartDom = document.getElementById('shipping');
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
    async getGraphWMSDeliverByMonth(){
        const params={
          ...this.shipping,
          year:this.shipping.month.split('-')[0],
          month:this.shipping.month.split('-')[1]
        }
        const res = await getGraphWMSDeliverByMonth(params)
        this.ship=res.data.map((v)=>{
            return {
                ...v,
                value:v.count
            }
        })
        if(res.code === '0'){
            var chartDom = document.getElementById('shipping');
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
    handelChangedate(){
      this.getRankingListOutRank()
    },
    handelChangeIn(){
      this.getRankingListIn()
    },
    handelChange(){
      this.getRankingList()
    },
    handelChangeOut(){
      this.getRankingListOut()
    },
    dateTypeChange(val) {
      this.updateStare();
    },
    yearChange(newVal) {
      //重置月选择
      this.updateStare();
    },
    monthChange(newVal) {
      this.updateStare();
    },
    updateStare(){
      switch (this.query.dateType) {
        case "year":
          this.getRatio();
          break;
        case "month":
          this.getRatio();
        break;
      }
    },
    async getRatio(){
      const month_1=this.query.month.split("-")
      let params
      if(this.query.dateType==='year')
      {
        params={
          year:this.query.year,
        }
      }else{
        params={
          year:this.query.year,
          month:month_1[1],
        }
      }
      const res= await getRatio(params)
      if(res.code==='0'){
        this.data=res.data.map((v)=>{
          return {
            ...v,
            storage:100 - v.ratio
          }
        })
        const storageIn=this.data.map(v=>{return [v.date,v.ratio]})
        const storageOut= this.data.map(v=>{return [v.date,v.storage]})
        if(this.query.dateType==='month')
        {
          let days = new Date(month_1[0], month_1[1], 0).getDate()
          let arr=[]
          let val = month_1[1]<10?'0'+month_1[1]:month_1[1]
          for(let i=1;i<=days;i++){
            arr.push(i>=10?month_1[0]+'-'+val+'-'+i:month_1[0]+'-'+val+'-'+'0'+i)
          }
          this.newDate = arr
        }else{
          let arr=[]
          for(let i=1;i<=12;i++){
            arr.push(i>=10?this.query.year+'-'+i:this.query.year+'-'+'0'+i)
          }
          this.newDate = arr
        }
        let inventory =  this.$echarts.init(document.getElementById('inventory'));
        let inventoryOptions = {
          grid:{
            top:"10%",
            left:"3%",
            right:"4%",
            bottom:"3%",
            containLabel:true,
          },
          tooltip: {
            trigger: "item",
            // formatter: '{b0}({a0}): {c0}<br />{b1}({a1}): {c1}%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            // prettier-ignore
            data: this.newDate,
          },
          yAxis: {
            axisLabel: {
              formatter: '{value}%'
            },
          },
          legend: {
            // top: '1%',
            left: 'center'
          },
          series: [
            {
              name: '出库',
              type: 'bar',
              barWidth : '50%',
              data: storageOut,
              barWidth:12,
            },
            {
              name: '入库',
              type: 'bar',
              barWidth : '50%',
              data: storageIn,
              barWidth:12,
            }
          ]
        };
        inventory.setOption(inventoryOptions);
      }
    },
    async getRankingListOutRank(){
      const params={
        newTime:this.value4?moment(this.value4[1]).format('YYYY-MM-DD'):"",
        olderTime:this.value4?moment(this.value4[0]).format('YYYY-MM-DD'):"",
        state:1,
      }
      const res=await getRankingList(params)
      if(res.code==='0'){
        this.RankOut=res.data.date.map((v)=>v.total)
        const x= res.data.date.map((v)=>v.name)
        let outRank =  this.$echarts.init(document.getElementById('outRank'));
        let outRankOptions = {
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
            // type: 'category',
            // boundaryGap: true,
            data: x,
          },
          yAxis: {
          },
          series: [
            {
              type: 'bar',
              barWidth : '30%',
              // barCateGoryGap:'100%',
              data: this.RankOut
            },
          ]
        };
        outRank.setOption(outRankOptions);
      }
    },
    async getRankingListIn(){
      const params={
        newTime:this.value3?moment(this.value3[1]).format('YYYY-MM-DD'):"",
        olderTime:this.value3?moment(this.value3[0]).format('YYYY-MM-DD'):"",
        state:0,
      }
      const res=await getRankingList(params)
      if(res.code==='0'){
        this.RankIn=res.data.date.map((v)=>v.total)
        const x= res.data.date.map((v)=>v.name)
        let inRank =  this.$echarts.init(document.getElementById('inRank'));
        let inRankOptions = {
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
            data: x,
          },
          yAxis: {},
          series: [
            {
              type: 'bar',
              barWidth : '30%',
              data: this.RankIn
            },
          ]
        };
        inRank.setOption(inRankOptions);
      }
    },
    async getRankingList(){
      const params={
        newTime:this.value1?moment(this.value1[1]).format('YYYY-MM-DD'):"",
        olderTime:this.value1?moment(this.value1[0]).format('YYYY-MM-DD'):"",
        state:0,
      }
      const res = await getRankingList(params)
      if(res.code==='0'){
        this.InRank=res.data.date
      }
    },
    async getRankingListOut(){
      const params={
        newTime:this.value2?moment(this.value2[1]).format('YYYY-MM-DD'):"",
        olderTime:this.value2?moment(this.value2[0]).format('YYYY-MM-DD'):"",
        state:1,
      }
      const res = await getRankingList(params)
      if(res.code==='0'){
        this.outRank=res.data.date
      }
    },
    getInventory() {
      let chartDom = document.getElementById('inventory');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.newDate,
        },
        yAxis: {},
        series: [
          {
            // name: 'Desert',
            type: 'bar',
            barWidth : '50%',
            data: this.data,
          },
        ]
      }
      myChart.setOption(option);
    },
    getProducts() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          //   data: [
          //     "7:00",
          //     "8:00",
          //     "9:00",
          //     "10:00",
          //     "11:00",
          //     "12:00",
          //     "13:00",
          //     "14:00",
          //     "15:00",
          //     "16:00",
          //     "17:00",
          //     "18:00",
          //   ].map(function (str) {
          //     return str.replace(" ", "\n");
          //   }),
          data: ["设备箱", "设备箱", "设备箱", "设备箱", "设备箱"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 700, 624],
            type: 'bar',
            smooth: true,
          },
          //   {
          //     data: [720, 832, 801, 834, 1190, 1230, 1220, 720, 832, 801, 600, 524],
          //     type: "line",
          //     smooth: true,
          //   },
        ],
      };
      option && myChart.setOption(option);
    },
   
    renderSales() {
      let sales = this.$echarts.init(this.$refs["sales"]);
      let salesOptions = {
        legend: {
          data: ["销售额", "成本", "利润"],
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          data: this.salesInfo.chartsData.xData,
        },
        yAxis: {},
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "销售额",
            type: "bar",
            data: this.salesInfo.chartsData.salesData,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "成本",
            type: "bar",
            data: this.salesInfo.chartsData.costData,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "利润",
            type: "bar",
            data: this.salesInfo.chartsData.profitData,
          },
        ],
      };
      sales.setOption(salesOptions);
    },
    renderSalesPer(text, data) {
      let salesPerOptions = {
        title: {
          text: text,
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            data: data,
            radius: ["40%", "70%"],
          },
        ],
      };
      this.$echarts.init(this.$refs["salesPer"]).setOption(salesPerOptions);
    },
    dataFormat: function (date) {
      if (!date) return "xxxx-xx-xx xx:xx:xx";
      return formatDate(new Date(date));
    },
    formatAmount(amount) {
      return formatAmount(amount);
    },
  },
};
</script>

<style lang="scss" scoped>
.box{
  margin-top: 10px;
}
.clearfix {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.display {
  display: flex;
  .saleRank {
    div.li {
      display: flex;
      // justify-content: space-between;
      list-style: none;
      margin-top: 16px;
      // align-items: space-between;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
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
      background-color: #fafafa;
      border-radius: 20px;
    }
    // .client {
    //   flex: 1 1;
    // }
  }
}
.rank-top {
  color: #fff;
  background-color: #314659 !important;
}
::v-deep .el-table{
  .el-date-editor--daterange.el-input__inner{
    width: 15rem;
  }
}
</style>