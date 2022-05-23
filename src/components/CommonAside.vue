<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse" 
    background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b"
  >
  <!-- 控制标题变化， 如果isCollapse为true收起状态只显示后天两字 -->
    <h3 class="logo">{{isCollapse ? '后台': '后台管理系统'}}</h3> 
    <!-- 遍历无子项菜单-->
    <el-menu-item
		@click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
    >
      <!-- :class="'el-icon-'+item.icon" 字符串拼接获取不同的icon -->
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 遍历有子项菜单 -->
    <el-submenu v-for="item in hasChildren" :key="item.icon" :index="item.icon">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 遍历二级菜单 -->
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item 	@click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
     
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
		// 点击导航实现路由跳转
		clickMenu(item){
			this.$router.push({
				name:item.name,
			})
      // this.$store.commit('tab/selectMenu', item) //item为对应menu数据
      this.$store.commit('selectMenu', item) //item为对应menu数据
		}
  },
  computed: {
    // 过滤数据中有子项和没有子项的数据
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    // 拿到Vuex中共享的isCollapse数据
    isCollapse(){
      return this.$store.state.tab.isCollapse
    // 过滤数据中有子项和没有子项的数据
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  // 文字不换行
  white-space: nowrap;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}

</style>