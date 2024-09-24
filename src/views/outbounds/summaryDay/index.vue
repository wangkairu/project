<template>
    <div class="warpper">
        <div class="table-filter">
        <SearchFilter
          :labelWidth="'145px'"
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
                type="date"
                placeholder="请选择入库日期"
                @change="handelTime"
                value-format="yyyy-MM-dd"
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
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column fixed prop="deptName" label="分厂" width="70">
        </el-table-column>
        <el-table-column
          fixed
          prop="mesNormsName"
          label="MES规格名称"
          width="130"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesCustomerShortName"
          label="MES客户简称"
          width="130"
        >
        </el-table-column>
        <el-table-column fixed prop="mesBoxNo" label="MES箱号">
        </el-table-column>
        <el-table-column
          prop="mesBoxNumberQrCode"
          label="MES箱号二维码"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="mesIsSolderJoint" label="MES有无焊点" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.mesIsSolderJoint === 0 ? "无" : "有" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesLeftRightSides" label="MES左右面" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.mesLeftRightSides === 0 ? "左" : "右" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="mesTray" label="MES托盘" width="70"> </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <el-table-column prop="mesNumOfRounds" label="MES轮数" width="70">
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
        <!-- <el-table-column
          prop="wmsWarehousingTime"
          label="MES入库时间"
          width="160"
        >
        </el-table-column> -->
      </el-table>
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
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import {OutDetailWithDay,getCustomerAndSpecification} from '@/api/storeOut'
import moment from 'moment'
export default {
    name:"summaryDay",
    components:{
        SearchFilter,
        PageNation
    },
    data(){
        return {
            query:{
                time:new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-'),
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
        }
    },
    mounted(){
        this.OutDetailWithDay()
        // this.getCustomerAndSpecification()
        this.$store.dispatch('realList').then(()=>{
        this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
        this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
        this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
        this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
        this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
      })
    },
    methods:{
        handelTime(){
            this.OutDetailWithDay()
        },
        handelMesCustomer(){
            this.OutDetailWithDay()
        },
        handelMesNormName(){
            this.OutDetailWithDay()
        },
        handelMeterLength(){
            this.OutDetailWithDay()
        },
        handelWheelsType(){
            this.OutDetailWithDay()
        },
        pageChange(val){
            this.listQuery.pageNum = val.page ;
            this.listQuery.pageSize = val.limit;
            this.OutDetailWithDay()
        },
        search(){
            this.OutDetailWithDay()
        },
        reset(){
            this.query={
                time:new Date(new Date()-1000*60*60*24).toLocaleString().replace(/\//g,'-'),
                mesCustomer:[],
                mesNormName:[],
                meterLength:"",
                wheelsType:"",
            },
            this.OutDetailWithDay()
        },
        async OutDetailWithDay(){
            const time=moment(this.query.time).format('YYYY-MM-DD').split("-")
            const params={
                ...this.query,
                time:moment(this.query.time).format('YYYY-MM-DD'),
                day:time[2],
                month:time[1],
                year:time[0],
                page:this.listQuery.pageNum,
                size:this.listQuery.pageSize,
                mesCustomer:this.query.mesCustomer+'',
                mesNormName:this.query.mesNormName+'',
            }
            console.log(params,'params')
            const res = await OutDetailWithDay(params)
            if(res.code==='0'){
                this.data=res.data.records
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