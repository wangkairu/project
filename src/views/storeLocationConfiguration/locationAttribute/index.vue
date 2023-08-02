<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        label-width="120px"
        :maxShow="5"
        :collapsiable="true"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="库房编号" prop="echoWarehouseCode">
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
        <el-form-item label="功能区" prop="echoFunctionType">
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
        </el-form-item>
        <el-form-item label="功能类型下分区" prop="echoFunctionAreaCode">
          <el-select
            size="mini"
            v-model="echoFunctionAreaCode"
            placeholder="请选择功能类型下分区"
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
          :before-upload="beforeUpload"
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
      </div>
      <div class="box">
        <el-table border :data="data" style="width: 100%">
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
        </el-table>
      </div>
    </div>

    <el-dialog title="绑定入库规则" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :rules="rules" :model="formCon" label-width="130px">
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
        <el-form-item label="功能区" prop="functionType">
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
        ></el-form-item>
        <el-form-item label="功能类型下分区" prop="functionAreaCode">
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
          <div class="background">
            <el-form :model="obj" ref="dynamicValidateForm" label-width="110px">
              <div
                class="backgroundItem"
                v-for="(v, ind) in obj.goodsTypeFormList"
                :key="ind"
              >
                <el-form-item
                  :prop="`goodsTypeFormList[${ind}].goodsType`"
                  label="产品类型"
                  style="margin-top: 8px"
                  :rules="{
                    required: true,
                    message: '请选择产品类型',
                  }"
                >
                  <el-select
                    clearable
                    v-model="v.goodsType"
                    placeholder="请选择产品类型"
                  >
                    <el-option
                      v-for="item in goodsTypeOptions"
                      :key="item.value"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :prop="`goodsTypeFormList[${ind}].goodsTypeCode`"
                  label="产品类型编号"
                  :rules="{
                    required: true,
                    message: '请输入产品类型编号',
                  }"
                >
                  <el-input
                    v-model="v.goodsTypeCode"
                    placeholder="请输入产品类型编号"
                  ></el-input>
                </el-form-item>
                <i
                  class="iconfont el-icon-close"
                  @click="handelDelete(ind)"
                ></i>
              </div>
            </el-form>
            <el-button
              @click="handelAddItem('dynamicValidateForm')"
              type="primary"
              icon="el-icon-plus"
              plain
              >Add Item</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
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
} from "@/api/location";
import { uploadExcel } from "@/utils/uploadExcel";
import SearchFilter from "@/components/SearchFilter";
export default {
  name: "locationAttribute",
  components: { SearchFilter },
  data() {
    return {
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
      obj: {
        goodsTypeFormList: [
          {
            goodsTypeCode: "",
            goodsType: "",
          },
        ],
      },
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
    };
  },
  mounted() {
    this.getProjectList();
  },
  methods: {
    handelRules() {
      this.dialogVisible = true;
      this.queryEnumList();
    },
    // 添加货物类型集合
    handelAddItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.obj.goodsTypeFormList.push({ goodsTypeCode: "", goodsType: "" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      const params = {
        areaCode: this.echoColIndexAliasList,
        colIndexAlias: this.echoNum,
        functionType: this.echoFunctionType,
        functionCode: this.echoFunctionCode,
        functionAreaCode: this.echoFunctionAreaCode,
      };
      this.queryColBindRuleList(params);
    },
    reset() {
      this.echoWarehouseCode = "";
      this.echoColIndexAliasList = "";
      this.echoNum = "";
      this.echoFunctionType = "";
      this.echoFunctionCode = "";
      this.echoFunctionAreaCode = "";

      this.queryColBindRuleList(params);
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
      if (value) {
        this.warehouseCode = value;
        const params = {
          warehouseCode: value,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.functionTypeOptions = res.data;
          }
        });
      }
    },
    echoWarehouseCodeChanged(val) {
      if (val) {
        this.echoWarehouseCode = val;
        const params = {
          warehouseCode: val,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.echoFunctionTypeOptions = res.data;
          }
        });
      }
    },
    // 获取第三层
    functionTypeChanged(value) {
      if (value) {
        this.functionType = value;
        const params = {
          warehouseCode: this.warehouseCode,
          functionType: this.functionType,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.functionCodeOptions = res.data;
          }
        });
      }
    },
    echoFunctionTypeChanged(val) {
      if (val) {
        this.echoFunctionType = val;
        const params = {
          warehouseCode: this.echoWarehouseCode,
          functionType: this.echoFunctionType,
        };
        queryWarehouseColDropDown(params).then((res) => {
          if (res.code == "0") {
            this.echoFunctionCodeOptions = res.data;
          }
        });
      }
    },
    // 第四层
    functionCodeChanged(value) {
      if (value) {
        this.functionCode = value;
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
      }
    },
    echoFunctionCodeChanged(val) {
      if (val) {
        this.echoFunctionCode = val;
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
      }
    },
    // 第五层
    functionAreaCodeChanged(value) {
      if (value) {
        this.functionAreaCode = value;
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
      }
    },
    echoFunctionAreaCodeChanged(val) {
      if (val) {
        this.echoFunctionAreaCode = val;
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
            console.log(this.echoOptions, "  this.echoOptions");
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
        const params = {
          areaCode: this.echoNum,
          colIndexAlias: this.echoColIndexAliasList,
          functionType: this.echoFunctionType,
          functionCode: this.echoFunctionCode,
          functionAreaCode: this.echoFunctionAreaCode,
        };
        this.queryColBindRuleList(params);
      }
    },
    // 库列回显
    async queryColBindRuleList(params) {
      const res = await queryColBindRuleList(params);
      console.log(res, "res");
      if (res.code === "0") {
        res.data.forEach((v) => {
          this.tableHeader.push(v.goodsTypeEnum);
          // this.data.push(v.goodsTypeVoList);
        });
        this.data = res.data;
        console.log(this.data);
      }
    },
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = importWarehouseVirtually(formData);
    },
    // 货物类型集合
    async queryEnumList() {
      const res = await queryEnumList("WarehousingRulesTypeEnum");
      if (res.code === "0") {
        this.goodsTypeOptions = res.data;
      }
    },
    submitForm() {
      const params = {
        functionCode: this.functionCode,
        functionType: this.functionType,
        functionAreaCode: this.functionAreaCode,
        goodsTypeFormList: this.obj.goodsTypeFormList,
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
          this.obj.goodsTypeFormList = [{ goodsType: "", goodsTypeCode: "" }];
          this.num = [];
          this.colIndexAliasList = "";
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
    },
    async handelExportTemplate() {
      const res = await exportTemplate();
      const blob = new Blob([res], { type: "application/vnd.ms-excel" });
      const fileName = "成品箱虚拟库位导入模板.xlsx";
      uploadExcel(fileName, blob);
    },
    async queryWarehouseColDropDown() {},
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
.table-filter ::v-deep .el-select {
  width: 200px;
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
</style>