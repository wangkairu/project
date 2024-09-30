<template>
  <div class="home">
    <div class="header">
      <div class="top">
        <div class="search">
          <van-search placeholder="请输入搜索关键词" v-model="value" />
        </div>
        <svg-icon class="icons" icon-class="menu" @click="handelNav" />
      </div>
      <div class="information">
        <div class="personal">
          <div class="avater">
            <div class="circle">
              <svg-icon class="avaterIcon" icon-class="avater" />
            </div>
            <div class="infor">
              <li class="workNo">{{ data.data.workNo }}</li>
              <li>{{ data.data.username }}</li>
            </div>
          </div>
          <div class="role">
            {{ data.data.roleVoList==null?'暂无分配角色':data.data.roleVoList[0].roleName }}
          </div>
        </div>
        <div class="store">
          <ul>
            <li class="num_1">100</li>
            <li class="text">今日入库</li>
          </ul>
          <ul>
            <li class="num_2">100</li>
            <li class="text">今日取货</li>
          </ul>
          <ul>
            <li class="num_3">100</li>
            <li class="text">今日出库</li>
          </ul>
          <ul>
            <li class="num_4">100</li>
            <li class="text">今日返库</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="con">
      
      <div class="quickAccess">
        <div v-for="(v,ind) in routes" :key="ind" @click="handelJumpUrl(v)">
          <ul v-if="v.flag">
            <li class="background">
              <svg-icon class="icons" icon-class="store" />
            </li>
            <li class="title">{{ v.title=='手动入库下发'?'手动入库':v.title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      value: "",
      flag: false,
      data: {},
      routerArr:[],
    }
  },
  computed: {
    routes() {
      return global.antRouter;
    },
  },
  created() {
    this.data = JSON.parse(localStorage.getItem('data'))
  },
  methods: {
    handelNav() {
      this.flag = true;
    },
    handelJumpUrl(val) {
      // { name: "storage", }, () => { }, () => { }
      this.$router.push(val.path)
      
    },
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    .top{
      padding: 6px 20px;
      background: #3391e8;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .information {
      background: #f1f1f1;
      background: #fff;
      .personal {
        height: 66px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 8px;
        .role {
          color: #666;
          font-size: 15px;
        }
      }
      .store {
        display: flex;
        justify-content: space-around;
        padding: 8px 0;
        .num_1 {
          color: #ff7161;
          font-size: 30px;
        }
        .num_2 {
          color: #fdbc46;
          font-size: 30px;
        }
        .num_3 {
          color: #82c83a;
          font-size: 30px;
        }
        .num_4 {
          color: #27aadd;
          font-size: 30px;
        }
        .text {
          color: #585858;
          font-size: 12px;
          margin-top: 4px;
        }
      }
      .avater {
        display: flex;
        align-items: center;
        .circle {
          width: 50px;
          height: 50px;
          border-radius: 50px;
          box-shadow: 0px 0px 5px #ccc;
          background: #f1f1f1;
          position: relative;
        }
        .avaterIcon {
          fill: rgba(0, 0, 0, 0.623);
          margin: 0 auto;
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .infor {
          margin-left: 15px;
          color: #888;
          .workNo {
            font-size: 13px;
          }
        }
      }
    }
  }
  ::v-deep .svg-icon {
    fill: #fff;
    font-size: 20px;
  }
  .search {
    width: 90%;
    height: 30px;
    .van-search {
      height: 30px;
      background-color: #fff;
    }
    .van-search__content {
      background-color: #fff;
      height: 30px;
    }
    .van-field__value {
      margin-left: 8px;
    }
  }
  .con {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    padding: 4px 4px;
    background: #f1f1f1;
    .quickAccess {
      flex: 1;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      padding: 2px 2px;
      ul {
        margin: 15px 5px;
        width: 80px;
        height: 78px;
        // width: 100px;
        // height: 78px;
        // margin-left: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          // margin-top: 2px;
          font-size: 15px;
        }
      }
      .background {
        background: #3391e8;
        width: 54px;
        height: 54px;
        border-radius: 54px;
        position: relative;
        // margin: 0 auto;
        .icons {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 25px;
        }
        .inventory{
          fill: #fff;
        }
      }
    }
  }
}
</style>