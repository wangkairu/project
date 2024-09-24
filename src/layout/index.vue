<template>
  <div class="layout">
    <div class="aside">
      <el-scrollbar style="height: 100%">
        <sidebar :isCollapse="isCollapse"></sidebar>
      </el-scrollbar>
    </div>
    <div class="right" :class="{ extend: isCollapse }">
      <div class="header">
        <headerComponents
          :isCollapse="isCollapse"
          @handelFold="handelFold"
        ></headerComponents>
      </div>
      <div class="main">
        <appMain></appMain>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "./components/sidebar";
import headerComponents from "./components/headerComponents.vue";
import appMain from "./components/appMain";
export default {
  name: "layout",
  components: { headerComponents, appMain, sidebar },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handelFold() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>




<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  // display: flex;
  .aside {
    // width: 12.5%;
    background: #304156;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .right {
    display: flex;
    flex-direction: column;
    margin-left: 240px;
    height: 100%;
    .header {
      height: 50px;
    }
    .main {
      padding: 15px 10px;
      background-color: rgba(240, 242, 245, 1);
      flex: 1;
    }
  }

  .extend {
    margin-left: 64px;
    transition: all 0.1s;
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>


