
<template>
  <div>
    <div v-for="v in menu" :key="v.path">
      <div v-if="v.path === '/'">
        <div v-for="item in v.children" :key="item.path">
          <el-menu-item v-if="item.hidden === false" :index="item.path">
            <!-- <i class="el-icon-menu"></i> -->
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </div>
      <template v-if="v.hidden === false">
        <el-submenu
          :index="v.path"
          v-if="v.type === 0 && v.children && v.children.length > 0"
        >
          <template slot="title">
            <svg-icon
              class="iconfotn"
              icon-class="floder"
            ></svg-icon>
            <span style="margin-left: 6px;">{{ v.title }}</span>
          </template>
          <!-- //在组件中调用组件自身，递归的判断是否有子级，知道最后没有子级为止 -->
          <menu-item :menu="v.children"></menu-item>
        </el-submenu>
        <!-- //没有子级直接渲染这个 -->
        <el-menu-item :index="v.path" v-else>
          <i :class="v.icon"></i>
          <span slot="title">{{ v.title }}</span>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
  //组件调用自身时必须加name属性
  name: "menuItem",
};
</script>
<style lang="scss" scoped>
.el-menu {
  border: none;
}
::v-deep .el-menu-item{
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
  display: none;

}
/*隐藏 > */

.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>