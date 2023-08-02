<template>
  <div class="warpper">
    <div class="table-filter">
      <el-form :inline="true" :model="form" v-bind="$attrs">
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="value2"
            size="mini"
            type="year"
            placeholder="选择入库日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分厂选择">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格简称">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户简称">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="轮型">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="托盘">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="米长">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="箱号">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产编号">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="箱号二维码">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <div class="enteringButton">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchClick"
          size="mini"
          >查询</el-button
        >
        <el-button type="primary" @click="searchClick" size="mini"
          >导出数据</el-button
        >
      </div>
      <el-table
        height="250"
        show-summary
        sum-text="合计"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column fixed prop="id" label="序号" width="100">
        </el-table-column>
        <el-table-column fixed prop="productionNum" label="规格简称">
        </el-table-column>
        <el-table-column
          fixed
          prop="client"
          label="客户简称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="client"
          label="轮型"
          width="100"
        ></el-table-column>
        <el-table-column prop="meter" label="米长" width="100">
        </el-table-column>
        <el-table-column label="当日入库">
          <el-table-column
            prop="province"
            label="箱"
            width="120"
          ></el-table-column>
          <el-table-column prop="province" label="重量" width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column label="当日返工">
          <el-table-column
            prop="province"
            label="箱"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="重量"
            width="120"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="suttle" label="当月累计入库箱数" width="100">
        </el-table-column>
        <el-table-column prop="suttle" label="当月累计入库重量" width="100">
        </el-table-column>
        <el-table-column label="当日出库">
          <el-table-column
            prop="province"
            label="箱"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="重量"
            width="120"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="当日退货">
          <el-table-column
            prop="province"
            label="箱"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="重量"
            width="120"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="suttle" label="当月累计出库箱数" width="100">
        </el-table-column>
        <el-table-column prop="suttle" label="当月累计出库重量" width="100">
        </el-table-column>
        <el-table-column label="当日结存(每天结存)">
          <el-table-column
            prop="province"
            label="箱"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="重量"
            width="120"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="pagenation">
      <PagiNation
        :total="total"
        :page-size="20"
        :current-page="current_page"
        @current-change="currentPageChange"
      />
    </div> -->
  </div>
</template>

<script>
// import PagiNation from "@/components/PagiNation";

import { mapState } from "vuex";
// import { storeAddIndex } from "@/mixin";
// import { addStore, editStore, delStore } from "@/api/store";
export default {
  name: "year",

  //   components: { PagiNation },
  props: {
    isCollapse: {
      type: String,
    },
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40),
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          id: 1,
          productionNum: "123123",
          client: "周立",
          trimmedSize: "12",
          num: "111",
          transition: "12",
          meter: "12",
          laterallyReversed: "",
          roughWeight: 12,
          suttle: 10,
        },
        {
          id: 2,
          productionNum: "123123",
          client: "周立",
          trimmedSize: "12",
          num: "111",
          transition: "12",
          meter: "12",
          laterallyReversed: "",
          roughWeight: 12,
          suttle: 10,
        },
        {
          id: 3,
          productionNum: "123123",
          client: "周立",
          trimmedSize: "12",
          num: "111",
          transition: "12",
          meter: "12",
          laterallyReversed: "",
          roughWeight: 12,
          suttle: 10,
        },
        {
          id: 4,
          productionNum: "123123",
          client: "周立",
          trimmedSize: "12",
          num: "111",
          transition: "12",
          meter: "12",
          laterallyReversed: "",
          roughWeight: 12,
          suttle: 10,
        },
        {
          id: 5,
          productionNum: "123123",
          client: "周立",
          trimmedSize: "12",
          num: "111",
          transition: "12",
          meter: "12",
          laterallyReversed: "",
          roughWeight: 12,
          suttle: 10,
        },
      ],
      value: "",
      form: {
        form: "",
        date: [],
        name: "",
        nameIndex: "",
        type: "",
        typeIndex: "",
        transport_status: "",
        client_name: "",
        client_id: "",
      },
      addData: {
        stock: 0,
      },
      query: { name: "" },
      tableLoading: false,
    };
  },
  mixins: [storeAddIndex],
  computed: {
    ...mapState("store", {
      stock: (state) => state.stock.data,
      current_page: (state) => state.stock.current_page,
      total: (state) => state.stock.total,
    }),
  },
  methods: {
    searchClick() {},
    search: function (payload) {
      this.tableLoading = true;
      this.query.name = payload.name ? payload.name : "";
      this.$store
        .dispatch("store/getStock", {
          page: 1,
          name: this.query.name,
        })
        .then(
          (data) => {
            this.tableLoading = false;
          },
          (error) => {
            this.tableLoading = false;
          }
        );
    },
    currentPageChange: function (curPage) {
      this.tableLoading = true;
      this.$store
        .dispatch("store/getStock", {
          page: curPage,
          name: this.query.name,
        })
        .then(
          (data) => {
            this.tableLoading = false;
          },
          (error) => {
            this.tableLoading = false;
          }
        );
    },
    reflash: function () {
      this.tableLoading = true;
      this.$store
        .dispatch("store/getStock", {
          page: this.current_page,
          name: this.query.name,
        })
        .then(
          (data) => {
            this.tableLoading = false;
          },
          (error) => {
            this.tableLoading = false;
          }
        );
    },
    async addStore() {
      let res = await addStore(this.addData);
      if (res.data.status == 200) {
        this.$message.success(res.data.msg);
        this.addFormDailogVisible = false;
        //刷新库存
        this.reflash();
        //跟新库存可选项
        this.$store.dispatch("store/getStoreOptions");
      }
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempType", rowData.type);
        this.$set(rowData, "tempStock", rowData.stock);
      } else {
        rowData.isEdit = true;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempStock = rowData.stock;
      }
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    async saveRow(rowData) {
      //提交更改到服务器,拦截是否有信息被改变 节流
      if (
        rowData.name != rowData.tempName ||
        rowData.type != rowData.tempType ||
        rowData.stock != rowData.tempStock
      ) {
        let res = await editStore({
          stockId: rowData.id,
          name: rowData.tempName,
          type: rowData.tempType,
          stock: rowData.tempStock,
        });
        if (res.data.status == 200) {
          //更新数据
          rowData.name = rowData.tempName;
          rowData.type = rowData.tempType;
          rowData.stock = rowData.tempStock;
          this.$message.success("修改成功");
          //跟新库存可选项
          this.$store.dispatch("store/getStoreOptions");
          rowData.isEdit = false;
        }
      } else {
        rowData.isEdit = false;
      }
    },
    async delRow(rowData) {
      this.$confirm("是否确认执行删除操作?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(async () => {
        let res = await delStore({ stockId: rowData.id });
        if (res.data.status == 200) {
          //刷新
          this.reflash();
          this.$message.success("删除成功");
        }
      });
    },
  },
  mounted() {
    this.tableLoading = true;
    this.$store.dispatch("store/getStock", { page: 1 }).then(
      (data) => {
        this.tableLoading = false;
      },
      (error) => {
        this.tableLoading = false;
      }
    );
  },
};
</script>


<style lang="scss" scoped>
.warpper {
  .radio-group {
    width: 300px;
    margin-bottom: 10px;
  }
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px 0;
    .search-coloct {
      height: 48px;
      overflow: hidden;
    }
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
    margin-top: 20px;
    padding: 12px;
  }
}
::v-deep .el-date-editor.el-input,
::v-deep .el-radio-group {
  width: 182px;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-form-item:nth-last-child(2) {
  margin-left: 10px;
}
</style>