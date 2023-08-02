<template>
  <div>
    <div class="header">
      <el-row>
        <el-col :span="9">
          <ul>
            <span>发货单主表编号：</span>
            <span>{{ tableHeader.mainCode }}</span>
          </ul>
        </el-col>
        <el-col :span="7">
          <ul>
            <span>单号：</span>
            <span>{{ tableHeader.no }}</span>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <span>交货批次：</span>
            <span>{{ tableHeader.deliveryBatch }}</span>
          </ul>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="9">
          <ul>
            <span>客户全称：</span>
            <span>{{ tableHeader.mesCustomerFullName }}</span>
          </ul>
        </el-col>
        <el-col :span="7">
          <ul>
            <span>MES客户简称：</span>
            <span>{{ tableHeader.mesCustomerShortName }}</span>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <span>客户简码：</span>
            <span>{{ tableHeader.customerSimpleCode }}</span>
          </ul>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="9">
          <ul>
            <span>收货单位：</span>
            <span>{{ tableHeader.receivingUnitDeliveryNote }}</span>
          </ul>
        </el-col>
        <el-col :span="7">
          <ul>
            <span>发货员：</span>
            <span>{{ tableHeader.deliveryPerson }}</span>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <span>发货单创建时间：</span>
            <span>{{ tableHeader.createTime }}</span>
          </ul>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10">
          <ul>
            <span>备注：</span>
            <span>{{ tableHeader.remark }}</span>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div
      class="editor"
      v-if="
        this.tableHeader.statusEnum == '已上报' ||
        this.tableHeader.statusEnum == '确认中' ||
        this.tableHeader.statusEnum == '已确认'
      "
    >
      <el-button type="primary" size="small" @click="handelReplace"
        >编辑明细</el-button
      >
      <!-- <el-button type="primary" size="small" @click="confirmDetail"
        >保存</el-button
      > -->
    </div>
    <el-table border :data="data" style="width: 100%; margin-top: 15px">
      <!-- <el-table-column fixed prop="code" label="发货单明细编号">
        </el-table-column> -->
      <el-table-column fixed prop="mesBoxNo" label="MES箱号"> </el-table-column>
      <el-table-column fixed prop="mesProductionNo" label="MES生产编号">
      </el-table-column>
      <el-table-column fixed prop="mesCustomerFullName" label="MES客户全称">
      </el-table-column>
      <el-table-column fixed prop="mesCustomerShortName" label="MES客户简称">
      </el-table-column>
      <el-table-column prop="mesNormsName" label="MES规格名称">
      </el-table-column>
      <el-table-column prop="mesNormsNo" label="MES规格代码"> </el-table-column>
      <el-table-column prop="mesCordStructure" label="MES帘线结构">
      </el-table-column>
      <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
      <el-table-column prop="mesMeterLength" label="MES米长"> </el-table-column>
      <el-table-column prop="mesLeftRightSides" label="MES左右面">
      </el-table-column>
      <el-table-column prop="mesNumOfRounds" label="MES轮数"> </el-table-column>
      <el-table-column prop="mesGrossWeight" label="MES毛重(单位:kg)">
      </el-table-column>
      <el-table-column prop="mesNetWeight" label="MES净重(单位:kg)">
      </el-table-column>
      <el-table-column prop="mesWheelWeight" label="MES轮重"> </el-table-column>
      <el-table-column prop="mesShovelPlateTareWeight" label="MES铲板皮重">
      </el-table-column>
      <el-table-column prop="mesTrayTareWeight" label="MES托盘皮重">
      </el-table-column>
      <el-table-column prop="mesPackageTareWeight" label="MES包装皮重">
      </el-table-column>
      <el-table-column prop="mesDivisionPlateTareWeight" label="MES隔板皮重">
      </el-table-column>
      <el-table-column prop="mesDesiccantTareWeight" label="MES干燥剂皮重">
      </el-table-column>
      <el-table-column prop="wmsWarehousingTime" label="WMS入库时间">
      </el-table-column>
      <el-table-column prop="mesBoxWeldingPointsNum" label="MES箱焊点轮数">
      </el-table-column>
      <el-table-column prop="mesSolderJoint" label="MES焊点"> </el-table-column>
      <el-table-column prop="statusEnum" label="状态">
        <template slot-scope="scope">
          <el-tag
            v-if="
              scope.row.statusEnum === '开始备货' ||
              scope.row.statusEnum === '未上报'
            "
            >{{ scope.row.statusEnum }}</el-tag
          >
          <el-tag
            v-else-if="
              scope.row.statusEnum === '确认中' ||
              scope.row.statusEnum === '备货中'
            "
            type="warning"
            >{{ scope.row.statusEnum }}</el-tag
          >
          <el-tag v-else-if="scope.row.statusEnum === '已取消'" type="danger">{{
            scope.row.statusEnum
          }}</el-tag>
          <el-tag v-else type="success">{{ scope.row.statusEnum }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableHeader: {
      type: Object
    },
    data: {
      type: Array,
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handelReplace() {
      this.$emit('handelReplace')
    },
    // confirmDetail() {
    //   this.$emit('confirmDetail')
    // }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin-top: 15px;
}
.editor {
  margin-top: 10px;
}
</style>