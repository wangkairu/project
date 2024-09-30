<template>
    <div class="storage">
      <NavBar :name="name" class="nav"> </NavBar>
      <!-- <van-field
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
        </van-popup> -->
      <van-cell-group>
        <van-field
          clearable
          ref="field"
          v-model="mesBoxNumberQrCode"
          label="二维码"
          placeholder="请扫描二维码"
          @input="handelManualPickup"
          @clear="form = null"
        />
      </van-cell-group>
      <div class="main">
        <div class="boxInformation" v-if="form!==null">
          <h3 class="boxCon">货物信息</h3>
          <li>
            <span class="title">WMS状态:</span>
            <span class="con">{{ form.wmsStatusName }}</span>
          </li>
          <li>
            <span class="title">AGV车辆:</span>
            <span class="con">{{ form.agvNo }}</span>
          </li>
          <li>
            <span class="title">AGV任务编号:</span>
            <span class="con">{{ form.agvTaskNo }}</span>
          </li>
          <li>
            <span class="title">MES箱号:</span>
            <span class="con">{{ form.mesBoxNo }}</span>
          </li>
          <li>
            <span class="title">MES规格代码:</span>
            <span class="con">{{ form.mesNormsNo }}</span>
          </li>
          <li>
            <span class="title">MES规格名称:</span>
            <span class="con">{{ form.mesNormsName }}</span>
          </li>
          <li>
            <span class="title">MES客户简称:</span>
            <span class="con">{{ form.mesCustomerShortName }}</span>
          </li>
          <li>
            <span class="title">MES轮型:</span>
            <span class="con">{{ form.mesWheelType }}</span>
          </li>
          <li>
            <span class="title">MES托盘:</span>
            <span class="con">{{ form.mesTray }}</span>
          </li>
          <li>
            <span class="title">MES米长:</span>
            <span class="con">{{ form.mesMeterLength }}</span>
          </li>
          <li>
            <span class="title">MES左右面:</span>
            <span class="con">{{ form.mesLeftRightSidesName }}</span>
          </li>
          <li>
            <span class="title">MES有无焊点:</span>
            <span class="con">{{ form.mesIsSolderJoint }}</span>
          </li>
          <li>
            <span class="title">MES轮数:</span>
            <span class="con">{{ form.mesNumOfRounds }}</span>
          </li>
          <li>
            <span class="title">MES特殊要求:</span>
            <span class="con">{{ form.mesSpecialRequirements }}</span>
          </li>
          <li>
            <span class="title">MES箱号二维码:</span>
            <span class="con">{{ form.mesBoxNumberQrCode }}</span>
          </li>
          <li>
            <span class="title">MES生产编号:</span>
            <span class="con">{{ form.mesProductionNo }}</span>
          </li>
          <li>
            <span class="title">MES分厂:</span>
            <span class="con">{{ form.mesBranchFactory }}</span>
          </li>
          <li>
            <span class="title">WMS客户简码:</span>
            <span class="con">{{ form.wmsCustomerSimpleCode }}</span>
          </li>
          <li>
            <span class="title">MES客户全称:</span>
            <span class="con">{{ form.mesCustomerName }}</span>
          </li>
          <li>
            <span class="title">MES帘线结构:</span>
            <span class="con">{{ form.mesCordStructure }}</span>
          </li>
          <li>
            <span class="title">MES毛重:</span>
            <span class="con">{{ form.mesGrossWeight }}</span>
          </li>
          <li>
            <span class="title">MES净重:</span>
            <span class="con">{{ form.mesNetWeight }}</span>
          </li>
          <li>
            <span class="title">MES总皮重:</span>
            <span class="con">{{ form.mesTotalTareWeight }}</span>
          </li>
          <li>
            <span class="title">MES样品:</span>
            <span class="con">{{ form.mesIsSample }}</span>
          </li>
          <li>
            <span class="title">MES装箱时间:</span>
            <span class="con">{{ form.mesPackingTime }}</span>
          </li>
          <li>
            <span class="title">MES入库时间:</span>
            <span class="con">{{ form.mesWarehousingTime }}</span>
          </li>
          <li>
            <span class="title">MES发货单位简称:</span>
            <span class="con">{{ form.mesDeliverShortName }}</span>
          </li>
          <li>
            <span class="title">WMS发货类型:</span>
            <span class="con">{{ form.wmsDeliverType }}</span>
          </li>
          <li>
            <span class="title">MES发货时间:</span>
            <span class="con">{{ form.mesDeliveryTime }}</span>
          </li>
          <li>
            <span class="title">MES返工时间:</span>
            <span class="con">{{ form.mesReworkTime }}</span>
          </li>
          <li>
            <span class="title">MES箱焊点轮数:</span>
            <span class="con">{{ form.mesBoxWeldingPointsNum }}</span>
          </li>
          <li>
            <span class="title">MES冻结:</span>
            <span class="con">{{ form.mesIsFreeze }}</span>
          </li>
          <li>
            <span class="title">MES发货冻结:</span>
            <span class="con">{{ form.mesIsDeliveryFreeze }}</span>
          </li>
          <li>
            <span class="title">WMS时效到达时间:</span>
            <span class="con">{{ form.wmsAgeingTime }}</span>
          </li>
          <li>
            <span class="title">MES时效:</span>
            <span class="con">{{ form.mesAgeing }}</span>
          </li>
          <li>
            <span class="title">WMS时效是否到达:</span>
            <span class="con">{{ form.wmsIsAgeing }}</span>
          </li>
          <li>
            <span class="title">MES焊点:</span>
            <span class="con">{{ form.mesSolderJoint }}</span>
          </li>
          <li>
            <span class="title">MES工艺:</span>
            <span class="con">{{ form.mesTechnology }}</span>
          </li>
          <li>
            <span class="title">MES配箱值:</span>
            <span class="con">{{ form.mesDistributionValue }}</span>
          </li>
          <li>
            <span class="title">MES起鼓:</span>
            <span class="con">{{ form.mesBulging }}</span>
          </li>
          <li>
            <span class="title">WMS从MES获取信息时间:</span>
            <span class="con">{{ form.wmsGetInfoFromMesTime }}</span>
          </li>
          <li>
            <span class="title">AGV任务状态:</span>
            <span class="con">{{ form.agvTaskStatus }}</span>
          </li>
          <li>
            <span class="title">WMS任务类别:</span>
            <span class="con">{{ form.wmsTaskType }}</span>
          </li>
          <li>
            <span class="title">AGV编号:</span>
            <span class="con">{{ form.agvNo }}</span>
          </li>
          <li>
            <span class="title">WMS起点库位编号:</span>
            <span class="con">{{ form.wmsStartWarehouseCode }}</span>
          </li>
          <li>
            <span class="title">WMS终点库位编号:</span>
            <span class="con">{{ form.wmsEndWarehouseCode }}</span>
          </li>
          <li>
            <span class="title">WMS终点库列编号:</span>
            <span class="con">{{ form.wmsEndWarehouseColCode }}</span>
          </li>
          <li>
            <span class="title">WMS终点库区名称:</span>
            <span class="con">{{ form.wmsEndWarehouseAreaName }}</span>
          </li>
          <li>
            <span class="title">WMS调拨前库位编号:</span>
            <span class="con">{{ form.wmsBeforeAllocateTransferWarehouseCode }}</span>
          </li>
          <li>
            <span class="title">WMS任务发布人:</span>
            <span class="con">{{ form.wmsTaskPublisher }}</span>
          </li>
          <li>
            <span class="title">WMS返工原因:</span>
            <span class="con">{{ form.wmsReworkReason }}</span>
          </li>
          <li>
            <span class="title">WMS返库原因:</span>
            <span class="con">{{ form.wmsReturnWarehouseReason }}</span>
          </li>
          <li>
            <span class="title">高度:</span>
            <span class="con">{{ form.height }}</span>
          </li>
          <!-- <li>
            <span class="title">WMS任务完成时间:</span>
            <span class="con">{{ form.wmsTaskCompleteTime }}</span>
          </li> -->
        </div>
        <div v-else class="empty">
          <!-- <van-empty description="暂无数据" /> -->
          <span>暂无数据</span>
        </div>
      </div>
      <!-- <van-popup v-model="show" position="bottom" :overlay="true">
        <van-datetime-picker
          @confirm="handelConfirm"
          @cancel="handelCancel"
          v-model="date"
          type="datetime"
        />
      </van-popup> -->
      <!-- <div class="footer">
        <van-button round type="info" @click="warehousingGoods">提交</van-button>
      </div> -->
    </div>
  </template>
  
  <script>
  // import FormGroup from '@/components/FormGroup'
  import NavBar from '@/components/NavBar'
  import { warehousingGoods,getGoodsByMes,getGoods } from "@/api/storage"
  import {queryWarehouseColDropDown} from '@/api/inventory'
  import {queryGoodsList} from '@/api/index'
  export default {
    name: "Storage",
    components: {
      NavBar,
      // FormGroup,
    },
    data() {
      return {
        showWarehouse:false,
        mesBoxNumberQrCode:"",
        form: null,
        show: false,
        date: new Date(),
        name: 'APP巡检',
        warehouse:"",
        warehouseCode:"",
        WarehouseArr:[],
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.field.focus();
      });
    },
    methods: {
    //   handelWarehouse(){
    //     this.queryWarehouseColDropDown()
    //     this.showWarehouse=true
    //   },
    //   async queryWarehouseColDropDown(){
    //     const res = await queryWarehouseColDropDown({})
    //     if(res.data.code==='0'){
    //       this.warehouseOptions =res.data.data
    //       this.WarehouseArr = res.data.data.map((v)=>v.value)
    //     }
    //   },
    //   onConfirmWarehouse(e){
    //     this.warehouseOptions.forEach((v)=>{
    //       if(v.value===e){
    //         this.warehouse=e
    //         this.warehouseCode=v.key
    //       }
    //     })
    //     this.showWarehouse = false
    //   },
      async handelManualPickup() {
        const params={
            page:0,
            size:10,
            request:{
                mesBoxNumberQrCode:this.mesBoxNumberQrCode
            }
        }
        const res = await queryGoodsList(params)
        if (res.data.code === '0') {
          this.form = res.data.data.items[0]
        } else {
          this.form = null;
        }
      },
    //   async warehousingGoods() {
    //     const params = {
    //       ...this.form,
    //       mesPackingTimeStr:this.form?this.form.time:'',
    //       packplanTime:this.form?this.form.time:'',
    //       warehouseCode:this.warehouseCode
    //     }
    //     const res = await warehousingGoods(params)
    //   },
      handelConfirm(e) {
        if (this.name === 'time') {
          this.form.time = this.$moment(e).format('YYYY-MM-DD HH:mm:ss')
        } else if (this.name === 'rework_time') {
          this.form.rework_time = this.$moment(e).format('YYYY-MM-DD HH:mm:ss')
        } else if (this.name === 'weight_time') {
          this.form.weight_time = this.$moment(e).format('YYYY-MM-DD HH:mm:ss')
        } else {
          this.form.out_time = this.$moment(e).format('YYYY-MM-DD HH:mm:ss')
        }
        this.show = false
      },
      handelCancel() {
        this.show = false
      },
      handelFocus(val) {
        this.show = true
        this.name = val
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