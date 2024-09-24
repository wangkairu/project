<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'150px'"
        size="mini"
        :maxShow="3"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="MES客户简码">
          <el-input
            size="mini"
            v-model="customerSimpleCode"
            placeholder="请输入MES客户简码"
            @change="handelCustomerSimpleCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES箱号二维码">
          <el-input
            size="mini"
            v-model="mesBoxNumberQrCode"
            placeholder="请输入MES箱号二维码"
            @change="handelMesBoxNumberQrCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES箱焊点轮数">
          <el-input
            size="mini"
            v-model="mesBoxWeldingPointsNum"
            placeholder="请输入MES箱焊点轮数"
            @change="handelMesBoxWeldingPointsNum"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="MES客户简称">
          <el-input
            size="mini"
            v-model="mesCustomerShortName"
            placeholder="请输入MES客户简称"
            @change="handelMesCustomerShortName"
            clearable
          ></el-input>
        </el-form-item> -->
        <el-form-item label="MES客户简称">
          <el-select
            filterable
            clearable
            v-model="mesCustomerShortName"
            @change="handelMesCustomerShortName"
            placeholder="请选择MES客户简称"
          >
            <el-option
            v-for="item in mesCustomerOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MES米长">
            <el-select
                filterable
                clearable
                v-model="mesMeterLength"
                placeholder="请输入MES米长"
                @change="handelMesMeterLength"
            >
                <el-option
                v-for="item in mesMeterLengthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="MES轮数">
          <el-input
            size="mini"
            v-model="mesNumOfRounds"
            placeholder="请输入MES轮数"
            @change="handelMesNumOfRounds"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES规格名称">
            <el-select
                filterable
                clearable
                v-model="mesNormsNo"
                placeholder="请选择MES规格名称"
                @change="handelMesNormsNo"
            >
                <el-option
                v-for="item in mesNormsNameListOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="MES生产编号">
          <el-input
            size="mini"
            v-model="mesProductionNo"
            placeholder="请输入MES生产编号"
            @change="handelMesProductionNo"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="托盘">
            <el-select
                filterable
                clearable
                v-model="mesTray"
                placeholder="请输入托盘"
                @change="handelMesTray"
            >
                <el-option
                    v-for="item in mesTrayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="MES轮型编码">
          <el-input
            size="mini"
            v-model="mesWheelTypeCode"
            placeholder="请输入MES轮型编码"
            @change="handelMesWheelTypeCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES发货开始时间">
          <el-date-picker
            size="mini"
            v-model="mesDeliveryTimeStart"
            type="date"
            placeholder="开始时间"
            @change="handelMesDeliveryTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="MES发货结束时间">
          <el-date-picker
            size="mini"
            v-model="mesDeliveryTimeEnd"
            type="date"
            placeholder="结束时间"
            @change="handelMesDeliveryTimeEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="MES入库开始时间">
          <el-date-picker
            size="mini"
            v-model="mesWarehousingTimeStart"
            type="date"
            placeholder="开始时间"
            @change="handelMesWarehousingTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="MES入库结束时间">
          <el-date-picker
            size="mini"
            v-model="mesWarehousingTimeEnd"
            type="date"
            placeholder="结束时间"
            @change="handelMesWarehousingTimeEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="MES装箱开始时间">
          <el-date-picker
            size="mini"
            v-model="mesPackingTimeStart"
            type="date"
            placeholder="开始时间"
            @change="handelMesPackingTimeStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="MES装箱结束时间">
          <el-date-picker
            size="mini"
            v-model="mesPackingTimeEnd"
            type="date"
            placeholder="结束时间"
            @change="handelMesPackingTimeEnd"
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
      </SearchFilter>
    </div>
    <div class="table">
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%"
        :data="data"
      >
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column
          fixed
          prop="errMsg"
          label="异常原因"
          width="170"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesCustomerName"
          label="MES客户全称"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed prop="mesCustomerShortName" label="MES客户简称" width="110">
        </el-table-column>
        <!-- <el-table-column
          fixed
          prop="mesDeliverShortName"
          label="MES发货单位简称"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.mesDeliverShortName === null
                ? "暂无"
                : scope.row.mesDeliverShortName
            }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed
          prop="mesBoxNumberQrCode"
          label="MES箱号二维码"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="mesBoxWeldingPointsNum" label="MES箱焊点轮数">
        </el-table-column>
        <el-table-column prop="mesAgeing" label="MES时效"> </el-table-column>
        <el-table-column prop="mesBoxNo" label="MES箱号"> </el-table-column>
        <el-table-column prop="mesBranchFactory" label="MES分厂">
        </el-table-column>
        <el-table-column prop="mesBranchFactoryCode" label="MES分厂编号">
        </el-table-column>
        <el-table-column prop="mesBulging" label="MES起鼓"> </el-table-column>
        <el-table-column
          prop="mesCordStructure"
          label="MES帘线结构"
          width="190"
        >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="mesDeliveryTime" label="MES发货时间" width="160">
        </el-table-column>
        <el-table-column prop="mesDistributionValue" label="MES配箱值">
        </el-table-column>
        <el-table-column prop="mesGrossWeight" label="MES毛重">
        </el-table-column>
        <el-table-column prop="mesIsDeliveryFreeze" label="MES发货是否冻结">
          <template slot-scope="scope">
            <span>{{ scope.row.mesIsDeliveryFreeze === 0 ? "否" : "是" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesIsFreeze" label="MES是否冻结">
          <template slot-scope="scope">
            <span>{{ scope.row.mesIsFreeze === 0 ? "否" : "是" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesIsSample" label="MES是否样品">
          <template slot-scope="scope">
            <span>{{ scope.row.mesIsSample === 0 ? "否" : "是" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesIsSolderJoint" label="MES有无焊点">
          <template slot-scope="scope">
            <span>{{ scope.row.mesIsSolderJoint === 0 ? "无" : "有" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesLeftRightSides" label="MES左右面" width="58">
          <template slot-scope="scope">
            <span>{{ scope.row.mesLeftRightSides === 0 ? "左" : "右" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <el-table-column prop="mesNetWeight" label="MES净重"> </el-table-column>
        <el-table-column prop="mesNormsName" label="MES规格名称" width="130">
        </el-table-column>
        <el-table-column prop="mesNormsNo" label="MES规格代码">
        </el-table-column>
        <el-table-column prop="mesNumOfRounds" label="MES轮数">
        </el-table-column>
        <el-table-column prop="mesPackingTime" label="MES装箱时间" width="160">
        </el-table-column>
        <el-table-column prop="mesProductionNo" label="MES生产编号" width="230">
        </el-table-column>
        <el-table-column prop="mesReworkTime" label="MES返工时间" width="160">
        </el-table-column>
        <el-table-column prop="mesSolderJoint" label="MES焊点" width="160">
        </el-table-column>
        <el-table-column
          prop="mesSpecialRequirements"
          label="MES特殊要求"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="mesTechnology"
          label="MES工艺"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="mesTotalTareWeight" label="MES总皮重">
        </el-table-column>
        <el-table-column prop="mesTray" label="MES托盘"> </el-table-column>
        <el-table-column prop="mesWarehousingTime" label="MES入库时间">
        </el-table-column>
        <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
        <el-table-column prop="wmsCustomerSimpleCode" label="WMS客户简码">
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
import descriptionsTooltip from '@/components/Descriptions'
// import CreteShifting from "./components/createShifting.vue";
import PageNation from "@/components/Pagination";
import { queryExceptionList } from "@/api/storeIn";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "abnormal",
  components: { PageNation, SearchFilter, descriptionsTooltip },
  data() {
    return {
      data: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      form: {},
      customerSimpleCode: "",
      mesBoxNumberQrCode: "",
      mesBoxWeldingPointsNum: '',
      mesCustomerShortName: "",
      mesDeliveryTimeEnd: "",
      mesDeliveryTimeStart: "",
      mesIsDeliveryFreeze: '',
      mesIsSample: '',
      mesIsSolderJoint: '',
      mesLeftRightSides: '',
      mesMeterLength: '',
      mesNormsNo: "",
      mesNumOfRounds: '',
      mesPackingTimeEnd: "",
      mesPackingTimeStart: "",
      mesProductionNo: "",
      mesTray: "",
      mesWarehousingTimeEnd: "",
      mesWarehousingTimeStart: "",
      mesWheelTypeCode: "",
      mesCustomerOptions:[],
      mesNormsNameListOptions:[],
      mesTrayOptions:[],
      mesMeterLengthOptions:[]
    };
  },
  mounted() {
    this.queryExceptionList();
    this.$store.dispatch('realList').then(()=>{
      // this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
      this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
      this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
      this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
      this.mesMeterLengthOptions=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
    })
  },
  methods: {
    search() {
      this.queryExceptionList();
    },
    reset() {
      this.form = {};
      this.customerSimpleCode = "",
        this.mesBoxNumberQrCode = "",
        this.mesBoxWeldingPointsNum = '',
        this.mesCustomerShortName = "",
        this.mesDeliveryTimeEnd = "",
        this.mesDeliveryTimeStart = "",
        this.mesIsDeliveryFreeze = '',
        this.mesIsSample = '',
        this.mesIsSolderJoint = '',
        this.mesLeftRightSides = '',
        this.mesMeterLength = '',
        this.mesNormsNo = "",
        this.mesNumOfRounds = '',
        this.mesPackingTimeEnd = "",
        this.mesPackingTimeStart = "",
        this.mesProductionNo = "",
        this.mesTray = "",
        this.mesWarehousingTimeEnd = "",
        this.mesWarehousingTimeStart = "",
        this.mesWheelTypeCode = ""
      this.queryExceptionList();
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryExceptionList();
    },
    handelCustomerSimpleCode(val) {
      this.form.customerSimpleCode = val
      this.queryExceptionList();
    },
    handelMesBoxNumberQrCode(val) {
      this.form.mesBoxNumberQrCode = val
      this.queryExceptionList();
    },
    handelMesBoxWeldingPointsNum(val) {
      this.form.mesBoxWeldingPointsNum = val
      this.queryExceptionList();
    },
    handelMesCustomerShortName(val) {
      this.form.mesCustomerShortName = val
      this.queryExceptionList();
    },
    handelMesMeterLength(val) {
      this.form.mesMeterLength = val
      this.queryExceptionList();
    },
    handelMesNumOfRounds(val) {
      this.form.mesNumOfRounds = val
      this.queryExceptionList();
    },
    handelMesNormsNo(val) {
      this.form.mesNormsNo = val
      this.queryExceptionList();
    },
    handelMesProductionNo(val) {
      this.form.mesProductionNo = val
      this.queryExceptionList();
    },
    handelMesTray(val) {
      this.form.mesTray = val
      this.queryExceptionList();
    },
    handelMesWheelTypeCode(val) {
      this.form.mesWheelTypeCode = val
      this.queryExceptionList();
    },
    handelMesDeliveryTimeStart(val) {
      this.form.mesDeliveryTimeStart = moment(val).valueOf();
      this.queryExceptionList();
    },
    handelMesDeliveryTimeEnd(val) {
      this.form.mesDeliveryTimeEnd = moment(val).valueOf();
      this.queryExceptionList();
    },
    handelMesWarehousingTimeStart(val) {
      this.form.mesWarehousingTimeStart = moment(val).valueOf();
      this.queryExceptionList();
    },
    handelMesWarehousingTimeEnd(val) {
      this.form.mesWarehousingTimeEnd = moment(val).valueOf();
      this.queryExceptionList();
    },
    handelMesPackingTimeStart(val) {
      this.form.mesPackingTimeStart = moment(val).valueOf();
      this.queryExceptionList();
    },
    handelMesPackingTimeEnd(val) {
      this.form.mesPackingTimeEnd = moment(val).valueOf();
      this.queryExceptionList();
    },
    handelMesIsDeliveryFreeze(val) {
      this.form.mesIsDeliveryFreeze = val === "否" ? 0 : 1;
      this.queryExceptionList();
    },
    handelMesIsSample(val) {
      this.form.mesIsSample = val === "否" ? 0 : 1;
      this.queryExceptionList();
    },
    handelMesIsSolderJoint(val) {
      this.form.mesIsSolderJoint = val === "无" ? 0 : 1;
      this.queryExceptionList();
    },
    handelMesLeftRightSides(val) {
      this.form.mesLeftRightSides = val === "左" ? 0 : 1;
      this.queryExceptionList();
    },
    async queryExceptionList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryExceptionList(params);
      if (res.code === "0") {
        this.data = res.data.items;
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
    margin-top: 10px;
    padding: 6px;
  }
}
ul {
  display: flex;
}
.hiden {
  display: inline-block;
  width: calc(100% - 112px);
}
// ::v-deep .el-input__suffix {
//   right: 2.6125rem;
// }
::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
  width: 100px;
}
::v-deep span.el-tooltip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 4px !important;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
  width: 180px;
}
::v-deep .el-table {
  .el-table__fixed {
    height: auto !important;
    bottom: 17px !important;
  }
  .el-table__fixed::before {
    height: 0px;
  } 
}
</style>