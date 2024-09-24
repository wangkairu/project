<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'120px'"
                size="mini"
                :maxShow="3"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="分厂">
                    <el-input
                        size="mini"
                        v-model="form.mesBranchFactory"
                        placeholder="请输入分厂"
                        @change="handelMesBoxNumberQrCode"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="客户简称">
                    <el-select 
                    multiple 
                    filterable  
                    @change="handelCustomerSimpleCode"
                    clearable 
                    v-model="form.customerName" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES米长">
                    <el-select 
                    filterable  
                    @change="handelMesNormsNo"
                    clearable 
                    v-model="form.meterLength" 
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
                    @change="handelMesNormsNo"
                    clearable 
                    v-model="form.tray" 
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
                    multiple 
                    filterable  
                    @change="handelMesNormsNo"
                    clearable 
                    v-model="form.type" 
                    placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MES轮型">
                    <el-select 
                    filterable  
                    @change="handelMesNormsNo"
                    clearable 
                    v-model="form.wheelType" 
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
            <!-- :span-method="handleSpanMethod" -->
            <el-table
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :data="data"
              height="600"
            >
                <el-table-column fixed type="index" label="#" width="55"> </el-table-column>
                <el-table-column
                fixed
                prop="mesBranchFactory"
                label="分厂"
                width="90"
                >
                </el-table-column>
                <el-table-column
                fixed
                prop="mesNormName"
                label="规格简称"
                width="150"
                >
                </el-table-column>
                <el-table-column fixed prop="mesCustomerShortName" label="客户简称" width="130">
                </el-table-column>
                <el-table-column fixed prop="wheelType" label="轮型">
                </el-table-column>
                <el-table-column prop="tray" label="托盘">
                </el-table-column>
                <el-table-column prop="meterLength" label="米长"> </el-table-column>
                <el-table-column  label="轮向">
                    <template slot-scope="scope">
                        <div class="annotations" v-for="(v,ind) in scope.row.side" :key="ind">
                            <tr class="annotation-rs cluster-rs" >
                                <td>{{v.props}}</td>
                            </tr>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="箱数">
                    <template slot-scope="scope">
                        <!-- /<el-table-column v-for="(v,ind) in scope.row.side" :key="ind" :prop="v.count"></el-table-column> -->
                        <div class="annotations">
                            <tr class="annotation-rs cluster-rs" v-for="(v,ind) in scope.row.side" :key="ind">
                                <td>{{v.count}}</td>
                            </tr>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="allCount" label="总箱数">
                </el-table-column>
                <el-table-column prop="allisAgeCount" label="时效已到总箱数"> </el-table-column>
                <!-- <el-table-column
                prop="mesCordStructure"
                label="满足时效总箱数"
                width="200"
                >
                </el-table-column> -->
                <el-table-column  label="满足时效整箱数" width="160">
                    <template slot-scope="scope">
                        <div class="annotations">
                            <tr class="annotation-rs cluster-rs" v-for="(v,ind) in scope.row.side" :key="ind">
                                <td>{{v.BoxFullCount}}</td>
                            </tr>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="满足时效半箱数" width="160">
                    <template slot-scope="scope">
                        <div class="annotations">
                            <tr class="annotation-rs cluster-rs" v-for="(v,ind) in scope.row.side" :key="ind">
                                <td>{{v.HalfBoxFullCount}}</td>
                            </tr>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="净重">
                    <template slot-scope="scope">
                        <div class="annotations">
                            <tr class="annotation-rs cluster-rs" v-for="(v,ind) in scope.row.side" :key="ind">
                                <td>{{v.NetCount}}</td>
                            </tr>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="allisAgeCount" label="总净重">
                </el-table-column>
                <el-table-column  label="毛重">
                    <template slot-scope="scope">
                        <div class="annotations">
                            <tr class="annotation-rs cluster-rs" v-for="(v,ind) in scope.row.side" :key="ind">
                                <td>{{v.GrossCount}}</td>
                            </tr>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="allGrossCount" label="总毛重">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import {getCountByIsAge,getCustomerAndSpecification} from '@/api/realTime'
export default {
    components:{
        SearchFilter,
    },
    data(){
        return {
            data:[],
            options:[],
            typeOptions:[],
            form:{
                customerName:[],
                mesBranchFactory:"",
                meterLength:"",
                tray:"",
                type:[],
                wheelType:"",
            },
            mesNormsNameListOptions:[],
            mesCustomerOptions:[],
            mesWheelType:[],
            mesTrayOptions:[],
            mesMeterLength:[],
        }
    },
    mounted(){
        this.getCountByIsAge()
        this.getCustomerAndSpecification()
        this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods:{
        async getCustomerAndSpecification(){
            const res=await getCustomerAndSpecification()
            if(res.code==='0'){
                this.options=res.data.customer_name.map((v,ind)=>{
                    return {
                        value:v,
                        label:v,
                        key:ind,
                    }
                })
                this.typeOptions=res.data.specification.map((v,ind)=>{
                    return {
                        value:v,
                        label:v,
                        key:ind,
                    }
                })
            }
        },
        // handleSpanMethod({ row, column, rowIndex, columnIndex }) {
        //     if (
        //         columnIndex === 1 &&
        //         row.title !== "L面" &&
        //         columnIndex === 1 &&
        //         row.title !== "R面"
        //     ) {
        //         return {
        //             rowspan: 1,
        //             colspan: 2,
        //         };
        //     }
        //     //   if (row.title === "") {
        //     //     return {
        //     //       rowspan: 1,
        //     //       colspan: 3,
        //     //     };
        //     //   }
        // },
        search(){
            this.getCountByIsAge()
        },
        reset(){
            this.form={
                customerName:[],
                // isAge:0,
                meterLength:0,
                tray:"",
                type:[],
                wheelType:"",
            }
            this.getCountByIsAge()
        },
        handelCustomerSimpleCode(){
            this.getCountByIsAge()
        },
        handelMesBoxNumberQrCode(){ 
            this.getCountByIsAge()
         },
        // handelMesMeterLength(){
        //     this.getCountByIsAge()
        // },
        // handelMesTray(){
        //     this.getCountByIsAge()
        // },
        handelMesNormsNo(){
            this.getCountByIsAge()
        },
        // handelMesNumOfRounds(){
        //     this.getCountByIsAge()
        // },
        async getCountByIsAge(){
            const params={
                ...this.form,
            }
            const res=await getCountByIsAge(params)
            if(res.code=="0"){
                this.data=res.data.map((v)=>{
                    return {
                        ...v,
                        side:[
                            {
                                props:v.sides.left?v.sides.left.around:'',
                                count:v.sides.left?v.sides.left.count:'',
                                NetCount:v.sides.left?v.sides.left.netCount:"",
                                GrossCount:v.sides.left?v.sides.left.grossCount:"",
                                BoxFullCount:v.sides.left?v.sides.left.boxFullCount:"",
                                HalfBoxFullCount:v.sides.left?v.sides.left.halfBoxFullCount:"",
                            },
                            {
                                props:v.sides.right?v.sides.right.around:"",
                                count:v.sides.right?v.sides.right.count:'',
                                NetCount:v.sides.right?v.sides.right.netCount:"",
                                GrossCount:v.sides.right?v.sides.right.grossCount:"",
                                BoxFullCount:v.sides.right?v.sides.right.boxFullCount:"",
                                HalfBoxFullCount:v.sides.right?v.sides.right.halfBoxFullCount:"",
                            }
                        ]
                    }
                })
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
.annotation-rs .cluster-rs:not(:first-child){
    margin-top: 20px;
}
</style>