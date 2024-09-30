<template>
  <div class="layout">
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer" fixed>
      <van-tabbar v-model="active" route>
        <van-tabbar-item to="/dashboard" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/my" icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  // mounted() {
  //   // 解决刷新后，tabbar高亮按钮始终显示在第一个上
  //   const navBarActive = window.location.hash
  //   if (navBarActive.includes('#/home')) {
  //     this.active = 0
  //   } else if (navBarActive.includes('#/my')) {
  //     this.active = 1
  //   }
  // },
  methods: {
    handelJumpUrl() {
      this.$router.push({ name: "storage" }, () => { }, () => { })
    },
    handelLeft() {
      // back()：后退 ；原页表表单中的内容会保留；
      // go(-1): 原页面表单中的内容会丢失：
      this.$router.back()
    }

  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    height: calc(100% - 50px);
  }
  .footer {
    height: 50px;
    border: 1px solid #ccc;
  }
}
</style>