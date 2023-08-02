<template>
  <div>
    <el-dialog
      :before-close="handleClose"
      title="创建移库单"
      :visible.sync="dialogVisible_1"
      width="65%"
    >
      <el-form ref="numberValidateForm" :model="form" label-width="100px">
        <el-form-item label="移库名称">
          <el-input v-model="form.name" placeholder="请输入移库名称"></el-input>
        </el-form-item>
        <div class="background">
          <el-form-item label="移库集合" size="mini">
            <div>
              <div
                class="backgroundItem"
                v-for="(v, ind) in form.moveDetailList"
                :key="ind"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      :prop="`moveDetailList[${ind}].WarehouseCode`"
                      label="库房编号"
                      :rules="{
                        required: true,
                        message: '请选择库房编号',
                      }"
                    >
                      <el-select
                        clearable
                        size="mini"
                        @change="handelWarehouseCode"
                        v-model="v.WarehouseCode"
                        placeholder="请选择库房"
                      >
                        <el-option
                          v-for="(item, ind) in warehouseCodeOptions"
                          :key="ind"
                          :label="item.value"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      :prop="`moveDetailList[${ind}].FunctionType`"
                      :rules="{
                        required: true,
                        message: '请选择功能区类型',
                      }"
                      label="功能区类型"
                    >
                      <el-select
                        size="mini"
                        clearable
                        v-model="v.FunctionType"
                        placeholder="请选择功能区类型"
                        @change="handelFunctionType"
                      >
                        <el-option
                          v-for="(item, ind) in functionTypeOptions"
                          :key="ind"
                          :label="item.value"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      :prop="`moveDetailList[${ind}].FunctionCode`"
                      label="功能类型"
                      :rules="{
                        required: true,
                        message: '请选择功能类型',
                      }"
                    >
                      <el-select
                        size="mini"
                        clearable
                        v-model="v.FunctionCode"
                        placeholder="请选择功能类型"
                        @change="handelFunctionCode"
                      >
                        <el-option
                          v-for="(item, ind) in functionCodeOptions"
                          :key="ind"
                          :label="item.value"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="类型分区"
                      :prop="`moveDetailList[${ind}].FunctionAreaCode`"
                      :rules="{
                        required: true,
                        message: '请选择功能类型下分区',
                      }"
                    >
                      <el-select
                        size="mini"
                        clearable
                        v-model="v.FunctionAreaCode"
                        placeholder="请选择功能类型下分区"
                        @change="handelFunctionAreaCode"
                      >
                        <el-option
                          v-for="(item, ind) in functionAreaCodeOptions"
                          :key="ind"
                          :label="item.value"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      :prop="`moveDetailList[${ind}].ColIndexAlias`"
                      :rules="{
                        required: true,
                        message: '请选择列索引',
                      }"
                      label="列索引"
                    >
                      <el-select
                        size="mini"
                        clearable
                        v-model="v.ColIndexAlias"
                        placeholder="请选择列索引"
                        @change="handelColIndexAlias"
                      >
                        <el-option
                          v-for="(item, ind) in colIndexAliasOptions"
                          :key="ind"
                          :label="item.key"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item
                      label="行索引"
                      :prop="`moveDetailList[${ind}].RowIndexAlias`"
                      :rules="{
                        required: true,
                        message: '请选择行索引',
                      }"
                    >
                      <el-select
                        clearable
                        size="mini"
                        v-model="v.RowIndexAlias"
                        placeholder="请选择行索引"
                        @change="handelRowIndexAlias"
                      >
                        <el-option
                          v-for="(item, ind) in rowIndexAliasOptions"
                          :key="ind"
                          :label="item.value"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      :prop="`moveDetailList[${ind}].FloorAlias`"
                      label="层高别名"
                      :rules="{
                        required: true,
                        message: '请选择层高别名',
                      }"
                    >
                      <el-select
                        size="mini"
                        clearable
                        v-model="v.FloorAlias"
                        placeholder="请选择层高别名"
                        @change="handelFloorAlias"
                      >
                        <el-option
                          v-for="(item, ind) in floorAliasOptions"
                          :key="ind"
                          :label="item.value"
                          :value="item.key"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item
                  label="调拨前库位"
                  :prop="`moveDetailList[${ind}].goods`"
                  :rules="{
                    required: true,
                    message: '请选择调拨前库位',
                  }"
                >
                  <el-select
                    clearable
                    size="mini"
                    v-model="v.goods"
                    placeholder="请选择调拨前库位"
                    @change="handelGoodsByCode"
                  >
                    <el-option
                      v-for="(item, ind) in GoodsByCode"
                      :key="ind"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="货物信息">
                  <el-table :data="data" style="width: 100%">
                    <el-table-column
                      prop="mesBoxNo"
                      label="MES箱号"
                      width="100"
                      fixed
                    >
                    </el-table-column>
                    <el-table-column
                      prop="mesBoxNumberQrCode"
                      label="MES箱号二维码"
                      width="180"
                      fixed
                    >
                    </el-table-column>
                    <el-table-column
                      fixed
                      prop="mesCustomerName"
                      label="MES客户全称"
                    >
                    </el-table-column>
                    <el-table-column
                      fixed
                      prop="mesCustomerShortName"
                      label="MES客户简称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="mesBoxWeldingPointsNum"
                      label="MES箱焊点轮数"
                    >
                    </el-table-column>
                    <el-table-column prop="mesBranchFactory" label="MES分厂">
                    </el-table-column>
                    <el-table-column
                      prop="mesCordStructure"
                      label="MES帘线结构"
                    >
                    </el-table-column>
                    <el-table-column prop="mesDeliveryTime" label="MES发货时间">
                    </el-table-column>
                    <el-table-column prop="mesLeftRightSides" label="MES左右面">
                    </el-table-column>
                    <el-table-column prop="mesMeterLength" label="MES米长">
                    </el-table-column>
                    <el-table-column prop="mesNetWeight" label="MES净重">
                    </el-table-column>
                    <el-table-column prop="mesNormsName" label="MES规格名称">
                    </el-table-column>
                    <el-table-column prop="mesNumOfRounds" label="MES轮数">
                    </el-table-column>
                    <el-table-column prop="mesPackingTime" label="MES装箱时间">
                    </el-table-column>
                  </el-table>
                </el-form-item>
                <el-form-item
                  :prop="`moveDetailList[${ind}].warehouseCodeAfter`"
                  label="调拨后库位"
                  :rules="{
                    required: true,
                    message: '请选择调拨前库位',
                  }"
                >
                  <el-select
                    size="mini"
                    v-model="v.warehouseCodeAfter"
                    placeholder="请选择库房"
                  >
                    <el-option
                      v-for="(item, ind) in warehouseCodeAfterOptions"
                      :key="ind"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <i
                  class="iconfont el-icon-close"
                  @click="handelDelete(ind)"
                ></i>
              </div>
              <el-button
                @click="handelAddItem('numberValidateForm')"
                type="primary"
                size="small"
                icon="el-icon-plus"
                plain
                >Add Item</el-button
              >
            </div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel" size="mini">取 消</el-button>
        <el-button size="mini" type="primary" @click="handelConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {
  queryWarehouseLocationDropDown,
  getGoodsByCode,
  queryUsableLocation,
  createMove,
} from "@/api/shifting";
export default {
  props: {
    dialogVisible_1: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      warehouseCodeOptions: [],
      rowIndexAliasOptions: [],
      functionTypeOptions: [],
      functionCodeOptions: [],
      functionAreaCodeOptions: [],
      floorAliasOptions: [],
      colIndexAliasOptions: [],
      GoodsByCode: [],
      warehouseCodeAfterOptions: [],
      data: [],
      form: {
        name: "",
        moveDetailList: [
          {
            WarehouseCode: "",
            RowIndexAlias: "",
            FunctionType: "",
            FunctionCode: "",
            FunctionAreaCode: "",
            FloorAlias: "",
            ColIndexAlias: "",
            areaCode: "",
            goods: "",
            areaCode: "",
            goodsCode: "",
            warehouseCodeAfter: "",
            warehouseCodeBefore: "",
          },
        ],
      },
    };
  },
  mounted() {
    this.queryWarehouseLocationDropDown();
  },
  methods: {
    handleClose() {
      this.$emit("handelClose", false);
    },
    handelCancel() {
      this.form.moveDetailList = [
        {
          WarehouseCode: "",
          RowIndexAlias: "",
          FunctionType: "",
          FunctionCode: "",
          FunctionAreaCode: "",
          FloorAlias: "",
          ColIndexAlias: "",
          areaCode: "",
          goods: "",
          areaCode: "",
          goodsCode: "",
          warehouseCodeAfter: "",
          warehouseCodeBefore: "",
        },
      ];
    },
    handelDelete(ind) {
      this.form.moveDetailList.forEach((v, index) => {
        if (index === ind) {
          this.form.moveDetailList.splice(ind, 1);
        }
      });
    },
    async handelConfirm() {
      const res = await createMove(this.form);
      if (res.code === "0") {
        this.$emit("handelConfirm");
      }
    },
    handelAddItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.moveDetailList.push({
            WarehouseCode: "",
            RowIndexAlias: "",
            FunctionType: "",
            FunctionCode: "",
            FunctionAreaCode: "",
            FloorAlias: "",
            ColIndexAlias: "",
            areaCode: "",
            goods: "",
            areaCode: "",
            goodsCode: "",
            warehouseCodeAfter: "",
            warehouseCodeBefore: "",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async handelWarehouseCode(val) {
      this.WarehouseCode = val;
      const params = {
        warehouseCode: this.WarehouseCode,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.functionTypeOptions = res.data;
      }
    },
    async handelFunctionType(val) {
      this.FunctionType = val;
      const params = {
        warehouseCode: this.WarehouseCode,
        functionType: this.FunctionType,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        console.log(res, "res");
        this.functionCodeOptions = res.data;
      }
    },
    async handelFunctionCode(val) {
      this.FunctionCode = val;
      const params = {
        warehouseCode: this.WarehouseCode,
        functionType: this.FunctionType,
        functionCode: this.FunctionCode,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.functionAreaCodeOptions = res.data;
      }
    },
    async handelFunctionAreaCode(val) {
      this.FunctionAreaCode = val;
      const params = {
        warehouseCode: this.WarehouseCode,
        functionType: this.FunctionType,
        functionCode: this.FunctionCode,
        functionAreaCode: this.FunctionAreaCode,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.colIndexAliasOptions = res.data;
      }
    },
    async handelColIndexAlias(val) {
      this.ColIndexAlias = val;
      this.colIndexAliasOptions.forEach((v) => {
        if (v.key === val) {
          this.areaCode = v.value;
        }
      });
      const params = {
        warehouseCode: this.WarehouseCode,
        functionType: this.FunctionType,
        functionCode: this.FunctionCode,
        functionAreaCode: this.FunctionAreaCode,
        colIndexAlias: this.ColIndexAlias,
        areaCode: this.areaCode,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.rowIndexAliasOptions = res.data;
      }
    },
    async handelRowIndexAlias(val) {
      this.RowIndexAlias = val;
      const params = {
        warehouseCode: this.WarehouseCode,
        functionType: this.FunctionType,
        functionCode: this.FunctionCode,
        functionAreaCode: this.FunctionAreaCode,
        colIndexAlias: this.ColIndexAlias,
        areaCode: this.areaCode,
        rowIndexAlias: this.RowIndexAlias,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.floorAliasOptions = res.data;
      }
    },
    async handelFloorAlias(val) {
      this.FloorAlias = val;
      const params = {
        warehouseCode: this.WarehouseCode,
        functionType: this.FunctionType,
        functionCode: this.FunctionCode,
        functionAreaCode: this.FunctionAreaCode,
        colIndexAlias: this.ColIndexAlias,
        areaCode: this.areaCode,
        rowIndexAlias: this.RowIndexAlias,
        floorAlias: this.FloorAlias,
      };
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.GoodsByCode = res.data;
      }
    },
    async handelGoodsByCode(val) {
      const res = await getGoodsByCode(val);
      if (res.code === "0") {
        this.data = res.data;
        queryUsableLocation(this.data[0].id).then((res) => {
          this.warehouseCodeAfterOptions = res.data;
        });
      }
    },
    async queryWarehouseLocationDropDown() {
      const params = {};
      const res = await queryWarehouseLocationDropDown(params);
      if (res.code === "0") {
        this.warehouseCodeOptions = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 8px 10px;
  .backgroundItem {
    padding: 24px 12px;
    margin-bottom: 10px;
    background: #f0f0f0;
    border-radius: 10px;
    position: relative;
  }
  .iconfont {
    position: absolute;
    right: 5px;
    top: 4px;
    font-size: 20px;
  }
}
</style>