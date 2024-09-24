<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'150px'"
                size="mini"
                :maxShow="3"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="年">
                    <el-date-picker
                    v-model="query.year"
                    type="yyyy"
                    placeholder="选择日期"
                    @change="handelMesMeterLength"
                    value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="分厂">
                    <el-input
                        size="mini"
                        v-model="query.mesBranchFactory"
                        placeholder="请输入分厂"
                        @change="handelMesMeterLength"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="客户简称">
                    <el-select 
                    multiple 
                    filterable  
                    @change="handelMesMeterLength"
                    clearable 
                    v-model="query.mesCustomerName" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in mesCustomerOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES米长">
                    <el-select 
                    filterable
                    @change="handelMesMeterLength"
                    clearable 
                    v-model="query.mesMeterLength" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in mesMeterLength"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES托盘">
                <el-select 
                    filterable  
                    @change="handelMesMeterLength"
                    clearable 
                    v-model="query.mesTray" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in mesTrayOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES规格名称">
                    <el-select 
                    filterable
                    multiple  
                    @change="handelMesMeterLength"
                    clearable 
                    v-model="query.mesNormType" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in mesNormsNameListOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES轮型">
                    <el-select 
                    filterable  
                    @change="handelMesMeterLength"
                    clearable 
                    v-model="query.mesWheelType" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in mesWheelType"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <el-table
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :data="data"
              height="600"
            >
                <el-table-column fixed type="index" label="#" width="55"> </el-table-column>
                <el-table-column
                fixed
                prop="mesNormShortName"
                label="规格简称"
                width="150"
                >
                </el-table-column>
                <el-table-column fixed prop="mesCustomerShortName" label="客户简称" width="130">
                </el-table-column>
                <el-table-column fixed prop="mesWheelType" label="轮型">
                </el-table-column>
                <el-table-column fixed prop="mesTray" label="托盘">
                </el-table-column>
                <el-table-column fixed  prop="mesMeterLength" label="米长"> </el-table-column>
                <el-table-column v-for="(item,index) in months" :key="item" :label="`${item}月`">
                    <template slot-scope="scope">
                        <span>{{scope.row.contents[index].count}}</span>
                    </template>	
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {IsExist} from '@/api/index'
import SearchFilter from "@/components/SearchFilter";
export default{
    components:{SearchFilter},
    data(){
        return {
            data:[],
            query:{
                mesBranchFactory: "",
                mesCustomerName: [],
                mesMeterLength: 0,
                mesNormType: [],
                mesTray: "",
                mesWheelType: "",
                year: "",
            },
            options:[],
            typeOptions:[],
            mesNormsNameListOptions:[],
            mesCustomerOptions:[],
            mesWheelType:[],
            mesTrayOptions:[],
            mesMeterLength:[],
            months:['1','2','3','4','5','6','7','8','9','10','11','12']
        }
    },
    mounted(){
        this.IsExist()
        this.$store.dispatch('realList').then(()=>{
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
        })
    },
    methods:{
        handelMesMeterLength(){
            this.IsExist()
        },
        async IsExist(){
            const params={
                ...this.query
            }
            const res = await IsExist(params)
            if(res.code=='0'){
                this.data=res.data
            }
        },
        search(){
            this.IsExist()
        },
        reset(){
            this.query={
                mesBranchFactory: "",
                mesCustomerName: [],
                mesMeterLength: 0,
                mesNormType: [],
                mesTray: "",
                mesWheelType: "",
                year: "",
            }
            this.IsExist()
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
.time {
    ::v-deep .el-input__suffix {
    right: 2.6125rem;
    }
}
</style>