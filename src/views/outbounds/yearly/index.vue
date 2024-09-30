<template>
    <div class="warpper">
        <div class="table-filter">
      <SearchFilter
        :labelWidth="'100px'"
        size="mini"
        :maxShow="6"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="分厂">
          <el-select
            clearable
            v-model="query.shop"
            @change="handelWheelsType"
            placeholder="请选择分厂"
          >
            <el-option
              v-for="item in shopOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MES规格简称">
          <el-select
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
          <el-form-item label="MES托盘">
            <el-select
              filterable
              clearable
              v-model="query.mesTray"
              @change="handelWheelsType"
              placeholder="请选择MES托盘"
            >
              <el-option
                v-for="item in mesTrayOptions"
                :key="item.value"
                :label="item.value"
                :value="item.key"
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
        
        <el-table-column fixed prop="year" label="年份"> </el-table-column>
        <el-table-column fixed prop="shop" label="分厂"> </el-table-column>
        <el-table-column
          fixed
          prop="mesNormName"
          label="MES规格简称"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesCustomerName"
          label="MES客户简称"
          width="320"
        >
        </el-table-column>
        <el-table-column prop="wheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="mesTray" label="MES托盘" > </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
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
        >
        </el-table-column>
      </el-table>
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
import PageNation from "@/components/Pagination";
import {OutDetailWithYearly,getCustomerAndSpecification} from '@/api/storeOut'
export default{
    components:{
      SearchFilter,
      PageNation
    },
    data(){
        return {
            query:{
              mesCustomer:[],
              mesNormName:[],
              meterLength:"",
              wheelsType:"",
              shop:"",
              mesTray:"",
            },
            shopOptions:[{
              value:"四期",
              key:"四期"
            }],
            mesNormsNameListOptions:[],
            mesCustomerOptions:[],
            mesWheelType:[],
            mesTrayOptions:[],
            mesMeterLength:[],
            listQuery:{
              pageNum:0,
              pageSize:10,
            },
            total:0,
            data:[],
        }
    },
    mounted(){
        this.OutDetailWithYearly()
        this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})

          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
          this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{
            let label=''
            if(v=='S'){
              label='塑托'
            }else if(v=='M'){
              label='木托'
            }else{
              label='铁托'
            }
            return {
              key:v,
              value:label,
            }
          })
        })
    },
    methods:{
        handelMesNormName(){
            this.OutDetailWithYearly()
        },
        handelMesCustomer(){
            this.OutDetailWithYearly()
        },
        handelMeterLength(){
            this.OutDetailWithYearly()
        },
        handelWheelsType(){
            this.OutDetailWithYearly()
        },
        search(){
            this.OutDetailWithYearly()
        },
        reset(){
            this.query={
              mesCustomer:[],
              mesNormName:[],
              meterLength:"",
              wheelsType:"",
            }
            this.OutDetailWithYearly()
        },
        pageChange(val){
          this.listQuery.pageNum = val.page - 1;
          this.listQuery.pageSize = val.limit;
          this.OutDetailWithYearly()
        },
        async OutDetailWithYearly(){
            const params={
                ...this.query,
                page:this.listQuery.pageNum,
                pageSize:this.listQuery.pageSize,
                mesCustomer:this.query.mesCustomer+"",
                mesNormName:this.query.mesNormName+"", 
            }
            const res = await OutDetailWithYearly(params)
            if(res.code==='0'){
              this.data=res.data.map((v)=>{
                return {
                  ...v,
                  reWorkRatio:v.reWorkRatio==null?0:v.reWorkRatio,
                  reWorkWeight:v.reWorkWeight==null?0:v.reWorkWeight,
                }
              })
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