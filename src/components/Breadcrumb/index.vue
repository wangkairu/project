<template>
  <div>
    <div >
      <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in breadList" 
            :key="index"
            :to="{ path: item.path }"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      breadList: [],
    };
  },

  watch: {
    $route: {
      handler: function () {
        this.getBreadcrunb();
      },
      immediate: true,
    },
  },
  methods: {
    getBreadcrunb() {
      let matched = this.$route.matched;
      if (matched[0].path !== "") {
        const route = matched;
        this.breadList = [{ path: "/home", meta: { title: "首页" } }, ...route];
      }
      else if (matched[1].name === "home") {
        this.breadList = [{ path: "/home", meta: { title: "首页" } }];
      } else {
        this.breadList = matched.map((v) => {
          return {
            ...v,
            path: v.path === "" ? "/home" : v.path,
            meta: v.path === "" ? { title: "首页" } : v.meta,
          };
        });
      }
    },
  },
};
</script>
