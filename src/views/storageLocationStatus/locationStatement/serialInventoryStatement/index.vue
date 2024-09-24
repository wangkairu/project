<template>
  <div class="warpper">
    <div class="table-filter">
      <el-form :inline="true" :model="form" v-bind="$attrs">
        <el-form-item label="规格简称">
          <el-select size="mini" v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户简称">
          <el-select size="mini" v-model="value2" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="轮型">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="托盘">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="米长">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          ><el-button
            type="primary"
            icon="el-icon-search"
            @click="searchClick"
            size="mini"
            >查询</el-button
          ></el-form-item
        >
        <!-- icon="el-icon-search" -->
        <!-- <el-form-item
          ><el-button type="primary" @click="searchClick" size="mini"
            >导出数据</el-button
          ></el-form-item
        > -->
      </el-form>
    </div>
    <div class="table">
      <el-table
        border
        style="width: 100%"
        :cell-style="tableCellStyle"
        :data="tableData"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="total" label="规格简称"></el-table-column>
        <el-table-column prop="leaveUnused" label="客户简称"> </el-table-column>
        <el-table-column prop="useRatio" label="轮型"> </el-table-column>
        <el-table-column prop="useRatio" label="米长"> </el-table-column>
        <el-table-column prop="useRatio" label="托盘"> </el-table-column>
        <el-table-column prop="count" label="占用库位列数"> </el-table-column>
        <el-table-column prop="useRatio" sortable label="库列数占比">
        </el-table-column>
        <el-table-column prop="useRatio" sortable label="库位数">
        </el-table-column>
        <el-table-column prop="useRatio" sortable label="库存箱数">
        </el-table-column>
        <el-table-column> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          total: 10,
          leaveUnused: 5,
          useRatio: "50%",
          count: 20,
        },
        {
          id: 2,
          total: 10,
          leaveUnused: 5,
          useRatio: "50%",
          count: 25,
        },
        {
          id: 3,
          total: 10,
          leaveUnused: 5,
          useRatio: "50%",
          count: 30,
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      form: {
        form: "",
        date: [],
        name: "",
        nameIndex: "",
        type: "",
        typeIndex: "",
        transport_status: "",
        client_name: "",
        client_id: "",
        value1: "",
        value2: "",
      },
    };
  },
  methods: {
    // searchClick() {},
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      // 渐变放在当前值
      if (columnIndex > 9) {
        // 获取当前值
        const current = row.count;
        // 计算占总数的百分比，取整
        const zb = parseInt((Math.abs(current) / 50) * 100);
        // 正数用一种颜色、负数用一种颜色
        const color1 = current > 0 ? "#5592e5" : "#f5bd61";
        const color2 = current > 0 ? "#d3e5ff" : "#f7e9d3";
        // 注意前后顺序，前面的在最上层
        const bg = `linear-gradient(180deg, #fff 0%, #fff 70%, transparent 70%, transparent 100%) 0 0 / 100% 100% , 
      linear-gradient( 90deg,${color1} 0%,${color2} ${zb}%, #fff ${zb}%,  #fff 100%) 0 0 / 100% 100% no-repeat`;
        const obj = {
          background: bg,
        };
        return obj;
      }
      return "";
    },
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