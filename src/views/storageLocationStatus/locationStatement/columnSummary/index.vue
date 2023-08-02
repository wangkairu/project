<template>
  <div class="table">
    <el-table style="width: 100%" :data="tableData">
      <el-table-column prop="id" label="#"></el-table-column>
      <el-table-column prop="total" label="总库列数"></el-table-column>
      <el-table-column prop="leaveUnused" label="库列闲置数"> </el-table-column>
      <el-table-column prop="useRatio" label="库列利用率"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          total: 20,
          leaveUnused: 5,
          useRatio: "25%",
        },
        {
          id: 2,
          total: 10,
          leaveUnused: 5,
          useRatio: "25%",
        },
        {
          id: 3,
          total: 10,
          leaveUnused: 5,
          useRatio: "25%",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  .radio-group {
    width: 300px;
    margin-bottom: 10px;
  }
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px 0;
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
    margin-top: 20px;
    padding: 12px;
  }
}
::v-deep .el-date-editor.el-input,
::v-deep .el-radio-group {
  width: 182px;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-form-item:nth-last-child(2) {
  margin-left: 10px;
}
</style>