<template>
  <div class="my">
    <div class="titleMy">
      <li>我的</li>
    </div>
    <div class="main">
      <div class="information">
      <div class="avater">
        <div class="circle">
          <svg-icon class="avaterIcon" icon-class="avater" />
        </div>
        <div class="infor">
          <li>{{ data.data.username }}</li>
          <li class="num">{{ data.data.workNo }}</li>
        </div>
      </div>
      </div>
      <div class="personal">
        <li class="title">个人信息</li>
        <div class="information">
          <li>
            <span class="title">性别</span>
            <span class="con">{{ data.data.sex === 2 ? "女" : "男" }}</span>
          </li>
          <li>
            <span class="title">生日</span>
            <span class="con">{{ data.data.birthday }}</span>
          </li>
          <li>
            <span class="title">手机</span>
            <span class="con">{{ data.data.phone }}</span>
          </li>
          <li>
            <span class="title">邮箱</span>
            <span class="con">{{ data.data.email }}</span>
          </li>
        </div>
      </div>
      <div class="personal work">
        <li class="title">工作信息</li>
        <div class="information">
          <li>
            <span class="title">身份</span>
            <span class="con">{{
              data.data.userIdentity === 2 ? "上级" : "普通成员"
            }}</span>
          </li>
          <li>
            <span class="title">工号</span>
            <span class="con">{{ data.data.workNo }}</span>
          </li>
          <li>
            <span class="title">角色</span>
            <span class="con">{{ data.data.roleVoList==null?'暂无分配角色':data.data.roleVoList[0].roleName }}</span>
          </li>
        </div>
      </div>
      <div class="loginOut">
        <van-button type="default" @click.native="loginOUt">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    }
  },
  created() {
    this.data = JSON.parse(localStorage.getItem('data'))
  },
  mounted() {
  },
  methods: {
    async loginOUt() {
      await this.$store.dispatch("user/restToken");
      this.$router.push({ path: "/login" });
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  .titleMy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    height: 50px;
    color: #fff;
    background: #3391e8;
    li {
      width: 100%;
      text-align: center;
    }
    .icons {
      font-size: 20px;
    }
  }
  .main{
    flex: 1;
    overflow: hidden;
    overflow-y:scroll;
  }
  .information {
    height: 100px;
    background: #fff;
    .avater {
      display: flex;
      align-items: center;
      // margin: 10px 20px;
      .circle {
        width: 50px;
        height: 50px;
        // border-radius: 50px;
        box-shadow: 0px 0px 3px #ccc;
        background: #f1f1f1;
        position: relative;
        margin: 30px 20px;
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
        // margin-left: 2px;
        color: #888;
        .num {
          font-size: 13px;
          margin-top: 8px;
        }
      }
    }
  }
  .redius {
    // background: #fff;
    width: 100%;
    // height: 20rem;
    border-radius: 10px;
    position: relative;
    .rediusImg {
      width: 100%;
      // height: 20rem;
    }
  }
  .personal {
    margin-top: 6px;
    .information {
      // padding: 0 15px;
      background: #fff;
      margin-top: 6px;
      height: 148px;
      li {
        padding: 0 36px;
        height: 37px;
        line-height: 37px;
        // border-bottom: 1px solid #eee;
      }
    }
    .title {
      color: #b3b3b3;
      font-size: 13px;
    }
    .con {
      color: #4e4e4e;
      display: inline-block;
      margin-left: 30px;
    }
  }
  .work {
    margin-top: 6px;
    .information {
      height: 110px;
    }
  }
  .name {
    text-align: center;
    margin-top: 50px;
  }
  .loginOut {
    text-align: center;
    margin-top: 45px;
    margin-bottom: 30px;
    ::v-deep .van-button--normal {
      padding: 4px 40px;
      border-radius: 40px;
      background: #3391e8;
      color: #fff;
    }
  }
}
</style>