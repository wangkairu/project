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
        <el-form-item label="AGV任务编号">
          <el-input
            size="mini"
            v-model="agvTaskNo"
            placeholder="请输入AGV任务编号"
            @change="handelAgvTaskNo"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="成品箱二维码">
          <el-input
            size="mini"
            v-model="mesBoxNumberQrCode"
            placeholder="请输入成品箱二维码"
            @change="handelMesBoxNumberQrCode"
            clearable
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
        <el-form-item label="任务类别">
                <el-select
                v-model="wmsTaskType"
                @change="handelWmsTaskType"
                placeholder="请选择任务类别"
                size="mini"
                clearable
            >
                <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
          </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <div class="enteringButton">
        <el-button type="primary" @click="handelBatchCancel" size="mini"
          >批量取消</el-button
        >
      </div>
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="data"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          :selectable="checkSelectable"
        >
        </el-table-column>
        <el-table-column fixed type="index" label="#" width="50"> </el-table-column>
        <el-table-column fixed label="操作" width="110">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.wmsStatus === -3||scope.row.wmsStatus === 13"
              @click="handleCancel(scope.row)"
              type="text"
              size="small"
              >取消</el-button
            >
            <el-button
              style="margin-left: 2px;"
              v-show="(scope.row.wmsStatus === -3&&scope.row.agvTaskNo&&scope.row.agvNo&&scope.row.warehousingCol==null)||(scope.row.wmsStatus === -3&&scope.row.agvTaskNo==null&&scope.row.agvNo==null)"
              @click="handlesetMixArea(scope.row)"
              type="text"
              size="small"
              >去混合区</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed prop="warehouseName"  label="库房" width="60"> </el-table-column>
        <!-- width="170" -->
        <el-table-column fixed prop="warehousingCol"  label="入库列" :width="flexColumnWidth('warehousingCol',this.data)" >
         <template slot-scope="scope">
          <span>{{ scope.row.warehousingCol?scope.row.warehousingCol:'暂无' }}</span>
         </template>
        </el-table-column>
        <el-table-column fixed prop="mesNormsName" label="规格">
        </el-table-column>
        <el-table-column
        fixed
          prop="mesCustomerShortName"
          label="客户简称"
          :show-overflow-tooltip="true"
          width="150"
        >
        </el-table-column>
        <el-table-column fixed prop="mesWheelType" label="轮型" width="70"> </el-table-column>
        <el-table-column fixed prop="mesMeterLength" label="米长" width="70">
        </el-table-column>
        <el-table-column fixed prop="mesLeftRightSidesEnum" label="左右面" width="70">
        </el-table-column>
        <el-table-column  prop="agvNo" label="AGV车号" width="90">
          <template slot-scope="scope">
            <span>{{
              scope.row.agvNo === null ? "暂无" : scope.row.agvNo
            }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="wmsStatusEnum" label="库位状态" width="90">
        </el-table-column>
        <el-table-column
          prop="mesBoxNumberQrCode"
          label="成品箱二维码"
          width="190"
        >
        </el-table-column>
        <el-table-column
          prop="agvTaskNo"
          label="任务编号"
          width="200"
          :show-overflow-tooltip="true"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.agvTaskNo?scope.row.agvTaskNo:"暂无" }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="mesBoxNo"
          label="箱号"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="mesGrossWeight" label="重量" width="80">
        </el-table-column>
        <el-table-column
          prop="agvTaskStatusEnum"
          label="AGV任务状态"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip
        >
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
  </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import { queryTaskList, batchPickUp,setMixArea} from '@/api/transportationTasks'
