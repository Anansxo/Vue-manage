<template>
  <div>
    <!-- :effect="$route.name === tag.name ? 'drak' : 'plain'" 判断是否高亮 -->
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      size="small"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @close="handleClose(tag,index)"
      @click="changeMenu(tag, index)"
      style="cursor: pointer"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Tags",
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      // 判断选中的tag是否与当前路由一致
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
    changeMenu(item) {
      // 点击实现路由跳转
      this.$router.push({
        name: item.name,
      });
    },
  },
  computed: {
    ...mapState({
      tags: (store) => store.tab.tabsList,
    }),
  },
};
</script>

<style>    
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>