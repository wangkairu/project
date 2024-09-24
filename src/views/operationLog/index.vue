<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'100px'"
        size="mini"
        :maxShow="5"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="开始时间">
          <el-date-picker
            size="mini"
            v-model="form.createTimeStart"
            type="date"
            placeholder="操作开始时间"
            @change="handelCreateTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            size="mini"
            v-model="form.createTimeEnd"
            type="date"
            placeholder="操作结束时间"
            @change="handelCreateTimeEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            @change="handelIsSuccess"
            v-model="form.isSuccess"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日志类型">
          <el-select
            @change="handelLogType"
            v-model="form.logType"
            placeholder="请选择日志类型"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求类型">
          <el-select
            @change="handelRequestType"
            v-model="form.requestType"
            placeholder="请选择请求类型"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column prop="ip" label="Ip" width="140"> </el-table-column>
        <el-table-column prop="requestType" label="请求类型" width="100">
        </el-table-column>
        <el-table-column
          prop="operateType"
          label="操作类型"
          width="100"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="logTypeEnum" label="日志类型" width="100">
        </el-table-column>
        <el-table-column
          prop="logContent"
          label="日志内容"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="isSuccess" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isSuccess === true" type="success">
              成功
            </el-tag>
            <el-tag v-else type="danger">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-permission="{ name: 'isDelete' }"
              type="text"
              size="mini"
              class="edit-btn"
              @click="$emit('delRow', scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagenation">
      <PagiNation
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
import PagiNation from "@/components/Pagination";
import { queryLogList } from "@/api/operationLog";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "operationLog",
  components: { PagiNation, SearchFilter },
  data() {
    return {
      form: {
        createTimeEnd: "",
        createTimeStart: "",
        isSuccess: "",
        logType: "",
        requestType: "",
      },
      options: [
        { label: "成功", value: 1 },
        { label: "失败", value: 0 },
      ],
      options1: [
        { label: "登录日志", value: 1 },
        { label: "操作日志", value: 2 },
      ],
      options2: [
        { label: "POST", value: 1 },
        { label: "GET", value: 2 },
        { label: "DELETE", value: 3 },
        { label: "PUT", value: 4 },
      ],
      tableData: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.queryLogList();
  },
  methods: {
    async queryLogList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum,
        size: this.listQuery.pageSize,
      };
      const res = await queryLogList(params);
      if (res.code === "0") {
        this.tableData = res.data.items;
        this.total = res.data.total;
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
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryLogList();
    },
    search() {
      this.queryLogList();
    },
    reset() {
      this.form = {};
      this.queryLogList();
    },
    handelCreateTimeStart(val) {
      this.form.createTimeStart = moment(val).valueOf();
      this.queryLogList();
    },
    handelCreateTimeEnd(val) {
      this.form.createTimeEnd = moment(val).valueOf();
      this.queryLogList();
    },
    handelRequestType(val) {
      this.form.requestType = val;
      this.queryLogList();
    },
    handelLogType(val) {
      this.form.logType = val;
      this.queryLogList();
    },
    handelIsSuccess(val) {
      this.form.isSuccess = val;
      this.queryLogList();
    },
  },
};
</script>


<style lang="scss" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    // border-radius: 10px;
    padding: 10px 15px;
  }
  .table {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px;
    padding: 20px;
    overflow: hidden;
    flex: 1;
    .enteringButton {
      margin-bottom: 10px;
      // border-bottom: 1px solid #ccc;
      padding: 8px 0;
    }
  }
  .control {
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px;
    padding: 10px;
    overflow: hidden;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px;
    padding: 6px;
    overflow: hidden;
  }
}
::v-deep .el-drawer__body {
  padding: 0 16px;
}
::v-deep .el-table .el-table__cell{
  padding: 0.54rem 0;
}
</style>