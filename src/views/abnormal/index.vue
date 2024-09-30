<template>
    <div class="storage">
      <NavBar :name="name" class="nav"> </NavBar>
      <div class="main">
        <van-field
          readonly
          clickable
          name="picker"
          :value="warehouse"
          label="库房编号"
          placeholder="点击选择库房编号"
          @click="handelWarehouse"
        />
      <van-popup v-model="showWarehouse" position="bottom">
        <van-picker
          show-toolbar
          :columns="WarehouseArr"
          @confirm="onConfirmWarehouse($event)"
          @cancel="showWarehouse = false"
        />
      </van-popup>
      </div>

      <!-- <div class="main">
        <div class="boxInformation" >
          <h3 class="boxCon">货物信息</h3>
          <van-cell-group>
            <van-field v-model="query.mesNormsName" label="规格名称" placeholder="请输入规格名称" />
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="query.mesCustomerShortName" label="客户简称" placeholder="请输入客户简称" />
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="query.mesWheelType" label="轮型" placeholder="请输入轮型" />
          </van-cell-group>
          <van-cell-group>
            <van-field @click="handelMesTray" v-model="query.mesTray" label="托盘" placeholder="请输入托盘" />
          </van-cell-group>
          <van-cell-group>
            <van-field  v-model="query.mesMeterLength" label="米长" placeholder="请输入米长" />
          </van-cell-group>
          <van-cell-group>
            <van-field @click="handelLeftRight" v-model="query.mesLeftRightSides" label="左右面" placeholder="请输入左右面" />
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="query.mesBoxNumberQrCode" label="箱号" placeholder="请输入箱号" />
          </van-cell-group>
        </div>
        <div v-else class="empty">
          <span>暂无数据</span>
          <van-empty description="暂无数据" />
        </div>
      </div> -->
      <div class="footer">
        <van-button round type="info" @click="warehousingGoods">提交</van-button>
      </div>
    </div>
  </template>
  
  <script>
  // import FormGroup from '@/components/FormGroup'
  import NavBar from '@/components/NavBar'
  import {exceptionAgvTask,getGoodsByMes } from "@/api/index"
  import {queryWarehouseColDropDown} from '@/api/inventory'
  export default {
    name: "Storage",
    components: {
      NavBar,
      // FormGroup,
    },
    data() {
      return {
        value:"",
        showWarehouse: false,
        name: '异常入库',
        warehouse:"",
        warehouseCode:"",
        WarehouseArr:[],
      }
    },
    methods: {
      async warehousingGoods(){
        const params={
            warehouseCode:this.warehouseCode,
            taskId:-1,
            vehicleName:-1
        }
        const res = await exceptionAgvTask(params)
        if(res.data.code=='0'){
          this.warehouse=''
          this.warehouseCode=''
        }
      },
      handelWarehouse(){
        this.queryWarehouseColDropDown()
        this.showWarehouse=true
      },
      async queryWarehouseColDropDown(){
        const res = await queryWarehouseColDropDown({})
        if(res.data.code==='0'){
          this.warehouseOptions =res.data.data
          this.WarehouseArr = res.data.data.map((v)=>v.value)
        }
      },
      onConfirmWarehouse(e){
        this.warehouseOptions.forEach((v)=>{
          if(v.value===e){
            this.warehouse=e
            this.warehouseCode=v.key
          }
        })
        this.showWarehouse = false
      },

  
    }
  }
  </script>
  
  <style scoped lang="less">
  .storage {
    height: 100%;
    display: flex;
    flex-direction: column;
    .nav {
      height: 50px;
    }
    .main {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      .empty {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        color: #ccc;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .footer {
      height: 50px;
      padding: 2.5px 10px;
      border-top: 1px solid #ccc;
      .van-button--normal {
        width: 100%;
      }
    }
  }
  .boxInformation {
    margin-top: 6px;
  
    .boxCon {
      color: #444;
      font-size: 13px;
      padding: 0 8px;
    }
    li {
      padding: 0 36px;
      height: 37px;
      line-height: 37px;
      border-bottom: 1px solid #eee;
    }
    .information {
      // padding: 0 15px;
      background: #fff;
      margin-top: 6px;
      height: 148px;
      li {
        padding: 0 36px;
        height: 37px;
        line-height: 37px;
        border-bottom: 1px solid #eee;
      }
    }
    .title {
      color: #666;
      font-size: 13px;
    }
    .con {
      color: #4e4e4e;
      display: inline-block;
      margin-left: 30px;
    }
  }
  </style>