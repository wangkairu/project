<template>
  <van-cell-group>
    <div id="vanGroup">
      <slot></slot>
      <div class="btn">
        <van-button v-show="fold" size="mini" type="info" @click="handelshift"
          >展开</van-button
        >
        <van-button v-show="!fold" size="mini" type="info" @click="handelshift"
          >收起</van-button
        >
      </div>
    </div>
  </van-cell-group>
</template>

<script>
export default {
  props: {
    maxShow: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      fold: false,
    }
  },
  mounted() {
    if (this.maxShow > 0) {
      this.minShowCtrol()
    }
  },
  methods: {
    handelshift() {
      this.fold = !this.fold
      this.minShowCtrol()
    },
    minShowCtrol() {
      const group = window.document.querySelectorAll(`#vanGroup .van-cell.van-cell--required.van-field`)
      console.log(group?.length, 'group')
      const len = group?.length ? group?.length - 1 : 0
      console.log(this.maxShow < len, 'this.maxShow < len')
      if (this.maxShow < len) {

      }
    },
  }
}
</script>

<style lang="less" scoped>
.van-button--mini {
  padding: 2px 10px;
}
</style>