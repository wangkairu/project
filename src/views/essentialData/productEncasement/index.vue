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
          <el-form-item label="MES客户简码">
            <el-input
              size="mini"
              v-model="customerSimpleCode"
              @change="handelCustomerSimpleCode"
              placeholder="请输入MES客户简码"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES箱号二维码">
            <el-input
              size="mini"
              v-model="mesBoxNumberQrCode"
              @change="handelMesBoxNumberQrCode"
              placeholder="请输入MES箱号二维码"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES箱焊点轮数">
            <el-input
              size="mini"
              v-model="mesBoxWeldingPointsNum"
              placeholder="请输入MES箱焊点轮数"
              @change="handelMesBoxWeldingPointsNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES客户简称">
            <el-input
              size="mini"
              v-model="mesCustomerShortName"
              placeholder="请输入MES客户简称"
              @change="handelMesCustomerShortName"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES生产编号">
            <el-input
              size="mini"
              v-model="mesProductionNo"
              placeholder="请输入MES生产编号"
              @change="handelMesProductionNo"
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
          <el-form-item label="MES轮型编码">
            <el-input
              size="mini"
              v-model="mesWheelTypeCode"
              @change="handelMesWheelTypeCode"
              placeholder="请输入MES轮型编码	"
            ></el-input>
          </el-form-item>
          <el-form-item label="WMS发货类型">
            <el-input
              size="mini"
              v-model="wmsDeliverType"
              placeholder="请输入WMS发货类型"
              @change="handelWmsDeliverType"
            ></el-input>
          </el-form-item>
          <el-form-item label="WMS状态">
            <el-input
              size="mini"
              v-model="wmsStatus"
              placeholder="请输入WMS状态"
              @change="handelWmsStatus"
            ></el-input>
          </el-form-item>
          <el-form-item label="WMS任务类别">
            <el-input
              size="mini"
              v-model="wmsTaskType"
              placeholder="请输入WMS任务类别"
              @change="handelWmsTaskType"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES米长">
            <el-input
              size="mini"
              v-model="mesMeterLength"
              placeholder="请输入MES米长"
              @change="handelMesMeterLength"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES规格名称">
            <el-input
              size="mini"
              v-model="mesNormsNo"
              placeholder="请输入MES规格名称"
              @change="handelMesNormsNo"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES轮数(设定值)">
            <el-input
              size="mini"
              v-model="mesNumOfRounds"
              placeholder="请输入MES轮数(设定值)"
              @change="handelMesNumOfRounds"
            ></el-input>
          </el-form-item>
          <el-form-item label="MES发货时间">
            <el-date-picker
              size="mini"
              v-model="mesDeliveryTimeStart"
              type="datetime"
              placeholder="MES发货开始时间"
              @change="handelMesDeliveryTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES发货时间">
            <el-date-picker
              size="mini"
              v-model="mesDeliveryTimeEnd"
              type="datetime"
              placeholder="MES发货结束时间"
              @change="handelMesDeliveryTimeEnd"
            >
            </el-date-picker>
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
          <el-form-item label="MES发货是否冻结">
            <el-radio-group
              size="mini"
              v-model="mesIsDeliveryFreeze"
              @change="handelMesIsDeliveryFreeze"
            >
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="MES是否样品">
            <el-radio-group
              size="mini"
              v-model="mesIsSample"
              @change="handelMesIsSample"
            >
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="MES有无焊点">
            <el-radio-group
              size="mini"
              v-model="mesIsSolderJoint"
              @change="handelMesIsSolderJoint"
            >
              <el-radio label="有"></el-radio>
              <el-radio label="无"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="MES左右面">
            <el-radio-group
              size="mini"
              v-model="mesLeftRightSides"
              @change="handelMesLeftRightSides"
            >
              <el-radio label="左"></el-radio>
              <el-radio label="右"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="WMS时效是否到达">
            <el-radio-group
              size="mini"
              v-model="wmsIsAgeing"
              @change="handelWmsIsAgeing"
            >
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </SearchFilter>
      </div>
      <div class="table">
        <div class="enteringButton">
          <el-button type="primary" @click="handelExport" size="mini"
            >导出Excel</el-button
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
              :width="col.width || '100'"
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
      tableData: [],
      form: {},
      columns: [
        {
          label: "WMS状态",
          attr: "wmsStatus",
          width: "100",
          show: true,
          fixed: true,
        },
        {
          label: "MES箱号",
          attr: "mesBoxNo",
          width: "100",
          show: true,
          fixed: true,
        },
        {
          label: "MES规格代码",
          attr: "mesNormsNo",
          width: "60",
          show: true,
          fixed: true,
        },
        {
          label: "MES规格名称",
          attr: "mesNormsName",
          width: "120",
          show: true,
          fixed: true,
        },
        {
          label: "MES客户简称",
          attr: "mesCustomerShortName",
          width: "150",
          show: true,
        },
        {
          label: "MES轮型",
          attr: "mesWheelType",
          width: "80",
          show: true,
        },
        {
          label: "MES托盘",
          attr: "mesTray",
          width: "60",
          show: true,
        },
        {
          label: "MES米长",
          attr: "mesMeterLength",
          width: "100",
          show: true,
        },
        {
          label: "MES左右面",
          attr: "mesLeftRightSides",
          width: "60",
          show: true,
        },
        {
          label: "MES有无焊点",
          attr: "mesIsSolderJoint",
          width: "60",
          show: true,
        },
        {
          label: "MES轮数",
          attr: "mesNumOfRounds",
          width: "60",
          show: true,
        },
        {
          label: "MES特殊要求",
          attr: "mesSpecialRequirements",
          width: "200",
          show: true,
        },
        {
          label: "MES箱号二维码",
          attr: "mesBoxNumberQrCode",
          width: "180",
          show: true,
        },
        {
          label: "MES生产编号",
          attr: "mesProductionNo",
          width: "200",
          show: true,
        },
        {
          label: "MES分厂",
          attr: "mesBranchFactory",
          width: "100",
          show: true,
        },
        {
          label: "WMS客户简码",
          attr: "wmsCustomerSimpleCode",
          width: "100",
          show: true,
        },
        {
          label: "MES客户全称",
          attr: "mesCustomerName",
          width: "400",
          show: true,
        },
        {
          label: "MES帘线结构",
          attr: "mesCordStructure",
          width: "150",
          show: true,
        },
        {
          label: "MES毛重",
          attr: "mesGrossWeight",
          width: "100",
          show: true,
        },
        {
          label: "MES净重",
          attr: "mesNetWeight",
          width: "100",
          show: true,
        },
        {
          label: "MES总皮重",
          attr: "mesTotalTareWeight",
          width: "100",
          show: true,
        },
        {
          label: "MES样品",
          attr: "mesIsSample",
          width: "60",
          show: true,
        },
        {
          label: "MES装箱时间",
          attr: "mesPackingTime",
          width: "180",
          show: true,
        },
        {
          label: "MES入库时间",
          attr: "mesWarehousingTime",
          width: "180",
          show: true,
        },
        {
          label: "MES发货单位简称",
          attr: "mesDeliverShortName",
          width: "150",
          show: true,
        },
        {
          label: "WMS发货类型",
          attr: "wmsDeliverType",
          width: "100",
          show: true,
        },
        {
          label: "MES发货时间",
          attr: "mesDeliveryTime",
          width: "180",
          show: true,
        },
        {
          label: "MES返工时间",
          attr: "mesReworkTime",
          width: "180",
          show: true,
        },
        {
          label: "MES箱焊点轮数",
          attr: "mesBoxWeldingPointsNum",
          width: "60",
          show: true,
        },
        {
          label: "MES冻结",
          attr: "mesIsFreeze",
          width: "60",
          show: true,
        },
        {
          label: "MES发货冻结",
          attr: "mesIsDeliveryFreeze",
          width: "60",
          show: true,
        },
        {
          label: "WMS时效到达时间",
          attr: "wmsAgeingTime",
          width: "180",
          show: true,
        },
        {
          label: "MES时效",
          attr: "mesAgeing",
          width: "60",
          show: true,
        },
        {
          label: "WMS时效是否到达",
          attr: "wmsIsAgeing",
          width: "60",
          show: true,
        },
        {
          label: "MES焊点",
          attr: "mesSolderJoint",
          width: "60",
          show: true,
        },
        {
          label: "MES工艺",
          attr: "mesTechnology",
          width: "60",
          show: true,
        },
        {
          label: "MES配箱值",
          attr: "mesDistributionValue",
          width: "60",
          show: true,
        },
        {
          label: "MES起鼓",
          attr: "mesBulging",
          width: "60",
          show: true,
        },
        {
          label: "WMS从MES获取信息时间",
          attr: "wmsGetInfoFromMesTime",
          width: "180",
          show: true,
        },
        {
          label: "AGV任务状态",
          attr: "agvTaskStatus",
          width: "100",
          show: true,
        },
        {
          label: "WMS任务类别",
          attr: "wmsTaskType",
          width: "100",
          show: true,
        },
        {
          label: "AGV任务编号",
          attr: "agvTaskNo",
          width: "100",
          show: true,
        },
        {
          label: "AGV编号",
          attr: "agvNo",
          width: "80",
          show: true,
        },
        {
          label: "WMS起点库位编号",
          attr: "wmsStartWarehouseCode",
          width: "120",
          show: true,
        },
        {
          label: "WMS终点库位编号",
          attr: "wmsEndWarehouseCode",
          width: "120",
          show: true,
        },
        {
          label: "WMS终点库列编号",
          attr: "wmsEndWarehouseColCode",
          width: "120",
          show: true,
        },
        {
          label: "WMS终点库区名称",
          attr: "wmsEndWarehouseAreaName",
          width: "100",
          show: true,
        },
        {
          label: "WMS调拨前库位编号",
          attr: "wmsBeforeAllocateTransferWarehouseCode",
          width: "120",
          show: true,
        },
        {
          label: "WMS任务发布人",
          attr: "wmsTaskPublisher",
          width: "100",
          show: true,
        },
        {
          label: "WMS任务发布时间",
          attr: "wmsTaskPublishTime",
          width: "180",
          show: true,
        },
        {
          label: "WMS任务完成时间",
          attr: "wmsTaskCompleteTime",
          width: "180",
          show: true,
        },
        {
          label: "WMS返工原因",
          attr: "wmsReworkReason",
          // width: "120",
          show: true,
        },
        {
          label: "WMS返库原因",
          attr: "wmsReturnWarehouseReason",
          // width: "120",
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
    handelCustomerSimpleCode(val) {
      this.form.customerSimpleCode = val;
      this.queryGoodsList();
    },
    handelMesBoxNumberQrCode(val) {
      this.form.mesBoxNumberQrCode = val;
      this.queryGoodsList();
    },
    handelMesBoxWeldingPointsNum(val) {
      this.form.mesBoxWeldingPointsNum = val;
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
    handelWmsDeliverType(val) {
      this.form.wmsDeliverType = val;
      this.queryGoodsList();
    },
    handelMesWheelTypeCode(val) {
      this.form.mesWheelTypeCode = val;
      this.queryGoodsList();
    },
    handelWmsStatus(val) {
      this.form.wmsStatus = val;
      this.queryGoodsList();
    },
    handelWmsTaskType(val) {
      this.form.wmsTaskType = val;
      this.queryGoodsList();
    },
    handelMesMeterLength(val) {
      this.form.mesMeterLength = val;
      this.queryGoodsList();
    },
    handelMesNormsNo(val) {
      this.form.mesNormsNo = val;
      this.queryGoodsList();
    },
    handelMesNumOfRounds(val) {
      this.form.mesNumOfRounds = val;
      this.queryGoodsList();
    },
    handelMesIsDeliveryFreeze(val) {
      this.form.mesIsDeliveryFreeze = val === "是" ? 1 : 0;
      this.queryGoodsList();
    },
    handelMesIsSample(val) {
      this.form.mesIsSample = val === "是" ? 1 : 0;
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
    handelWmsIsAgeing(val) {
      this.form.wmsIsAgeing = val;
      this.queryGoodsList();
    },
    handelMesDeliveryTimeStart(val) {
      this.form.mesDeliveryTimeStart = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesDeliveryTimeEnd(val) {
      var date = moment(val).valueOf();
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