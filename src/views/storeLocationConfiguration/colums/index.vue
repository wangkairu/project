<template>
   <div>
    <div class="table">
      <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      :summary-method="getSummaries"
      show-summary
      height="600"
      ref="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序列"
        width="80"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="warehouseName"
        label="库列名称"
        width="280">
      </el-table-column> -->
      <el-table-column
        label="规格名称"
        prop="specificationAbbreviation">
      </el-table-column>
      <el-table-column
        label="客户简称"
        prop="customerAbbreviation">
      </el-table-column>
      <el-table-column
        label="轮型"
        prop="wheels">
      </el-table-column>
      <el-table-column
        label="米长"
        prop="meters">
      </el-table-column>
      <el-table-column
        prop="wareIsEnableHouse"
        label="库位数">
      </el-table-column>
      <el-table-column
        prop="wareIsUseHouse"
        label="库存箱数">
      </el-table-column>
      <el-table-column
        prop="isUseRatio"
        label="库位利用率">
      </el-table-column>
      </el-table>
    </div>
    <div class="box">
      <el-card
        class="box-card"
        style="flex: 1; margin: 10px 0;"
      >
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>库列（日）闲置率</span>
          </div>
        </div>
        <div id="total"  style="height: 300px"></div>
      </el-card>
      <el-card
        class="box-card"
        style="flex: 2; margin: 10px 0;margin-left: 10px;"
      >
        <div slot="header" class="clearfix">
          <div class="clearfixLeft">
            <span>库位（日）闲置率</span>
          </div>
        </div>
        <div id="dayTotal"  style="height: 300px"></div>
      </el-card>
    </div>  
   </div>
</template>

<script>
import * as echarts from 'echarts';
import {getWarehouseCount} from '@/api/location'
export default{
    data(){
        return {
            tableData:[],
            total:"",
            arr:[],
            dayTotal:[],
        }
    },
    mounted(){
        this.getWarehouseCount()
    },
    updated() {
      this.$nextTick(()=>{
        this.$refs.tableData.doLayout();
      })
    },
    methods:{
        async getWarehouseCount(){
          const res= await getWarehouseCount()
          if(res.code === '0')
          {
            this.total=res.data[1]['总空闲率']
            this.tableData=res.data[0]
            this.dayTotal = res.data[0].map((v)=>{
              return {
                name:v.customerAbbreviation,
                value:v.isUseRatio.slice(0, v.isUseRatio.length - 1)
              }
            })
            const newArr=[]
            for(let key in res.data[1]){
              newArr.push(
              {value:res.data[1][key].slice(0, res.data[1][key].length - 1),name:'空闲率'},
              {value:100 - res.data[1][key].slice(0, res.data[1][key].length - 1),name:'占用率'})
            }
            this.arr=newArr
            this.getInit()
            this.getDayTotal()
          }
        },
        getSummaries(param){
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }
            if (index === 1) {
              sums[index] = this.total;
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            // !values.every(value => isNaN(value))
            if (index===5||index===6) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' ';
            }else if(index===7)
            {
              const total = sums[6]/sums[5]*100
              sums[index] = total.toFixed(2)+'%';
            } else {
              sums[index] = ' ';
            }
          });
          return sums
        },
        getInit(){
          const chartDom = document.getElementById('total');
          const myChart = echarts.init(chartDom);
          const option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: this.arr,
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
        },
        getDayTotal(){
          const chartDom = document.getElementById('dayTotal');
          const myChart = echarts.init(chartDom);
          const option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                center:['60%','50%'],
                data: this.dayTotal,
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
    }
}
</script>

<style scoped lang="scss">
  .table {
    padding: 6px 6px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
  }
  .box{
    display: flex;
  }
  ::v-deep .el-table {   overflow: visible !important; }
</style>