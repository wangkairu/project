<template>
  <div>
    <el-form
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item label="空闲备货区" prop="stockingAreaCode">
        <el-select
          @change="handelStockingArea"
          v-model="stockingAreaCode"
          clearable
          placeholder="请选择空闲备货区"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { getFreeStockAreaList } from '@/api/dispatch'
export default {
  naame: "stockTable",
  data() {
    return {
      stockingAreaCode: "",
      options: [],
      stockingAreaId: "",
      rules: {
        stockingAreaCode: [
          { required: true, message: '请输入空闲备货区', trigger: 'blur' },
        ],

      }
    }
  },
  mounted() {
    this.getFreeStockAreaList()
  },
  methods: {
    async getFreeStockAreaList() {
      const type = 1
      const res = await getFreeStockAreaList(type)
      if (res.code === '0') {
        this.options = res.data
      }
    },
    handelStockingArea(val) {
      this.options.forEach(v => {
        if (v.value === val) {
          this.stockingAreaId = v.id
        }
      })
      this.$emit("handelStockingArea", { stockingAreaCode: val, stockingAreaId: this.stockingAreaId })
    }
  }
}
</script>


<style lang="scss" scoped></style>