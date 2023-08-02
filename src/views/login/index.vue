<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">wms仓库管理系统</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="loginName">
          <el-input v-model="ruleForm.loginName" placeholder="请输入账号">
            <svg-icon slot="prefix" icon-class="user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            type="password"
            v-model="ruleForm.passWord"
            autocomplete="off"
            placeholder="请输入密码"
          >
            <svg-icon slot="prefix" icon-class="password" />
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @keyup.enter="keyDown"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { isvalidPass, isvalidUsername } from "@/utils/validate";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (this.ruleForm.user !== "") {
        isvalidUsername(value);
      }
      callback();
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.pass !== "") {
          isvalidPass(value);
        }
        callback();
      }
    };

    return {
      ruleForm: {
        loginName: "",
        passWord: "",
      },
      rules: {
        passWord: [
          { type: "string", validator: validatePass, trigger: "blur" },
        ],
        loginName: [
          { type: "string", validator: validateUser, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //绑定事件
    window.addEventListener("keydown", this.keyDown);
  },
  // 增加销毁事件 不影响其他页面
  //销毁事件
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        //需要执行的登录方法
        this.submitForm("ruleForm");
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sessionStorage.setItem("ruleForm", JSON.stringify(this.ruleForm));
          this.$store.dispatch("user/submit", this.ruleForm).then(() => {
            this.$router.push({ path: "/" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
};
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
</style>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/background.png") 100% no-repeat;
  background-size: cover;
  position: relative;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: none;
  .title {
    font-weight: 600;
    font-size: 20px;
    color: #fff;
  }
}

// .demo-ruleForm ::v-deep .el-form-item__content {
//   background: rgba(255, 255, 255, 0.3) !important;
// }

.el-card {
  background: rgba(255, 255, 255, 0.3);
}
.el-button {
  width: 360px;

  //   height: 60px;
  padding: 10px;
}
</style>