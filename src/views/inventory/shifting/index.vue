<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'150px'"
        size="mini"
        :maxShow="6"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="移库单创建-开始时间">
          <el-date-picker
            size="mini"
            v-model="form.createTimeStart"
            type="date"
            placeholder="开始时间"
            @change="handelCreateTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="移库单创建-结束时间">
          <el-date-picker
            size="mini"
            v-model="form.createTimeEnd"
            type="date"
            placeholder="结束时间"
            @change="handelCreateTimeEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="移库单完成-开始时间">
          <el-date-picker
            size="mini"
            v-model="form.finishedTimeStart"
            type="date"
            placeholder="开始时间"
            @change="handelFinishedTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="移库单完成-结束时间">
          <el-date-picker
            size="mini"
            v-model="form.finishedTimeEnd"
            type="date"
            placeholder="结束时间"
            @change="handelFinishedTimeEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="搜索框">
          <el-input
            size="mini"
            v-model="form.keyWord"
            placeholder="请输入内容"
            @keyup.enter.native="selectBlur"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            clearable
            @change="handelStatus"
            v-model="form.status"
            placeholder="请选择状态"
            size="mini"
          >
            <el-option
              v-for="item in statusOptions"
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
        <el-button type="primary" @click="dialogVisible_1 = true" size="mini"
          >创建移库单</el-button
        >
        <el-button type="primary" @click="handelBatchDelate" size="mini"
          >批量删除</el-button
        >
      </div>
      <el-table
        v-loading="loading"
        height="480"
        border
        style="width: 100%"
        :data="data"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :selectable="checkSelectable"
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="id" label="ID" width="60"> </el-table-column>
        <el-table-column prop="name" label="移库名称"> </el-table-column>
        <el-table-column prop="statusEnum" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.statusEnum === '未开始'">{{
              scope.row.statusEnum
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.statusEnum === '已完成'"
              type="success"
              >{{ scope.row.statusEnum }}</el-tag
            >
            <el-tag v-else type="info">{{ scope.row.statusEnum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="finishedTime" label="移库完成时间">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)"
              >明细</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.status === 0"
              @click="handleDelete(scope.row)"
              >删除</el-button
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
    <el-dialog title="明细表" :visible.sync="dialogVisible" width="50%">
      <div class="header">
        <el-row>
          <el-col>
            <ul>
              <span>移库单主表编号：</span>
              <span>{{ tableHeader.code }}</span>
            </ul>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <ul>
              <span>移库名称：</span>
              <span>{{ tableHeader.name }}</span>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <span>移库单创建时间：</span>
              <span>{{ tableHeader.createTime }}</span>
            </ul>
          </el-col>
        </el-row>
      </div>
      <el-table border :data="detail" style="width: 100%; margin-top: 30px">
        <el-table-column prop="index" label="序号" width="50">
        </el-table-column>
        <el-table-column
          prop="warehouseCodeBefore"
          label="移库前库位编号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="warehouseCodeAfter"
          label="移库后库位编号"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="statusEnum" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.statusEnum === '未开始'">{{
              scope.row.statusEnum
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.statusEnum === '已完成'"
              type="success"
              >{{ scope.row.statusEnum }}</el-tag
            >
            <el-tag v-else type="info">{{ scope.row.statusEnum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finishedTime" label="移库完成时间" width="200">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <CreteShifting
      :dialogVisible_1="dialogVisible_1"
      @handelClose="handelClose"
      @handelConfirm="handelConfirm"
    ></CreteShifting>
  </div>
</template>
<script>
import CreteShifting from "./components/createShifting.vue";
import PageNation from "@/components/Pagination";
import { queryMoveList, queryMoveDetailList, deleteMove } from "@/api/shifting";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "shifting",
  components: { PageNation, SearchFilter, CreteShifting },
  data() {
    return {
      dialogVisible_1: false,
      dialogVisible: false,
      data: [],
      listQuery: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      loading: true,
      detail: [],
      multipleSelection: [],
      tableHeader: {},
      form: {
        keyWord: "",
        status: "",
        createTimeEnd: "",
        createTimeStart: "",
        finishedTimeEnd: "",
        finishedTimeStart: "",
      },
      statusOptions: [
        {
          key: 0,
          value: "未开始",
        },
        {
          key: 1,
          value: "移库中",
        },
        {
          key: 2,
          value: "已完成",
        },
      ],
    };
  },
  mounted() {
    this.queryMoveList();
  },
  methods: {
    handelClose(val) {
      this.dialogVisible_1 = val;
    },
    handelConfirm() {
      this.dialogVisible_1 = false;
      this.queryMoveList();
    },
    search() {
      this.queryMoveList();
    },
    reset() {
      this.form = {
        keyWord: "",
        status: "",
        createTimeEnd: "",
        createTimeStart: "",
        finishedTimeEnd: "",
        finishedTimeStart: "",
      };
      this.queryMoveList();
    },
    selectBlur() {
      this.queryMoveList();
    },
    handelStatus() {
      this.queryMoveList();
    },
    handelCreateTimeStart(val) {
      this.form.createTimeStart = moment(val).valueOf();
      this.queryMoveList();
    },
    handelCreateTimeEnd(val) {
      this.form.createTimeEnd = moment(val).valueOf();
      this.queryMoveList();
    },
    handelFinishedTimeEnd(val) {
      this.form.finishedTimeEnd = moment(val).valueOf();
      this.queryMoveList();
    },
    handelFinishedTimeStart(val) {
      this.form.finishedTimeStart = moment(val).valueOf();
      this.queryMoveList();
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryMoveList();
    },
    async queryMoveList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryMoveList(params);
      if (res.code === "0") {
        this.data = res.data.items;
        this.loading = false;
        this.total = res.data.total;
      }
    },
    // 批量删除 选择 盘点单
    handleSelectionChange(val) {
      val.forEach((v) => {
        this.multipleSelection.push(v.id);
      });
    },
    // 删除单个
    async handleDelete(row) {
      this.deleteMove([row.id]);
    },
    checkSelectable(row) {
      return row.status === 0;
    },
    async handelBatchDelate() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.deleteMove(this.multipleSelection);
      } else {
        this.$message({
          showClose: true,
          message: "未选择数据",
          type: "warning",
        });
      }
    },
    async deleteMove(arr) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteMove(arr);
          if (res.code === "0") {
            this.queryMoveList();
          }
        })
        .catch(() => {});
    },
    // 查看明细单
    async handleDetail(row) {
      this.tableHeader = row;
      const res = await queryMoveDetailList(row.code);
      if (res.code === "0") {
        this.dialogVisible = true;
        this.detail = res.data.map((v, ind) => {
          return {
            ...v,
            index: ind + 1,
          };
        });
      }
    },
  },
};
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
    margin-top: 20px;
    padding: 12px;
  }
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
  width: 180px;
}
</style>