<template>
  <div>
    <header>
      <div class="l-content">
        <el-button
          plain
          icon="el-icon-menu"
          size="mini"
          @click="handleMenu"
        ></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="r-content">
        <el-dropdown trigger="click" size="mini">
          <span>
            <img class="user" :src="userImg" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      userImg: require("../assets/logo.png"),
    };
  },
  methods: {
    // 点击后提交Vuex中mutations collapseMenu操作
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    // 登出
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push('/login');
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 10px;
  }
  // 修改面包屑颜色
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #c7c7c7 !important;
  }
  .el-breadcrumb ::v-deep .el-breadcrumb__inner:hover {
    color: rgb(70, 169, 187) !important;
    cursor: pointer;
  }
}
.r-content {
  display: flex;
  align-items: center;
  .user {
    width: 30px;
    background-color: #eee;
    border-radius: 50%;
  }
  .user:hover {
    cursor: pointer;
  }
}
</style>