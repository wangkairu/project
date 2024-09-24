<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
            :labelWidth="'100px'"
            size="mini"
            :maxShow="3"
            @search="search"
            @reset="reset"
            >
                <el-form-item label="年份">
                    <el-date-picker
                        v-model="form.date"
                        type="year"
                        class="time"
                        value-format="yyyy"
                        placeholder="选择年份"
                        @change="handelChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.type" @change="handelChange" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户简称">
                    <el-select clearable filterable v-model="form.mesCustomer" @change="handelChange" placeholder="请选择客户简称">
                        <el-option
                        v-for="item in mesCustomerOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格简称">
                    <el-select clearable filterable v-model="form.mesNormName" @change="handelChange" placeholder="请选择规格简称">
                        <el-option
                        v-for="item in mesNormsNameListOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="米长">
                    <el-select clearable filterable v-model="form.meterLength" @change="handelChange" placeholder="请选择">
                        <el-option
                        v-for="item in mesMeterLength"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮型">
                    <el-select clearable filterable v-model="form.wheelsType" @change="handelChange" placeholder="请选择">
                        <el-option
                        v-for="item in mesWheelType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="托盘">
                  <el-select clearable v-model="form.mesTray" @change="handelChange" placeholder="请选择托盘">
                    <el-option
                    v-for="item in mesTrayOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="左右面">
                  <el-select clearable v-model="form.mesLeftRightSides" @change="handelChange" placeholder="请选择">
                        <el-option
                        v-for="item in leftSide"
                        :key="item.value"
                        :label="item.value"
                        :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <el-table
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                style="width: 100%"
                :data="data"
            >
            <el-table-column  type="index" label="#" > </el-table-column>
            <el-table-column prop="mesCustomerName" label="客户简称"></el-table-column>
            <el-table-column prop="mesLeftRightSide" label="左右面">
              <template slot-scope="scope">
                <span>{{ scope.row.mesLeftRightSide==1?'右':'左' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mesMeterLength" label="米长"></el-table-column>
            <el-table-column prop="mesNetWeight" label="净重"></el-table-column>
            <el-table-column prop="mesNormShortName" label="规格简称"></el-table-column>
            <el-table-column prop="mesTray" label="托盘"></el-table-column>
            <el-table-column prop="normType" label="规格类型"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
 import SearchFilter from "@/components/SearchFilter";
import {selectMonth,selectYear} from '@/api/index.js'
export default {
    components:{
        SearchFilter
    },
    data(){
        return {
            form:{
                date:`${new Date().getFullYear()}-${new Date().getMonth()+1}`,
                type:'0',
                mesCustomer:"",
                mesLeftRightSides:"",
                mesNormName:"",
                mesTray:"",
                meterLength:"",
                wheelsType:"",
            },
            options:[
                {value:"0",label:"入库"},
                {value:"1",label:"出库"},
                {value:"2",label:"返工"},
                {value:"3",label:"退货"},
            ],
            data:[],
            mesWheelType:[],
            mesCustomerOptions:[],
            mesNormsNameListOptions:[],
            mesTrayOptions:[],
            mesMeterLength:[],
            leftSide:[
              {
                value:"左",
                key:'0',
              },
              {
                value:"右",
                key:'1',
              },
            ]
        }
    },
    mounted(){
        this.selectYear()
        this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods:{
        async selectYear(){
            const params={
              ...this.form,
              year:this.form.date.split('-')[0],
              month:this.form.date.split('-')[1],
              type:this.form.type,
            }
            const res = await selectYear(params)
            if(res.code==='0'){
              this.data= res.data
            }
        },
        handelChange(){
            this.selectYear()
        },
        search(){
            this.selectYear()
        },
        reset(){
            this.form={
                date:`${new Date().getFullYear()}-${new Date().getMonth()+1}`,
                type:'0',
                mesCustomer:"",
                mesLeftRightSides:"",
                mesNormName:"",
                mesTray:"",
                meterLength:"",
                wheelsType:"",
            }
            this.selectYear()
        },
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
.time {
::v-deep .el-input__suffix {
  right: 2.6125rem;
}
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
    bottom: 16px !important;
  }
  .el-table__cell{
    padding: 0.62rem 0;
  }
}
</style>