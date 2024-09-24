<template>
  <div>
    <el-descriptions class="margin-top" :column="3">
      <el-descriptions-item label="发货单主表编号">
        <descriptionsTooltip
          :value="tableHeader.mainCode"
        ></descriptionsTooltip>
      </el-descriptions-item>
      <el-descriptions-item label="单号">{{
        tableHeader.no
      }}</el-descriptions-item>
      <el-descriptions-item label="交货批次">{{
        tableHeader.deliveryBatch
      }}</el-descriptions-item>
      <el-descriptions-item label="客户全称">{{
        tableHeader.mesCustomerFullName
      }}</el-descriptions-item>
      <el-descriptions-item label="客户简称">
        <descriptionsTooltip
          :value="tableHeader.mesCustomerShortName"
        ></descriptionsTooltip
      ></el-descriptions-item>
      <el-descriptions-item label="客户简码">{{
        tableHeader.customerSimpleCode
      }}</el-descriptions-item>
      <el-descriptions-item label="收货单位">
        <descriptionsTooltip
          :value="tableHeader.receivingUnitDeliveryNote"
        ></descriptionsTooltip>
      </el-descriptions-item>
      <el-descriptions-item label="发货员">{{
        tableHeader.deliveryPerson
      }}</el-descriptions-item>
      <el-descriptions-item label="发货单创建时间">{{
        tableHeader.createTime
      }}</el-descriptions-item>
      <el-descriptions-item label="备注">
        {{ tableHeader.remark ? tableHeader.remark : "无" }}
      </el-descriptions-item>
    </el-descriptions>
    <div
      class="editor"
    >
      <el-button  v-if="
        this.tableHeader.statusEnum == '已上报' ||
        this.tableHeader.statusEnum == '确认中' ||
        this.tableHeader.statusEnum == '已确认'
      " type="primary" size="small" @click="handelReplace"
        >编辑明细</el-button
      >
      <el-button type="primary" size="small" @click="handelCancel"
        >发货单取消</el-button
      >
      <!-- <el-button type="primary" size="small" @click="confirmDetail"
        >保存</el-button
      > -->
    </div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="data"
      style="width: 100%; margin-top: 15px"
      height="380"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column fixed prop="code" label="发货单明细编号">
        </el-table-column> -->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column fixed prop="statusEnum" label="状态" width="100">
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
      <el-table-column fixed  label="AGV任务编号" width="210"> 
        <template slot-scope="scope">
          <span v-if="scope.row.taskId">{{scope.row.taskId}}</span>
          <span v-else>暂无</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="vehicleName" label="车号"> 
        <template slot-scope="scope">
          <span v-if="scope.row.vehicleName">{{scope.row.vehicleName}}</span>
          <span v-else>暂无</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="mesBoxNo" label="MES箱号"> </el-table-column>
      <el-table-column fixed prop="mesBoxNumberQrCode" label="MES箱号二维码" width="200"> </el-table-column>
      <el-table-column fixed prop="mesNormsName" label="MES规格名称" width="120">
      </el-table-column>
      <el-table-column
        prop="mesCustomerShortName"
        label="MES客户简称"
        width="120"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="mesWheelType" label="MES轮型"> </el-table-column>
      <el-table-column prop="mesMeterLength" label="MES米长"> </el-table-column>
      <el-table-column prop="mesLeftRightSidesEnum" label="MES左右面" width="110">
      </el-table-column>
      <el-table-column
        prop="wmsWarehousingTime"
        label="WMS入库时间"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import descriptionsTooltip from '@/components/Descriptions'
export default {
  components: {
    descriptionsTooltip
  },
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
      ids:[],
    }
  },
  mounted(){
    // this.queryDeliverGoodsDetailList(this.mainCode)
  },
  methods: {
    handelReplace() {
      this.$emit('handelReplace')
    },
    handleSelectionChange(val){
      let arr = [];
      val.forEach(v => {
        arr.push(v.id)
      });
      this.ids=[...new Set(arr)]
    },
    async handelCancel(){
      this.$emit('handelCancelDeliver',this.ids)
     
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
ul {
  display: flex;
}
.hiden {
  display: inline-block;
  width: calc(100% - 112px);
  // overflow: hidden;
}
::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
  width: 200px;
}
::v-deep span.el-tooltip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 4px !important;
}
</style>