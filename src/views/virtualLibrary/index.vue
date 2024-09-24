<template>
  <div class="warpper">
    <div class="warpper-left">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'200px'"
          :maxShow="3"
          :collapsiable="false"
          @search="search"
          @reset="reset"
        >
        <el-form-item label="库房编号">
          <el-select
            clearable
            size="mini"
            v-model="sourceFrom"
            placeholder="请选择库房"
            @change="warehouseCodeChanged"
          >
            <el-option
              v-for="item in warehouseCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
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
              clearable
              v-model="mesNormsName"
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
              type="date"
              placeholder="MES发货开始时间"
              @change="handelMesDeliveryTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES发货时间">
            <el-date-picker
              size="mini"
              v-model="mesDeliveryTimeEnd"
              type="date"
              placeholder="MES发货结束时间"
              @change="handelMesDeliveryTimeEnd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES装箱时间">
            <el-date-picker
              size="mini"
              v-model="mesPackingTimeStart"
              type="date"
              placeholder="MES装箱开始时间"
              @change="handelMesPackingTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES装箱时间">
            <el-date-picker
              size="mini"
              v-model="mesPackingTimeEnd"
              type="date"
              placeholder="MES装箱结束时间"
              @change="handelMesPackingTimeEnd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES入库时间">
            <el-date-picker
              size="mini"
              v-model="mesWarehousingTimeStart"
              type="date"
              placeholder="MES入库开始时间"
              @change="handelMesWarehousingTimeStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="MES入库时间">
            <el-date-picker
              size="mini"
              v-model="mesWarehousingTimeEnd"
              type="date"
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
          <el-button
            type="primary"
            v-permission="{ name: 'isExport' }"
            @click="handelExport"
            size="mini"
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
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          style="width: 100%"
          :data="tableData"
        >
          <el-table-column fixed type="index" label="#"> </el-table-column>
          <el-table-column  fixed  label="操作">
            <template slot-scope="scope">
              <el-button v-show="scope.row.wmsStatusName === '已入库'" type="text" size="size" @click="handelDelete(scope.row)">删除</el-button>
              <el-button v-show="scope.row.needDataComplete" type="text" size="size" @click="handelComplation(scope.row)">数据补全</el-button>
            </template>
          </el-table-column>
          <template v-for="(col, index) in bindTableColumns">
            <template v-if="col.label === 'WMS状态'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    <el-tag
                      v-if="scope.row.wmsStatusName === '已入库'"
                      type="success"
                      >{{ scope.row.wmsStatusName }}</el-tag
                    >
                    <el-tag v-else type="danger">{{
                      scope.row.wmsStatusName
                    }}</el-tag>
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === 'AGV车辆'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.agvNo?scope.row.agvNo:'暂无车辆' }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === 'AGV任务编号'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.agvTaskNo?scope.row.agvTaskNo:'暂无' }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label =='高度'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <input type="text" v-model="scope.row.height" placeholder="请输入高度" style="width: 90px;height: 26px;border: 2px solid #ccc;outline-color:#409EFF;outline-width : 1px;padding: 0 20px;border-radius: 5px;" @change="handelChangeHeight($event,scope.row)"/>
                  <!-- <el-input
                      size="mini"
                      v-model="scope.row.height"
                      @change="handelChangeHeight"
                      placeholder="请输入高度"
                    ></el-input> -->
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
                :show-overflow-tooltip="col.tooltip || false"
              >
              </el-table-column>
            </template>
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
import {
  queryWarehouseColDropDown,
} from "@/api/location";
import PageNation from "@/components/Pagination";
import { queryGoodsList, exportBaseGoods,setHeight,deleteRole ,dataComplete} from "@/api/essential";
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
          label:"库房",
          attr:"warehouseEnum",
          width:"90",
          show: true,
          fixed: true,
        },
        {
          label: "WMS状态",
          attr: "wmsStatusName",
          width: "110",
          show: true,
          fixed: true,
        },
        {
          label: "AGV车辆",
          attr: "agvNo",
          width: "110",
          show: true,
          fixed: true,
        },
        {
          label: "AGV任务编号",
          attr: "agvTaskNo",
          width: "210",
          show: true,
          fixed: true,
        },
        {
          label: "周数",
          attr: "weeks",
          width: "90",
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
          width: "80",
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
          tooltip: true
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
          width: "80",
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
          attr: "mesLeftRightSidesName",
          width: "70",
          show: true,
        },
        {
          label: "MES有无焊点",
          attr: "mesIsSolderJoint",
          width: "70",
          show: true,
        },
        {
          label: "MES轮数",
          attr: "mesNumOfRounds",
          width: "80",
          show: true,
        },
        {
          label: "MES特殊要求",
          attr: "mesSpecialRequirements",
          width: "200",
          show: true,
          tooltip: true
        },
        {
          label: "MES箱号二维码",
          attr: "mesBoxNumberQrCode",
          width: "200",
          show: true,
        },
        {
          label: "MES生产编号",
          attr: "mesProductionNo",
          width: "220",
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
          width: "115",
          show: true,
        },
        {
          label: "MES客户全称",
          attr: "mesCustomerName",
          width: "400",
          show: true,
          tooltip: true
        },
        {
          label: "MES帘线结构",
          attr: "mesCordStructure",
          width: "180",
          show: true,
          tooltip: true
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
          width: "80",
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
          width: "115",
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
          width: "90",
          show: true,
        },
        {
          label: "MES冻结",
          attr: "mesIsFreeze",
          width: "80",
          show: true,
        },
        {
          label: "MES发货冻结",
          attr: "mesIsDeliveryFreeze",
          width: "110",
          show: true,
        },
        {
          label: "WMS时效到达时间",
          attr: "wmsAgeingTime",
          width: "100",
          show: true,
        },
        {
          label: "MES时效",
          attr: "mesAgeing",
          width: "80",
          show: true,
        },
        {
          label: "WMS时效是否到达",
          attr: "wmsIsAgeing",
          width: "100",
          show: true,
        },
        {
          label: "MES焊点",
          attr: "mesSolderJoint",
          width: "80",
          show: true,
        },
        {
          label: "MES工艺",
          attr: "mesTechnology",
          width: "80",
          show: true,
          tooltip: true
        },
        {
          label: "MES配箱值",
          attr: "mesDistributionValue",
          width: "100",
          show: true,
        },
        {
          label: "MES起鼓",
          attr: "mesBulging",
          width: "80",
          show: true,
        },
        {
          label: "WMS从MES获取信息时间",
          attr: "wmsGetInfoFromMesTime",
          width: "190",
          show: true,
        },
        {
          label: "AGV任务状态",
          attr: "agvTaskStatus",
          width: "110",
          show: true,
        },
        {
          label: "WMS任务类别",
          attr: "wmsTaskType",
          width: "120",
          show: true,
        },
        // {
        //   label: "AGV任务编号",
        //   attr: "agvTaskNo",
        //   width: "110",
        //   show: true,
        //   tooltip: true
        // },
        {
          label: "AGV编号",
          attr: "agvNo",
          width: "80",
          show: true,
        },
        {
          label: "WMS起点库位编号",
          attr: "wmsStartWarehouseCode",
          width: "150",
          show: true,
        },
        {
          label: "WMS终点库位编号",
          attr: "wmsEndWarehouseCode",
          width: "150",
          show: true,
        },
        {
          label: "WMS终点库列编号",
          attr: "wmsEndWarehouseColCode",
          width: "150",
          show: true,
        },
        {
          label: "WMS终点库区名称",
          attr: "wmsEndWarehouseAreaName",
          width: "150",
          show: true,
        },
        {
          label: "WMS调拨前库位编号",
          attr: "wmsBeforeAllocateTransferWarehouseCode",
          width: "160",
          show: true,
        },
        {
          label: "WMS任务发布人",
          attr: "wmsTaskPublisher",
          width: "130",
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
          width: "120",
          show: true,
        },
        {
          label: "WMS返库原因",
          attr: "wmsReturnWarehouseReason",
          width: "120",
          show: true,
        },
        {
          label: "高度",
          attr: "height",
          width: "170",
          show: true,
        },
      ],
      warehouseCodeOptions:[],
      sourceFrom:"",
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
      mesNormsName: "",
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
        pageSize: 10,
      },
      loading: true,
      height:"",
    };
  },
  mounted() {
    this.queryGoodsList();
    this.getProjectList()
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
        this.columns&&this.columns.length>0&&this.columns.forEach((column) => {
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
    async handelComplation(row){
      const res = await dataComplete(row.id)
      if(res.code==0){
        this.queryGoodsList();
      }else{
        this.$message.error(res.msg)
      }
    },
    async getProjectList() {
      const params = {};
      const res = await queryWarehouseColDropDown(params);
      if (res.code === "0") {
        this.warehouseCodeOptions = res.data;
      }
    },
    warehouseCodeChanged(val){
      if(val){
        this.form.sourceFrom=val
        this.queryGoodsList();
      }
    },
    async handelDelete(row){
      const res = await deleteRole(row.id)
      if(res.code=='0'){
        this.queryGoodsList();
      }else{
        this.$message.error(res.msg)
      }
    },
    async handelChangeHeight(val,row){
      const params={
        id:row.id,
        height:val.target.value
      }
      const res = await setHeight(params)
      if(res.code==='0'){
        this.queryGoodsList();
        this.$message.success(res.msg)
      }
    },
    async queryGoodsList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryGoodsList(params);
      if (res.code === "0") {
        this.tableData = Object.freeze(res.data.items);
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
      this.queryGoodsList();
    },
    search() {
      this.queryGoodsList();
    },
    reset() {
      this.form = {};
      this.sourceFrom=""
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
      this.mesNormsName = "";
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
      if(val){
        this.form.mesNormsName = val;
        this.queryGoodsList();
      }
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
      this.form.wmsIsAgeing = val === "否" ? 0 : 1;
      this.queryGoodsList();
    },
    handelMesDeliveryTimeStart(val) {
      this.form.mesDeliveryTimeStart = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesDeliveryTimeEnd(val) {
      this.form.mesDeliveryTimeEnd= moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesPackingTimeEnd(val) {
      this.form.mesPackingTimeEnd = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesPackingTimeStart(val) {
      this.form.mesPackingTimeStart = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesWarehousingTimeEnd(val) {
      this.form.mesWarehousingTimeEnd = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelMesWarehousingTimeStart(val) {
      this.form.mesWarehousingTimeStart = moment(val).valueOf();
      this.queryGoodsList();
    },
    handelExport() {
      let params={
        titleNameList:[],
        ...this.form
      }
      this.bindTableColumns &&
        this.bindTableColumns.length > 0 &&
        this.bindTableColumns.forEach((v) => {
          params.titleNameList.push(v.attr)
        });
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
    margin-top: 10px;
    padding: 6px;
  }
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
::v-deep .el-date-editor.el-input,
::v-deep .el-radio-group {
  width: 182px;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
</style>