import {queryEnumList} from '@/api/storeIn'
export default {
  name: "agvtasks",
  // props: {
  //   wmsTaskType: {
  //     type: String,
  //   }
  // },
  components: {
    PageNation, SearchFilter
  },
  data() {
    return {
      data: [],
      options:[],
      warehouseCode:"WAREHOUSE-D-EAST",
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      agvTaskNo: "",
      mesBoxNumberQrCode: "",
      multipleSelection: [],
      updateInterval: null,
      wmsTaskType:1,
      typeOptions:[
        {label:"未开始",value:0},
        {label:"WMS自动发布任务",value:1},
        {label:"WMS人工发布任务",value:2},
        {label:"人工叉车任务",value:3},
      ]
    }
  },
  mounted() {
    this.queryEnumList()
    this.queryTaskList()
    this.updateInterval= setInterval(() => {
      this.initSetTimeout()
    }, 15000)
  },
  beforeDestroy() {
    clearInterval(this.updateInterval);// 清楚定时刷新，不清除会一直运行，关闭页面也会定时刷新
  },
  watch:{
    warehouseCode:{
      handler(val){
        const newVal = sessionStorage.getItem("code")
        if(newVal){
          this.warehouseCode =  newVal
          this.queryTaskList()
        }
      },
      immediate:true,
      deep:true,
    }
  },
  methods: {
    flexColumnWidth (str, arr1, flag = 'max') {
      // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
      // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
      // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
      str = str + ''
      let columnContent = ''
      if (!arr1 || !arr1.length || arr1.length === 0 || arr1 === undefined) {
        return
      }
      if (!str || !str.length || str.length === 0 || str === undefined) {
        return
      }
      if (flag === 'equal') {
        // 获取该列中第一个不为空的数据(内容)
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i][str].length > 0) {
            // console.log('该列数据[0]:', arr1[0][str])
            columnContent = arr1[i][str]
            break
          }
        }
      } else {
        // 获取该列中最长的数据(内容)
        let index = 0
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i][str] === null) {
            return
          }
          const now_temp = arr1[i][str] + ''
          const max_temp = arr1[index][str] + ''
          if (now_temp.length > max_temp.length) {
            index = i
          }
        }
        columnContent = arr1[index][str]
      }
      // console.log('该列数据[i]:', columnContent)
      // 以下分配的单位长度可根据实际需求进行调整
      let flexWidth = 0
      for (const char of columnContent) {
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 8
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          flexWidth += 22
        } else {
          // 其他种类字符，为字符分配8个单位宽度
          flexWidth += 8
        }
      }
      if (flexWidth < 80) {
        // 设置最小宽度
        flexWidth = 80
      }
      // if (flexWidth > 250) {
      //   // 设置最大宽度
      //   flexWidth = 250
      // }
      console.log(flexWidth,'flexWidth')
      return flexWidth + 'px'
    },
    handlesetMixArea(row){
      this.$confirm("确定要混合区域吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await setMixArea(row.id)
          if (res.code === '0') {
            this.queryTaskList()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
          .catch((err) => { console.log(err) });
   
    },
    async queryEnumList(){
      const res=await queryEnumList('WarehouseCodeEnum')
      if(res.code==='0'){
        this.options=res.data
        // this.warehouseCode=res.data[0].key
        // this.queryTaskList(208)
      }
    },
    handelWmsTaskType(val){
      // this.wmsTaskType=val 
      this.queryTaskList()
    },
    handelWarehouseCode(val){
      this.warehouseCode=val
      sessionStorage.setItem("code",this.warehouseCode)
      this.queryTaskList()
    },
    initSetTimeout() {
      this.queryTaskList()
    },
    checkSelectable(row) {
      return row.status !== -3;
    },
    handelBatchCancel() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const params = {
          mesBoxNumberQrCode: '-1',
          mesBoxNumberQrCodeList: this.multipleSelection
        }
        this.$confirm("确定要取消吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await batchPickUp(params)
          if (res.code === '0') {
            this.queryTaskList()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
          .catch((err) => { console.log(err) });
      } else {
        this.$message({
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
      }
    },
    handleSelectionChange(val) {
      let arr = []
      val.forEach((v) => {
        arr.push(v.mesBoxNumberQrCode);
      });
      this.multipleSelection = [...new Set(arr)]
    },
    async handleCancel(row) {
      const params = {
        mesBoxNumberQrCode: '-1',
        mesBoxNumberQrCodeList: [row.mesBoxNumberQrCode]
      }
      this.$confirm("确定要取消吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await batchPickUp(params)
        if (res.code === '0') {
          this.queryTaskList()
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      }).catch((err) => { console.log(err) });
    },
    search() {
      this.queryTaskList()
    },
    reset() {
      this.agvTaskNo = "";
      this.mesBoxNumberQrCode = "";
      this.queryTaskList()
    },
    handelAgvTaskNo() {
      this.queryTaskList()
    },
    handelMesBoxNumberQrCode() {
      this.queryTaskList()
    },
    async queryTaskList(val) {
      const params = {
        request: {
          wmsTaskType: this.wmsTaskType,
          agvTaskNo: this.agvTaskNo,
          mesBoxNumberQrCode: this.mesBoxNumberQrCode,
          warehouseCode:this.warehouseCode,
        },
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      }
      const res = await queryTaskList(params)
      if (res.code === '0') {
        this.data = res.data.items.map((v)=>{
          return {
            ...v,
            warehouseName:this.warehouseCode==="WAREHOUSE-D-EAST"?'东库':'西库',
          }
        });
        this.total = res.data.total;
      }else{
        this.$message.error(res.msg)
      }
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryTaskList();
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
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    padding: 6px;
  }
}
::v-deep .el-table .el-table__cell{
  padding: 0.45rem 0;
}
::v-deep .el-table__fixed::before {
  height: 0px;
} 
</style>