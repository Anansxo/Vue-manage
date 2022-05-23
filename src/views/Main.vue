<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="auto" >
        <!-- commonAside组件 -->
				<commonAside />
			</el-aside>
      <el-container>
        <el-header>
          <!-- Header组件 -->
          <CommonHeader />
        </el-header>
        <el-main>
          <!-- Tag组件 -->
          <CommonTag style="margin:-10px 0 10px 0" />
          <!-- 内容显示区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: "Home",
  data() {
    return {};
  },
	components:{
		CommonAside,CommonHeader,CommonTag
	}
};
</script>

<style>
.el-header {
	background-color: #333;
}
.el-aside {
	background-color: #ddd;
}
.el-main {
	background-color: #eee;
}
</style>