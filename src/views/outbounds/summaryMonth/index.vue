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
          <el-form-item label="出库日期">
            <div class="time">
              <el-date-picker
                size="mini"
                v-model="query.time"
                type="month"
                placeholder="请选择出库日期"
                format="yyyy-MM"
                value-format="yyyy-MM"
                @change="handelTime"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="MES规格简称">
            <el-select
              filterable
              multiple
              clearable
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
              filterable
              clearable
              multiple
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
        <div>
          <el-button type="primary" @click="hadelExcel" size="mini"
          >导出Excel</el-button
          >
        </div>
        <el-table
          ref="table"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          :data="data"
          :summary-method="getSummaries"
          style="margin-top: 10px;"
          show-summary
        >
          <el-table-column fixed type="index" label="#"> </el-table-column>
          <!-- <el-table-column fixed prop="deptName" label="分厂" width="70"> -->
          <!-- </el-table-column> -->
          <el-table-column
            fixed
            prop="mesNormsName"
            label="MES规格名称"
          >
          </el-table-column>
          <el-table-column
            fixed
            prop="mesCustomerName"
            label="MES客户简称"
            width="320"
          >
          </el-table-column>
          <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
          <el-table-column prop="mesTray" label="MES托盘" > </el-table-column>
          <el-table-column prop="mesMeterLength" label="MES米长">
          </el-table-column>
          <el-table-column prop="mesNetWeight" label="出库净重">
          </el-table-column>
          <el-table-column prop="ringRatio" label="出库净重环比" >
          </el-table-column>
          <el-table-column prop="mesReWeight" label="退货净重">
          </el-table-column>
          <!-- <el-table-column
            prop="mesSpecialRequirements"
            label="MES特殊要求"
            show-overflow-tooltip
          >
          </el-table-column> -->

        </el-table>
      </div>
      <div class="pagenation">
        <PageNation
            :total="total"
            :page.sync="listQuery.pageNum"
            :limit.sync="listQuery.pageSize"
            @pagination="pageChange"
        />
      </div>
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import { uploadExcel } from "@/utils/uploadExcel";
import {OutDetailWithMonth,getCustomerAndSpecification,OutDetailWithMonthExport} from '@/api/storeOut'
import moment from 'moment'
export default {
    name:"summaryMonth",
    components:{
      SearchFilter,
      PageNation
    },
    data(){
        return {
            query:{
                time:`${new Date().getFullYear()}-${new Date().getMonth()+1}`,
                mesCustomer:[],
                mesNormName:[],
                meterLength:"",
                wheelsType:"",
            },
            listQuery:{
              pageNum:1,
              pageSize:10,
            },
            total:0,
            data:[],
            mesNormsNameListOptions:[],
            mesCustomerOptions:[],
            mesWheelType:[],
            mesTrayOptions:[],
            mesMeterLength:[],
        }
    },
    mounted(){
        this.OutDetailWithMonth()
        this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods:{
      async hadelExcel(){
        const params={
          month:this.query.time.split('-')[1],
          year:this.query.time.split('-')[0],
        }
        const res = await OutDetailWithMonthExport(params)
        const blob = new Blob([res], { type: "application/vnd.ms-excel" });
        const fileName = "成品出库（月）汇总表.xlsx";
        uploadExcel(fileName, blob);
      },
      getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '总价';
              return;
            }
           const values = data.map(item => {
              if(column.property=='mesNetWeight'){
                return Number(item[column.property])
              }else if(column.property=='ringRatio'){
              return  Number(item[column.property]?item[column.property].split('%')[0]:item[column.property])
              }else if(column.property=='mesReWeight'){
                return Number(item[column.property])
              }
            });
            
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              // sums[index] += ' 元';
            }else{
              sums[index]=''
            }
          });

          return sums;
        },
        handelTime(){
            this.OutDetailWithMonth()
        },
        handelMesCustomer(){
            this.OutDetailWithMonth()
        },
        handelMesNormName(){
            this.OutDetailWithMonth()
        },
        handelMeterLength(){
            this.OutDetailWithMonth()
        },
        handelWheelsType(){
            this.OutDetailWithMonth()
        },
        pageChange(val){
            this.listQuery.pageNum = val.page;
            this.listQuery.pageSize = val.limit;
            this.OutDetailWithMonth()
        },
        search(){
            this.OutDetailWithMonth()
        },
        reset(){
            this.query={
                time:new Date(),
                mesCustomer:'',
                mesNormName:'',
                meterLength:"",
                wheelsType:"",
            },
            this.OutDetailWithMonth()
        },
        async OutDetailWithMonth(){
            // const time=moment(this.query.time).format('YYYY-MM-DD').split("-")
            const params={
                ...this.query,
                month:this.query.time.split('-')[1],
                year:this.query.time.split('-')[0],
                wheelsType:this.query.wheelsType,
                page:this.listQuery.pageNum,
                pageSize:this.listQuery.pageSize,
                mesCustomer:this.query.mesCustomer+'',
                mesNormName:this.query.mesNormName+'',
            }
            const res = await OutDetailWithMonth(params)
            if(res.code==='0'){
                this.data=res.data.records.map((v)=>{
                  return {
                    ...v,
                    mesReWeight:v.mesReWeight==null?0:v.mesReWeight,
                  }
                })
                this.total = res.data.total
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
    // height: auto !important;
    // bottom: 10px !important;
  }
  .el-table__fixed::before {
    height: 0px;
  } 
  .el-table__cell{
    padding: 0.5rem 0;
  }
}
</style>