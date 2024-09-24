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
                @change="handelWmsTaskType"
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
                @change="handelWarehouseCode"
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
        <!-- <div class="enteringButton">
          <el-button type="primary" @click="handelBatchCancel" size="mini"
            >批量取消</el-button
          >
        </div> -->
        <!-- @selection-change="handleSelectionChange" -->
        <el-table
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          :data="data"
          style="width: 100%"
          
        >
          <!-- <el-table-column
            type="selection"
            width="50"
            :selectable="checkSelectable"
          >
          </el-table-column> -->
          <el-table-column fixed type="index" label="#" width="60"> </el-table-column>
          <!-- <el-table-column fixed label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.wmsStatus === -3||scope.row.wmsStatus === 13"
                @click="handleCancel(scope.row)"
                type="text"
                size="small"
                >取消</el-button
              >
            </template>
          </el-table-column> -->
          <el-table-column fixed prop="agvNo" label="AGV车号" width="90">
            <template slot-scope="scope">
              <span>{{
                scope.row.agvNo === null ? "暂无" : scope.row.agvNo
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
          fixed
            prop="agvTaskNo"
            label="任务编号"
            width="220"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <!-- <el-table-column
            fixed
            prop="agvTaskStatusEnum"
            label="AGV任务状态名称"
          >
          </el-table-column> -->
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="mesBoxNo"
            label="箱号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="mesBoxNumberQrCode"
            label="成品箱二维码"
            width="200"
          >
          </el-table-column>
          <el-table-column  prop="warehouseName"  label="库房"> </el-table-column>
          <el-table-column  prop="mesCustomerShortName"  label="客户简称"> </el-table-column>
          <el-table-column prop="mesMeterLength" label="重量" width="80">
          </el-table-column>
          <el-table-column prop="mesMeterLength" label="米长" width="80">
          </el-table-column>
          <el-table-column  prop="mesNormsName" label="规格简称" width="130">
          </el-table-column>
          <el-table-column prop="mesWheelType" label="轮型" width="100"> </el-table-column>     
          <!-- <el-table-column prop="wmsStatusEnum" label="库位状态名称" width="120">
          </el-table-column> -->
          <el-table-column
            prop="wmsTaskTypeEnum"
            label="任务类型"
            :show-overflow-tooltip="true"
            width="150"
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
  import { taskQueryTaskList, queryTaskHistoryList} from '@/api/transportationTasks'
  import {queryEnumList} from '@/api/storeIn'
  export default {
    name: "history",
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
        wmsTaskType:1,
        multipleSelection: [],
        updateInterval: null,
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
      this.queryTaskHistoryList()
      // this.updateInterval= setInterval(() => {
      //   this.initSetTimeout()
      // }, 15000)
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
            this.queryTaskHistoryList()
          }
        },
        immediate:true,
        deep:true,
      }
    },
    methods: {
        handelWmsTaskType(){this.queryTaskHistoryList()},
      async queryEnumList(){
        const res=await queryEnumList('WarehouseCodeEnum')
        if(res.code==='0'){
          this.options=res.data
        }
      },
      handelWarehouseCode(val){
        this.warehouseCode=val
        sessionStorage.setItem("code",this.warehouseCode)
        this.queryTaskHistoryList()
      },
      initSetTimeout() {
        this.queryTaskHistoryList()
      },
    //   checkSelectable(row) {
    //     return row.status !== -3;
    //   },
    //   handelBatchCancel() {
    //     if (this.multipleSelection && this.multipleSelection.length > 0) {
    //       const params = {
    //         mesBoxNumberQrCode: '-1',
    //         mesBoxNumberQrCodeList: this.multipleSelection
    //       }
    //       this.$confirm("确定要取消吗?", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //       }).then(async () => {
    //         const res = await batchPickUp(params)
    //         if (res.code === '0') {
    //           this.queryTaskHistoryList()
    //           this.$message({
    //             message: res.msg,
    //             type: 'success',
    //             duration: 1000
    //           })
    //         } else {
    //           this.$message({
    //             message: res.msg,
    //             type: 'error',
    //             duration: 1000
    //           })
    //         }
    //       })
    //         .catch((err) => { console.log(err) });
    //     } else {
    //       this.$message({
    //         showClose: true,
    //         message: "未选择数据",
    //         type: "warning",
    //       });
    //     }
    //   },
    //   handleSelectionChange(val) {
    //     let arr = []
    //     val.forEach((v) => {
    //       arr.push(v.mesBoxNumberQrCode);
    //     });
    //     this.multipleSelection = [...new Set(arr)]
    //   },
    //   async handleCancel(row) {
    //     const params = {
    //       mesBoxNumberQrCode: '-1',
    //       mesBoxNumberQrCodeList: [row.mesBoxNumberQrCode]
    //     }
    //     this.$confirm("确定要取消吗？", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }).then(async () => {
    //       const res = await batchPickUp(params)
    //       if (res.code === '0') {
    //         this.queryTaskHistoryList()
    //         this.$message({
    //           message: res.msg,
    //           type: 'success',
    //           duration: 1000
    //         })
    //       } else {
    //         this.$message({
    //           message: res.msg,
    //           type: 'error',
    //           duration: 1000
    //         })
    //       }
    //     }).catch((err) => { console.log(err) });
    //   },
      search() {
        this.queryTaskHistoryList()
      },
      reset() {
        this.agvTaskNo = "";
        this.mesBoxNumberQrCode = "";
        // this.wmsTaskType=''
        this.queryTaskHistoryList()
      },
      handelAgvTaskNo() {
        this.queryTaskHistoryList()
      },
      handelMesBoxNumberQrCode() {
        this.queryTaskHistoryList()
      },
      async queryTaskHistoryList(val) {
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
        const res = await queryTaskHistoryList(params)
        if (res.code === '0') {
          this.data = res.data.items.map((v)=>{
            return {
              ...v,
              warehouseName:this.warehouseCode==="WAREHOUSE-D-EAST"?'东库':'西库',
            }
          });
          this.total = res.data.total;
        }
      },
      pageChange(val) {
        this.listQuery.pageNum = val.page;
        this.listQuery.pageSize = val.limit;
        this.queryTaskHistoryList();
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