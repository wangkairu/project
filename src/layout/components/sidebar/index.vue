<template>
  <el-menu
    class="el-menu-vertical-demo"
    mode="vertical"
    :default-active="$route.path"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
    :collapse="isCollapse"
    router
  >
    <menu-item :menu="routes"></menu-item>
  </el-menu>
</template>

<script>
import menuItem from "./menuItem";
export default {
  components: { menuItem },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // routes: [],
    };
  },
  computed: {
    routes() {
      return global.antRouter;
    },
  },
  mounted() { },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
}
</style>

