<template>
  <div>
    <el-table
      ref="singleRightTable"
      :data="selectData"
      highlight-current-row
      :row-key="
        (row) => {
          return row.idStr;
        }
      "
      @selection-change="handleChangeRightdetailselect"
      height="500"
      border
    >
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column property="mesBoxNo" label="MES箱号"> </el-table-column>
      <el-table-column property="mesProductionNo" label="MES生产编号">
      </el-table-column>
      <el-table-column property="mesCustomerName" label="MES客户全称">
      </el-table-column>
      <el-table-column property="mesCustomerShortName" label="MES客户简称">
      </el-table-column>
      <el-table-column property="mesNormsName" label="MES规格名称">
      </el-table-column>
      <el-table-column property="mesNormsNo" label="MES规格代码">
      </el-table-column>
      <el-table-column property="mesCordStructure" label="MES帘线结构">
      </el-table-column>
      <el-table-column property="mesWheelType" label="MES轮型">
      </el-table-column>
      <el-table-column property="mesMeterLength" label="MES米长">
      </el-table-column>
      <el-table-column property="mesLeftRightSides" label="MES左右面">
      </el-table-column>
      <el-table-column property="mesNumOfRounds" label="MES轮数">
      </el-table-column>
      <el-table-column property="mesGrossWeight" label="MES毛重（单位：kg）">
      </el-table-column>
      <el-table-column property="mesNetWeight" label="MES净重（单位：kg）">
      </el-table-column>
      <el-table-column property="mesCustomerShortName" label="MES轮重">
      </el-table-column>
      <el-table-column property="mesDeliverShortName" label="MES铲板皮重">
      </el-table-column>
      <el-table-column property="mesDeliveryTime" label="MES托盘皮重">
      </el-table-column>
      <el-table-column property="mesDistributionValue" label="MES包装皮重">
      </el-table-column>
      <el-table-column property="mesGrossWeight" label="MES隔板皮重">
      </el-table-column>
      <el-table-column property="mesIsDeliveryFreeze" label="MES干燥剂皮重">
      </el-table-column>
      <el-table-column property="mesWarehousingTime" label="MES入库时间">
      </el-table-column>
      <el-table-column property="mesBoxWeldingPointsNum" label="MES箱焊点轮数">
      </el-table-column>
      <el-table-column property="mesSolderJoint" label="MES焊点">
      </el-table-column>
      <el-table-column property="wmsStatus" label="状态"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rightTable",
  props: {
    selectData: {
      type: Array,
    }
  },
  data() {
    return {
      leftList: [],
    }
  },
  methods: {
    handleChangeRightdetailselect(val) {
      let right = []
      val.forEach(v => {
        right.push(v.idStr)
      })
      this.rightList = [...new Set(right)]
      this.$emit('handleChangeRightdetailselect',this.rightList)

      // localStorage.setItem('rightList', JSON.stringify(this.rightList))
    },
  }
}
</script>