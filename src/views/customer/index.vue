<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'135px'"
        size="mini"
        :maxShow="6"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="客户全称">
          <el-input
            clearable
            size="mini"
            v-model="form.customerFullName"
            @change="handelCustomerFullName"
            placeholder="请输入客户全称"
          ></el-input>
        </el-form-item>
        <el-form-item label="	客户总称">
          <el-input
            clearable
            size="mini"
            v-model="form.customerGlobalName"
            @change="handelCustomerGlobalName"
            placeholder="请输入客户总称"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户信用等级">
          <el-select
            clearable
            v-model="form.customerLevel"
            @change="handelCustomerLevel"
            placeholder="请选择客户信用等级"
            size="mini"
          >
            <el-option
              v-for="item in customerLevelOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户简称">
            <el-select
              clearable
              filterable
              v-model="form.customerShortName"
              placeholder="请选择客户简称"
              @change="handelCustomerShortName"
            >
                <el-option
                v-for="item in mesCustomerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="客户简码">
          <el-input
            clearable
            size="mini"
            v-model="form.customerSimpleCode"
            placeholder="请输入客户简码"
            @change="handelCustomerSimpleCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货类型">
          <el-select
            clearable
            v-model="form.deliverType"
            @change="handelDeliverType"
            placeholder="请选择发货类型"
            size="mini"
          >
            <el-option
              v-for="item in deliverTypeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
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
          >导出Excel</el-button>
          <el-upload
            action="#"
            :http-request="handelExcelImport"
            class="upload-demo"
            accept=".xls,.xlsx"
            multiple
            :show-file-list="false"
          >
            <el-button style="margin-left: 8px;" size="mini" type="primary">导入Excel</el-button>
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
            style="margin-left: 8px"
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
        <el-table-column  type="index" label="#"> </el-table-column>
        <template v-for="(col, index) in bindTableColumns">
          <template>
            <el-table-column
              :fixed="col.fixed || false"
              :key="index"
              :prop="col.attr"
              :label="col.label"
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="客户简码" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="客户简称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="客户总称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="客户全程" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="客户别名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="发货类型" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="客户信用级" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
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
  import { queryCustomerList ,basCustomerExport,importCustomer} from "@/api/customer";
  import SearchFilter from "@/components/SearchFilter";
  import { uploadExcel } from "@/utils/uploadExcel";
  export default {
    name: "customer",
    components: { PageNation, SearchFilter, descriptionsTooltip },
    data() {
      return {
        dialogVisible:false,
        data: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        columns: [
          {
            label: "客户别名",
            attr: "customerAlias",
            show: true,
            width:160,
          },
          {
            label: "客户编码",
            attr: "customerCode",
            show: true,
            width:160,
          },
          {
            label: "客户全称",
            attr: "customerFullName",
            show: true,
            width:340,
            tooltip:true,
          },
          {
            label: "客户总称",
            attr: "customerGlobalName",
            show: true,
            width:160,
          },
          {
            label: "客户信用等级",
            attr: "customerLevel",
            show: true,
            width:120,
          },
          {
            label: "客户简称",
            attr: "customerShortName",
            show: true,
            width:180,
          },
          {
            label: "客户简码",
            attr: "customerSimpleCode",
            show: true,
            width:120,
          },
          {
            label: "发货类型",
            attr: "deliverTypeEnum",
            show: true,
            width:100,
          },
          {
            label: "id",
            attr: "id",
            show: false,
          },
          {
            label: "备注",
            attr: "remark",
            show: true,
            width:230,
          },
        ],
        customerLevelOptions:[
          {
            value:"A类",
            key:0,
          },
          {
            value:"B类",
            key:1,
          },
          {
            value:"C类",
            key:1,
          }
        ],
        deliverTypeOptions:[
          {
            value:"内贸",
            key:0,
          },
          {
            value:"三资内贸",
            key:1,
          },
          {
            value:"中资外贸",
            key:2,
          },
          {
            value:"外贸",
            key:3,
          }
        ],
        form:{
          customerFullName: "",
          customerGlobalName: "",
          customerLevel: "",
          customerShortName: "",
          customerSimpleCode: "",
          deliverType: '',
        },
        total: 0,
        ruleForm:{
            name:"",
            type:""
        },
        mesCustomerOptions:[],
        rules: {
          name: [
            { required: true, message: '请输入规格简称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择规格类型', trigger: 'change' }
          ],
        }
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
      this.queryCustomerList();
      this.$store.dispatch('realList').then(()=>{
        this.mesCustomerOptions=this.$store.state.obj.customer_name.map(v=>{return {key:v,value:v,}}) 
      })
    },
    methods: {
      async handelExcelImport(file){
        const formData = new FormData();
        formData.append("file", file.file);

        const res = await importCustomer(formData)
        if(res.code==0){
          this.queryCustomerList();
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
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
        basCustomerExport(params).then((res)=>{
          const blob = new Blob([res], { type: "application/vnd.ms-excel" });
          const fileName = "客户信息表.xlsx";
          uploadExcel(fileName, blob);
        })
      },
    handelCustomerFullName(){
      this.queryCustomerList();
    },
    handelCustomerGlobalName(){
      this.queryCustomerList();
    },
    handelCustomerLevel(){
      this.queryCustomerList();
    },
    handelCustomerShortName(){
      this.queryCustomerList();
    },
    handelCustomerSimpleCode(){
      this.queryCustomerList();
    },
    handelDeliverType(){
      this.queryCustomerList();
    },
    handelAdd(){
        this.dialogVisible=true;
    },
    handelCancel(formName){
        this.dialogVisible=false;
        this.$refs[formName].resetFields();
    },
    handelConfirm(){
        this.dialogVisible = false
    },
    search() {
    this.queryCustomerList();
    },
    reset() {
      this.form = {};
      this.queryCustomerList();
    },
    pageChange(val) {
    this.listQuery.pageNum = val.page;
    this.listQuery.pageSize = val.limit;
    this.queryCustomerList();
    },
     
      async queryCustomerList() {
        const params = {
          request: this.form,
          page: this.listQuery.pageNum - 1,
          size: this.listQuery.pageSize,
        };
        const res = await queryCustomerList(params);
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
  }
  </style>