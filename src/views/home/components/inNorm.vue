<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-11 16:35:59
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-30 14:57:07
 * @FilePath: \wms-client\src\view\index\Sales.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <div class="inNorm">
            <el-card class="box-card" style="flex: 2;margin: 10px 0;">
                <div slot="header" class="clearfix">
                    <div class="clearfixLeft">
                        <span>成品出库半钢前十排名(月)</span>
                    </div>
                    <div class="clearfix">
                    <el-radio-group
                        v-model="specification.dateType"
                        size="mini"
                        style="margin-right: 10px"
                    >
                        <el-radio-button label="month">月统计</el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-show="specification.dateType == 'month'"
                        v-model="specification.month"
                        type="month"
                        placeholder="选择月"
                        size="mini"
                        value-format="yyyy-MM"
                        @change="specificationMonthChange"
                    >
                    </el-date-picker>
                    </div>
                </div>
                <ul v-if="halfStellOut.length>0">
                    <li v-for="(item, index) in halfStellOut[0].inOutMonthsTrendPOList" :key="index">
                    <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                        index + 1
                    }}</span>
                    <span class="client">{{ item.mesCustomerName }}</span>
                    <span class="profit">{{ item.count }}</span>
                    </li>
                </ul>
            </el-card>
            <el-card class="box-card" style="flex: 2;margin: 10px 0; margin-left: 10px;">
                <div slot="header" class="clearfix">
                    <div class="clearfixLeft">
                        <span>成品出库全钢前十排名(月)</span>
                    </div>
                    <div class="clearfix">
                    <el-radio-group
                        v-model="all.dateType"
                        size="mini"
                        style="margin-right: 10px"
                    >
                        <el-radio-button label="month">月统计</el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-show="all.dateType == 'month'"
                        v-model="all.month"
                        type="month"
                        placeholder="选择月"
                        size="mini"
                        value-format="yyyy-MM"
                        @change="allMonthChange"
                    >
                    </el-date-picker>
                    </div>
                </div>
                <ul v-if="allStellOut.length>0">
                    <li v-for="(item, index) in allStellOut[0].inOutMonthsTrendPOList" :key="index">
                    <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                        index + 1
                    }}</span>
                    <span class="client">{{ item.mesCustomerName }}</span>
                    <span class="profit">{{ item.count }}</span>
                    </li>
                </ul>
            </el-card>
        </div>
        <div class="inNorm">
            <el-card class="box-card" style="flex: 2;margin: 10px 0;">
                <div slot="header" class="clearfix">
                    <div class="clearfixLeft">
                        <span>成品入库半钢前十排名(月)</span>
                    </div>
                    <div class="clearfix">
                    <el-radio-group
                        v-model="halfIn.dateType"
                        size="mini"
                        style="margin-right: 10px"
                    >
                        <el-radio-button label="month">月统计</el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-show="halfIn.dateType == 'month'"
                        v-model="halfIn.month"
                        type="month"
                        placeholder="选择月"
                        size="mini"
                        value-format="yyyy-MM"
                        @change="halfInMonthChange"
                    >
                    </el-date-picker>
                    </div>
                </div>
                <ul v-if="halfStellIn.length>0">
                    <li v-for="(item, index) in halfStellIn[0].inOutMonthsTrendPOList" :key="index">
                    <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                        index + 1
                    }}</span>
                    <span class="client">{{ item.mesCustomerName }}</span>
                    <span class="profit">{{ item.count }}</span>
                    </li>
                </ul>
            </el-card>
            <el-card class="box-card" style="flex: 2;margin: 10px 0; margin-left: 10px;">
                <div slot="header" class="clearfix">
                    <div class="clearfixLeft">
                        <span>成品入库全钢前十排名(月)</span>
                    </div>
                    <div class="clearfix">
                    <el-radio-group
                        v-model="all.dateType"
                        size="mini"
                        style="margin-right: 10px"
                    >
                        <el-radio-button label="month">月统计</el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-show="all.dateType == 'month'"
                        v-model="all.month"
                        type="month"
                        placeholder="选择月"
                        size="mini"
                        value-format="yyyy-MM"
                        @change="allInMonthChange"
                    >
                    </el-date-picker>
                    </div>
                </div>
                <ul v-if="allStellIn.length>0">
                    <li v-for="(item, index) in allStellIn[0].inOutMonthsTrendPOList" :key="index">
                    <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                        index + 1
                    }}</span>
                    <span class="client">{{ item.mesCustomerName }}</span>
                    <span class="profit">{{ item.count }}</span>
                    </li>
                </ul>
            </el-card>
        </div>
    </div>
  </template>
  
  <script>
  import {outNorm,inNorm} from '@/api/index'
//   import * as echarts from "echarts";
//   import moment from 'moment'
  export default {
    data() {
      return {
        query: {
          year: `${new Date().getFullYear()}`,
          month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
          dateType: "month",
          mesBranchFactory:"",
        },
        specification: {
            year: `${new Date().getFullYear()}`,
            month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
            // day:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            state: 0,
            dateType:"month"
        },
        all:{
            year: `${new Date().getFullYear()}`,
            month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
            // day:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            state: 1,
            dateType:"month"
        },
        halfIn:{
            year: `${new Date().getFullYear()}`,
            month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
            // day:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            state: 0,
            dateType:"month"
        },
        allIn:{
            year: `${new Date().getFullYear()}`,
            month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
            // day:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            state: 1,
            dateType:"month"
        },
        specificationArr:[],
        halfStellOut:[],
        allStellOut:[],
        halfStellIn:[],
        allStellIn:[],
      };
    },

    mounted() {
        this.allSteel()
        this.halfStell()
        this.allInNorm()
        this.halfInNorm()
    },
    methods: {
      specificationMonthChange(){
        this.halfStell()
      },
      allMonthChange(){
        this.allSteel()
      },
      halfInMonthChange(){
        this.halfInNorm()
      },
      allInMonthChange(){
        this.allInNorm()
      },
      async allInNorm(){
        const params={
            ...this.allIn,
            month:this.allIn.month.split('-')[1]
        }
        const res = await inNorm(params)
        console.log(res,'res')
        if(res.code==='0'){
            this.allStellIn=res.data
        }
      },
      async halfInNorm(){
        const params={
            ...this.halfIn,
            month:this.halfIn.month.split('-')[1]
        }
        const res = await inNorm(params)
        if(res.code==='0'){
            this.halfStellIn=res.data
        }
      },
      async halfStell(){
        const params={
            ...this.specification,
            month:this.specification.month.split('-')[1]
        }
        const res = await outNorm(params);
        if(res.code==='0'){
            this.halfStellOut=res.data
        }
      },
      async allSteel(){
        const params={
            ...this.all,
            month:this.all.month.split('-')[1]
        }
        const res = await outNorm(params);
        if(res.code==='0'){
            this.allStellOut=res.data
        }
      }
    },
  
  };
  </script>
  
  <style lang="scss" scoped>
  .clearfix {
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
  }
    .inNorm{
        display: flex;
    }
    ul{
        li {
            display: flex;
            list-style: none;
            margin-top: 16px;
            align-items: center;
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
        .client {
            flex: 1 1;
        }
        .profit {
        }
    }
  </style>