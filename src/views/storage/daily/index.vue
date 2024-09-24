<template>
  <div>
    <el-tabs v-model="type" type="card" @tab-click="handleClick">
      <el-tab-pane label="成品入库日明细表" name="0"> </el-tab-pane>
      <el-tab-pane label="成品出库日明细表" name="1"> </el-tab-pane>
    </el-tabs>
    <div>
      <StorageIn v-if="type === '0'" :type="type"></StorageIn>
      <StorageOut v-else :type="type"></StorageOut>
    </div>
  </div>
</template>

<script>
import StorageIn from './components/storageIn.vue'
import StorageOut from './components/storageOut.vue'
export default {
  components: {
    StorageIn,
    StorageOut
  },
  data() {
    return {
      type: '0'
    }
  },
  watch:{
    type:{
      handler(val){
        const newVal = sessionStorage.getItem("type")
        if(newVal){
          this.type= newVal
        }
      },
      immediate:true
    }
  },
  methods:{
    handleClick(e){
      sessionStorage.setItem("type",e.name)
    }
  }
}
</script>


<style scoped lang="scss">
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: transparent;
}
</style>