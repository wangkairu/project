<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'110px'"
                size="mini"
                :maxShow="3"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="客户信用等级">
                    <el-select
                        clearable
                        v-model="form.customerLevel"
                        placeholder="请选择客户信用等级"
                        size="mini"
                        @change="handelSearch"
                    >
                        <el-option
                            v-for="item in customerLevelOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户全称">
                    <el-input
                        clearable
                        size="mini"
                        v-model="form.customerNameLong"
                        placeholder="请输入客户总称"
                        @change="handelSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="规格名称">
                    <el-input
                        clearable
                        size="mini"
                        v-model="form.name"
                        placeholder="请输入规格名称"
                        @change="handelSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="规格类型">
                    <el-select
                    clearable
                    v-model="form.normsType"
                    placeholder="请选择发货类型"
                    size="mini"
                    @change="handelSearch"
                    >
                        <el-option
                        v-for="item in normsTypeOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分厂">
                    <el-input
                        clearable
                        size="mini"
                        v-model="form.shop"
                        placeholder="请输入分厂"
                        @change="handelSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="帘线结构">
                    <el-input
                        clearable
                        size="mini"
                        v-model="form.struct"
                        placeholder="请输入帘线结构"
                        @keyup.enter="handelSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="托盘">
                    <el-input
                        clearable
                        size="mini"
                        v-model="form.tray"
                        placeholder="请输入托盘"
                        @change="handelSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="发货类型">
                    <el-select
                    clearable
                    v-model="form.wmsDeliverType"
                    placeholder="请选择发货类型"
                    size="mini"
                    @change="handelSearch"
                    >
                        <el-option
                        v-for="item in wmsDeliverTypeOptions"
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
            style="width: 100%;"
            :data="data"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
                <el-table-column fixed type="index" label="#"> </el-table-column>
                <el-table-column fixed label="分厂" prop="shop"> </el-table-column>
                <el-table-column fixed label="客户简称" prop="customerNameShort" width="120"> </el-table-column>
                <el-table-column fixed label="客户全称" prop="customerNameLong" width="340" show-overflow-tooltip> </el-table-column>
                <el-table-column fixed label="客户信用度" prop="customerLevel" width="150"> 
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <el-select
                            clearable
                            v-model="scope.row.customerLevel"
                            placeholder="请选择"
                            size="mini"
                            >
                                <el-option
                                v-for="item in customerLevelOptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-button size="mini" type="text"  @click="customerLevelSave(scope.row)">保存</el-button>
                        </div>
                            <!-- <el-button size="mini" type="text"  @click="customerLevelCancel(scope.row)">重置</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column  label="发货类型" prop="deliverType" width="160"> 
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <el-select
                            clearable
                            v-model="scope.row.deliverType"
                            placeholder="请选择"
                            size="mini"
                            >
                                <el-option
                                v-for="item in wmsDeliverTypeOptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.key"
                                >
                                </el-option>
                            </el-select>
                            <el-button size="mini" type="text"  @click="wmsDeliverTypeSave(scope.row)">保存</el-button>
                        </div>
                            <!-- <el-button size="mini" type="text"  @click="wmsDeliverTypeCancel(scope.row)">重置</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column  label="规格名称" prop="name" width="120"> </el-table-column>
                <el-table-column  label="规格类型" width="150"> 
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <el-select
                            clearable
                            v-model="scope.row.normsType"
                            placeholder="请选择"
                            size="mini"
                            >
                                <el-option
                                v-for="item in normsTypeOptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.key"
                                >
                                </el-option>
                            </el-select>
                            <el-button size="mini" type="text"  @click="handelNormsTypeSave(scope.row)">保存</el-button>
                        </div>
                            <!-- <el-button size="mini" type="text"  @click="handelNormsTypeCancel(scope.row)">重置</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column  label="物流承运商" width="200"> 
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <el-input size="mini" v-model="scope.row.logisticsCarriers" placeholder="请输入物流承运商"></el-input>
                            <el-button size="mini" type="text"  @click="handellogisticsCarriers(scope.row)">保存</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="分厂" prop="shop"> </el-table-column>
                <el-table-column  label="帘线结构" prop="struct" width="150" show-overflow-tooltip> </el-table-column>
                <el-table-column  label="托盘" prop="tray"> </el-table-column>
                <el-table-column  label="焊点" prop="weld"> </el-table-column>
                <el-table-column  label="特殊要求" prop="requirement" width="330" show-overflow-tooltip> </el-table-column>
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
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {queryGoodsList,changeCustomerLevel,changeNormType,changeWMSDeliveryStatus,changeLogisticsCarriers} from '@/api/customer'
export default{
    components:{
        PageNation,
        SearchFilter
    },
    data(){
        return {
            form:{
                customerLevel: "",
                customerNameLong: "",
                customerNameLongEnglish: "",
                name: "",
                normsType: '',
                shop: "",
                struct: "",
                tray: "",
                wmsDeliverType: ''
            },
            normsTypeOptions:[
                {
                    key:"0",
                    value:"半钢",
                },
                {
                    key:"1",
                    value:"全钢",
                },
                {
                    key:"2",
                    value:"工程胎",
                }
            ],
            wmsDeliverTypeOptions:[
                {
                    key:"0",
                    value:"内贸",
                },
                {
                    key:"1",
                    value:"三资内贸",
                },
                {
                    key:"2",
                    value:"中资外贸",
                },
                {
                    key:"3",
                    value:"外贸",
                }
            ],
            customerLevelOptions:[
                { value:"A",key:0},
                { value:"B",key:1},
                { value:"C",key:2},
            ],
            total: 0,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            data:[],
        }
    },
    mounted(){
        this.queryGoodsList()
    },
    methods:{
        handelSearch(){
            this.queryGoodsList();
        },
        reset(){
            this.form={
                customerLevel: "",
                customerNameLong: "",
                customerNameLongEnglish: "",
                name: "",
                normsType: '',
                shop: "",
                struct: "",
                tray: "",
                wmsDeliverType: ''
            }
            this.queryGoodsList();
        },
        pageChange(val) {
            this.listQuery.pageNum = val.page;
            this.listQuery.pageSize = val.limit;
            this.queryGoodsList();
        },
        async handellogisticsCarriers(row){
            const params={
                id:row.id,
                status:row.logisticsCarriers
            }
            const res = await changeLogisticsCarriers(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.queryGoodsList()
            }else{
                this.$message.error(res.msg)
            }
        },
        async customerLevelSave(row){
            const params={
                id:row.id,
                status:row.customerLevel
            }
            const res =await changeCustomerLevel(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.queryGoodsList()
            }else{
                this.$message.error(res.msg)
            }
        },
        async handelNormsTypeSave(row){
            const params={
                id:row.id,
                status:row.normsType
            }
            const res =await changeNormType(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.queryGoodsList()
            }else{
                this.$message.error(res.msg)
            }
        },
        async wmsDeliverTypeSave(row){
            const params={
                id:row.id,
                status:row.deliverType
            }
            const res =await changeWMSDeliveryStatus(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.queryGoodsList()
            }else{
                this.$message.error(res.msg)
            }
        },
        async queryGoodsList(){
            const params={...this.form}
            const res = await queryGoodsList(params,this.listQuery)
            if(res.code==='0'){
                this.data=res.data.items.map((v)=>{return {...v}})
                this.total=res.data.pageTotal
            }
        },
        search(){
            this.queryGoodsList()
        },
    }
}
</script>

<style scoped lang="scss">
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

    //   .enteringButton {
    //     margin-bottom: 10px;
    //   }
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
  ::v-deep .el-table {
    .el-table__fixed {
      height: auto !important;
      bottom: 0px !important;
    }
  }
</style>