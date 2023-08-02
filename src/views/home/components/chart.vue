 <template>
  <div class="warpper">
    <div class="table">
      <el-table
        :span-method="handleSpanMethod"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column label="标题" align="center">
          <el-table-column
            label="待备货/备货中/发货中"
            prop="title"
            width="180"
          ></el-table-column>
          <el-table-column
            v-for="(item, ind) in columns"
            :key="ind"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
          >
          </el-table-column>
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
import { stockingAreaPlan } from "@/api/screen";
import PageNation from "@/components/Pagination";
export default {
  name: "home",
  components: {
    PageNation,
  },
  data() {
    return {
      tableData: [],
      MKList: [],
      row: ["L面", "R面", "客户全程", "规格简称", "米长", "轮型"],
      columns: [
        {
          label: "计划备货箱数",
          prop: "props",
          align: "left",
        },
        { label: "已备货箱数", prop: "right", align: "left" },
      ],
      mutiSelect: false,
      matrixData: [],
      listQuery: {
        pageNum: 1,
        pageSize: 15,
      },
      total: 0,
    };
  },
  mounted() {
    // 加入标题
    // this.stockingAreaPlan();
  },
  methods: {
    async stockingAreaPlan() {
      const params = {};
      const res = await stockingAreaPlan(params);
      console.log(res, 'res')
      if (res.code === "0") {
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
            { title: this.row[0], props: v.plan.left, right: v.plan.right },
            {
              title: this.row[1],
              props: v.stocked.left,
              right: v.stocked.right,
            },
            { title: this.row[2], props: v.customerFullName },
            { title: this.row[3], props: v.normsName },
            { title: this.row[4], props: v.meterLength },
            { title: this.row[5], props: v.wheelType },
            { title: "" },
          ];
        });
        this.tableData = arr.flat(1);
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
      if (row.title === "") {
        return {
          rowspan: 1,
          colspan: 3,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  // .table-filter {
  //   box-sizing: border-box;
  //   background-color: #fff;
  //   padding: 20px 0;
  //   .search-coloct {
  //     height: 48px;
  //     overflow: hidden;
  //   }
  // }

  .table {
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    // .enteringButton {
    //   margin-bottom: 10px;
    // }
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
</style>