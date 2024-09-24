<template>
  <div class="navbar">
    <div class="left">
      <!-- <div class="fold">
        <svg-icon
          @click="handelFold_1"
          class="iconfotn"
          :icon-class="!isCollapse ? 's-fold' : 's-unfold'"
        ></svg-icon>
      </div> -->
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span class="text">{{ name }}</span>
          <svg-icon class="iconfotn" icon-class="open"></svg-icon>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import Breadcrumb from "@/components/Breadcrumb";
// import Hamburger from '@/components/Hamburger'

// Hamburger,
export default {
  name: "headerComponents",
  components: {
    Breadcrumb,
  },
  props: {
    isCollapse: {
      type: Boolean,
    },
  },
  data() {
    return {
      name: "",
    }
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('data'))
    this.name = data.username
  },
  methods: {
    handelFold_1() {
      this.$emit("handelFold");
    },
    async logout() {
      await this.$store.dispatch("user/restToken");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .left {
    display: flex;
    align-items: center;
  }
  .fold {
    .iconfotn {
      cursor: pointer;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    margin-left: 10px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    // float: right;
    // height: 100%;
    // line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      // padding: 0 8px;
      height: 100%;
      // font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        // position: relative;
        .text {
          // font-size: 1rem;
          color: #333;
        }
      }
    }
  }
}
</style>