<template>
  <div>
    <!-- @click="handelRight" -->
    <van-nav-bar :title="name">
      <!-- <van-icon name="wap-nav" slot="right" /> -->
      <van-icon name="arrow-left" @click="handelLeft" slot="left" />
    </van-nav-bar>
    <!-- <van-popup style="width: 80%; height: 100%" v-model="flag" position="right">
      <van-cell-group>
        <van-cell value="入库" @click="handelJumpUrl" />
      </van-cell-group>
    </van-popup> -->
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: {
    name: {
      type: String,
    }
  },
  data() {
    return {
      flag: false,
    }
  },

  methods: {
    // handelJumpUrl() {
    //   this.$router.push({ name: "storage" }, () => { }, () => { })
    // },
    // handelRight() {
    //   this.flag = true
    // },
    handelLeft() {
      // back()：后退 ；原页表表单中的内容会保留；
      // go(-1): 原页面表单中的内容会丢失：
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped></style>