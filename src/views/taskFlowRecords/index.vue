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
          <el-form-item label="MES箱号二维码">
              <el-input
                size="mini"
                v-model="form.mesBoxNumberQrCode"
                @change="handelMesBoxNumberQrCode"
                placeholder="请输入MES箱号二维码"
              ></el-input>
            </el-form-item>
            <el-form-item label="MES生产编号">
              <el-input
                size="mini"
                v-model="form.mesProductionNo"
                placeholder="请输入MES生产编号"
                @change="handelMesProductionNo"
              ></el-input>
            </el-form-item>
            <el-form-item label="MES规格代码">
              <el-input
                size="mini"
                v-model="form.mesNormsNo"
                placeholder="请输入MES规格代码"
                @change="handelMesNormsNo"
              ></el-input>
            </el-form-item>
            <el-form-item label="MES客户简称">
              <el-select  size="mini" v-model="form.mesCustomerShortName" @change="handelMesCustomerShortName" placeholder="请选择MES客户简称">
                <el-option
                v-for="item in mesCustomerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MES轮型">
              <!-- <el-input
                size="mini"
                v-model="form.mesWheelTypeCode"
                @change="handelMesWheelTypeCode"
                placeholder="请输入MES轮型"
              ></el-input> -->
              <el-select  size="mini" v-model="form.mesWheelType" @change="handelMesWheelTypeCode" placeholder="请输入MES轮型">
                <el-option
                v-for="item in mesWheelType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MES托盘">
              <el-select  size="mini" v-model="form.mesTray" @change="handelMesTray" placeholder="请输入MES托盘">
                <el-option
                v-for="item in mesTrayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MES米长">
              <el-select  size="mini" v-model="form.mesMeterLength" @change="handelMesMeterLength" placeholder="请输入MES米长">
                <el-option
                v-for="item in mesMeterLength"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MES左右面">
              <el-radio-group
                size="mini"
                v-model="form.mesLeftRightSides"
                @change="handelMesLeftRightSides"
              >
                <el-radio label="0">左</el-radio>
                <el-radio label="1">右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="MES有无焊点">
              <el-radio-group
                size="mini"
                v-model="form.mesIsSolderJoint"
                @change="handelMesIsSolderJoint"
              >
                <el-radio label="1">有</el-radio>
                <el-radio label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="MES轮数(设定值)">
              <el-input
                size="mini"
                v-model="form.mesNumOfRounds"
                placeholder="请输入MES轮数(设定值)"
                @change="handelMesNumOfRounds"
              ></el-input>
            </el-form-item>
            <el-form-item label="WMS客户简码">
              <el-input
                size="mini"
                v-model="form.customerSimpleCode"
                placeholder="请输入WMS客户简码"
                @change="handelMesNumOfRounds"
              ></el-input>
            </el-form-item>
          </SearchFilter>
        </div>
        <div class="table">
          <div class="enteringButton">
            <!-- <el-button
              type="primary"
              v-permission="{ name: 'isExport' }"
              @click="handelExport"
              size="mini"
              >导出Excel</el-button
            > -->
            <!-- <el-popover placement="right" width="500" trigger="click">
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
            </el-popover> -->
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
              <template v-else-if="col.label =='WMS备注'">
                <el-table-column
                  :fixed="col.fixed || false"
                  :key="index"
                  :prop="col.attr"
                  :label="col.label"
                  :width="col.width || '100'"
                >
                  <template slot-scope="scope">
                    <!-- <input  type="text" v-model="scope.row.remark" placeholder="请输入WMS备注" style="width: 90px;height: 26px;border: 2px solid #ccc;outline-color:#409EFF;outline-width : 1px;padding: 0 20px;border-radius: 5px;" /> -->
                    <el-input
                        v-show="scope.row.flag"
                        size="mini"
                        v-model="scope.row.remark"
                        @change="handelChangeHeight(scope.row)"
                        placeholder="请输入WMS备注"
                      ></el-input>
                      <span v-show="!scope.row.flag">{{ scope.row.remark }}</span>
                      <el-button size="mini" v-show="!scope.row.flag" type="text" @click="handelEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" v-show="scope.row.flag" type="text" @click="handelSave(scope.row)">保存</el-button>
                      <el-button size="mini" v-show="scope.row.flag" type="text" @click="handelCancel(scope.row)">取消</el-button>
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
  import { queryGoodsList, exportBaseGoods,setHeight,deleteRole,editRemark } from "@/api/essential";
  import { uploadExcel } from "@/utils/uploadExcel";
  import SearchFilter from "@/components/SearchFilter";
  import moment from "moment";
  export default {
    name: "modifyClient",
    components: { PageNation, SearchFilter },
    data: function () {
      return {
        tableData: [],
        form: {
            mesLeftRightSides:"",
        },
        columns: [
          {
            label: "WMS状态",
            attr: "wmsStatusName",
            width: "110",
            show: true,
            fixed: true,
          },
          {
            label: "AGV任务状态",
            attr: "agvTaskStatus",
            width: "100",
            show: true,
            fixed: true,
          },
          {
            label: "WMS任务类别",
            attr: "wmsTaskType",
            width: "100",
            show: true,
            fixed: true,
          },
          {
            label: "AGV任务编号",
            attr: "agvTaskNo",
            width: "180",
            show: true,
            fixed: true,
          },
          {
            label: "AGV编号",
            attr: "agvNo",
            width: "80",
            show: true,
            fixed: true,
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
            label: "WMS任务完成时间",
            attr: "wmsTaskCompleteTime",
            width: "180",
            show: true,
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
            label: "WMS客户简码",
            attr: "wmsCustomerSimpleCode",
            width: "115",
            show: true,
          },
          {
            label: "MES毛重",
            attr: "mesGrossWeight",
            width: "100",
            show: true,
          },
          {
            label: "WMS备注",
            attr: "remark",
            width: "100",
            show: true,
          },
        ],
        mesWheelType:[],
        mesCustomerOptions:[],
        mesTrayOptions:[],
        mesMeterLength:[],
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        loading: true,
        height:"",
        obj:'',
      };
    },
    mounted() {
      this.queryGoodsList();
      this.getProjectList()
      this.$store.dispatch('realList').then(()=>{
        this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
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
    methods: {
        handelEdit(row){
            this.obj=row.remark
            row.flag=true
        },
        async handelSave(row){
            const params={
              id:row.id,
              remark:row.remark,
            }
            const res = await editRemark(params)
            if(res.code==='0'){
                row.flag=false
                this.queryGoodsList();
                this.$message.success(res.msg)
            }
        },
        handelCancel(row){
           row.remark=this.obj
           row.flag=false
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
      async handelChangeHeight(row){
      
      },
      async queryGoodsList() {
        const params = {
          request: this.form,
          page: this.listQuery.pageNum - 1,
          size: this.listQuery.pageSize,
        };
        const res = await queryGoodsList(params);
        if (res.code === "0") {
            // Object.freeze(res.data.items)
          this.tableData = res.data.items.map((v)=>{
            return{
                ...v,
                flag:false,
            }
          });
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
        this.form={}
        this.queryGoodsList();
      },
      handelMesBoxNumberQrCode(val) {
        this.form.mesBoxNumberQrCode = val;
        this.queryGoodsList();
      },
      handelMesProductionNo(val) {
        this.form.mesProductionNo = val;
        this.queryGoodsList();
      },
      handelMesNormsNo(val) {
        if(val){
          this.form.mesNormsName = val;
          this.queryGoodsList();
        }
      },
      handelMesCustomerShortName(val) {
        this.form.mesCustomerShortName = val;
        this.queryGoodsList();
      },
      handelMesWheelTypeCode(val) {
        this.form.mesWheelType = val;
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
      handelMesLeftRightSides(val) {
        // this.form.mesLeftRightSides = val === "左" ? 0 : 1;
        this.queryGoodsList();
      },
      handelMesIsSolderJoint(val) {
        // this.form.mesIsSolderJoint = val === "有" ? 1 : 0;
        this.queryGoodsList();
      },
      handelMesNumOfRounds(val) {
        this.form.mesNumOfRounds = val;
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