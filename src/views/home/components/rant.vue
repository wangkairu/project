<template>
    <div class="rant">
        <el-card class="box-card" style="flex: 2;margin: 10px 0;margin-right: 20px;">
            <div slot="header" class="clearfix">
                <div class="clearfixLeft">
                <span>客户排行榜</span>
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
                    <el-radio-button label="day">日统计</el-radio-button>
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
                    value-format="yyyy-MM"
                    @change="monthChange"
                >
                </el-date-picker>
                <el-date-picker
                    v-show="query.dateType == 'day'"
                    v-model="query.day"
                    type="date"
                    placeholder="选择日"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    @change="dayChange"
                >
                </el-date-picker>
                </div>
            </div>
            <ul>
                <li v-for="(item, index) in cusRank" :key="index">
                <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                    index + 1
                }}</span>
                <span class="client">{{ item.name }}</span>
                <span class="profit">{{ item.count }}</span>
                </li>
            </ul>
        </el-card>
        <el-card class="box-card" style="flex: 2;margin: 10px 0;">
            <div slot="header" class="clearfix">
                <div class="clearfixLeft">
                <span>规格排行榜</span>
                </div>
                <div class="clearfix">
                <el-radio-group
                    v-model="specification.dateType"
                    size="mini"
                    style="margin-right: 10px"
                    @input="specificationChange"
                >
                    <el-radio-button label="year">年统计</el-radio-button>
                    <el-radio-button label="month">月统计</el-radio-button>
                    <el-radio-button label="day">日统计</el-radio-button>
                </el-radio-group>
                <el-date-picker
                    v-show="specification.dateType == 'year'"
                    v-model="specification.year"
                    type="year"
                    placeholder="选择年"
                    size="mini"
                    value-format="yyyy"
                    @change="specificationYearChange"
                >
                </el-date-picker>
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
                <el-date-picker
                    v-show="specification.dateType == 'day'"
                    v-model="specification.day"
                    type="date"
                    placeholder="选择日"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    @change="specificationDayChange"
                >
                </el-date-picker>
                </div>
            </div>
            <ul>
                <li v-for="(item, index) in specificationArr" :key="index">
                <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                    index + 1
                }}</span>
                <span class="client">{{ item.name }}</span>
                <span class="profit">{{ item.count }}</span>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
import {getLeaderBoardByCustomerWithDay,
    getLeaderBoardByCustomerWithMonth,
    getLeaderBoardByCustomerWithYear,
    getLeaderBoardByMesNormNameWithDay,
    getLeaderBoardByMesNormNameWithMonth,
    getLeaderBoardByMesNormNameWithYear} from '@/api/index'
export default {
    data(){
        return {
            query: {
                year: `${new Date().getFullYear()}`,
                month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                day:`${new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-')}`,
                dateType: "day",
            },
            specification: {
                year: `${new Date().getFullYear()}`,
                month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                day:`${new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-')}`,
                dateType: "day",
            },
            cusRank:[],
            specificationArr:[],
        }
    },
    mounted(){
        this.updateDateType()
        this.updateStare()
        // this.query.day=new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-');
        // this.specification.day=new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-')
    },
    methods:{
        async getLeaderBoardByCustomerWithDay()
        {
            let yesterday = this.query.day.split(' ')
            const params={
                ...this.query,
                month:this.query.month.split('-')[1],
                day:yesterday[0].split('-')[2],
            }
            const res = await getLeaderBoardByCustomerWithDay(params)
            if(res.code==='0')
            {
                this.cusRank=res.data
            }
        },
        async getLeaderBoardByCustomerWithMonth(){
            const params={
                ...this.query,
                month:this.query.month.split('-')[1],
            }
            const res= await getLeaderBoardByCustomerWithMonth(params)
            if(res.code==='0')
            {
                this.cusRank=res.data
            }
        },
        async getLeaderBoardByCustomerWithYear(){
            const params={
                ...this.query,
            }
            const res = await getLeaderBoardByCustomerWithYear(params)
            if(res.code==='0')
            {
                this.cusRank=res.data
            }
        },
        async getLeaderBoardByMesNormNameWithYear(){
            const params={
                ...this.specification,
            }
            const res = await getLeaderBoardByMesNormNameWithYear(params)
            if(res.code==='0')
            {
                this.specificationArr=res.data
            }
        },
        async getLeaderBoardByMesNormNameWithMonth(){
  
            const params={
                ...this.specification,
                month:this.specification.month.split('-')[1],
                // day:yesterday.split('-')[2],
            }
            const res = await getLeaderBoardByMesNormNameWithMonth(params)
            if(res.code==='0')
            {
                this.specificationArr=res.data
            }
        },
        async getLeaderBoardByMesNormNameWithDay(){
            let yesterday = this.specification.day.split(' ')
            const params={
                ...this.specification,
                month:this.specification.month.split('-')[1],
                day:yesterday[0].split('-')[2],
            }
            const res = await getLeaderBoardByMesNormNameWithDay(params)
            if(res.code==='0')
            {
                this.specificationArr=res.data
            }
        },
        specificationYearChange(){
            this.updateDateType()
        },
        specificationChange(){
            this.updateDateType()
        },
        specificationMonthChange(){
            this.updateDateType()
        },
        specificationDayChange(){
            this.updateDateType()
        },
        updateDateType(){
            switch (this.specification.dateType) {
                case "year":
                this.getLeaderBoardByMesNormNameWithYear();
                break;
                case "month":
                this.getLeaderBoardByMesNormNameWithMonth();
                break;
                case "day":
                this.getLeaderBoardByMesNormNameWithDay();
                break;
            }
        },
        updateStare(){
            switch (this.query.dateType) {
                case "year":
                this.getLeaderBoardByCustomerWithYear();
                break;
                case "month":
                this.getLeaderBoardByCustomerWithMonth();
                break;
                case "day":
                this.getLeaderBoardByCustomerWithDay();
                break;
            }
        },
        dateTypeChange(){
            this.updateStare()
        },
        yearChange() {
            this.updateStare()
        },
        monthChange() {
            this.updateStare()
        },
        dayChange(){
            this.updateStare()
        }
    }
}
</script>


<style lang="scss" scoped>
.clearfix {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.rant{
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