<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'120px'"
        size="mini"
        :maxShow="5"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="搜索框">
          <el-input
            size="mini"
            v-model="form.keyWord"
            @change="handelKeyWord"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="form.status"
            @change="handelStatus"
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
        <el-form-item label="盘点创建时间">
          <el-date-picker
            size="mini"
            v-model="form.createTimeStart"
            type="date"
            placeholder="开始时间"
            @change="handelCreateTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="盘点结束时间">
          <el-date-picker
            size="mini"
            v-model="form.createTimeEnd"
            type="date"
            placeholder="结束时间"
            @change="handelCreateTimeEnd"
          >
          </el-date-picker>
        </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <div class="enteringButton">
        <el-button type="primary" @click="handelInventoryPlan" size="mini"
          >创建盘点计划</el-button
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
        <el-table-column prop="name" label="盘点单"> </el-table-column>
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
        <el-table-column prop="checkPlanUser" label="盘点人名称" width="100">
        </el-table-column>
        <el-table-column prop="finishedTime" label="完成时间">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleDetail(scope.$index, scope.row)"
              >明细</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.status === 0"
              @click="handleDelete(scope.$index, scope.row)"
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
    <el-dialog title="明细表" :visible.sync="dialogVisible" width="90%">
      <div class="header">
        <el-row>
          <el-col>
            <ul>
              <span>盘点单主表编号：</span>
              <span>{{ tableHeader.code }}</span>
            </ul>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <ul>
              <span>盘点人：</span>
              <span>{{ tableHeader.checkPlanUser }}</span>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <span>盘点单创建时间：</span>
              <span>{{ tableHeader.createTime }}</span>
            </ul>
          </el-col>
        </el-row>
      </div>
      <el-table border :data="detail" style="width: 100%; margin-top: 30px">
        <el-table-column prop="index" label="序号" width="50" fixed>
        </el-table-column>
        <el-table-column prop="customerShortName" label="客户简称" width="120">
        </el-table-column>
        <el-table-column prop="mesNormsName" label="MES规格名称">
        </el-table-column>
        <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <el-table-column prop="mesLeftRightSides" label="MES左右面">
        </el-table-column>
        <el-table-column prop="mesTray" label="托盘"></el-table-column>
        <el-table-column prop="checkPlanCount" label="盘点箱数">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.flag"
              v-model="scope.row.checkPlanCount"
            ></el-input>
            <div v-else>{{ scope.row.checkPlanCount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="checkPlanLoss" label="盘亏数量">
        </el-table-column>
        <el-table-column prop="checkPlanProfit" label="盘盈数量">
        </el-table-column>
        <el-table-column prop="functionAreaCode" label="功能类型下的分区编号">
        </el-table-column>
        <el-table-column prop="functionCode" label="功能类型编号">
        </el-table-column>
        <el-table-column prop="functionTypeEnum" label="功能类型">
        </el-table-column>
        <el-table-column prop="statusEnum" label="是否完成">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.flag"
              v-model="scope.row.statusEnum"
            ></el-input>
            <div v-else>{{ scope.row.statusEnum }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="checkPlanFinishedTime" label="盘点完成时间">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.status"
              type="text"
              class="edit-btn"
              size="mini"
              @click="editRow(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.flag"
              type="text"
              class="edit-btn"
              size="mini"
              @click="saveRow(scope.row)"
              >保存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="创建盘点计划" :visible.sync="dialogVisible_1" width="35%">
      <el-form
        ref="numberValidateForm"
        :model="obj"
        label-width="110px"
        size="mini"
      >
        <el-form-item label="盘点人">
          <el-select
            v-model="obj.userName"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading_1"
            @focus="repeatList"
            @change="handleSelectBranchCom"
          >
            <el-option
              v-for="(item, ind) in options"
              :key="ind"
              :label="item.showValue"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点计划名称">
          <el-input
            v-model="obj.name"
            placeholder="请输入盘点计划名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="盘点计划集合">
          <div class="background">
            <div
              class="backgroundItem"
              v-for="(v, ind) in obj.checkPlanList"
              :key="ind"
            >
              <el-form-item
                :prop="`checkPlanList[${ind}].WareHouse`"
                label="库房编号"
                style="margin-top: 8px"
                :rules="{
                  required: true,
                  message: '请选择库房编号',
                }"
              >
                <el-select
                  v-model="v.WareHouse"
                  placeholder="请选择库房编号"
                  @change="handelChangeWareHouse"
                >
                  <el-option
                    v-for="item in WareHouseOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`checkPlanList[${ind}].functionType`"
                label="功能区类型"
                style="margin-top: 8px"
                :rules="{
                  required: true,
                  message: '请选择功能区类型',
                }"
              >
                <el-select
                  v-model="v.functionType"
                  placeholder="请选择功能区类型"
                  @change="handelfunctionType"
                >
                  <el-option
                    v-for="item in functionTypeOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`checkPlanList[${ind}].functionCode`"
                label="功能类型编号"
                style="margin-top: 8px"
                :rules="{
                  required: true,
                  message: '请选择功能类型编号',
                }"
              >
                <el-select
                  v-model="v.functionCode"
                  placeholder="请选择功能类型编号"
                  @change="handelfunctionCode($event, ind)"
                >
                  <el-option
                    v-for="item in functionCodeOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`checkPlanList[${ind}].functionAreaCode`"
                label="功能类型编号"
                style="margin-top: 8px"
                :rules="{
                  required: true,
                  message: '请选择功能类型编号',
                }"
              >
                <el-select
                  v-model="v.functionAreaCode"
                  placeholder="请选择功能类型编号"
                  @change="handelfunctionAreaCode"
                >
                  <el-option
                    v-for="item in functionAreaCodeOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`checkPlanList[${ind}].colIndexAlias`"
                label="功能类型编号"
                style="margin-top: 8px"
                :rules="{
                  required: true,
                  message: '请选择功能类型编号',
                }"
              >
                <el-select
                  v-model="v.colIndexAlias"
                  placeholder="请选择功能类型编号"
                  @change="handelcolIndexAlias($event, ind)"
                >
                  <el-option
                    v-for="item in colIndexAliasOptions"
                    :key="item.key"
                    :label="item.key"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <i class="iconfont el-icon-close" @click="handelDelete(ind)"></i>
            </div>
            <el-button
              @click="handelAddItem('numberValidateForm')"
              type="primary"
              size="small"
              icon="el-icon-plus"
              plain
              >Add Item</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handelConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import {
  queryCheckPlanList,
  queryCheckPlanDetailList,
  createCheckPlan,
  editCheckPlanDetail,
  checkPlanDelete,
  sysUserGetUserList,
} from "@/api/inventoryPlan";
import { queryWarehouseColDropDown } from "@/api/location";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "InventoryPlan",
  components: { PageNation, SearchFilter },
  data() {
    return {
      showBtn: false,
      statusOptions: [
        {
          key: 0,
          value: "未开始",
        },
        {
          key: 1,
          value: "盘点中",
        },
        {
          key: 2,
          value: "已完成",
        },
      ],
      data: [],
      loading: true,
      loading_1: true,
      dialogVisible: false,
      dialogVisible_1: false,
      total: 0,
      detail: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      form: {
        createTimeEnd: "",
        createTimeStart: "",
        keyWord: "",
        status: "",
      },
      obj: {
        name: "",
        userName: "",
        workNo: "",
        checkPlanList: [
          {
            WareHouse: "",
            areaCode: "",
            colIndexAlias: "",
            functionAreaCode: "",
            functionCode: "",
            functionType: "",
          },
        ],
      },
      WareHouse: "",
      areaCode: "",
      colIndexAlias: "",
      functionAreaCode: "",
      functionCode: "",
      functionType: "",
      WareHouseOptions: [],
      functionTypeOptions: [],
      functionCodeOptions: [],
      functionAreaCodeOptions: [],
      colIndexAliasOptions: [],
      multipleSelection: [],
      tableHeader: "",
      mainCode: "",
      userInfo: { userName: "", workNo: "" },
      options: [],
      value: "",
      arr: [],
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("data"));
    this.userInfo = {
      userName: user.username,
      workNo: user.workNo,
    };
    this.queryCheckPlanList();
  },
  methods: {
    // handelUnfold(ind) {
    //   console.log(ind);
    //   this.obj.checkPlanList.forEach((v, index) => {
    //     if (index === ind) {
    //       v.flag = !v.flag;
    //     }
    //   });
    // },
    async remoteMethod(keyWord) {
      if (keyWord !== "") {
        const params = {
          keyWord,
        };
        const res = await sysUserGetUserList(params);
        console.log(res, "res");
        if (res.code === "0") {
          this.options = res.data.filter((v) => {
            return v.showValue.includes(keyWord);
          });
          this.loading_1 = false;
        }
      } else {
        this.options = [];
      }
    },
    repeatList() {
      this.obj.userName = "";
      this.options = [];
    },
    handleSelectBranchCom(val) {
      this.options.forEach((v) => {
        if (v.username === val) {
          this.obj.workNo = v.workNo;
        }
      });
    },
    search() {
      this.queryCheckPlanList();
    },
    reset() {
      this.form = {
        createTimeEnd: "",
        createTimeStart: "",
        keyWord: "",
        status: "",
      };
      this.queryCheckPlanList();
    },
    handelKeyWord(val) {
      this.form.keyWord = val;
      this.queryCheckPlanList();
    },
    handelStatus(val) {
      this.form.status = val;
      this.queryCheckPlanList();
    },
    handelCreateTimeStart(val) {
      this.form.createTimeStart = moment(val).valueOf();
      this.queryCheckPlanList();
    },
    handelCreateTimeEnd(val) {
      this.form.createTimeEnd = moment(val).valueOf();
      this.queryCheckPlanList();
    },
    async queryCheckPlanList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryCheckPlanList(params);
      if (res.code === "0") {
        this.loading = false;
        this.data = res.data.items;
        this.total = res.data.total;
      }
    },
    async queryCheckPlanDetailList(mainCode) {
      const res = await queryCheckPlanDetailList(mainCode);
      if (res.code === "0") {
        this.detail = res.data.map((v, index) => {
          return {
            ...v,
            flag: false,
            index: index + 1,
          };
        });
      }
    },
    handleDetail(index, row) {
      this.dialogVisible = true;
      this.tableHeader = row;
      this.mainCode = row.code;
      this.queryCheckPlanDetailList(this.mainCode);
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryCheckPlanList();
    },
    async handelInventoryPlan() {
      this.dialogVisible_1 = true;
      const res = await queryWarehouseColDropDown({});
      if (res.code === "0") {
        this.WareHouseOptions = res.data;
      }
    },
    async handelChangeWareHouse(val) {
      if (val) {
        this.WareHouse = val;
        const params = { warehouseCode: this.WareHouse };
        const res = await queryWarehouseColDropDown(params);
        if (res.code === "0") {
          this.functionTypeOptions = res.data;
        }
      }
    },
    async handelfunctionType(val) {
      if (val) {
        this.functionType = val;
        const params = { warehouseCode: this.WareHouse, functionType: val };
        const res = await queryWarehouseColDropDown(params);
        if (res.code === "0") {
          this.functionCodeOptions = res.data;
        }
      }
    },
    async handelfunctionCode(val, ind) {
      if (val) {
        this.functionCode = val;
        const params = {
          warehouseCode: this.WareHouse,
          functionType: this.functionType,
          functionCode: val,
        };
        const res = await queryWarehouseColDropDown(params);
        if (res.code === "0") {
          this.functionAreaCodeOptions = res.data;
        }
      }
    },
    async handelfunctionAreaCode(val) {
      if (val) {
        this.functionAreaCode = val;
        const params = {
          warehouseCode: this.WareHouse,
          functionType: this.functionType,
          functionCode: this.functionCode,
          functionAreaCode: val,
        };
        const res = await queryWarehouseColDropDown(params);
        if (res.code === "0") {
          this.colIndexAliasOptions = res.data;
        }
      }
    },
    async handelcolIndexAlias(val, ind) {
      if (val) {
        this.colIndexAliasOptions.forEach((v) => {
          if (v.key === val) {
            this.areaCode = v.value;
          }
        });
        this.obj.checkPlanList.forEach((v, index) => {
          if (ind === index) {
            v.areaCode = this.areaCode;
          }
        });
      }
    },
    // 添加 每一项
    handelAddItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.obj.checkPlanList.push({
            areaCode: "",
            colIndexAlias: "",
            functionAreaCode: "",
            functionCode: "",
            functionType: "",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除每一项
    handelDelete(ind) {
      this.obj.checkPlanList.forEach((v, index) => {
        if (index === ind) {
          this.obj.checkPlanList.splice(ind, 1);
        }
      });
    },
    handelCancel() {
      this.dialogVisible_1 = false;
      this.obj = {
        name: "",
        userName: "",
        workNo: "",
        checkPlanList: [
          {
            areaCode: "",
            colIndexAlias: "",
            functionAreaCode: "",
            functionCode: "",
            functionType: "",
          },
        ],
      };
    },
    async handelConfirm() {
      const params = {
        ...this.obj,
      };
      const res = await createCheckPlan(params);
      if (res.code === "0") {
        this.queryCheckPlanList();
        this.dialogVisible_1 = false;
      }
    },
    // 批量删除 选择 盘点单
    handleSelectionChange(val) {
      val.forEach((v) => {
        this.multipleSelection.push(v.id);
      });
    },
    checkSelectable(row) {
      return row.status === 0;
    },
    // 单个删除
    async handleDelete(index, row) {
      const res = await checkPlanDelete([row.id]);
      if (res.code === "0") {
        this.queryCheckPlanList();
      }
    },
    async handelBatchDelate() {
      const res = await checkPlanDelete(this.multipleSelection);
      if (res.code === "0") {
        this.queryCheckPlanList();
      }
    },
    // 编辑明细表
    async editRow(row) {
      this.$set(row, "flag", true);
    },
    async saveRow(row) {
      let params = {};
      this.detail.forEach((v) => {
        if (
          v.checkPlanCount !== row.checkPlanCount &&
          v.statusEnum === row.statusEnum
        ) {
          params = {
            checkPlanCount: row.checkPlanCount,
            id: row.id,
            ...this.userInfo,
          };
        } else if (
          v.checkPlanCount === row.checkPlanCount &&
          v.statusEnum !== row.statusEnum
        ) {
          params = {
            status: row.statusEnum === "是" ? 1 : 0,
            id: row.id,
            ...this.userInfo,
          };
        }
      });
      const res = await editCheckPlanDetail(params);
      if (res.code === "0") {
        this.queryCheckPlanDetailList(this.mainCode);
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
    padding: 10px 0;
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
  .background {
    background: #f5f5f5;
    border-radius: 10px;
    padding: 8px 10px;
    .backgroundItem {
      padding: 15px 10px;
      margin-bottom: 10px;
      background: #f0f0f0;
      border-radius: 10px;
      position: relative;
      // .fold {
      //   .btn {
      //     width: 100%;
      //     position: absolute;
      //     bottom: -18px;
      //     left: 50%;
      //     z-index: 999;
      //   }
      // }
      // .packUp {
      //   height: 50px;
      //   overflow: hidden;
      //   padding: 0 10px;
      //   .btn {
      //     width: 100%;
      //     position: absolute;
      //     bottom: -18px;
      //     left: 50%;
      //     z-index: 999;
      //   }
      // }
    }
    .iconfont {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 20px;
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
  width: 180px;
}
</style>