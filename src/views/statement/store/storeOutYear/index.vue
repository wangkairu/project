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
          <el-form-item label="MES客户简称">
            <el-input
              size="mini"
              v-model="mesCustomerShortName"
              placeholder="请输入MES客户简称"
              @change="handelMesCustomerShortName"
            ></el-input>
          </el-form-item>

          <el-form-item label="MES托盘">
            <el-input
              size="mini"
              v-model="mesTray"
              placeholder="请输MES托盘"
              @change="handelMesTray"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES轮型">
            <el-input
              size="mini"
              v-model="mesMeterLength"
              placeholder="请输入MES轮型"
              @change="handelMesMeterLength"
            ></el-input>
          </el-form-item>

          <el-form-item label="MES装箱时间">
            <el-date-picker
              size="mini"
              v-model="mesPackingTimeStart"
              type="datetime"
              placeholder="MES装箱开始时间"
              @change="handelMesPackingTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES装箱时间">
            <el-date-picker
              size="mini"
              v-model="mesPackingTimeEnd"
              type="datetime"
              placeholder="MES装箱结束时间"
              @change="handelMesPackingTimeEnd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES入库时间">
            <el-date-picker
              size="mini"
              v-model="mesWarehousingTimeStart"
              type="datetime"
              placeholder="MES入库开始时间"
              @change="handelMesWarehousingTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES入库时间">
            <el-date-picker
              size="mini"
              v-model="mesWarehousingTimeEnd"
              type="datetime"
              placeholder="MES入库结束时间"
              @change="handelMesWarehousingTimeEnd"
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
          <el-popover placement="right" width="550" trigger="click">
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
            <!-- <el-button
            size="small"
            type="text"
            @click.native="filterFunHandle('allchecked')"
            >全选</el-button
          >
          <el-button
            size="small"
            type="text"
            @click.native="filterFunHandle('cancel')"
            >取消全选</el-button
          > -->
          </el-popover>
        </div>
        <el-table
          v-loading="loading"
          height="700"
          border
          style="width: 100%"
          :data="tableData"
        >
          <template v-for="(col, index) in bindTableColumns">
            <el-table-column
              :fixed="col.fixed || false"
              :key="index"
              :prop="col.attr"
              :label="col.label"
            >
            </el-table-column>
          </template>
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
  </div>
