<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="activePage" @change="handleChangeNav">
      <van-tabbar-item v-for="i in navList" :key="i.icon">{{
        i.title
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
const navList = [
  {
    title: "会议",
    path: "/",
    icon: "home-o",
  },
  {
    title: "通讯录",
    path: "/addressBook",
    icon: "search",
  },
  {
    title: "共享文件",
    path: "/shareFile",
    icon: "friends-o",
  },
];
export default {
  name: "app",
  data() {
    return {
      navList,
      activePage:0
    };
  },
  mounted(){
    const path = this.$route.path;
    navList.map((i, idx) => (path === i.path && (this.activePage = idx)));
  },
  methods: {
    handleChangeNav(val) {
      this.activePage = val;
      this.$router.push(navList[val].path);
    },
  },
  watch: {
    $route(to, from) {
      navList.map((i, idx) => (i.path === to.path && (this.activePage = idx)));
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
