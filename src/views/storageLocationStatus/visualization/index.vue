<template>
  <div class="warpper">
    <el-radio-group
      v-model="activeName"
      size="mini"
      @input="handelChangeLocation"
    >
      <el-radio-button v-for="v in location" :label="v.label" :key="v.value">{{
        v.label
      }}</el-radio-button>
    </el-radio-group>
    <div class="table-filter">
      <totalStore></totalStore>
      <!-- <wStore></wStore> -->
    </div>
  </div>
</template>

<script>
import eStore from "./components/eastStore.vue";
import wStore from "./components/westStore.vue";
import totalStore from "./components/totalStore.vue";
export default {
  name: "store",
  components: { eStore, wStore, totalStore },
  data() {
    return {
      activeName: "总体分布图",
      location: [
        {
          label: "总体分布图",
          value: 1,
        },
        {
          label: "东库",
          value: 2,
        },
        {
          label: "西库",
          value: 3,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handelChangeLocation(val) {
      this.activeName = val;
    },
  },
};
</script>


<style lang="scss" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    // border-radius: 10px;
    padding: 10px 8px;
    // overflow: hidden;
    // overflow-x: scroll;
  }
  .table {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 20px;
    // overflow: hidden;
    // flex: 1;
    display: flex;
    flex-wrap: wrap;
    .item {
      // width: 800px;
      border: 1px solid #ccc;
      margin: 0 10px 10px 0;
      .title {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      .img {
        display: flex;
        border-bottom: 1px solid #ccc;
        .seffting {
          display: flex;
        }
        .seffting_1 {
          .name {
            padding: 8px 10px;
            border-bottom: 1px solid #ccc;
          }
          .name_1 {
            padding: 8px 10px;
            .null {
              width: 50px;
              height: 30px;
              border: 1px dotted;
            }
          }
          border-right: 1px solid #ccc;
        }
        .car {
          width: 40px;
          border-right: 1px solid #ccc;
        }
      }
    }
  }
  .control {
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 12px;
    overflow: hidden;
  }
}
</style>
