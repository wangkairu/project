<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'145px'"
        size="mini"
        :maxShow="3"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="库房">
          <el-select
            size="mini"
            clearable
            v-model="form.warehouseCode"
            placeholder="请选择库房"
            @change="handelWarehouseCode"
          >
            <el-option
              v-for="item in echoWarehouseCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="MES客户简码">
          <el-input
            size="mini"
            v-model="form.customerSimpleCode"
            placeholder="请输入MES客户简码"
            @change="handelCustomerSimpleCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES箱号二维码">
          <el-input
            size="mini"
            v-model="form.mesBoxNumberQrCode"
            placeholder="请输入MES箱号二维码"
            @change="handelMesBoxNumberQrCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES箱焊点轮数">
          <el-input
            size="mini"
            v-model="form.mesBoxWeldingPointsNum"
            placeholder="请输入MES箱焊点轮数"
            @change="handelMesBoxWeldingPointsNum"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES客户简称">
          <el-select
            filterable
            clearable
            v-model="form.mesCustomerShortName"
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
            v-model="form.mesMeterLength"
            placeholder="请输入MES米长"
            @change="handelMesMeterLength"
          >
            <el-option
            v-for="item in mesMeterLength"
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
            v-model="form.mesNumOfRounds"
            placeholder="请输入MES轮数"
            @change="handelMesNumOfRounds"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES规格简称">
            <el-select
                filterable
                clearable
                v-model="form.mesNormsNo"
                placeholder="请选择MES规格简称"
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
            v-model="form.mesProductionNo"
            placeholder="请输入MES生产编号"
            @change="handelMesProductionNo"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="托盘">
          <el-select
              filterable
              clearable
              v-model="form.mesTray"
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
            v-model="form.mesWheelTypeCode"
            placeholder="请输入MES轮型编码"
            @change="handelMesWheelTypeCode"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="MES发货开始时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesDeliveryTimeStart"
              type="date"
              placeholder="开始时间"
              @change="handelMesDeliveryTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES发货结束时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesDeliveryTimeEnd"
              type="date"
              placeholder="结束时间"
              @change="handelMesDeliveryTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES入库开始时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesWarehousingTimeStart"
              type="date"
              placeholder="开始时间"
              @change="handelMesWarehousingTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES入库结束时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesWarehousingTimeEnd"
              type="date"
              placeholder="结束时间"
              @change="handelMesWarehousingTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES装箱开始时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesPackingTimeStart"
              type="date"
              placeholder="开始时间"
              @change="handelMesPackingTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES装箱结束时间">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.mesPackingTimeEnd"
              type="date"
              placeholder="结束时间"
              @change="handelMesPackingTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="MES发货是否冻结">
          <el-radio-group
            size="mini"
            v-model="form.mesIsDeliveryFreeze"
            @change="handelMesIsDeliveryFreeze"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="MES是否样品">
          <el-radio-group
            size="mini"
            v-model="form.mesIsSample"
            @change="handelMesIsDeliveryFreeze"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="MES有无焊点">
          <el-radio-group
            size="mini"
            v-model="form.mesIsSolderJoint"
            @change="handelMesIsDeliveryFreeze"
          >
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="MES左右面">
          <el-radio-group
            size="mini"
            v-model="form.mesLeftRightSides"
            @change="handelMesIsDeliveryFreeze"
          >
            <el-radio label="0">左</el-radio>
            <el-radio label="1">右</el-radio>
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
          :data="data"
        >
          <el-table-column fixed type="index" label="#"> </el-table-column>
          <template v-for="(col,index) in bindTableColumns">
            <template v-if="col.label === 'MES发货是否冻结'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.mesIsDeliveryFreeze==0?"否" : "是"  }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === 'MES是否冻结'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.mesIsFreeze==0?"否" : "是"  }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === 'MES是否样品'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.mesIsSample==0?"否" : "是"  }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === 'MES有无焊点'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.mesIsSolderJoint==0?"无" : "有" }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === 'MES左右面'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width || '100'"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.mesLeftRightSides==0?"左" : "右"  }}
                  </span>
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
</template>
<script>

