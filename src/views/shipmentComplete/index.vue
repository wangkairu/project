<template>
    <div class="manualPickup">
      <NavBar :name="name" class="nav"> </NavBar>
      <van-cell-group>
        <van-field
          clearable
          ref="field"
          v-model="value"
          label="二维码"
          placeholder="请扫描/输入二维码"
          @clear="value = null"
        />
      </van-cell-group>
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
  import {completeDeliver} from '@/api/index'
  export default {
    name: "shipmentComplete",
    components: {
      NavBar
    },
    data() {
      return {
        name: "发货完成",
        value: "",
        obj: null,
      }
    },
    mounted() {
      this.$nextTick(() => {
       this.$refs.field.focus();
      });
    },
    methods: {
        async SubmitManualOperation(){
            console.log(111)
            const res = await completeDeliver(this.value)
            if(res.data.code==='0'){
                this.value=''
            }
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
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
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
  /deep/ .van-icon-clear:hover {
    cursor: pointer;
  }
  </style>