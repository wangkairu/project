<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'145px'"
        size="mini"
        :maxShow="3"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="入库日期">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="time"
              type="date"
              placeholder="请选择入库日期"
              @change="handelTime"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="分厂">
          <el-select
            clearable
            v-model="form.deptCode"
            placeholder="请选择分厂"
            @change="handelDeptCode"
          >
            <el-option
              v-for="item in deptCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MES规格简称">
          <el-select
            multiple
            filterable
            v-model="form.mesNormsNameList"
            placeholder="请选择MES规格简称"
            @change="handelMesNormsNameList"
          >
            <el-option
              v-for="item in mesNormsNameListOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MES客户简称">
          <el-select
            multiple
            filterable
            v-model="form.mesCustomerShortNameList"
            @change="handelMesCustomerShortNameList"
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
        <el-form-item label="MES轮型">
          <el-select
            v-model="form.mesWheelType"
            @change="handelMesWheelType"
            placeholder="请选择MES客户简称"
          >
            <el-option
              v-for="item in mesWheelTypeOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MES托盘">
          <el-select
            v-model="form.mesTray"
            @change="handelMesTray"
            clearable
            placeholder="请选择MES托盘"
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
        <el-form-item label="MES米长">
          <el-select
            v-model="form.mesMeterLength"
            @change="handelMesMeterLength"
            placeholder="请选择MES米长"
          >
            <el-option
              v-for="item in mesMeterLengthOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MES轮数">
          <!-- <el-select
            v-model="mesNumOfRounds"
            placeholder="请选择MES轮数"
            @change="handelMesNumOfRounds"
          >
            <el-option
              v-for="item in mesNumOfRoundsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <el-input v-model="form.mesNumOfRounds" @change="handelMesNumOfRounds" size="mini" placeholder="请输入MES轮数"></el-input>
        </el-form-item>
        <el-form-item label="箱号">
          <el-input
            size="mini"
            v-model="form.mesBoxNo"
            placeholder="请输入箱号"
            @change="handelMesBoxNo"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES生产编号">
          <el-input
            size="mini"
            v-model="form.mesProductionNo"
            placeholder="请输入MES生产编号"
            @change="handelMesProductionNo"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES箱号二维码">
          <el-input
            size="mini"
            v-model="form.mesBoxNumberQrCode"
            placeholder="请输入箱号二维码"
            @change="handelMesBoxNumberQrCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES装箱开始时间">
          <div class="time">
            <el-date-picker
              size="mini"
              value-format="timestamp"
              v-model="form.mesPackingTimeStart"
              type="datetime"
              placeholder="开始时间"
              @change="handelMesPackingTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES装箱结束时间">
          <div class="time">
            <el-date-picker
              size="mini"
              value-format="timestamp"
              v-model="form.mesPackingTimeEnd"
              type="datetime"
              placeholder="结束时间"
              @change="handelMesPackingTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES入库开始时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesWarehousingTimeStart"
              type="datetime"
              placeholder="开始时间"
              value-format="timestamp"
              @change="handelMesWarehousingTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES入库结束时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesWarehousingTimeEnd"
              type="datetime"
              placeholder="结束时间"
              value-format="timestamp"
              @change="handelMesWarehousingTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES有无焊点">
          <el-radio-group
            size="mini"
            v-model="form.mesIsSolderJoint"
            @change="handelMesIsSolderJoint"
          >
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="MES左右面">
          <el-radio-group
            size="mini"
            v-model="form.mesLeftRightSides"
            @change="handelMesLeftRightSides"
          >
            <el-radio :label="0">左</el-radio>
            <el-radio :label="1">右</el-radio>
          </el-radio-group>
        </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <div>
        <el-button type="primary" @click="hadelExcel" size="mini"
          >导出Excel</el-button
          >
      </div>
      <el-table
        ref="table"
        style="margin-top: 6px;"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="data"
      >
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column fixed prop="deptName" label="分厂" width="70">
        </el-table-column>
        <el-table-column
          fixed
          prop="mesNormsName"
          label="MES规格名称"
          width="100"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesCustomerShortName"
          label="MES客户简称"
          width="150"
        >
        </el-table-column>
        <el-table-column fixed prop="mesBoxNo" label="MES箱号">
        </el-table-column>
        <el-table-column prop="mesIsSolderJoint" label="MES有无焊点">
          <template slot-scope="scope">
            <span>{{ scope.row.mesIsSolderJoint === 0 ? "无" : "有" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesLeftRightSides" label="MES左右面" width="58">
          <template slot-scope="scope">
            <span>{{ scope.row.mesLeftRightSides === 0 ? "左" : "右" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="mesTray" label="MES托盘"> </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <el-table-column prop="mesNumOfRounds" label="MES轮数">
        </el-table-column>
        <el-table-column prop="mesGrossWeight" label="MES毛重">
        </el-table-column>
        <el-table-column prop="mesTotalTareWeight" label="MES总皮重">
        </el-table-column>
        <el-table-column prop="mesNetWeight" label="MES净重"> </el-table-column>
        <el-table-column
          prop="mesSpecialRequirements"
          label="MES特殊要求"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="mesPackingTime" label="装箱时间" width="160">
        </el-table-column>
        <el-table-column
          prop="mesWarehousingTime"
          label="WMS入库时间"
          width="160"
        >
        </el-table-column>
        <el-table-column prop="packagingWarehousingTimeDiff" label="包装入库时差" width="160">
        </el-table-column>
        <el-table-column prop="mesProductionNo" label="生产编号" width="210">
        </el-table-column>
        <el-table-column
          prop="mesBoxNumberQrCode"
          label="箱号二维码"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="200"
        >
        </el-table-column>
      </el-table>
      <div class="total">
        <ul>
          <li class="total">
            合计
            <span class="totalItem">左：{{ obj.leftSideCount }}</span>
            <span class="totalItem">右：{{ obj.rightSideCount }}</span>
            <span class="totalItem">毛重：{{ obj.grossWeightSum }}kg</span>
            <span class="totalItem"
              >总皮重：{{ obj.totalTareWeightSum }}kg</span
            >
            <span class="totalItem">净重：{{ obj.netWeightSum }}kg</span>
            <span class="totalItem">箱数：{{ obj.boxSum }}</span>
          </li>
        </ul>
      </div>
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
    <div >
      <!-- <el-card
        shadow="never"
        class="box-card"
        style="width: 32.5%; margin: 10px 0; margin-right: 20px"
      >
        <div slot="header" class="clearfix">
          <span>成品入库规格排名</span>
        </div>
        <div
          v-if="rightSide.length > 0 && leftSide.length > 0"
          id="inventory"
          style="height: 200px; width: 100%"
        ></div>
        <el-empty v-else description="暂无数据"></el-empty>
      </el-card>
      <el-card
        shadow="never"
        class="box-card"
        style="width: 32%; margin: 10px 0; margin-right: 20px"
      >
        <div slot="header" class="clearfix">
          <span>成品入库净重合计(日)</span>
        </div>
        <div
          v-if="NetWeight && NetWeight.length > 0"
          id="netWeight"
          style="height: 200px; width: 100%"
        ></div>
        <el-empty v-else description="暂无数据"></el-empty>
      </el-card>
      <el-card
        shadow="never"
        class="box-card"
        style="width: 32.5%; margin: 10px 0;"
      >
        <div slot="header" class="clearfix">
          <span>成品入库净重合计(月)</span>
        </div>
        <div
          v-if="netWeightMonth && netWeightMonth.length > 0"
          id="netWeightMonth"
          style="height: 200px; width: 100%"
        ></div>
        <el-empty v-else description="暂无数据"></el-empty>
      </el-card> -->
      <el-card
        shadow="never"
        class="box-card"
        style="width: 100%; margin: 10px 0;"
      >
        <div slot="header" class="clearfix" style="display: flex;justify-content: space-between;">
          <span>成品入库净重合计</span>
          <div class="clearfix time">
            <el-radio-group
              v-model="query.dateType"
              size="mini"
              style="margin-right: 10px"
              @input="dateTypeChange"
            >
              <!-- <el-radio-button label="year">年净重合计</el-radio-button> -->
              <el-radio-button label="month">月净重合计</el-radio-button>
              <el-radio-button label="day">日净重合计</el-radio-button>
            </el-radio-group>
            <!-- <el-date-picker
              v-show="query.dateType == 'year'"
              v-model="query.date"
              type="year"
              placeholder="选择年"
              size="mini"
              value-format="yyyy"
              @change="yearChange"
            >
            </el-date-picker> -->
            <el-date-picker
              v-show="query.dateType == 'month'"
              v-model="query.date"
              type="year"
              placeholder="选择月"
              size="mini"
              value-format="yyyy"
              @change="monthChange"
            >
            </el-date-picker>
            <el-date-picker
              v-show="query.dateType == 'day'"
              v-model="query.date"
              type="month"
              placeholder="选择日"
              size="mini"
              value-format="yyyy-MM"
              @change="dayChange"
            >
            </el-date-picker>
          </div>
        </div>
        <div
          v-if="NetWeight && NetWeight.length > 0"
          id="NetWeight"
          style="height: 300px; width: 100%"
        ></div>
        <el-empty v-else description="暂无数据"></el-empty>
      </el-card>
    </div>
    <div class="echarts">
      <el-card
        shadow="never"
        class="box-card"
        style="width: 100%; margin: 10px 0;margin-right: 10px;"
      >
        <div slot="header" class="clearfix" style="display: flex;justify-content: space-between;">
          <span>成品入库规格前十排名</span>
          <div class="clearfix time">
            <el-radio-group
              v-model="sort.dateType"
              size="mini"
              style="margin-right: 10px"
              @input="dateTypeChangeSort"
            >
              <!-- <el-radio-button label="year">年净重合计</el-radio-button> -->
              <el-radio-button label="month">月累计</el-radio-button>
              <el-radio-button label="day">日累计</el-radio-button>
            </el-radio-group>
            <!-- <el-date-picker
              v-show="sort.dateType == 'year'"
              v-model="sort.date"
              type="year"
              placeholder="选择年"
              size="mini"
              value-format="yyyy"
              @change="yearChange"
            >
            </el-date-picker> -->
            <el-date-picker
              v-show="sort.dateType == 'month'"
              v-model="sort.date"
              type="month"
              placeholder="选择月"
              size="mini"
              value-format="yyyy-MM"
              @change="monthSortChange"
            >
            </el-date-picker>
            <el-date-picker
              v-show="sort.dateType == 'day'"
              v-model="sort.date"
              type="date"
              placeholder="选择日"
              size="mini"
              value-format="yyyy-MM-dd"
              @change="daySortChange"
            >
            </el-date-picker>
          </div>
        </div>
        <div
          v-if="inventory&&inventory.length>0"
          id="inventory"
          style="height: 300px; width: 100%"
        ></div>
        <el-empty v-else style="height: 300px; width: 100%" description="暂无数据"></el-empty>
      </el-card>
    <el-card shadow="never" class="box-card" style="width: 35%; margin: 10px 0">
        <div slot="header" class="clearfix" style="height: 28px;">
          <span>成品入库客户排名</span>
        </div>
        <div class="saleRank">
          <div v-show="customer && customer.length > 0">
            <div class="row" v-for="(item, index) in customer" :key="index">
              <div class="sort">
                <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                  index + 1
                }}</span>
                <el-tooltip
                  class="item"
                  :content="item.mesCustomerName"
                  placement="top"
                  effect="light"
                >
                  <span class="client">{{ item.mesCustomerName }}</span>
                </el-tooltip>
              </div>
              <span class="profit">{{ item.total }}</span>
            </div>
          </div>
          <el-empty
            v-show="customer && customer.length == 0"
            description="暂无数据"
          ></el-empty>
        </div>
    </el-card>
    </div>
  </div>
</template>

<script>
import {uploadExcel} from '@/utils/uploadExcel'
import * as echarts from "echarts";
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import { 
  queryList, 
  getDayAmount, 
  getRankBar, 
  getCustomerRank, 
  getNetWeight, 
  getFilterConditions,
  getNetWeightBYMonth,
  getNormsRankBarByMonth,
  exportDetail,
  getNormsRankBarByYear} from "@/api/storeIn";
import { timeFormate } from '@/utils/timeFormate'
import moment from "moment";
export default {
  name: "storageIn",
  components: {
    PageNation,
    SearchFilter
  },
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      obj: {},
      form: {},
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      data: [],
      day: '',
      deptCodeOptions: [],
      mesBoxNoOptions: [],
      mesCustomerShortNameListOptions: [],
      mesWheelTypeOptions: [],
      mesTrayOptions: [],
      mesMeterLengthOptions: [],
      // mesNormsNameListOptions: [],
      mesNumOfRoundsOptions: [],
      deptCode: "",
      mesBoxNo: "",
      mesBoxNumberQrCode: "",
      mesCustomerShortNameList: [],
      mesIsSolderJoint: "",
      mesLeftRightSides: "",
      mesMeterLength:'',
      mesNormsNameList: [],
      mesNumOfRounds: "",
      mesPackingTimeEnd: "",
      mesPackingTimeStart: "",
      mesProductionNo: "",
      mesTray: "",
      mesWarehousingTimeEnd: "",
      mesWarehousingTimeStart: "",
      mesWheelType: "",
      month: '',
      year: '',
      time: new Date((new Date().getTime() - 24 * 60 * 60 * 1000)),
      specification: [],
      leftSide: [],
      rightSide: [],
      customer: [],
      NetWeight: [],
      day: [],
      myChart: null,
      netWeightCon: null,
      inventory:[],
      chart:null,
      query:{
        dateType:"day",
        date:`${new Date().getFullYear()}-${new Date().getMonth() + 1}`
      },
      sort:{
        dateType:"day",
        date:new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-')
      },
      // mesWheelTypeOptions:[],
      mesCustomerOptions:[],
      mesNormsNameListOptions:[],
      mesTrayOptions:[],
      // mesMeterLength:[],
    }
  },
  mounted() {
    this.queryList()
    this.getDayAmount()
    // this.getRankBar()
    this.getCustomerRank()
    // this.getNetWeight()
    this.getFilterConditions()
    this.dateTypeChange()
    this.dateTypeChangeSort()
    window.addEventListener('onResize', this.resizeHandel)
    this.$store.dispatch('realList').then(()=>{
      this.mesWheelTypeOptions=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
      this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
      this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
      this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
      this.mesMeterLengthOptions=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
    })
  },
  methods: {
    async hadelExcel(){
      const time = timeFormate(this.time)
      const params={
        type:0,
        day:time.date,
        month:time.month,
        year:time.year,
      }
      const res = await exportDetail(params)
      const blob = new Blob([res], { type: "application/vnd.ms-excel" });
      const fileName = "成品入库（日）明细表.xlsx";
      uploadExcel(fileName, blob);
    },
    dateTypeChangeSort(){
      switch(this.sort.dateType){
        // case 'year':
        //   this.sort.date=`${new Date().getFullYear()}`
        //   this.yearChange()
        //   break;
        case 'month':
          this.sort.date = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
          this.monthSortChange()
          break;
        case 'day':
          this.sort.date=new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-')
          this.daySortChange()
          break;
      }
    },
    async monthSortChange(){
      const params={
      type:+this.type,
      year:this.sort.date.split('-')[0],
      month:this.sort.date.split('-')[1],
     }
      const res = await getNormsRankBarByMonth(params)
      let arr = []
      if (res.code === '0') {
        this.inventory = res.data
        if (res.data.length > 0) {
          res.data.forEach(v => {
            arr.push(v.mesNormsName)
            v.mesLeftRightSides === 'L' ? this.leftSide.push(v) : this.rightSide.push(v)
          })
          arr = Array.from(new Set(arr))
          this.$nextTick(() => {
            let chartDom = document.getElementById('inventory');
            this.myChart = echarts.init(chartDom);
            let option;
            option = {
              grid: {
                top: 40, // 位置 百分比也可以纯数字也可以
                bottom: 30,
                left: '8%',
                right: '6%',
                containLabel: false, // gird 区域是否包含坐标轴的刻度标签
              },
              legend: {
                data: ['左面', '右面']
              },
              calculable: true,
              xAxis: { data: arr },
              yAxis: {},
              series: [
                {
                  name: "左面",
                  type: 'bar',
                  data: this.leftSide,
                  barWidth: '20%',
                },
                {
                  name: "右面",
                  type: 'bar',
                  data: this.rightSide,
                  barWidth: '20%',
                },
              ],
              tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                // formatter: function (params) {
                //   console.log(params, 'params')
                //   // return params[0].name + "<br/>" + '数量：' + params[0].data.value + "<br/>" +
                //   //   '左右面：' + params[0].data.mesLeftRightSides + '<br>米长：' + params[0].data.mesMeterLength + '<br>轮型' + params[0].data.mesWheelType + '<br>规格代码：' + params[0].data.mesNormsNo;
                // }
              }
            }
            option && this.myChart.setOption(option);
          })
        } else {
          this.leftSide = [];
          this.rightSide = []
        }
      } else {
        this.leftSide = []
        this.rightSide = []
      }
    },
    async daySortChange(){
    let date=moment(new Date((new Date().getTime() - 24 * 60 * 60 * 1000))).format('YYYY-MM-DD');
     const params={
      type:+this.type,
      year:date.split('-')[0],
      month:date.split('-')[1],
      date:date.split('-')[2],
     }
      const res = await getRankBar(params)
      let arr = []
      if (res.code === '0') {
        this.inventory = res.data
        if (res.data.length > 0) {
          res.data.forEach(v => {
            arr.push(v.mesNormsName)
            v.mesLeftRightSides === 'L' ? this.leftSide.push(v) : this.rightSide.push(v)
          })
          arr = Array.from(new Set(arr))
          this.$nextTick(() => {
            let chartDom = document.getElementById('inventory');
            this.myChart = echarts.init(chartDom);
            let option;
            option = {
              grid: {
                top: 40, // 位置 百分比也可以纯数字也可以
                bottom: 30,
                left: '8%',
                right: '6%',
                containLabel: false, // gird 区域是否包含坐标轴的刻度标签
              },
              legend: {
                data: ['左面', '右面']
              },
              calculable: true,
              xAxis: { data: arr },
              yAxis: {},
              series: [
                {
                  name: "左面",
                  type: 'bar',
                  data: this.leftSide,
                  barWidth: '20%',
                },
                {
                  name: "右面",
                  type: 'bar',
                  data: this.rightSide,
                  barWidth: '20%',
                },
              ],
              tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                // formatter: function (params) {
                //   console.log(params, 'params')
                //   // return params[0].name + "<br/>" + '数量：' + params[0].data.value + "<br/>" +
                //   //   '左右面：' + params[0].data.mesLeftRightSides + '<br>米长：' + params[0].data.mesMeterLength + '<br>轮型' + params[0].data.mesWheelType + '<br>规格代码：' + params[0].data.mesNormsNo;
                // }
              }
            }
            option && this.myChart.setOption(option);
          })
        } else {
          this.leftSide = [];
          this.rightSide = []
        }
      } else {
        this.leftSide = []
        this.rightSide = []
      }
    },
    dateTypeChange(){
      switch(this.query.dateType){
        // case 'year':
        //   this.query.date=`${new Date().getFullYear()}`
        //   this.yearChange()
        //   break;
        case 'month':
          this.query.date = `${new Date().getFullYear()}`
          this.monthChange()
          break;
        case 'day':
          this.query.date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
          this.dayChange()
          break;
      }
    },
    // async yearChange(){
    //   const obj={
    //     year:this.query.date,
    //     type:+this.type,
    //   }
    //   const res= await getNormsRankBarByYear(obj)
    //   this.NetWeight = res.data.map((v=>{return [v.netWeightSum,v.year]}))
    //   if(res.code==='0'){
    //     this.$nextTick(()=>{
    //       let chartDom = document.getElementById('NetWeight');
    //         const netWeightCon = echarts.init(chartDom);
    //         let option = {
    //           grid: {
    //             top:"10%",
    //             left:"3%",
    //             right:"4%",
    //             bottom:"3%",
    //             containLabel: true,
    //           },
    //           legend: {
    //             itemHeight: 10,
    //           },
    //           calculable: true,
    //           xAxis: {
    //             data:[
    //               this.query.date.split("-")[0]+'-'+1,
    //               this.query.date.split("-")[0]+'-'+2,
    //               this.query.date.split("-")[0]+'-'+3,
    //               this.query.date.split("-")[0]+'-'+4,
    //               this.query.date.split("-")[0]+'-'+5,
    //               this.query.date.split("-")[0]+'-'+6,
    //               this.query.date.split("-")[0]+'-'+7,
    //               this.query.date.split("-")[0]+'-'+8,
    //               this.query.date.split("-")[0]+'-'+9,
    //               this.query.date.split("-")[0]+'-'+10,
    //               this.query.date.split("-")[0]+'-'+11,
    //               this.query.date.split("-")[0]+'-'+12
    //             ],
    //           },
    //           yAxis: {},
    //           series: [
    //             {
    //               type: 'line',
    //               data: this.NetWeight,
    //             },
    //           ],
    //           tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
    //             trigger: 'axis',
    //             axisPointer: {
    //               type: 'shadow'
    //             },
    //             formatter: function (params) {
    //               return params[0].data[2].year + '/'  + params[0].name + "<br/>" + '数量：' + params[0].data[2].netWeightSum
    //             }
    //           }
    //         }
    //         option && netWeightCon.setOption(option);
    //     })
    //   }
    // },
    async dayChange() {
      this.getDay()
      const params={type:+this.type,year:this.query.date.split("-")[0],month:this.query.date.split("-")[1]}
      const res = await getNetWeight(params)
      if (res.code == '0') {
        if (res.data.length > 0) {
          this.NetWeight = res.data.map(v => {
            return [v.day, v.netWeightSum, { ...v }]
          })
          this.$nextTick(() => {
            let chartDom = document.getElementById('NetWeight');
            this.netWeightCon = echarts.init(chartDom);
            let option = {
              grid: {
                top:"10%",
                left:"3%",
                right:"4%",
                bottom:"3%",
                containLabel: true,
              },
              legend: {
                itemHeight: 10,
              },
              calculable: true,
              xAxis: {
                data: this.day,
              },
              yAxis: {},
              series: [
                {
                  type: 'line',
                  data: this.NetWeight,
                },
              ],
              tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                formatter: function (params) {
                  return  params[0].axisValue + "<br/>"+ '净重合计：' + params[0].data[2].netWeightSum
                }
              }
            }
            option && this.netWeightCon.setOption(option);
          })
        } else {
          this.NetWeight = []
        }
      } else {
        this.NetWeight = []
      }
    },
    async monthChange(){
      const params={type:+this.type,year:this.query.date.split("-")[0]}
      const res = await getNetWeightBYMonth(params)
      if (res.code == '0') {
        if (res.data.length > 0) {
          this.NetWeight = res.data.map(v => {
            return [this.query.date.split("-")[0]+'-'+v.month.toString(), v.netWeightSum, { ...v }]
          })
          this.$nextTick(() => {
            let chartDom1 = document.getElementById('NetWeight');
            this.chart = echarts.init(chartDom1);
            let option = {
              grid: {
                top:"10%",
                left:"3%",
                right:"4%",
                bottom:"3%",
                containLabel:true,
              },
              legend: {
                itemHeight: 10,
              },
              calculable: true,
              xAxis: {
                data: [
                  this.query.date.split("-")[0]+'-'+1,
                  this.query.date.split("-")[0]+'-'+2,
                  this.query.date.split("-")[0]+'-'+3,
                  this.query.date.split("-")[0]+'-'+4,
                  this.query.date.split("-")[0]+'-'+5,
                  this.query.date.split("-")[0]+'-'+6,
                  this.query.date.split("-")[0]+'-'+7,
                  this.query.date.split("-")[0]+'-'+8,
                  this.query.date.split("-")[0]+'-'+9,
                  this.query.date.split("-")[0]+'-'+10,
                  this.query.date.split("-")[0]+'-'+11,
                  this.query.date.split("-")[0]+'-'+12
                ],
              },
              yAxis: {},
              series: [
                {
                  type: 'line',
                  data: this.NetWeight,
                },
              ],
              tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                formatter: function (params) {
                  return params[0].data[0] + "<br/>"+'净重合计：' + params[0].data[2].netWeightSum
                }
              }
            }
            option && this.chart.setOption(option);
          })
        } else {
          this.netWeightMonth = []
        }
      } else {
        this.netWeightMonth = []
      }
    },
    getDay() {
      const t_date = new Date(this.query.date.split('-')[0], this.query.date.split('-')[1], 0);
      const day = t_date.getDate()
      this.day = []
      for (let i = 1; i <= day; i++) {
        this.day.push(this.query.date.split('-')[0]+'-'+this.query.date.split('-')[1]+'-'+i)
      }
    },
    resizeHandel() {
      this.myChart.resize()
      this.netWeightCon.resize()
      this.chart.resize()
    },
    search() { this.queryList(); },
    reset() {
      this.day = '';
      this.form={}
      this.month = '';
      this.year = ''
      this.queryList();
    },
   
    async getCustomerRank() {
      const params = timeFormate(this.time)
      params.type = +this.type
      const res = await getCustomerRank(params)
      if (res.code === '0') {
        this.customer = res.data
      }
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryList();
    },
    async queryList() {
      const time = timeFormate(this.time)
      const params = {
        ...this.form,
        day: time.date,
        month: time.month,
        year: time.year,
        type: +this.type,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryList(params)
      if (res.code === '0') {
        this.data = res.data.items.map(v => {
          return {
            ...v,
            difference: v.mesWarehousingTime - v.mesPackingTime
          }
        })
        this.total = res.data.total;
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    async getDayAmount() {
      const params = timeFormate(this.time)
      params.type = +this.type
      const res = await getDayAmount(params)
      this.obj = res.data
    },
    // 日合计
    handelCustomerSimpleCode(val) {
      this.form.customerSimpleCode = val
      this.queryList();
    },
    handelTime() {
      this.queryList()
      this.getDayAmount()
      // this.getRankBar()
      this.getCustomerRank()
      // this.getNetWeight()
      // this.getDay()
      this.getFilterConditions()
      // this.getNetWeightBYMonth()
    },
    async handelDate(params) {
      const res = await getFilterConditions(params)
      if (res.code === '0') {
        this.queryList();
        return res.data
      }
    },
    // 分厂 选项 
    async getFilterConditions() {
      const time = timeFormate(this.time)
      const params = {
        day: time.date,
        month: time.month,
        year: time.year,
        type: +this.type,
      }
      this.deptCodeOptions = await this.handelDate(params)
    },
    // 规格简称选项
    async handelDeptCode(val) {
      const time = timeFormate(this.time)
      this.form.deptCode = val
      const params = {
        day: time.date,
        month: time.month,
        year: time.year,
        type: +this.type,
        deptCode: this.deptCode,
      }
      this.mesNormsNameListOptions = await this.handelDate(params)
    },
    // 客户简称选项
    async handelMesNormsNameList(val) {
      this.form.mesNormsNameList = val
      const time = timeFormate(this.time)
      const params = {
        day: time.date,
        month: time.month,
        year: time.year,
        type: +this.type,
        deptCode: this.deptCode,
        mesNormsNameList: this.mesNormsNameList
      }
      this.mesCustomerShortNameListOptions = await this.handelDate(params)
    },
    // 轮型选项
    async handelMesCustomerShortNameList(val) {
      this.queryList()
    },
    // 托盘选项
    async handelMesWheelType(val) {
      this.queryList()
    },
    // 米长选项 
    async handelMesTray(val) {
      this.queryList()
    },
    // 轮数选项
    async handelMesMeterLength(val) {
      this.form.mesMeterLength = val
      const time = timeFormate(this.time)
      const params = {
        day: time.date,
        month: time.month,
        year: time.year,
        type: +this.type,
        deptCode: this.deptCode,
        mesNormsNameList: this.mesNormsNameList,
        mesCustomerShortNameList: this.mesCustomerShortNameList,
        mesWheelType: this.mesWheelType,
        mesTray: this.mesTray,
        mesMeterLength: this.mesMeterLength
      }
      this.mesNumOfRoundsOptions = await this.handelDate(params)
    },
    async handelMesNumOfRounds(val) {
      this.mesNumOfRounds = val
      const time = timeFormate(this.time)
      const params = {
        day: time.date,
        month: time.month,
        year: time.year,
        type: +this.type,
        deptCode: this.deptCode,
        mesNormsNameList: this.mesNormsNameList,
        mesCustomerShortNameList: this.mesCustomerShortNameList,
        mesWheelType: this.mesWheelType,
        mesTray: this.mesTray,
        mesMeterLength: this.mesMeterLength,
        mesNumOfRounds: this.mesNumOfRounds
      }
      const res = await this.handelDate(params)
    },
    // 有无焊点
    handelMesIsSolderJoint(val) {
      this.form.mesIsSolderJoint = val === "无" ? 0 : 1;
      this.queryList()
    },
    // 左右面
    handelMesLeftRightSides(val) {
      this.form.mesLeftRightSides = val === "左" ? 0 : 1;
      this.queryList()
    },
    handelMesPackingTimeStart(val) {
      this.form.mesPackingTimeStart = moment(val).valueOf();
      this.queryList();
    },
    handelMesPackingTimeEnd(val) {
      this.form.mesPackingTimeEnd = moment(val).valueOf();
      this.queryList();
    },
    handelMesWarehousingTimeStart(val) {
      this.form.mesWarehousingTimeStart = moment(val).valueOf();
      this.queryList();
    },
    handelMesWarehousingTimeEnd(val) {
      this.form.mesWarehousingTimeEnd = moment(val).valueOf();
      this.queryList();
    },
    handelMesBoxNo(val) {
      this.form.mesBoxNo = val
      this.queryList();
    },
    handelMesProductionNo(val) {
      this.form.mesProductionNo = val
      this.queryList();
    },
    handelMesBoxNumberQrCode(val) {
      this.form.mesBoxNumberQrCode = val
      this.queryList();
    },
  },
}
</script>

<style scoped lang="scss">
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
    bottom: 17px !important;
  }
  .el-table__fixed::before {
    height: 0px;
  } 
  .el-table__cell{
    padding: 0.25rem 0;
  }
}
::v-deep .el-tabs .el-tabs__item{
  padding: 0 0.25rem;
  // height:1.6rem;
  // line-height:1.6rem;
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


