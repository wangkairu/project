<template>
  <div class="table">
    <div class="table-filter">
      <el-form :inline="true" :model="form" v-bind="$attrs">
        <!-- v-if="nameFilter" -->
        <el-form-item label="规格简称">
          <el-select
            size="mini"
            v-model="form.sortSplifice"
            multiple
            placeholder="请选择"
          >
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
          <el-select
            size="mini"
            v-model="form.sortClient"
            multiple
            placeholder="请选择"
          >
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
        <el-form-item label="米长">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="左右面">
          <el-input
            size="mini"
            v-model="form.input"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-date-picker
            v-model="form.value1"
            type="date"
            size="mini"
            placeholder="选择入库时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="存放时间">
          <el-date-picker
            v-model="form.value"
            type="date"
            size="mini"
            placeholder="选择存放时间"
          >
          </el-date-picker>
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
      </el-form>
    </div>
    <el-table style="width: 100%" :data="tableData">
      <el-table-column prop="id" label="库位编号"></el-table-column>
      <el-table-column prop="specification" label="规格简称"></el-table-column>
      <el-table-column prop="client" label="客户简称"> </el-table-column>
      <el-table-column prop="transition" label="轮型"> </el-table-column>
      <el-table-column prop="meter" label="米长"> </el-table-column>
      <el-table-column prop="reversed" label="左右面"> </el-table-column>
      <el-table-column prop="specialRequirements" label="特殊要求">
      </el-table-column>
      <el-table-column prop="cargoHeight" label="货物高度"> </el-table-column>
      <el-table-column prop="storeInDate" label="入库时间"> </el-table-column>
      <el-table-column prop="restingPeriod" label="存放时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      tableData: [
        {
          id: 1,
          isEdit: false,
          specification: "12",
          client: "王某",
          transition: "123",
          meter: 10,
          reversed: "123",
          specialRequirements: "133",
          cargoHeight: 50,
          storeInDate: "2023-5-16",
          restingPeriod: "2023-5-18",
        },
        {
          id: 1,
          isEdit: false,
          specification: "12",
          client: "王某",
          transition: "123",
          meter: 10,
          reversed: "123",
          specialRequirements: "133",
          cargoHeight: 50,
          storeInDate: "2023-5-16",
          restingPeriod: "2023-5-18",
        },
        {
          id: 1,
          isEdit: false,
          specification: "12",
          client: "王某",
          transition: "123",
          meter: 10,
          reversed: "123",
          specialRequirements: "133",
          cargoHeight: 50,
          storeInDate: "2023-5-16",
          restingPeriod: "2023-5-18",
        },
      ],
      form: [
        {
          input: "",
          value1: "",
          value: "",
          sortClient: "",
          sortSplifice: "",
        },
      ],
    };
  },
  methods: {
    searchClick() {},
  },
};
</script>

<style scoped>
.table {
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
}
</style>