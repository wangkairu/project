<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'135px'"
        size="mini"
        :maxShow="6"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="关键字">
          <el-input
            clearable
            size="mini"
            v-model="keyWord"
            @change="handelkeyWord"
            placeholder="请输入关键字"
          ></el-input>
        </el-form-item>
        <el-form-item label="库房">
          <el-select
          v-model="warehouseCode"
          @change="handelWarehouseCode"
          placeholder="请选择库房"
          size="mini"
          clearable
        >
          <el-option
            v-for="item in options"
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
      <div class="enteringButton">
        <!-- <el-button
          type="primary"
          @click="handelAdd"
          size="mini"
          >新增</el-button>
        <el-button
          type="primary"
          v-permission="{ name: 'isExport' }"
          @click="handelExport"
          size="mini"
          >导出Excel</el-button> -->
        <!-- <el-popover placement="bottom" width="300" trigger="click">
          <el-checkbox-group v-model="checkedTableColumns">
            <el-row>
              <el-col v-for="(item, i) in columns" :key="i" :span="12">
                <el-checkbox :label="item.attr">
                  {{ item.label }}
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <el-button
            style="margin-left: 10px"
            type="primary"
            size="mini"
            slot="reference"
            >列筛选</el-button
          >
        </el-popover> -->
      </div>
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%"
        :data="data"
      >
        <el-table-column  type="index" label="#"> </el-table-column>
        <el-table-column prop="warehouseName"  label="库房"> </el-table-column>
        <el-table-column prop="normsShortName"  label="规格简称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="customerShortName"  label="客户简称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="wheelType"  label="轮型"></el-table-column>
        <el-table-column prop="meterLength"  label="米长"> </el-table-column>
        <el-table-column prop="leftRightSides"  label="左右面"> </el-table-column>
        <el-table-column prop="specialRequirements"  label="特殊要求"> </el-table-column>
        <el-table-column prop="total"  label="总容量"></el-table-column>
        <el-table-column prop="used"  label="已使用"></el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
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
      width="80%">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column  type="index" label="#"> </el-table-column>
        <el-table-column
          prop="warehouseName"
          label="库房">
        </el-table-column>
        <el-table-column
          prop="areaCode"
          label="区域">
        </el-table-column>
        <el-table-column
          prop="colIndexAlias"
          label="列">
        </el-table-column>
        <el-table-column
          prop="normsShortName"
          label="规格简称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="customerShortName"
          label="客户简称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="wheelType"
          label="轮型">
        </el-table-column>
        <el-table-column
          prop="meterLength"
          label="米长">
        </el-table-column>
        <el-table-column
          prop="leftRightSides"
          label="左右面">
        </el-table-column>
        <el-table-column
          prop="specialRequirements"
          label="特殊要求">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总容量">
        </el-table-column>
        <el-table-column
          prop="used"
          label="已使用">
        </el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="handelCancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="handelConfirm">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import SearchFilter from '@/components/SearchFilter'
import {queryRulesList,queryRulesDetailList,queryEnumList} from '@/api/storeIn'
import PageNation  from '@/components/Pagination'
export default {
    name:"inboundRules",
    components:{
      PageNation,
      SearchFilter
    },
    data(){
      return{
        dialogVisible:false,
        data:[],
        tableData:[],
        keyWord:"",
        warehouseCode:"",
        options:[],
        total:0,
        listQuery:{
          pageNum:1,
          pageSize:10,
        },
        obj:null
      }
    },
    mounted(){
      this.queryRulesList()
      this.queryEnumList()
    },
    watch:{
      warehouseCode:{
        handler(val){
          const newVal = sessionStorage.getItem("warehouseCode")
          if(newVal){
            this.warehouseCode = newVal
            this.queryRulesList()
          }
        },
        immediate:true,
        deep:true,
      }
    },
    methods:{
        async queryEnumList(){
          const res=await queryEnumList('WarehouseCodeEnum')
          if(res.code==='0'){
            this.options=res.data
            this.warehouseCode=res.data[0].key
            this.queryRulesList()
            // sessionStorage.setItem('warehouseCode',this.warehouseCode)
          }
        },
        handleClick(row){
          this.obj={
            normsShortName:row.normsShortName,
            customerShortName:row.customerShortName,
            wheelType:row.wheelType,
            meterLength:row.meterLength,
            leftRightSides:row.leftRightSides,
            specialRequirements:row.specialRequirements
          }
          const params={
            keyWord:row.category,
            warehouseCode:this.warehouseCode,
          }
          this.queryRulesDetailList(params)
          this.dialogVisible=true
        },
        async queryRulesDetailList(params){
            const res=await queryRulesDetailList(params)
            if(res.code==='0'){
              this.tableData=res.data.map((v)=>{
                return {
                  ...v,
                  ...this.obj,
                }
              })
            }else{
              this.tableData=[]
            }
        },
        pageChange(val) {
          this.listQuery.pageNum = val.page;
          this.listQuery.pageSize = val.limit;
          this.queryRulesList();
        },
        handelkeyWord(){
          this.queryRulesList()
        },
        handelWarehouseCode(val){
          this.warehouseCode=val
          sessionStorage.setItem('warehouseCode',this.warehouseCode)
          this.queryRulesList()
        },
        search(){
          this.queryRulesList()
        },
        reset(){
          this.keyWord='';
          this.warehouseCode=''
          this.queryRulesList()
        },
        async queryRulesList(){
          const params={
            keyWord:this.keyWord,
            warehouseCode:this.warehouseCode,
            page:this.listQuery.pageNum-1,
            size:this.listQuery.pageSize
          }
          const res=await queryRulesList(params)
          if(res.code==0){
            this.data=res.data.items
            this.total=res.data.total
          }else{
            this.data=[]
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
    background-color: hsl(0, 0%, 100%);
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
ul {
  display: flex;
}
.hiden {
  display: inline-block;
  width: calc(100% - 112px);
}
// ::v-deep .el-input__suffix {
//   right: 2.6125rem;
// }
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
    padding: 0.70rem 0;
  }
}
</style>