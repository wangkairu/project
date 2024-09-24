<template>
    <div class="wrapper">
      <!--  -->
      <el-radio-group v-model="activeName" size="small" @input="handleClick">
        <el-radio-button label="东库备货区"></el-radio-button>
        <el-radio-button label="西库备货区"></el-radio-button>
      </el-radio-group>
      <div class="parent-container">
        <EStockingArea v-if="activeName === '东库备货区'"></EStockingArea>
        <WStockingArea class="rectangle" v-else></WStockingArea>
      </div>
    </div>
  </template>
  
  <script>
  import EStockingArea from '../components/EStockingArea.vue'
  import WStockingArea from '../components/WStockingArea.vue'
  import { basWarehouseVirtually } from '@/api/location'
  export default {
    name: "warehouseLayout",
    components: {
      EStockingArea,
      WStockingArea,
    },
    data() {
      return {
        westAreaList: [],
        activeName: "东库备货区",
        eastAreaList: {},
      }
    },
    mounted() {
      // this.getWarehouseShowGroupByRule()
    },
    watch:{
      activeName:{
        handler(val){
          const newVal = sessionStorage.getItem('stockingArea')
          if(newVal){
            this.activeName=newVal
          }
        },
        immediate:true
      }
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
      handleClick(e) {
        sessionStorage.setItem('stockingArea',e)
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
  
  