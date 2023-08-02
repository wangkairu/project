<template>
  <div class="warpper">
    <div class="warpper-left">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'140px'"
          size="mini"
          :maxShow="3"
          @search="search"
          @reset="reset"
        >
          <el-form-item label="批号">
            <el-input
              size="mini"
              v-model="batchNo"
              @change="handelBatchNo"
              placeholder="请输入批号"
            ></el-input>
          </el-form-item>
          <el-form-item label="批号前缀">
            <el-input
              size="mini"
              v-model="batchPrefix"
              @change="handelBatchPrefix"
              placeholder="请输入批号前缀"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户简码">
            <el-input
              size="mini"
              v-model="customerSimpleCode"
              placeholder="请输入客户简码"
              @change="handelCustomerSimpleCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="交货批次">
            <el-input
              size="mini"
              v-model="deliveryBatch"
              placeholder="请输入交货批次"
              @change="handelDeliveryBatch"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户全称">
            <el-input
              size="mini"
              v-model="mesCustomerFullName"
              placeholder="请输入客户全称"
              @change="handelMesCustomerFullName"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES客户简称">
            <el-input
              size="mini"
              v-model="mesCustomerShortName"
              placeholder="请输MES客户简称"
              @change="handelMesCustomerShortName"
            ></el-input>
          </el-form-item>
          <el-form-item label="单号">
            <el-input
              size="mini"
              v-model="no"
              @change="handelNo"
              placeholder="请输入单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货单位(发货单)">
            <el-input
              size="mini"
              v-model="receivingUnitDeliveryNote"
              placeholder="请输入收货单位(发货单)"
              @change="handelReceivingUnitDeliveryNote"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货单位(标牌)">
            <el-input
              size="mini"
              v-model="receivingUnitLabel"
              placeholder="请输入收货单位(标牌)"
              @change="handelReceivingUnitLabel"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="status"
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
          <el-form-item label="发货类型">
            <el-select
              size="mini"
              v-model="wmsDeliverType"
              @change="handelWmsDeliverType"
              placeholder="请选择发货类型"
            >
              <el-option
                v-for="item in wmsDeliverTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货单创建时间">
            <el-date-picker
              size="mini"
              v-model="createTimeStart"
              type="date"
              placeholder="开始时间"
              @change="handelCreateTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发货单创建时间">
            <el-date-picker
              size="mini"
              v-model="createTimeEnd"
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
          <el-button type="primary" @click="handelExport" size="mini"
            >导出Excel</el-button
          >
          <el-button type="primary" @click="handelReport" size="mini"
            >重新上报</el-button
          >
          <el-button type="primary" @click="stock = true" size="mini"
            >备货区清空</el-button
          >
          <el-popover placement="right" width="500" trigger="click">
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
          </el-popover>
        </div>
        <el-table
          border
          style="width: 100%"
          :data="tableData"
          height="500"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <template v-for="(col, index) in bindTableColumns">
            <template v-if="col.label === '状态'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <!-- <el-input
                    v-if="scope.row.status === 0"
                    v-model="scope.row.statusEnum"
                    placeholder="请输入状态"
                  ></el-input> -->
                  <span>
                    <el-tag
                      v-if="
                        scope.row.statusEnum === '开始备货' ||
                        scope.row.statusEnum === '未上报'
                      "
                      >{{ scope.row.statusEnum }}</el-tag
                    >
                    <el-tag
                      v-else-if="
                        scope.row.statusEnum === '确认中' ||
                        scope.row.statusEnum === '备货中'
                      "
                      type="warning"
                      >{{ scope.row.statusEnum }}</el-tag
                    >
                    <el-tag
                      v-else-if="scope.row.statusEnum === '已取消'"
                      type="danger"
                      >{{ scope.row.statusEnum }}</el-tag
                    >
                    <el-tag v-else type="success">{{
                      scope.row.statusEnum
                    }}</el-tag>
                  </span>
                </template>
              </el-table-column>
            </template>
            <!-- <template v-else-if="col.label === '发货箱数'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.row.status === 0"
                    v-model="scope.row.deliverBoxNum"
                    placeholder="请输入发货箱数"
                  ></el-input>
                  <span v-else>{{ scope.row.deliverBoxNum }}</span>
                </template>
              </el-table-column>
            </template>  -->
            <template v-else>
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
              </el-table-column>
            </template>
          </template>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                v-if="scope.row.status === 0"
                @click="handelClickDeliver(scope.$index, scope.row)"
                >确认发货</el-button
              >
              <el-button v-if="scope.row.status === 0" type="text"
                >编辑</el-button
              > -->
              <el-button
                type="text"
                @click="handleDetail(scope.$index, scope.row)"
                >明细</el-button
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
    <el-dialog title="明细表" :visible.sync="dialogVisible" width="70%">
      <!-- @confirmDetail="confirmDetail" -->
      <DetailTable
        :tableHeader="tableHeader"
        :data="data"
        @handelReplace="handelReplace"
      ></DetailTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-drawer
      title="选择明细"
      size="50%"
      :visible.sync="drawer"
      direction="rtl"
    >
      <div style="margin-bottom: 16px">
        <el-tabs v-model="leftRight" @tab-click="handelRadio">
          <el-tab-pane label="左面" name="0">
            <LeftTable
              :selectData="selectData"
              @handleChangeLeftdetailselect="handleChangeLeftdetailselect"
            ></LeftTable>
          </el-tab-pane>
          <el-tab-pane label="右面" name="1">
            <RIghtTable
              :selectData="selectData"
              @handleChangeRightdetailselect="handleChangeRightdetailselect"
            ></RIghtTable>
          </el-tab-pane>
        </el-tabs>
      </div>
      <PageNation
        v-show="detailTotal > 0"
        :total="detailTotal"
        :page.sync="listQueryDetail.pageNum"
        :limit.sync="listQueryDetail.pageSize"
        @pagination="pageChangeDetail"
      />
      <div class="demo-drawer__footer">
        <el-button @click="cancelTable">取 消</el-button>
        <el-button type="primary" @click="confirmTable">确定</el-button>
      </div>
    </el-drawer>
    <el-dialog title="备货列表" :visible.sync="stock" width="30%">
      <StockTable @handelStockingArea="handelStockingArea"></StockTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stock = false">取 消</el-button>
        <el-button type="primary" @click="handelClean">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import StockTable from './components/StockTable.vue'
