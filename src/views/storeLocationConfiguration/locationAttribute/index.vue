<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        label-width="120px"
        :maxShow="3"
        :collapsiable="true"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="库房" prop="echoWarehouseCode">
          <el-select
            size="mini"
            clearable
            v-model="echoWarehouseCode"
            placeholder="请选择库房"
            @change="echoWarehouseCodeChanged"
          >
            <el-option
              v-for="item in echoWarehouseCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="功能区" prop="echoFunctionType">
          <el-select
            size="mini"
            v-model="echoFunctionType"
            @change="echoFunctionTypeChanged"
            placeholder="请选择功能区"
          >
            <el-option
              v-for="item in echoFunctionTypeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            /> </el-select
        ></el-form-item>
        <el-form-item label="功能类型" prop="echoFunctionCode"
          ><el-select
            size="mini"
            v-model="echoFunctionCode"
            @change="echoFunctionCodeChanged"
            placeholder="请选择功能类型"
          >
            <el-option
              v-for="item in echoFunctionCodeOptions"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="区域编号" prop="echoFunctionAreaCode">
          <el-select
            clearable
            size="mini"
            v-model="echoFunctionAreaCode"
            placeholder="请选择区域编号"
            @change="echoFunctionAreaCodeChanged"
          >
            <el-option
              v-for="item in echoFunctionAreaCodeOptions"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库列编号" prop="echoColIndexAliasList">
          <el-select
            clearable
            @change="echoColIndexAliasListChanged"
            v-model="echoColIndexAliasList"
            placeholder="请选择库列编号"
            size="mini"
            filterable
          >
            <el-option
              v-for="item in echoOptions"
              :key="item.value"
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
          size="mini"
          class="import"
          @click="handelExportTemplate"
          >下载导入Excel模板</el-button
        >
        <el-upload
          action="#"
          :http-request="beforeUpload"
          class="upload-demo"
          accept=".xls,.xlsx"
          multiple
          :show-file-list="false"
        >
          <el-button size="mini" type="primary">导入Excel</el-button>
        </el-upload>
        <el-button
          type="primary"
          @click="handelRules"
          size="mini"
          class="export"
          >绑定入库规则</el-button
        >
        <el-switch
          v-model="enable"
          active-text="是否启用"
          style="margin-left: 10px;"
          @change="handelEnable">
        </el-switch>
        <el-button
          v-show="this.data.length>0"
          type="primary"
          @click="handelDeleteData"
          size="mini"
          class="export"
          >删除</el-button
        >
      </div>
      <div class="box">
        <!--           @selection-change="handleSelectionChange" -->
        <el-table
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          :data="data"
          style="width: 100%"
        >
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <el-table-column
            width="270"
            prop="goodsType"
            label="产品类型"
          ></el-table-column>
          <el-table-column
            width="200"
            prop="goodsTypeEnum"
            label="产品类型名称"
          ></el-table-column>
          <el-table-column label="货物类型集合">
            <template slot-scope="scope">
              <div
                v-for="(val, index) in scope.row.goodsTypeVoList"
                :key="index"
              >
                <div>
                  {{ val.goodsTypeCode }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="enableEnum"
            label="是否启用"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="绑定入库规则" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :rules="rules" :model="formCon" label-width="140px">
        <el-form-item label="库房编号" prop="warehouseCode">
          <el-select
            clearable
            v-model="warehouseCode"
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
        <!-- <el-form-item label="功能区" prop="functionType">
          <el-select
            v-model="functionType"
            @change="functionTypeChanged"
            placeholder="请选择功能区"
          >
            <el-option
              v-for="item in functionTypeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            /> </el-select
        ></el-form-item>
        <el-form-item label="功能类型" prop="functionCode"
          ><el-select
            v-model="functionCode"
            @change="functionCodeChanged"
            placeholder="请选择功能类型"
          >
            <el-option
              v-for="item in functionCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            /> </el-select
        ></el-form-item> -->
        <el-form-item label="区域编号" prop="functionAreaCode">
          <el-select
            v-model="functionAreaCode"
            placeholder="请选择功能类型下分区"
            @change="functionAreaCodeChanged"
          >
            <el-option
              v-for="item in functionAreaCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库列编号" prop="colIndexAliasList">
          <el-select
            v-model="colIndexAliasList"
            placeholder="请选择库列编号"
            multiple
            @change="colIndexAliasListChanged"
          >
            <el-option
              v-for="item in colIndexAliasListOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="货物类型">
          <el-button
            @click="handelSelect"
            type="primary"
            icon="el-icon-plus"
            plain
            size="small"
            >选择货物</el-button
          >
          <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="checkedGh" style="width: 100%">
            <el-table-column  prop="normsSimpleCode" label="规格简称" width="180"></el-table-column>
            <el-table-column prop="customerShortName" label="客户简称"  width="180"></el-table-column>
            <el-table-column  prop="wheelType" label="轮型"> </el-table-column>
            <el-table-column  prop="meterLength" label="米长"> </el-table-column>
            <el-table-column  prop="leftRightSidesEnum" label="左右面"> </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handelDeleteSelect(scope.row)" type="text" size="size">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择货物类型" :visible.sync="selectFlag" width="50%">
      <SearchFilter
        label-width="80px"
        :maxShow="6"
        :collapsiable="true"
        @search="search1"
        @reset="reset1"
      >
        <el-form-item  label="客户简称" prop="echoWarehouseCode">
          <el-input clearable size="mini" v-model="form.customerShortName" placeholder="请输入内容" @input="handelCustomer"></el-input>
        </el-form-item>
        <el-form-item label="规格简称" prop="echoWarehouseCode">
          <el-input clearable size="mini" v-model="form.normsSimpleCode" placeholder="请输入内容" @input="handelCustomer"></el-input>
        </el-form-item>
        <el-form-item label="轮型" prop="echoWarehouseCode">
          <el-input clearable size="mini" v-model="form.wheelType" placeholder="请输入内容" @input="handelCustomer"></el-input>
        </el-form-item>
      </SearchFilter>
      <!-- :reserve-selection="true" :row-key="row=>row.id"-->
      <el-table ref="tb" @selection-change="handleRadioChange"  :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column  prop="normsSimpleCode" label="规格简称" width="180"></el-table-column>
        <el-table-column prop="customerShortName" label="客户简称"  width="180"></el-table-column>
        <el-table-column  prop="wheelType" label="轮型"> </el-table-column>
        <el-table-column  prop="meterLength" label="米长"> </el-table-column>
        <el-table-column  prop="leftRightSidesEnum" label="左右面"> </el-table-column>
      </el-table>
      <PageNation
        style="display: flex;justify-content: center;margin-top: 10px;"
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handelconfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  importWarehouseVirtually,
  exportTemplate,
  queryWarehouseColDropDown,
  queryColBindRuleList,
  bindColWarehousingRules,
  queryEnumList,
  enableColRule,
  deleteColRule
} from "@/api/location";
import {queryNormsList} from '@/api/specification'
import { uploadExcel } from "@/utils/uploadExcel";
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
export default {
  name: "locationAttribute",
  components: { SearchFilter,PageNation },
  data() {
    return {
      enable:"",
      goodsTypeOptions: [],
      goodsTypeCode: "",
      goodsType: "",
      echoWarehouseCodeOptions: [],
      echoWarehouseCode: "",
      echoOptions: [],
      echoColIndexAliasList: "",
      echoFunctionTypeOptions: [],
      echoFunctionType: "",
      echoFunctionCode: "",
      echoFunctionCodeOptions: [],
      echoFunctionAreaCodeOptions: [],
      echoFunctionAreaCode: "",
      echoNum: "",
      data: [],
      dialogVisible: false,
      formCon: {},
      functionAreaCode: "",
      functionCode: "",
      functionType: "",
      warehouseCode: "",
      colIndexAliasList: [],
      functionAreaCodeOptions: [],
      functionCodeOptions: [],
      functionTypeOptions: [],
      warehouseCodeOptions: [],
      colIndexAliasListOptions: [],
      num: [],
      areaCodeList: "",
      goodsTypeFormList: [],
      rules: {
        warehouseCode: [
          { required: true, message: "请选择库房编号", trigger: "blur" },
        ],
        functionType: [
          { required: true, message: "请选择功能区", trigger: "blur" },
        ],
        functionCode: [
          {
            required: true,
            message: "请选择功能类型",
            trigger: "blur",
          },
        ],
        functionAreaCode: [
          {
            required: true,
            message: "请选择功能类型下分区",
            trigger: "blur",
          },
        ],
        areaCodeList: [
          {
            required: true,
            message: "请选择库区编号",
            trigger: "blur",
          },
        ],
        colIndexAliasList: [
          { required: true, message: "请选择库列编号", trigger: "blur" },
        ],
        goodsType: [
          { required: true, message: "请选择产品类型", trigger: "blur" },
        ],
        goodsTypeCode: [
          { required: true, message: "请输入产品类型编号", trigger: "blur" },
        ],
      },
      tableHeader: [],
      selectFlag:false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total:0,
      form:{
        customerShortName: "",
        normsSimpleCode: "",
        normsType: '',
        wheelType: ""
      },
      tableData:[],
      checkedGh:[],
      selectArr:[],
    };
  },
  mounted() {
    this.getProjectList();
  },
  watch:{
    checkedGh:{
      handler(val){
        const arr=JSON.parse(sessionStorage.getItem('checkedGh'))
        if(val.length===0&&arr.length){
          this.checkedGh = arr
          this.$nextTick(()=>{
            arr.forEach((v)=>{
              this.tableData.forEach((item)=>{
                if(v.id==item.id){
                  this.$refs.tb.toggleRowSelection(item, true);
                }
              })
            })
          })
        }
      }
    }
  },
  methods: {
    handelDeleteSelect(row,index){
      this.$confirm('此操作会删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.checkedGh.splice(index,1)
          this.goodsTypeFormList.splice(index,1)
        }).catch(() => {         
        });
    },
    handelDeleteData(){
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params={
            onlyCode:this.data.length>0?this.data[0].onlyCode:"",
            warehouseCode:this.data.length>0?this.data[0].warehouseCode:"",
          }
          const res = await deleteColRule(params)
          if(res.code=='0'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.queryColBindRuleList();
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消删除'
          });          
        });

    },
    handelCustomer(){
      this.queryNormsList()
    },
    search1(){
      this.queryNormsList()
    },
    reset1(){
      this.form={
        customerShortName: "",
        normsSimpleCode: "",
        normsType: '',
        wheelType: ""
      }
      this.queryNormsList()
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryNormsList();
    },
    async handelEnable() {
      const params ={
        enable:this.data[0].enable,
        onlyCode:this.data.length>0?this.data[0].onlyCode:"",
        warehouseCode:this.data.length>0?this.data[0].warehouseCode:"",
      }
      const res =await enableColRule(params);
      if(res.code === "0"){
        this.search();
      }
    },
    handelRules() {
      this.dialogVisible = true;
      this.queryEnumList();
    },
    // 添加货物类型集合
    handleRadioChange(selection){
      this.checkedGh = selection;
      // if (selection.length > 1) {
      //   this.$refs.tb.clearSelection();
        // this.$refs.tb.toggleRowSelection(selection.pop());
      // }
    },
    async handelSelect() {
      this.queryNormsList()
      this.selectFlag=true
    },
    async queryNormsList(){
      const params={
        request:this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      }
      const res = await queryNormsList(params) 
      if(res.code==='0'){
        this.total=res.data.total
        this.tableData=res.data.items
      }
    },
    handelconfirm(){
      this.selectFlag=false
      sessionStorage.setItem("checkedGh",JSON.stringify(this.checkedGh))
      this.goodsTypeFormList=[]
      this.checkedGh.forEach((v)=>{
        this.goodsTypeFormList.push(
          [{goodsTypeCode: v.normsSimpleCode,goodsType: "NORMS_SHORT_NAME"},
          {goodsTypeCode: v.customerShortName,goodsType: "CUSTOMER_SHORT_NAME"},
          {goodsTypeCode: v.wheelType,goodsType: "WHEEL_TYPE"},
          {goodsTypeCode: v.meterLength,goodsType: "METER_LENGTH"},
          {goodsTypeCode: v.leftRightSides,goodsType: "LEFT_RIGHT_SIDES"}]
        )
      })
      // this.goodsTypeFormList=[
      // {goodsTypeCode: this.checkedGh[0].normsSimpleCode,goodsType: "NORMS_SHORT_NAME"},
      // {goodsTypeCode: this.checkedGh[0].customerShortName,goodsType: "CUSTOMER_SHORT_NAME"},
      // {goodsTypeCode: this.checkedGh[0].wheelType,goodsType: "WHEEL_TYPE"},
      // {goodsTypeCode: this.checkedGh[0].meterLength,goodsType: "METER_LENGTH"},
      // {goodsTypeCode: this.checkedGh[0].leftRightSides,goodsType: "LEFT_RIGHT_SIDES"},]
    },
    handelCancel(){
      this.$refs.tb.clearSelection();
      this.checkedGh = []
      sessionStorage.setItem("checkedGh",JSON.stringify(this.checkedGh))
      this.selectFlag=false
    },
    // 删除货物类型集合
    handelDelete(ind) {
      this.obj.goodsTypeFormList.forEach((v, index) => {
        if (ind === index) {
          this.obj.goodsTypeFormList.splice(index, 1);
        }
      });
    },
    search() {
      this.queryColBindRuleList();
    },
    reset() {
      this.echoWarehouseCode = ""
      this.echoNum = ""
      this.echoColIndexAliasList = ""
      this.echoFunctionType = ""
      this.echoFunctionCode = ""
      this.echoFunctionAreaCode = ""
      this.queryColBindRuleList();
    },
    // 获取数据
    async getProjectList() {
      const params = {};
      const res = await queryWarehouseColDropDown(params);
      if (res.code === "0") {
        this.warehouseCodeOptions = res.data;
        this.echoWarehouseCodeOptions = res.data;
      }
    },
    // 获取第一层
    warehouseCodeChanged(value) {
      const params = {
        warehouseCode: value,
      };
      queryWarehouseColDropDown(params).then((res) => {
        if (res.code == "0") {
          this.functionTypeOptions = res.data;
          this.functionType=res.data[1].key
          this.queryWarehouseColDropDown()
        }
      });
    },
    echoWarehouseCodeChanged(val) {
      if(!val){
        this.echoFunctionAreaCode=""
        this.echoColIndexAliasList=""
      }else{
        const params = {
          warehouseCode: val,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.echoFunctionTypeOptions = res.data;
            this.echoFunctionType = res.data[1].key
            this.echoFunctionTypeChanged()
          }
        });
      }
    },
    // 获取第三层
    functionTypeChanged(value) {
      this.queryWarehouseColDropDown()
    },
    queryWarehouseColDropDown(){
      const params = {
        warehouseCode: this.warehouseCode,
        functionType: this.functionType,
      };
      queryWarehouseColDropDown(params).then((res) => {
        if (res.code == "0") {
          this.functionCodeOptions = res.data;
          this.functionCode = res.data[0].key
          this.functionCodeChanged()
        }
      });
    },
    echoFunctionTypeChanged(val) {
      const params = {
        warehouseCode: this.echoWarehouseCode,
        functionType: this.echoFunctionType,
      };
      queryWarehouseColDropDown(params).then((res) => {
        if (res.code == "0") {
          this.echoFunctionCodeOptions = res.data;
          this.echoFunctionCode = res.data[0].key
          this.echoFunctionCodeChanged()
        }
      });
    },
    // 第四层
    functionCodeChanged(value) {
      const params = {
          warehouseCode: this.warehouseCode,
          functionType: this.functionType,
          functionCode: this.functionCode,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.functionAreaCodeOptions = res.data;
          }
        });
    },
    echoFunctionCodeChanged(val) {
      const params = {
          warehouseCode: this.echoWarehouseCode,
          functionType: this.echoFunctionType,
          functionCode: this.echoFunctionCode,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.echoFunctionAreaCodeOptions = res.data;
          }
        });
    },
    // 第五层
    functionAreaCodeChanged(value) {
      const params = {
        warehouseCode: this.warehouseCode,
        functionType: this.functionType,
        functionCode: this.functionCode,
        functionAreaCode: this.functionAreaCode,
      };
      queryWarehouseColDropDown(params).then((res) => {
        if (res.code == "0") {
          this.colIndexAliasListOptions = res.data.map((v) => {
            return {
              key: v.value,
              value: v.key,
            };
          });
        }
      });
    },
    echoFunctionAreaCodeChanged(val) {
      if(!val){
        this.echoColIndexAliasList=""
      }else{
        const params = {
          warehouseCode: this.echoWarehouseCode,
          functionType: this.echoFunctionType,
          functionCode: this.echoFunctionCode,
          functionAreaCode: this.echoFunctionAreaCode,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.echoOptions = res.data.map((v) => {
              return {
                key: v.value,
                value: v.key,
              };
            });
          }
        });
      }
     
    },
    // 库列选择
    colIndexAliasListChanged(val) {
      if (val) {
        this.colIndexAliasListOptions.forEach((v) => {
          if (val.includes(v.value)) {
            this.num.push(v.key);
          }
        });
        this.colIndexAliasList = val;
      }
    },
    echoColIndexAliasListChanged(val) {
      if (val) {
        this.echoOptions.forEach((v) => {
          if (v.value === val) {
            this.echoNum = v.key;
          }
        });
        this.echoColIndexAliasList = val;
      
        this.queryColBindRuleList();
      }
    },
    // 库列回显
    async queryColBindRuleList() {
      const params = {
          areaCode: this.echoNum,
          colIndexAlias: this.echoColIndexAliasList,
          functionType: this.echoFunctionType,
          functionCode: this.echoFunctionCode,
          functionAreaCode: this.echoFunctionAreaCode,
        };
      const res = await queryColBindRuleList(params);
      if (res.code === "0") {
        res.data.forEach((v) => {
          this.tableHeader.push(v.goodsTypeEnum);
        });
        this.data = res.data;
        this.enable = res.data[0].enable===1;
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
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      const res = importWarehouseVirtually(formData);
      if (res.code === '0') {
        // this.$message.success(res.msg)
        this.queryColBindRuleList();
      } else {
        this.$message.error(res.msg)
      }
    },
    // 货物类型集合
    async queryEnumList() {
      const res = await queryEnumList("WarehousingRulesTypeEnum");
      if (res.code === "0") {
        this.goodsTypeOptions = res.data;
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    submitForm() {
      const params = {
        functionCode: this.functionCode,
        functionType: this.functionType,
        functionAreaCode: this.functionAreaCode,
        goodsTypeFormList: this.goodsTypeFormList,
        areaCodeList: this.num,
        colIndexAliasList: this.colIndexAliasList,
      };
      bindColWarehousingRules(params).then((res) => {
        if (res.code === "0") {
          this.dialogVisible = false;
          this.warehouseCode = "";
          this.functionCode = "";
          this.functionType = "";
          this.functionAreaCode = "";
          this.goodsTypeFormList = [];
          this.num = [];
          this.colIndexAliasList = "";
          this.checkedGh = []
          sessionStorage.setItem('checkedGh',JSON.stringify(this.checkedGh))
          this.form={}
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    resetForm() {
      this.dialogVisible = false;
      this.functionAreaCode = "";
      this.functionCode = "";
      this.functionType = "";
      this.warehouseCode = "";
      this.goodsTypeCode = "";
      this.goodsType = "";
      this.colIndexAliasList = [];
      this.checkedGh = [];
    },
    async handelExportTemplate() {
      const res = await exportTemplate();
      const blob = new Blob([res], { type: "application/vnd.ms-excel" });
      const fileName = "成品箱虚拟库位导入模板.xlsx";
      uploadExcel(fileName, blob);
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  .table-filter {
    box-sizing: border-box;
    padding: 15px;
    background: #fff;
  }
  .table {
    background: #fff;
    box-sizing: border-box;
    padding: 10px 20px;
    margin-top: 10px;
    overflow: hidden;
    flex: 1;
    .enteringButton {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 8px 0;
      .export {
        margin-left: 10px;
      }
      .import {
        margin-right: 10px;
      }
    }
    .box {
      width: 100%;
      display: flex;
      .table_list {
        width: 600px;
        // border: 1px solid #ccc;
        margin-left: 200px;
      }
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        // margin-left: 10px;
        .button {
          margin-left: 200px;
        }
      }
    }
  }
  .control {
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    margin-top: 10px;
    padding: 10px;
    overflow: hidden;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding: 12px;
    overflow: hidden;
  }
  .saveBtn {
    float: right;
    margin-bottom: 10px;
  }
  .background {
    background: #f5f5f5;
    border-radius: 10px;
    padding: 8px 10px;
    .backgroundItem {
      padding: 15px 10px;
      margin-bottom: 10px;
      background: #f0f0f0;
      border-radius: 10px;
      position: relative;
    }
    .iconfont {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 20px;
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 16px;
}
.table-filter .el-select {
  width: 200px;
}
.el-dialog__body .el-select {
  width: 400px;
}
::v-deep .el-tree-node__content {
  margin-top: 10px !important;
}
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0 0 4px;
}
::v-deep .el-cascader-panel .el-scrollbar__view:not(:last-child) .el-checkbox {
  display: none;
}
::v-deep .el-table__header-wrapper  .el-checkbox{
    //找到表头那一行，然后把里面的复选框隐藏掉
	display:none
}
</style>