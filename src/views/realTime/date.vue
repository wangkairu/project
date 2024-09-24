<template>
    <div class="warpper">
        <div class="table-filter">
            <SearchFilter
                :labelWidth="'145px'"
                size="mini"
                :maxShow="4"
                @search="search"
                @reset="reset"
            >
                <el-form-item label="日期">
                    <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="请选择">
                    </el-date-picker>
                </el-form-item>
            </SearchFilter>
        </div>
        <div class="table">
            <el-table
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              :data="data"
            >
                <el-table-column width="60"  type="index" label="#"> </el-table-column>
                <el-table-column  prop="mes_norms_name" label="规格名称" >
                </el-table-column>
                <el-table-column  prop="mesCustomerShortName" label="客户简称">
                </el-table-column>
                <el-table-column  prop="mes_wheel_type" label="轮型" >
                </el-table-column>
                <el-table-column  prop="count" label="数量" >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="text"
                        size="mini"
                        @click="handleEdit(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="wmsStatus" label="状态"> </el-table-column>
                <el-table-column prop="mesBoxNo" label="箱号"> </el-table-column>
                <el-table-column prop="mesBoxNumberQrCode" label="箱号二维码"> </el-table-column>
                <el-table-column prop="mesProductionNo" label="生产编号"> </el-table-column>
                <el-table-column prop="count" label="总计">
                </el-table-column> -->
                <!-- <el-table-column prop="meterLength" label="米长"> </el-table-column>
                <el-table-column  label="轮向">
                </el-table-column>
                <el-table-column  label="箱数">
                </el-table-column>
                <el-table-column prop="AllCount" label="总箱数">
                </el-table-column>
                <el-table-column prop="AllisAgeCount" label="时效已到总箱数"> </el-table-column>
                <el-table-column
                prop="mesCordStructure"
                label="满足时效总箱数"
                width="200"
                >
                </el-table-column>
                <el-table-column  label="满足时效整箱数" width="160">
                </el-table-column>
                <el-table-column  label="满足时效半箱数" width="160">
                </el-table-column>
                <el-table-column  label="净重">
                </el-table-column>
                <el-table-column prop="AllNetCount" label="总净重">
                </el-table-column>
                <el-table-column  label="毛重">
                </el-table-column>
                <el-table-column prop="AllGrossCount" label="总毛重">
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
        <el-dialog
        title="详情"
        :visible.sync="dialogVisible"
        width="60%">
            <el-table
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="warehouseCode"
                    label="库位编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="agvNo"
                    label="agv编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="agvTaskNo"
                    label="任务编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="mesBoxNo"
                    label="mes箱号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mesBoxNumberQrCode"
                    label="箱号二维码"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="mesProductionNo"
                    label="生产编号"
                    width="280">
                </el-table-column>
                <el-table-column
                    prop="mesSpecialRequirements"
                    label="特殊要求">
                </el-table-column>
            </el-table>
            <PageNation
                style="display: flex;justify-content: center;margin-top: 10px;"
                v-show="total1 > 0"
                :total="total1"
                :page.sync="listQuery1.pageNum"
                :limit.sync="listQuery1.pageSize"
                @pagination="pageChange1"
            />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {getCountByTime,getCountByTimeGetAll} from '@/api/realTime'
export default {
    components:{
        SearchFilter,
        PageNation
    },
    data(){
        return {
            data:[],
            options:[],
            typeOptions:[],
            tableData:[],
            contents:[{label:"箱号",prop:"mesBoxNo"},
            {label:"箱号二维码",prop:"mesBoxNumberQrCode"},
            {label:"生产编号",prop:"mesProductionNo"},
            {label:"车辆",prop:"agvNo"}],
            value1:"",
            form:{
             onlyCodeCategory:"",
            },
            total1:0,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            listQuery1:{
                page: 1,
                pageSize: 10,
            },
            total: 0,
            dialogVisible:false,
            con:"",
        }
    },
    mounted(){
        this.getCountByTime()
    },
    methods:{
        pageChange1(val){
            this.listQuery1.page = val.page;
            this.listQuery1.pageSize = val.limit;
            this.getCountByTimeGetAll()
        },
        handleEdit(row){
            this.con=row
            this.getCountByTimeGetAll()
            this.dialogVisible=true
        },
        async getCountByTimeGetAll(){
            const params={
                mes_norms_name:this.con.mes_norms_name,
                mes_wheel_type:this.con.mes_wheel_type,
                mesCustomerShortName:this.con.mesCustomerShortName,
                ...this.listQuery1
            }
            const res = await getCountByTimeGetAll(params)
            if(res.code==='0'){
                this.tableData=res.data.items
                this.total1=res.data.total
            }
        },
        pageChange(val) {
            this.listQuery.pageNum = val.page;
            this.listQuery.pageSize = val.limit;
            this.getCountByTime();
        },
        search(){
            this.getCountByTime()
        },
        reset(){
            this.form={
              onlyCodeCategory:"",
            }
            this.getCountByTime()
        },
        handelCustomerSimpleCode(){
            this.getCountByIsAge()
        },
        // handelMesBoxNumberQrCode(){ // },
        handelMesMeterLength(){
            this.getCountByIsAge()
        },
        handelMesTray(){
            this.getCountByIsAge()
        },
        handelMesNormsNo(){
            this.getCountByIsAge()
        },
        handelMesNumOfRounds(){
            this.getCountByIsAge()
        },
        async getCountByTime(){
            const params={
                // ...this.form,
                page: this.listQuery.pageNum,
                pageSize: this.listQuery.pageSize,
            }
            const res=await getCountByTime(params)
            if(res.code=="0"){
                this.data=res.data.data
                this.total = res.data.totalSize
            }
        },
        reconstructionCell({ row, column, rowIndex, columnIndex }){
            if(columnIndex===0||columnIndex===1||columnIndex===2||columnIndex===3){
                return {
                    rowspan: row.contents.length,
                    colspan: 1
                }
            }
            // for(var key in row){
            // //匹配列数据
            //     if(/columnIndex/.test(key)&&'undefined'!==typeof row[key]['columnIndex']){
            //         //关联对应列，并返回合并参数
            //         if(row[key].columnIndex == columnIndex){
            //             return {
            //                 rowspan: row[key].rowspan,
            //                 colspan: row[key].colspan
            //             }
            //         }
            //     }
            // }
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
</style>