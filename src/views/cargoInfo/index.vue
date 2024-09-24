<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'105px'"
          size="mini"
          :maxShow="4"
          @search="search"
          @reset="reset"
        >
        <el-form-item label="规格类型">
            <el-radio-group
              size="mini"
              v-model="form.type"
              @change="handelNormsType"
            >
              <el-radio label="半钢"></el-radio>
              <el-radio label="全钢"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="MES规格简称">
            <el-select
                filterable
                clearable
                v-model="form.normsSimpleCode"
                placeholder="请选择MES规格简称"
                @change="handelNormsSimpleCode"
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
          <el-form-item label="MES客户简称">
            <el-select
                filterable
                clearable
                v-model="form.customerShortName"
                @change="handelNormsSimpleCode"
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
          <el-form-item label="MES轮型">
              <el-select
                  filterable
                  clearable
                  v-model="form.wheelType"
                  placeholder="请输入MES轮型"
                  @change="handelNormsSimpleCode"
              >
                  <el-option
                  v-for="item in mesWheelType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                  </el-option>
              </el-select>
          </el-form-item >
        </SearchFilter>
      </div>
      <div class="table">
        <div class="enteringButton">
            <el-button
            type="primary"
            @click="handelAdd"
            size="mini"
            >新增</el-button>
          <el-button
            type="primary"
            v-permission="{ name: 'isExport' }"
            @click="handelExport"
            size="mini"
            >导出Excel</el-button
          >
          <el-button
            type="primary"
            style="margin-left: 10px;"
            @click="handelExportTemplate"
            size="mini"
            >导出规格模板</el-button
          >
          <el-upload
            action="#"
            :http-request="handelExcelImport"
            class="upload-demo"
            accept=".xls,.xlsx"
            multiple
            :show-file-list="false"
          >
            <el-button style="margin-left: 10px;" size="mini" type="primary">导入Excel</el-button>
          </el-upload>
          <el-popover placement="bottom" width="300" trigger="click">
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
          <el-table-column  type="index" label="#" > </el-table-column>
          <template v-for="(col, index) in bindTableColumns">
            <template v-if="col.label === '是否启用'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width "
              >
                <template slot-scope="scope">
                  <span>
                    <el-tag
                      v-if="scope.row.isEnabledEnum === '是'"
                      type="success"
                      >{{ scope.row.isEnabledEnum }}</el-tag
                    >
                    <el-tag v-else type="danger">{{
                      scope.row.isEnabledEnum
                    }}</el-tag>
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="col.label === '左右面'">
              <el-table-column
                :fixed="col.fixed || false"
                :key="index"
                :prop="col.attr"
                :label="col.label"
                :width="col.width "
              >
                <template slot-scope="scope">
                  <span>
                    <el-tag
                      v-if="scope.row.leftRightSidesEnum === '左'"
                      type="success"
                      >{{ scope.row.leftRightSidesEnum }}</el-tag
                    >
                    <el-tag v-else type="danger">{{ scope.row.leftRightSidesEnum }}</el-tag>
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
                :width="col.width"
                :show-overflow-tooltip="col.tooltip || false"
              >
              </el-table-column>
            </template>
          </template>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
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
      <el-dialog
       :title="title"
       :visible.sync="dialogVisible"
       @close="handelClose('ruleForm')"
       width="30%">
       <el-form :model="ruleForm" size="mini" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="规格简称" prop="normsSimpleCode">
                <el-input  v-model="ruleForm.normsSimpleCode" placeholder="请输入规格简称"></el-input>
            </el-form-item>
            <el-form-item label="客户简称" prop="customerShortName">
                <el-input  v-model="ruleForm.customerShortName" placeholder="请输入客户简称"></el-input>
            </el-form-item>
            <el-form-item label="轮型" prop="wheelType">
                <el-input  v-model="ruleForm.wheelType" placeholder="请输入轮型"></el-input>
            </el-form-item>
            <el-form-item label="米长" prop="meterLength">
                <el-input  v-model="ruleForm.meterLength" placeholder="请输入米长"></el-input>
            </el-form-item>
            <el-form-item label="特殊要求" prop="specialRequirements">
                <el-input  v-model="ruleForm.specialRequirements" placeholder="请输入特殊要求"></el-input>
            </el-form-item>
            <el-form-item label="规格类型" prop="normsType">
                <el-select v-model="ruleForm.normsType" placeholder="请选择规格类型">
                    <el-option label="全钢" value="1"></el-option>
                    <el-option label="半钢" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="左右面" prop="leftRightSides">
                <el-select v-model="ruleForm.leftRightSides" placeholder="请选择左右面">
                    <el-option label="R" value="1"></el-option>
                    <el-option label="L" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="isEnabled">
                <el-select v-model="ruleForm.isEnabled" placeholder="请选择是否启用">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="未启用" value="0"></el-option>
                </el-select>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handelCancel('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="handelConfirm">确 定</el-button>
            </span>
      </el-dialog>
    </div>
  </template>
  <script>
  import descriptionsTooltip from '@/components/Descriptions'
  import PageNation from "@/components/Pagination";
  import { queryNormsList ,saveOrUpdateGoods,basNormsExport,importNorms,exportTemplate} from "@/api/specification";
  import SearchFilter from "@/components/SearchFilter";
  import { uploadExcel } from "@/utils/uploadExcel";
  export default {
    name: "cargoInfo",
    components: { PageNation, SearchFilter, descriptionsTooltip },
    data() {
      return {
        dialogVisible:false,
        data: [],
        columns: [
          // {
          //   label: "id",
          //   attr: "id",
          //   show: true,
          // },
        //   {
        //     label: "是否启用",
        //     attr: "isEnabledEnum",
        //     show: true,
        //   },
          {
            label: "规格简称",
            attr: "normsSimpleCode",
            show: true,
          },{
            label: "客户简称",
            attr: "customerShortName",
            show: true,
          },{
            label: "轮型",
            attr: "wheelType",
            show: true,
          },{
            label: "米长",
            attr: "meterLength",
            show: true,
          },{
            label: "左右面",
            attr: "leftRightSides",
            show: true,
          },{
            label: "特殊要求",
            attr: "specialRequirements",
            show: true,
          },
          // {
          //   label: "规格类型",
          //   attr: "normsTypeEnum",
          //   show: true,
          // }
        ],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        ruleForm:{
          isEnabled: '',
          normsSimpleCode: "",
          normsType: '',
          leftRightSides: 0,
          meterLength: "",
          customerShortName: "",
          specialRequirements: "",
          wheelType: ""
        },
        type:"",
        form:{
          normsSimpleCode: "",
          normsType: '',
        },
        rules: {
          normsSimpleCode: [
            { required: true, message: '请输入规格简称', trigger: 'blur' },
          ],
          customerShortName: [
            { required: true, message: '请输入客户简称', trigger: 'blur' },
          ],
          wheelType: [
            { required: true, message: '请输入轮型', trigger: 'blur' },
          ],
          meterLength: [
            { required: true, message: '请输入米长', trigger: 'blur' },
          ],
          specialRequirements: [
            { required: true, message: '请输入特殊要求', trigger: 'blur' },
          ],
          normsType: [
            { required: true, message: '请选择规格类型', trigger: 'blur' }
          ],
          isEnabled: [
            { required: true, message: '请选择是否启用', trigger: 'blur' }
          ],
          leftRightSides: [
            { required: true, message: '请选择左右面', trigger: 'blur' }
          ],
        },
        title:"",
        mesWheelType:[],
        mesCustomerOptions:[],
        mesNormsNameListOptions:[],
      };
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
    mounted() {
      this.queryNormsList();
      this.$store.dispatch('realList').then(()=>{
          this.mesWheelType=this.$store.state.obj.mes_wheel_type.map(v=>{return {key:v,value:v,}})
          this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}})
          this.mesNormsNameListOptions=this.$store.state.obj.specification.map((v)=>{return { key:v,value:v,}})
          // this.mesTrayOptions=this.$store.state.obj.mes_tray.map((v)=>{return { key:v,value:v,}})
          // this.mesMeterLength=this.$store.state.obj.mes_meter_length.map((v)=>{return { key:v,value:v,}})
        })
    },
    methods: {
    handelClose(formName){
      this.$refs[formName].resetFields();
    },
    async handelExcelImport(file){
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   } 
      // }
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await importNorms(formData)
      if (res.code === '0') {
        this.queryNormsList();
        // this.$message({
        //     message: res.msg,
        //     type: 'success',
        //     duration: 1000
        // })
      } else {
        this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
        })
      }
    },
    handelNormsSimpleCode(){
      this.queryNormsList();
    },
    async handelExportTemplate(){
      const res = await exportTemplate()
      const blob = new Blob([res], { type: "application/vnd.ms-excel" });
      const fileName = "规格导入模板.xlsx";
      uploadExcel(fileName, blob);
    },
    handelNormsType(val){
      this.form.normsType=val==='半钢'?0:1,
      this.queryNormsList();
    },
     handelExport(){
      let params={
        ...this.form
      }
      // this.bindTableColumns &&
      //   this.bindTableColumns.length > 0 &&
      //   this.bindTableColumns.forEach((v) => {
      //     params[`${v.attr}`]=""
      //   });
      basNormsExport(params).then((res) => {
        const blob = new Blob([res], { type: "application/vnd.ms-excel" });
        const fileName = "规格信息表.xlsx";
        uploadExcel(fileName, blob);
      });
    },
    handelAdd(){
      this.title='新增'
      this.dialogVisible=true;
      this.ruleForm={};
    },
    handelCancel(formName){
        this.dialogVisible=false;
        this.$refs[formName].resetFields();
    },
    async handleEditClick(row){
      this.title='编辑'
      this.dialogVisible=true;
      this.ruleForm={
        ...row,
        normsType:row.normsType===1?'全钢':'半钢',
        isEnabled:row.isEnabled===1?'启用':'未启用',
        leftRightSides:row.leftRightSides===1?'R':'L'
      }
    },
    async handelConfirm(){
      if(this.title==='新增'){
        const params={
          ...this.ruleForm
        }
        this.saveOrUpdateGoods(params)
      }else{
        const params={
          id:this.ruleForm.id,
          normsSimpleCode:this.ruleForm.normsSimpleCode,
          normsType:this.ruleForm.normsType==="1"?1:0,
          isEnabled:this.ruleForm.isEnabled==='启用'?1:0,
          leftRightSides:this.ruleForm.leftRightSides==='R'?1:0
        }
        this.saveOrUpdateGoods(params)
      }
    },
    async saveOrUpdateGoods(params){
      const res=await saveOrUpdateGoods(params)
      if(res.code=='0'){
        this.dialogVisible = false;
        this.ruleForm={
          isEnabled: '',
          normsSimpleCode:"",
          normsType: ''
        }
        this.queryNormsList();
      }else{
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    search() {
    this.queryNormsList();
    },
    reset() {
    this.form = {};
    this.queryNormsList();
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryNormsList();
    },
     
    async queryNormsList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryNormsList(params);
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
        display: flex;
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
      bottom: 16px !important;
    }
    .el-table__cell{
      padding: 0.62rem 0;
    }
  }
  </style>