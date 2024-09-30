<template>
  <div class="login">
    <div class="header">
      <h1>Welcome</h1>
    </div>
    <div class="form">
      <van-form @submit="submitForm">
        <van-field
          v-model="ruleForm.loginName"
          label="账号"
          placeholder="请输入账号"
       
        />
        <!--    :rules="[{ required: true, message: '请填写账号' }]" -->
        <van-field
          v-model="ruleForm.passWord"
          :right-icon="passwordStatus ? 'eye' : 'closed-eye'"
          :type="!passwordStatus ? 'password' : 'text'"
          label="密码"
          placeholder="请输入密码"
          @click-right-icon="passwordStatus = !passwordStatus"
        />
        <!--           :rules="[{ required: true, message: '请填写密码' }]" -->
        <div class="submit">
          <van-button round block type="info" native-type="submit"
            >立即登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordStatus: false,
      ruleForm: {
        loginName: "",
        passWord: "",
      },
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch("user/submit", this.ruleForm).then(() => {
        this.$router.push({ path: "/" });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 1.4rem 1rem;
  // position: relative;
  background-image: linear-gradient(to bottom right, #49bbb1, #2e62b1);
  position: fixed;
  // background-image: linear-gradient(105deg, #e4ffcd, #2e62b1, #4988bb, #e4ffcd);
}
.header {
  width: 100%;
  height: 50px;
  // position: absolute;
  // left: 50%;
  // top: 24%;
  // transform: translateX(-50%);

  h1 {
    width: 100%;
    color: #fff;
    text-align: center;
    font-weight: 400;
    font-size: 50px;
    margin-top: 20px;
  }
}
.form {
  padding-top: 50px;
  margin-top: 40px;
}
.submit {
  margin-top: 30px;
}
.loginBtn {
  padding: 5px 10px;
  .van-button--normal {
    width: 100%;
    border-radius: 50px;
  }
}
/deep/ .van-cell {
  background: transparent;
}
/deep/ .van-field__label,
/deep/ .van-field__control,
/deep/ .van-field__right-icon {
  color: #ccc;
}
</style>