import PageNation from "@/components/Pagination";
import { queryDetailList, } from "@/api/storeIn";
import SearchFilter from "@/components/SearchFilter";
import {queryWarehouseColDropDown,exportInDetail} from '@/api/location'
import { uploadExcel } from "@/utils/uploadExcel";
import moment from "moment";
export default {
  name: "Details",
  components: { PageNation, SearchFilter },
  data() {
    return {
      data: [],
      columns: [
        {
          label:"库房",
          attr:"sourceFromEnum",
          width:"80",
          show: true,
          fixed: true,
        },
        {
          label: "取货车车辆号",
          attr: "agvNo",
          width: "80",
          show: true,
          fixed: true,
        },
        {
          label: "取货点",
          attr: "warehouseName",
          width: "110",
          show: true,
          fixed: true,
        },
        {
          label: "MES客户全称",
          attr: "mesCustomerName",
          width: "210",
          show: true,
          fixed: true,
          tooltip: true
        },
        {
          label: "MES客户简称",
          attr: "mesCustomerShortName",
          width: "100",
          show: true,
          fixed: true,
        },
        {
          label: "MES箱号二维码",
          attr: "mesBoxNumberQrCode",
          width: "120",
          show: true,
          fixed: true,
        },
        {
          label: "创建时间",
          attr: "createTime",
          width: "106",
          show: true,
          fixed: false,
        },
        
        {
          label: "MES箱焊点轮数",
          attr: "mesBoxWeldingPointsNum",
          width: "100",
          show: true,
          // fixed: false,
        },
        {
          label: "MES时效",
          attr: "mesAgeing",
          width: "150",
          show: true,

        },
        {
          label: "MES箱号",
          attr: "mesBoxNo",
          width: "100",
          show: true,
        },
        {
          label: "MES分厂",
          attr: "mesBranchFactory",
          width: "100",
          show: true,
        },
        {
          label: "MES分厂编号",
          attr: "mesBranchFactoryCode",
          width: "100",
          show: true,
        },
        {
          label: "MES起鼓",
          attr: "mesBulging",
          width: "70",
          show: true,
        },
        {
          label: "MES帘线结构",
          attr: "mesCordStructure",
          width: "200",
          show: true,
        },
        {
          label: "MES发货时间",
          attr: "mesDeliveryTime",
          width: "160",
          show: true,
        },
        {
          label: "MES配箱值",
          attr: "mesDistributionValue",
          width: "100",
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
          label: "MES发货是否冻结",
          attr: "mesIsDeliveryFreeze",
          width: "220",
          show: true,
        },
        {
          label: "MES是否冻结",
          attr: "mesIsFreeze",
          width: "100",
          show: true,
        },
        {
          label: "MES是否样品",
          attr: "mesIsSample",
          width: "115",
          show: true,
        },
        {
          label: "MES有无焊点",
          attr: "mesIsSolderJoint",
          show: true,
          tooltip: true
        },
        {
          label: "MES左右面",
          attr: "mesLeftRightSides",
          width: "58",
          show: true,
          tooltip: true
        },
        {
          label: "MES米长",
          attr: "mesMeterLength",
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
          label: "MES规格名称",
          attr: "mesNormsName",
          width: "120",
          show: true,
        },
        {
          label: "MES规格代码",
          attr: "mesNormsNo",
          width: "100",
          show: true,
        },
        {
          label: "MES轮数",
          attr: "mesNumOfRounds",
          show: true,
        },
        {
          label: "MES装箱时间",
          attr: "mesPackingTime",
          width: "180",
          show: true,
        },
        {
          label: "MES生产编号",
          attr: "mesProductionNo",
          width: "230",
          show: true,
        },
        {
          label: "MES返工时间",
          attr: "mesReworkTime",
          width: "160",
          show: true,
        },
        {
          label: "MES焊点",
          attr: "mesSolderJoint",
          width: "160",
          show: true,
        },
        {
          label: "MES特殊要求",
          attr: "mesSpecialRequirements",
          width: "180",
          show: true,
        },
        {
          label: "MES工艺",
          attr: "mesTechnology",
          width: "260",
          show: true,
        },
        {
          label: "MES总皮重",
          attr: "mesTotalTareWeight",
          width: "80",
          show: true,
        },
        {
          label: "MES托盘",
          attr: "mesTray",
          width: "100",
          show: true,
        },
        {
          label: "MES入库时间",
          attr: "mesWarehousingTime",
          width: "106",
          show: true,
        },
        {
          label: "MES轮型",
          attr: "mesWheelType",
          width: "80",
          show: true,
        },
        {
          label: "WMS客户简码",
          attr: "wmsCustomerSimpleCode",
          width: "100",
          show: true,
        },
      ],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      echoWarehouseCodeOptions:[],
      total: 0,
      form: {
        warehouseCode:null,
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
      },
      mesCustomerOptions:[],
      mesNormsNameListOptions:[],
      mesTrayOptions:[],
      mesMeterLength:[],
    };
  },
  mounted() {
    this.queryDetailList();
    this.getProjectList()
    this.$store.dispatch('realList').then(()=>{
      // this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
      this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
      this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
      this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
      this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
    })
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
  watch:{
    warehouseCode:{
      immediate:true,
      handler(val){
        const code=localStorage.getItem("houseCode")
        if(code){
          this.form.warehouseCode=code
        }
      }
    }
  },
  methods: {
    handelExport(){
      const params={
        titleNameList:[],
        ...this.form
      }
      this.bindTableColumns &&
        this.bindTableColumns.length > 0 &&
        this.bindTableColumns.forEach((v) => {
          params.titleNameList.push(v.attr)
        });
      exportInDetail(params).then((res) => {
        const blob = new Blob([res], { type: "application/vnd.ms-excel" });
        const fileName = "入库明细.xlsx";
        uploadExcel(fileName, blob);
      });
    },
    handelWarehouseCode(val){
      localStorage.setItem("houseCode",val)
      this.queryDetailList();
    },
    async getProjectList() {
      const params = {};
      const res = await queryWarehouseColDropDown(params);
      if (res.code === "0") {
        this.echoWarehouseCodeOptions = res.data;
      }
    },
    search() {
      this.queryDetailList();
    },
    reset() {
      this.form = {};
      this.queryDetailList();
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryDetailList();
    },
    async queryDetailList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryDetailList(params);
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
          type: 'success',
          duration: 1000
        })
      }
    },
    handelCustomerSimpleCode(val) {
      this.form.customerSimpleCode = val
      this.queryDetailList();
    },
    handelMesBoxNumberQrCode(val) {
      this.form.mesBoxNumberQrCode = val
      this.queryDetailList();
    },
    handelMesBoxWeldingPointsNum(val) {
      this.form.mesBoxWeldingPointsNum = val
      this.queryDetailList();
    },
    handelMesCustomerShortName(val) {
      this.form.mesCustomerShortName = val
      this.queryDetailList();
    },
    handelMesMeterLength(val) {
      this.form.mesMeterLength = val
      this.queryDetailList();
    },
    handelMesNumOfRounds(val) {
      this.form.mesNumOfRounds = val
      this.queryDetailList();
    },
    handelMesNormsNo(val) {
      this.form.mesNormsNo = val
      this.queryDetailList();
    },
    handelMesProductionNo(val) {
      this.form.mesProductionNo = val
      this.queryDetailList();
    },
    handelMesTray(val) {
      this.form.mesTray = val
      this.queryDetailList();
    },
    handelMesWheelTypeCode(val) {
      this.form.mesWheelTypeCode = val
      this.queryDetailList();
    },
    handelMesDeliveryTimeStart(val) {
      this.form.mesDeliveryTimeStart = moment(val).valueOf();
      this.queryDetailList();
    },
    handelMesDeliveryTimeEnd(val) {
      this.form.mesDeliveryTimeEnd = moment(val).valueOf();
      this.queryDetailList();
    },
    handelMesWarehousingTimeStart(val) {
      this.form.mesWarehousingTimeStart = moment(val).valueOf();
      this.queryDetailList();
    },
    handelMesWarehousingTimeEnd(val) {
      this.form.mesWarehousingTimeEnd = moment(val).valueOf();
      this.queryDetailList();
    },
    handelMesPackingTimeStart(val) {
      this.form.mesPackingTimeStart = moment(val).valueOf();
      this.queryDetailList();
    },
    handelMesPackingTimeEnd(val) {
      this.form.mesPackingTimeEnd = moment(val).valueOf();
      this.queryDetailList();
    },
    handelMesIsDeliveryFreeze(val) {
      this.queryDetailList();
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
.time {
  ::v-deep .el-input__suffix {
    right: 2.6125rem;
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
</style>