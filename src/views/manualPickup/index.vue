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
        @change="handelManualPickup"
        @clear="obj = null"
      />
    </van-cell-group>
    <div class="main">
      <div class="boxInformation" v-if="obj !== null">
        <h3 class="boxCon">货物信息</h3>
        <div class="information">
          <li>
            <span class="title">agv任务状态名称:</span>
            <span class="con">{{ obj.agvTaskStatusName }}</span>
          </li>
          <li>
            <span class="title">MES箱号二维码:</span>
            <span class="con">{{ obj.mesBoxNumberQrCode }}</span>
          </li>
          <li>
            <span class="title">MES连线结构:</span>
            <span class="con">{{ obj.mesCordStructure }}</span>
          </li>
          <li>
            <span class="title">MES客户简称:</span>
            <span class="con">{{ obj.mesCustomerShortName }}</span>
          </li>
          <li>
            <span class="title">MES左右面:</span>
            <span class="con">{{ obj.mesLeftRightSidesName }}</span>
          </li>
          <li>
            <span class="title">MES米长:</span>
            <span class="con">{{ obj.mesMeterLength }}</span>
          </li>
          <li>
            <span class="title">MES轮数:</span>
            <span class="con">{{ obj.mesNumOfRounds }}</span>
          </li>
          <li>
            <span class="title">MES生产编号:</span>
            <span class="con">{{ obj.mesProductionNo }}</span>
          </li>
          <li>
            <span class="title">MES托盘:</span>
            <span class="con">{{ obj.mesTray }}</span>
          </li>
          <li>
            <span class="title">MES轮型:</span>
            <span class="con">{{ obj.mesWheelType }}</span>
          </li>
          <li>
            <span class="title">备注:</span>
            <span class="con">{{ obj.remark }}</span>
          </li>
        </div>
      </div>
      <div v-else class="empty">
        <!-- <van-empty description="暂无数据" /> -->
        <span>暂无数据</span>
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
import { manualOperationPickUp, manualOperation } from '@/api/manualPickup'
export default {
  name: "manualPickup",
  components: {
    NavBar
  },
  data() {
    return {
      name: "人工取货",
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
    async handelManualPickup() {
      const res = await manualOperationPickUp(this.value)
      if (res.data.code === '0') {
        this.obj = res.data.data
      } else {
        this.obj = null;
      }
    },
    async SubmitManualOperation() {
      const params = {
        id: this.obj.id,
        mesBoxNumberQrCode: this.obj.mesBoxNumberQrCode
      }
      const res = await manualOperation(params)
      if (res.data.code === '0') {
        Toast.success({ message: res.data.msg });
      } else {
        Toast.fail({ message: res.data.msg });
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