import DetailTable from './components/DetailTable.vue'
import LeftTable from './components/LeftTable.vue'
import RIghtTable from './components/RightTable.vue'
import PageNation from "@/components/Pagination";
import {
  queryDeliverGoodsList,
  queryDeliverGoodsDetailList,
  deliverGoodsDetailReport,
  stockingAreaClean,
  queryEnumList,
  getBoxLeftRightList,
  editDeliverGoodsDetail
} from "@/api/dispatch";
import { uploadExcel } from "@/utils/uploadExcel";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "dispatch",
  components: {
    PageNation,
    SearchFilter,
    LeftTable,
    RIghtTable,
    DetailTable,
    StockTable
  },
  data: function () {
    return {
      leftRight: '0',
      data: [],
      statusOptions: [],
      wmsDeliverTypeOptions: [
        {
          value: 0,
          label: "内贸",
        },
        {
          value: 1,
          label: "三资内贸",
        },
        {
          value: 2,
          label: "中资外贸",
        },
        {
          value: 3,
          label: "外贸",
        },
      ],
      dialogVisible: false,
      tableData: [],
      form: {},
      tableHeader: "",
      columns: [
        {
          label: "单号",
          attr: "no",
          width: "160",
          show: true,
          fixed: true,
        },
        {
          label: "客户全称",
          attr: "mesCustomerFullName",
          width: "180",
          show: true,
          fixed: true,
        },
        {
          label: "MES客户简称",
          attr: "mesCustomerShortName",
          width: "100",
          show: true,
          fixed: true,
        },
        {
          label: "状态",
          attr: "statusEnum",
          width: "80",
          show: true,
          fixed: true,
        },
        {
          label: "批号前缀",
          attr: "batchPrefix",
          width: "100",
          show: true,
        },
        {
          label: "交货批次",
          attr: "deliveryBatch",
          width: "120",
          show: true,
        },
        {
          label: "批号",
          attr: "batchNo",
          width: "80",
          show: true,
        },
        {
          attr: "planBoxCountLeft",
          label: "计划箱数左",
          width: "80",
          show: true,
        },
        {
          attr: "planBoxCountRight",
          label: "计划箱数右",
          width: "80",
          show: true,
        },
        {
          label: "客户简码",
          attr: "customerSimpleCode",
          width: "180",
          show: true,
        },
        {
          label: "收货单位（标牌）",
          attr: "receivingUnitLabel",
          width: "160",
          show: true,
        },
        {
          label: "收货单位（发货单）",
          attr: "receivingUnitDeliveryNote",
          width: "200",
          show: true,
        },
        {
          label: "WMS发货类型",
          attr: "wmsDeliverTypeEnum",
          width: "100",
          show: true,
        },
        {
          label: "MES规格名称",
          attr: "mesNormsName",
          width: "180",
          show: true,
        },
        {
          label: "MES规格代码",
          attr: "mesNormsNo",
          width: "120",
          show: true,
        },
        {
          label: "MES帘线结构",
          attr: "mesCordStructure",
          width: "120",
          show: true,
        },
        {
          label: "MES轮型",
          attr: "mesWheelType",
          width: "100",
          show: true,
        },
        {
          label: "MES米长",
          attr: "mesMeterLength",
          width: "80",
          show: true,
        },
        {
          label: "发货箱数",
          attr: "deliverBoxNum",
          width: "150",
          show: true,
        },
        {
          label: "发货毛重",
          attr: "deliverGrossWeight",
          width: "100",
          show: true,
        },
        {
          label: "发货净重",
          attr: "deliverNetWeight",
          width: "100",
          show: true,
        },
        {
          label: "合同号",
          attr: "contractNo",
          width: "100",
          show: true,
        },
        {
          label: "每箱减少重量",
          attr: "reduceWeightPerBox",
          width: "80",
          show: true,
        },
        {
          label: "MES是否样品",
          attr: "mesIsSampleEnum",
          width: "80",
          show: true,
        },
        {
          label: "生产日期",
          attr: "produceDate",
          width: "180",
          show: true,
        },
        {
          label: "发货员",
          attr: "deliveryPerson",
          width: "150",
          show: true,
        },
        {
          label: "发货日期",
          attr: "deliveryDate",
          width: "100",
          show: true,
        },
        {
          label: "文档输入框1",
          attr: "documentInputBox1",
          width: "180",
          show: true,
        },
        {
          label: "文档输入框2",
          attr: "documentInputBox2",
          width: "180",
          show: true,
        },
        {
          label: "备注",
          attr: "remark",
          width: "180",
          show: true,
        },
        {
          label: "发货单创建时间",
          attr: "createTime",
          width: "180",
          show: true,
        },
      ],
      batchNo: "",
      batchPrefix: "",
      createTimeEnd: "",
      createTimeStart: "",
      customerSimpleCode: "",
      deliveryBatch: "",
      mesCustomerFullName: "",
      mesCustomerShortName: "",
      no: "",
      receivingUnitDeliveryNote: "",
      receivingUnitLabel: "",
      status: "",
      wmsDeliverType: "",
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      listQueryDetail: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: true,
      multipleSelection: [],
      drawer: false,
      selectData: [],
      detailTotal: 0,
      leftList: [],
      rightList: [],
      stock: false,
      obj: {},
    };
  },
  mounted() {
    this.queryDeliverGoodsList();
    this.queryEnumList()
  },
  computed: {
    bindTableColumns() {
      return this.columns.filter((column) => column.show);
    },
    checkedTableColumns: {
      get() {
        return this.bindTableColumns.map((column) => column.attr);
      },
      set(checked) {
        this.columns.forEach((column) => {
          if (checked.includes(column.attr)) {
            column.show = true;
          } else {
            column.show = false;
          }
        });
      },
    },
  },
  methods: {
    handelStockingArea(val) {
      this.obj = val
    },
    handleChangeLeftdetailselect(val) {
      this.leftList = val
    },
    handleChangeRightdetailselect(val) {
      this.rightList = val
    },
    cancelTable() {
      this.drawer = false
    },
    async confirmTable() {
      // this.leftList = JSON.parse(localStorage.getItem('leftList'))
      // this.rightList = JSON.parse(localStorage.getItem('rightList'))
      if (this.leftList.length == this.tableHeader.planBoxCountLeft && this.rightList.length == this.tableHeader.planBoxCountRight) {
        const params = {
          deliverGoodsId: this.tableHeader.id,
          leftList: this.leftList,
          rightList: this.rightList,
        }
        const res = await editDeliverGoodsDetail(params)
        if (res.code === 0) {
          this.queryDeliverGoodsDetailList(this.tableHeader.mainCode)
          this.drawer = false
        }
      } else {
        this.$message.error('左右箱数与计划左右箱数不匹配，请重新选择左右箱数');
      }
    },
    async confirmDetail() {
    },
    pageChangeDetail(val) {
      this.listQueryDetail.pageNum = val.page;
      this.listQueryDetail.pageSize = val.limit;
      this.getBoxLeftRightList()
    },
    handelRadio() {
      this.getBoxLeftRightList()
    },
    async getBoxLeftRightList() {
      const params = {
        request: {
          leftRight: this.leftRight === '0' ? 0 : 1,
          mainCode: this.tableHeader.mainCode,
        },
        page: this.listQueryDetail.pageNum - 1,
        size: this.listQueryDetail.pageSize,
      }
      const res = await getBoxLeftRightList(params)
      if (res.code === '0') {
        this.selectData = res.data.items
        this.detailTotal = res.data.total
      }
    },
    handelReplace() {
      this.drawer = true
      this.getBoxLeftRightList()
    },
    async queryEnumList() {
      const res = await queryEnumList('DeliverStatusEnum')
      if (res.code === '0') {
        this.statusOptions = res.data
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async deliverGoodsConfirm(arr) {
      const res = await deliverGoodsConfirm(arr);
      if (res.code === "0") {
        this.queryDeliverGoodsList();
      }
    },
    handelReport() {
      let arr = []
      this.multipleSelection.forEach(v => {
        if (v.statusEnum === '未上报') {
          arr.push(v.id)
          this.deliverGoodsDetailReport(arr)
        } else {
          this.$message({
            type: 'warning',
            message: '请选择未上报状态'
          });
        }
      })
    },
    async deliverGoodsDetailReport(arr) {
      const res = deliverGoodsDetailReport(arr)
      if (res.code === "0") {
        this.queryDeliverGoodsList();
      }
    },
    handelClean() {
      let arr = []
      this.multipleSelection.forEach(v => {
        if (v.statusEnum === '确认中' || v.statusEnum === '已上报') {
          arr.push(v.id)
          this.stockingAreaClean(arr)
        } else {
          this.$message({
            type: 'warning',
            message: '请选择已上报状态或确认中状态'
          });
        }
      })
    },
    async stockingAreaClean(arr) {
      const params = {
        deliverIds: arr,
        ...this.obj,
      }
      const res = await stockingAreaClean(params)
      if (res.code === "0") {
        this.queryDeliverGoodsList();
        arr = []
        this.stock = false
        this.multipleSelection = []
        // this.obj.stockingAreaCode = ""
      }
    },
    async queryDeliverGoodsList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryDeliverGoodsList(params);
      if (res.code === "0") {
        this.tableData = res.data.items;
        this.total = res.data.total;
      }
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryDeliverGoodsList();
    },
    search() {
      this.queryDeliverGoodsList();
    },
    reset() {
      this.form = {};
      this.batchNo = "";
      this.batchPrefix = "";
      this.createTimeEnd = "";
      this.createTimeStart = "";
      this.customerSimpleCode = "";
      this.deliveryBatch = "";
      this.mesCustomerFullName = "";
      this.mesCustomerShortName = "";
      this.no = "";
      this.receivingUnitDeliveryNote = "";
      this.receivingUnitLabel = "";
      this.status = "";
      this.wmsDeliverType = "";
      this.queryDeliverGoodsList();
    },
    async handleDetail(index, row) {
      this.tableHeader = row;
      this.dialogVisible = true;
      this.queryDeliverGoodsDetailList(this.tableHeader.mainCode)
    },
    async queryDeliverGoodsDetailList(mainCode) {
      let arr = []
      const res = await queryDeliverGoodsDetailList(mainCode);
      arr = res.data;
      arr = new Set([...[...arr, ...res.data]])
      this.data = Array.from(arr)
    },
    handelBatchNo(val) {
      this.form.batchNo = val;
      this.queryDeliverGoodsList();
    },
    handelBatchPrefix(val) {
      this.form.batchPrefix = val;
      this.queryDeliverGoodsList();
    },
    handelCreateTimeEnd(val) {
      this.form.createTimeEnd = moment(val).valueOf();
      this.queryDeliverGoodsList();
    },
    handelCustomerSimpleCode(val) {
      this.form.customerSimpleCode = val;
      this.queryDeliverGoodsList();
    },
    handelCreateTimeStart(val) {
      this.form.createTimeStart = moment(val).valueOf();
      this.queryDeliverGoodsList();
    },
    handelDeliveryBatch(val) {
      this.form.deliveryBatch = val;
      this.queryDeliverGoodsList();
    },
    handelMesCustomerFullName(val) {
      this.form.mesCustomerFullName = val;
      this.queryDeliverGoodsList();
    },
    handelMesCustomerShortName(val) {
      this.form.mesCustomerShortName = val;
      this.queryDeliverGoodsList();
    },
    handelNo(val) {
      this.form.no = val;
      this.queryDeliverGoodsList();
    },
    handelReceivingUnitDeliveryNote(val) {
      this.form.receivingUnitDeliveryNote = val;
      this.queryDeliverGoodsList();
    },
    handelReceivingUnitLabel(val) {
      this.form.receivingUnitLabel = val;
      this.queryDeliverGoodsList();
    },
    handelStatus(val) {
      this.form.status = val;
      this.queryDeliverGoodsList();
    },
    handelWmsDeliverType(val) {
      this.form.wmsDeliverType = val;
      this.queryDeliverGoodsList();
    },
    handelExport() {
      const arr = [];
      this.bindTableColumns &&
        this.bindTableColumns.length > 0 &&
        this.bindTableColumns.forEach((v) => {
          arr.push(v.attr);
        });
      const params = {
        titleNameList: arr,
      };
      exportBaseGoods(params).then((res) => {
        const blob = new Blob([res], { type: "application/vnd.ms-excel" });
        const fileName = "发货单列表.xlsx";
        uploadExcel(fileName, blob);
      });
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
    // padding: 12px;
  }
}
::v-deep .el-drawer__body {
  padding: 0 20px;
}
::v-deep .el-date-editor.el-input,
::v-deep .el-radio-group {
  width: 182px;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
  width: 180px;
}
</style>