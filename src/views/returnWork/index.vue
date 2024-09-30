<template>
    <div class="manualPickup">
      <NavBar :name="name" class="nav"> </NavBar>
      <van-cell-group>
        <van-field
          clearable
          ref="field"
          v-model="value"
          label="二维码"
          placeholder="请扫描二维码"
          @change="handelGetGoodsQrCode"
          @clear="obj = null"
        />
      </van-cell-group>
      <div class="main">
        <!-- -->
        <div class="boxInformation" v-if="obj !== null" >
          <h3 class="boxCon">货物信息</h3>
          <div class="information">
            <van-form ref="form">
                <van-field
                  readonly
                  clickable
                  name="picker"
                  :value="reason"
                  :rules="[{ required: true }]"
                  label="返工原因"
                  placeholder="点击选择返工原因"
                  @click="handelReason"
                />
                <van-popup v-model="reasonFlag" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="reasonArr"
                    @confirm="onConfirmReason($event)"
                    @cancel="reasonFlag = false"
                  />
                </van-popup>
            </van-form>
            <li>
              <span class="title">箱号二维码:</span>
              <span class="con">{{ obj.mesBoxNumberQrCode }}</span>
            </li>
            <li>
              <span class="title">生产编号:</span>
              <span class="con">{{ obj.mesProductionNo }}</span>
            </li>
            <li>
              <span class="title">箱号:</span>
              <span class="con">{{ obj.mesBoxNo }}</span>
            </li>
            <li>
              <span class="title">客户简称:</span>
              <span class="con">{{ obj.mesCustomerShortName }}</span>
            </li>
            <li>
              <span class="title">规格简称:</span>
              <span class="con">{{ obj.mesNormsName }}</span>
            </li>
            <li>
              <span class="title">轮型:</span>
              <span class="con">{{ obj.mesWheelType }}</span>
            </li>
            <li>
              <span class="title">米长:</span>
              <span class="con">{{ obj.mesMeterLength }}</span>
            </li>
            <li>
              <span class="title">左右面:</span>
              <span class="con">{{ obj.mesLeftRightSidesName }}</span>
              
            </li>
            <li>
              <span class="title">特殊要求:</span>
              <span class="con">{{ obj.mesSpecialRequirements }}</span>
            </li> 
          </div>
        </div>
        <div v-else class="empty">
          <span>暂无数据</span>
          <!-- <van-empty description="暂无数据" /> -->
        </div>
      </div>
      <div class="footer">
        <van-button round type="info" @click="SubmitManualOperation"
          >提交</van-button
        >
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar'
  import { Toast } from 'vant';
  import { getGoodsQrCode, baseGoods,queryLogisticsList } from '@/api/return'
  export default {
    name: "manualPickup",
    components: {
      NavBar
    },
    data() {
      return {
        reasonFlag:false,
        reasonArr:[],
        name: "APP返工",
        value: "",
        obj: null,
        reason:"",
        listQuery: {
          page: 1,
          pageSize: 1000,
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.field.focus();
      });
    },
    methods: {
      async handelReason(){
        const params={
          type:"REWORK",
          ...this.listQuery,
        }
        const res = await queryLogisticsList(params)
        if(res.data.code='0'){
          this.reasonArr=res.data.data.items.map((v)=>v.reason)
        }
        this.reasonFlag = true
      },
      onConfirmReason(e){
        this.reason=e
        this.reasonFlag = false
      },
      async handelGetGoodsQrCode() {
        const res = await getGoodsQrCode(this.value)
        if (res.data.code === '0') {
          this.obj = res.data.data
        } else {
          this.obj = null;
        }
      },
      SubmitManualOperation(values) {
        this.$refs.form.validate().then(async () => {
            const params = {
                id: this.obj.id,
                reason: this.reason,
                rework:true,
            }
            const res = await baseGoods(params)
            if (res.data.code === '0') {
                Toast.success({ message: res.data.msg });
                this.value=''
                this.obj=null
            } else {
                Toast.fail({ message: res.data.msg });
            }
        }).catch(() => {
            this.$toast.fail('提交失败')
        })
      }
    }
  }
  </script>
  
  
  <style scoped lang="less">
  .manualPickup {
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
      position: relative;
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
    .information {
      // padding: 0 15px;
      background: #fff;
      margin-top: 6px;
      height: 148px;
      li {
        padding: 0 18px;
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
  /deep/ .van-icon-clear:hover {
    cursor: pointer;
  }
  </style>