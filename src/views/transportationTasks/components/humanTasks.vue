<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'150px'"
        size="mini"
        :maxShow="4"
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
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column
          prop="mesBoxNumberQrCode"
          label="成品箱二维码"
          width="210"
        >
        </el-table-column>
        <el-table-column
          prop="mesCustomerShortName"
          label="MES客户简称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="mesNormsName" label="MES规格简称">
        </el-table-column>
        <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
            width="200"
          >
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.wmsStatus === -3"
              @click="handleCancel(scope.row)"
              type="text"
              size="small"
              >取消</el-button
            >
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
  </div>
</template>

<script>
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import { queryTaskList, manualOperationPickUp, batchPickUp } from '@/api/transportationTasks'
export default {
  name: "humanTasks",
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
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      agvTaskNo: "",
      mesBoxNumberQrCode: "",
      updateInterval: null,
      wmsTaskType:3,
      typeOptions:[
        {label:"未开始",value:0},
        {label:"WMS自动发布任务",value:1},
        {label:"WMS人工发布任务",value:2},
        {label:"人工叉车任务",value:3},
      ]
    }
  },
  mounted() {
    // this.queryTaskList()
    this.updateInterval = setInterval(() => {
      this.initSetTimeout()
    }, 15000)
  },
  beforeDestroy() {
    clearInterval(this.updateInterval);// 清楚定时刷新，不清除会一直运行，关闭页面也会定时刷新
  },
  methods: {
    handelWmsTaskType(val){
      // this.wmsTaskType = val
      this.queryTaskList()
    },
    initSetTimeout() {
      this.queryTaskList()
    },
    checkSelectable(row) {
      return row.status !== -3;
    },
    handelBatchCancel() {
      const params = {
        mesBoxNumberQrCode: "-1",
        mesBoxNumberQrCodeList: this.multipleSelection
      }
      this.$confirm("确定要取消吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await batchPickUp(params)
          if (res.code === '0') {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            this.queryTaskList()
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
        .catch(_ => { });
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
        mesBoxNumberQrCode: "-1",
        mesBoxNumberQrCodeList: [row.mesBoxNumberQrCode]
      }
      this.$confirm("确定要取消吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
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
        .catch(_ => { });
    },
    async manualOperationPickUp(params) {
      const res = await manualOperationPickUp(params)
      if (res.code === '0') {
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
    async queryTaskList() {
      const params = {
        request: {
          wmsTaskType: this.wmsTaskType,
          agvTaskNo: this.agvTaskNo,
          mesBoxNumberQrCode: this.mesBoxNumberQrCode
        },
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      }
      const res = await queryTaskList(params)
      if (res.code === '0') {
        this.data = res.data.items;
        this.total = res.data.total;
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