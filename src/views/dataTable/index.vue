 <template>
  <div class="warpper">
    <div class="table" v-if="data && data.length > 0">
      <div class="header">
        <h2 class="name">{{ data[0].customerFullName }}</h2>
      </div>
      <el-descriptions class="margin-top" :column="3">
        <el-descriptions-item label="规格简称">{{
          data[0].normsName
        }}</el-descriptions-item>
        <el-descriptions-item label="米长">{{
          data[0].meterLength
        }}</el-descriptions-item>
        <el-descriptions-item label="轮型">{{
          data[0].wheelType
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- :span-method="handleSpanMethod" -->
      <el-table
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        size="mini"
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column label="计划备货箱数" >
          <el-table-column >
            <template slot-scope="scope">
              <span> {{ "L：" + scope.row.props }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span> {{ "R：" + scope.row.right }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="已备货箱数" width="90">
          <el-table-column>
            <template slot-scope="scope">
              <span> {{ "L：" + scope.row.left }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span> {{ "R：" + scope.row.Rright }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="备货中箱数" >
          <el-table-column>
            <template slot-scope="scope">
              <span> {{ "L：" + scope.row.lStock }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span> {{ "R：" + scope.row.rStock }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <li class="nowTime">{{ nowTime }}</li>
      <!-- <el-table
        :data="tableData"
        border
        class="exporttable"
        style="width: 100%; background: #000"
        :header-cell-style="{
          textAlign: 'center',
          height: '0px',
          padding: '0',
          color: 'red',
          background: '#000',
        }"
        size="mini"
        :row-style="{ height: '0px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column
          v-for="(item, ind) in columns"
          :key="ind"
          :label="item.label"
        >
          <el-table-column prop="props"></el-table-column>
          <el-table-column prop="right"></el-table-column>
        </el-table-column>
      </el-table> -->
    </div>
    <div v-else class="box">
      <div class="noDeliverySchedule">
        <h1 class="text">无发货计划</h1>
      </div>
      <li class="nowTime">{{ nowTime }}</li>
    </div>
    <!-- <div class="table">
      <el-table
        :span-method="handleSpanMethod"
        :data="tableData"
        border
        style="width: 100%"
        :row-style="{ height: '0' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column
          label="待备货/备货中/发货中"
          prop="title"
          width="161"
        ></el-table-column>
        <el-table-column
          v-for="(item, ind) in columns"
          :key="ind"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          :height="item.height"
        >
        </el-table-column>
      </el-table>
      <div class="nowTime">{{ nowTime }}</div>
    </div> -->
    <!-- <div class="pagenation">
      <PageNation
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="pageChange"
      />
    </div> -->
  </div>
</template>

<script>
import { stockingAreaPlan } from "@/api/screen";
export default {
  name: "dataTable",
  data() {
    return {
      tableData: [],
      MKList: [],
      row: ["L面", "R面", "客户全称", "规格简称", "米长", "轮型"],
      columns: [
        {
          label: "计划备货箱数",
          prop: "props",
          align: "left",
          width: "110",
          height: "25",
        },
        { label: "已备货箱数", prop: "right", align: "left", width: "100", height: "", },
      ],
      mutiSelect: false,
      matrixData: [],
      listQuery: {
        pageNum: 1,
        pageSize: 15,
      },
      total: 0,
      con: "",
      updateInterval: null,
      nowTime: '',
      data: [],
    };
  },
  watch: {
    $route: {
      handler: function () {
        this.stockingAreaPlan();
        this.timeFormate(new Date());
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.updateInterval = setInterval(() => {
      this.stockingAreaPlan()
      this.timeFormate(new Date());
    }, 15000)
  },
  beforeDestroy() {
    this.nowTime = null;
    clearInterval(this.updateInterval);// 清楚定时刷新，不清除会一直运行，关闭页面也会定时刷新
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        return {
          padding: '2px 0px', background: 'black', borderRight: 'none', color: 'red'
        };
      } else {
        return {
          padding: '2px 0px', background: 'black', color: 'red'
        };
      }
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        return {
          display: 'none', borderColor: 'red', padding: '2px 0px',
        }
      }
      if (columnIndex == 2) {
        return {
          borderRight: 'none',
        }
      }
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      this.nowTime = year + '/' + month + "/" + date + ' ' + hh + ":" + mm + ':' + ss;
    },
    async stockingAreaPlan() {
      this.con = this.$route.params.url
      const res = await stockingAreaPlan(this.con);
      if (res.code === "0") {
        this.data = res.data
        if (res.data) {
          this.matrixData = res.data.map((v) => {
            let arr = [];
            for (let key in v) {
              arr.push(v[key]);
            }
            return arr;
          });
          let arr = [];
          arr = res.data.map((v, ind) => {
            return [
              {
                title: this.row[0],
                props: v.plan.left, right: v.plan.right,
                left: v.stocked.left, Rright: v.stocked.right,
                lStock: v.plan.left - v.stocked.left, rStock: v.plan.right - v.stocked.right
              },
              // {
              //   title: this.row[1],
              //   props: v.stocked.left,
              //   right: v.stocked.right,
              // },
              // { title: this.row[2], props: v.customerFullName },
              // { title: this.row[3], props: v.normsName },
              // { title: this.row[4], props: v.meterLength },
              // { title: this.row[5], props: v.wheelType },
              // { title: "" },
            ];
          });
          this.tableData = arr.flat(1);
        }
      }
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      // this.queryGoodsList();
    },
    handleSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 1 &&
        row.title !== "L面" &&
        columnIndex === 1 &&
        row.title !== "R面"
      ) {
        return {
          rowspan: 1,
          colspan: 2,
        };
      }
      //   if (row.title === "") {
      //     return {
      //       rowspan: 1,
      //       colspan: 3,
      //     };
      //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  height: 100%;
  background: #000;
  color: red;
  .box {
    height: 100%;
    .noDeliverySchedule {
      font-size: 30px;
      display: flex;
      height: 100%;
      .text {
        width: 100%;
        text-align: center;
        align-self: center;
      }
    }
    .nowTime {
      position: fixed;
      right: 20px;
      bottom: 6px;
    }
  }
  .table {
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    .name {
      text-align: center;
    }
    .nowTime {
      float: right;
      margin-top: 10px;
    }
  }
}
::v-deep .el-descriptions {
  margin-top: 4px;
}
::v-deep .el-descriptions__body {
  background: black !important;
  color: red;
}
::v-deep .el-table thead.is-group th.el-table__cell {
  background: black;
  color: red;
  font-size: 14px;
}
::v-deep .el-table--border {
  border: 1px solid red;
}
::v-deep .el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
  border-bottom: 1px solid red;
}
::v-deep .el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid red;
}
::v-deep .el-table .cell {
  color: red;
  line-height: unset;
}
::v-deep .el-table::before {
  height: 0px;
  background: transparent;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
::v-deep .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none;
}
::v-deep .el-table--border::after,
::v-deep .el-table--group::after,
::v-deep .el-table::before {
  content: "";
  position: absolute;
  background-color: transparent;
  z-index: 1;
}
// ::v-deep .el-table td,
// ::v-deep .el-table th.is-leaf,
// ::v-deep .el-table--border,
// ::v-deep .el-table--group {
//   border-color: red;
// }
// ::v-deep .el-table--border::after,
// ::v-deep .el-table--group::after,
// ::v-deep .el-table::before {
//   background-color: red;
// }
// ::v-deep .el-table thead.is-group th.el-table__cell {
//   background: black;
//   color: red;
//   padding: 4px 0;
// }
// ::v-deep .el-table--border th.el-table__cell,
// .el-table__fixed-right-patch {
//   border-bottom: 0.0625rem solid red;
// }
// ::v-deep .el-table .cell {
//   padding: 4px 0;
// }
</style>