</template>
<script>
import PageNation from "@/components/Pagination";
import { queryGoodsList, exportBaseGoods } from "@/api/essential";
import { uploadExcel } from "@/utils/uploadExcel";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "modifyClient",
  components: { PageNation, SearchFilter },
  data: function () {
    return {
      selectArr: ["年统计", "月统计", "日统计"],
      tableData: [],
      form: {},
      ruleForm: {
        idStr: "",
        mesAgeing: 0,
        mesBoxNo: "",
        mesBoxNumberQrCode: "",
        mesBoxWeldingPointsNum: 0,
        mesBranchFactory: "",
        mesBulging: "",
        mesCordStructure: "",
        mesCustomerName: "",
        mesCustomerShortName: "",
        mesDeliverShortName: "",
        mesDeliveryTime: "",
        mesDistributionValue: "",
        mesGrossWeight: 0,
        mesIsDeliveryFreeze: 0,
        mesIsFreeze: 0,
        mesIsSample: 0,
        mesIsSolderJoint: 0,
        mesLeftRightSides: 0,
        mesMeterLength: 0,
        mesNetWeight: 0,
        mesNormsName: "",
        mesNormsNo: "",
        mesNumOfRounds: 0,
        mesPackingTime: "",
        mesProductionNo: "",
        mesReworkTime: "",
        mesSolderJoint: 0,
        mesSpecialRequirements: "",
        mesTechnology: "",
        mesTotalTareWeight: 0,
        mesTray: "",
        mesWarehousingTime: "",
        mesWheelType: "",
        remark: "",
        wmsAgeingTime: "",
        wmsCustomerSimpleCode: "",
        wmsDeliverType: 0,
        wmsIsAgeing: 0,
      },
      columns: [
        {
          label: "年份",
          attr: "mesBoxNo",
          show: true,
          fixed: true,
        },
        {
          label: "规格简称",
          attr: "mesCustomerShortName",

          show: true,
        },
        {
          label: "客户简称",
          attr: "mesCustomerShortName",

          show: true,
        },
        {
          label: "轮型",
          attr: "mesWheelType",

          show: true,
        },
        {
          label: "托盘",
          attr: "mesTray",
          show: true,
        },
        {
          label: "米长",
          attr: "mesMeterLength",
          show: true,
        },
        {
          label: "退货净重",
          attr: "mesLeftRightSides",
          show: true,
        },
        {
          label: "退货净重环比%",
          attr: "mesIsSolderJoint",

          show: true,
        },
        {
          label: "出库净重",
          attr: "mesNumOfRounds",
          show: true,
        },
        {
          label: "出库净重环比%",
          attr: "mesSpecialRequirements",

          show: true,
        },
      ],
      customerSimpleCode: "",
      mesBoxNumberQrCode: "",
      mesBoxWeldingPointsNum: "",
      mesCustomerShortName: "",
      mesDeliveryTimeEnd: "",
      mesDeliveryTimeStart: "",
      mesIsDeliveryFreeze: "",
      mesIsSample: "",
      mesIsSolderJoint: "",
      mesLeftRightSides: "",
      mesMeterLength: "",
      mesNormsNo: "",
      mesNumOfRounds: "",
      mesPackingTimeEnd: "",
      mesPackingTimeStart: "",
      mesProductionNo: "",
      mesTray: "",
      mesWarehousingTimeEnd: "",
      mesWarehousingTimeStart: "",
      mesWheelTypeCode: "",
      wmsDeliverType: "",
      wmsIsAgeing: "",
      wmsStatus: "",
      wmsTaskType: "",
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 15,
      },
      loading: true,
    };
  },
  mounted() {
    this.queryGoodsList();
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
    async queryGoodsList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryGoodsList(params);
      if (res.code === "0") {
        this.tableData = res.data.items;
        this.total = res.data.total;
        this.loading = false;
      }
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryGoodsList();
    },
    search() {
      this.form = {
        customerSimpleCode: this.customerSimpleCode,
        mesBoxNumberQrCode: this.mesBoxNumberQrCode,
        mesBoxWeldingPointsNum: this.mesBoxWeldingPointsNum,
        mesCustomerShortName: this.mesCustomerShortName,
        mesDeliveryTimeEnd: moment(this.mesDeliveryTimeEnd).valueOf(),
        mesDeliveryTimeStart: moment(this.mesDeliveryTimeStart).valueOf(),
        mesIsDeliveryFreeze: this.mesIsDeliveryFreeze,
        mesIsSample: this.mesIsSample,
        mesIsSolderJoint: this.mesIsSolderJoint,
        mesLeftRightSides: this.mesLeftRightSides,
        mesMeterLength: this.mesMeterLength,
        mesNormsNo: this.mesNormsNo,
        mesNumOfRounds: this.mesNumOfRounds,
        mesPackingTimeEnd: moment(this.mesPackingTimeEnd).valueOf(),
        mesPackingTimeStart: moment(this.mesPackingTimeStart).valueOf(),
        mesProductionNo: this.mesProductionNo,
        mesTray: this.mesTray,
        mesWarehousingTimeEnd: moment(this.mesWarehousingTimeEnd).valueOf(),
        mesWarehousingTimeStart: moment(this.mesWarehousingTimeStart).valueOf(),
        mesWheelTypeCode: this.mesWheelTypeCode,
        wmsDeliverType: this.wmsDeliverType,
        wmsIsAgeing: this.wmsIsAgeing,
        wmsStatus: this.wmsStatus,
        wmsTaskType: this.wmsTaskType,
      };
      this.queryGoodsList();
    },
    reset() {
      this.form = {};
      this.customerSimpleCode = "";
      this.mesBoxNumberQrCode = "";
      this.mesBoxWeldingPointsNum = "";
      this.mesCustomerShortName = "";
      this.mesDeliveryTimeEnd = "";
      this.mesDeliveryTimeStart = "";
      this.mesIsDeliveryFreeze = "";
      // this.mesIsFreeze=''
      this.mesIsSample = "";
      this.mesIsSolderJoint = "";
      this.mesLeftRightSides = "";
      this.mesMeterLength = "";
      this.mesNormsNo = "";
      this.mesNumOfRounds = "";
      this.mesPackingTimeEnd = "";
      this.mesPackingTimeStart = "";
      this.mesProductionNo = "";
      this.mesTray = "";
      this.mesWarehousingTimeEnd = "";
      this.mesWarehousingTimeStart = "";
      this.mesWheelTypeCode = "";
      this.wmsDeliverType = "";
      this.wmsIsAgeing = "";
      this.wmsStatus = "";
      this.wmsTaskType = "";
      this.queryGoodsList();
    },
    handelMesBoxNumberQrCode(val) {
      this.form.mesBoxNumberQrCode = val;
      this.queryGoodsList();
    },
    handelMesCustomerShortName(val) {
      this.form.mesCustomerShortName = val;
      this.queryGoodsList();
    },
    handelMesProductionNo(val) {
      this.form.mesProductionNo = val;
      this.queryGoodsList();
    },
    handelMesTray(val) {
      this.form.mesTray = val;
      this.queryGoodsList();
    },
    handelMesMeterLength(val) {
      this.form.mesMeterLength = val;
      this.queryGoodsList();
    },
    handelMesIsSolderJoint(val) {
      this.form.mesIsSolderJoint = val === "有" ? 1 : 0;
      this.queryGoodsList();
    },
    handelMesLeftRightSides(val) {
      this.form.mesLeftRightSides = val === "左" ? 0 : 1;
      this.queryGoodsList();
    },

    handelMesPackingTimeEnd(val) {
      this.form.mesPackingTimeEnd = val;
      this.queryGoodsList();
    },
    handelMesPackingTimeStart(val) {
      this.form.mesPackingTimeStart = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesWarehousingTimeEnd(val) {
      this.form.mesWarehousingTimeEnd = val;
      this.queryGoodsList();
    },
    handelMesWarehousingTimeStart(val) {
      this.form.mesWarehousingTimeStart = val;
      this.queryGoodsList();
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
        const fileName = "成品箱虚拟库.xlsx";
        uploadExcel(fileName, blob);
      });
    },
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