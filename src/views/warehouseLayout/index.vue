<template>
  <div class="wrapper">
    <el-radio-group v-model="activeName" size="mini" @input="handleClick">
      <el-radio-button label="东库"></el-radio-button>
      <el-radio-button label="西库"></el-radio-button>
      <el-radio-button label="小仓库"></el-radio-button>
      <el-radio-button label="东南库"></el-radio-button>
    </el-radio-group>
    <div class="parent-container">
      <EastWarehouse v-if="activeName === '东库'"></EastWarehouse>
      <!-- :westAreaList="westAreaList" -->
      <SmallWarehouse v-else-if="activeName === '小仓库'"></SmallWarehouse>
      <Rectangle class="rectangle" v-else-if="activeName === '西库'"></Rectangle>
      <southEast v-else-if="activeName === '东南库'"></southEast>
    </div>
  </div>
</template>

<script>
import SmallWarehouse from './components/smallWarehouse.vue'
import EastWarehouse from './components/EastWarehouse.vue'
import Rectangle from './components/rectangle.vue'
import southEast from './components/southEast.vue'
import { getWarehouseShowGroupByRule } from '@/api/location'
import { getWarehouseShow, enableDisableLocation } from '@/api/location'
export default {
  name: "warehouseLayout",
  components: {
    EastWarehouse,
    Rectangle,
    SmallWarehouse,
    southEast
  },
  data() {
    return {
      westAreaList: [],
      activeName: "东库",
      eastAreaList: {},
    }
  },
  watch:{
    activeName:{
      handler(newVal){
        const val=sessionStorage.getItem('activeName')
        if(val){
          this.activeName=val
        }
      },
      immediate:true,
    },
  },
  methods: {
    async getWarehouseShowGroupByRule() {
      const params = {}
      const res = await getWarehouseShowGroupByRule(params)
      if (res.code === '0') {
        this.eastAreaList = res.data
      }
    },
    // async getWarehouseShow() {

    //   const res = await getWarehouseShow(params)
    //   if (res.code === '0') {
    //     this.westAreaList = res.data
    //     // this.init()
    //   }
    // },
    handleClick() {
      sessionStorage.setItem("activeName",this.activeName)
    },

  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // height: calc(100vh - 50px);
  .parent-container {
    height: calc(100% - 30px);
  }
}
</style>

