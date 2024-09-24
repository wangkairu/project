<template>
  <div class="wrapper">
    <el-tabs v-model="wmsTaskType" type="card" @tab-click="handleClick">
      <el-tab-pane label="AGV任务" name="1"></el-tab-pane>
      <el-tab-pane label="人工任务" name="3"></el-tab-pane>
      <el-tab-pane label="历史任务" name="2"></el-tab-pane>
    </el-tabs>
    <div class="parent-container">
      <AGVTasks
        :wmsTaskType="wmsTaskType"
        v-if="wmsTaskType === '1'"
      ></AGVTasks>
      <history v-else-if="wmsTaskType === '2'"></history>
      <human-tasks :wmsTaskType="wmsTaskType" v-else></human-tasks>

    </div>
  </div>
</template>

<script>
import AGVTasks from './components/AGVtasks.vue'
import humanTasks from './components/humanTasks.vue'
import history from './components/history.vue'
export default {
  name: "transportationTasks",
  components: {
    AGVTasks,
    humanTasks,
    history
  },
  data() {
    return {
      wmsTaskType: "1",
    }
  },
  watch:{
    wmsTaskType:{
      handler(val){
        const newVal = sessionStorage.getItem("wmsTaskType")
        if(newVal){
          this.wmsTaskType = newVal
        }
      },
      immediate:true
    }
  },
  methods: {
    handleClick(e){
      sessionStorage.setItem("wmsTaskType",e.name)
    }
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: transparent;
  }
}
</style>

