<template>
  <el-table :data="tableData" border style="width: 55%">
    <el-table-column fixed prop="date" label="日期" width="150">
    </el-table-column>
    <el-table-column prop="name" label="商品名" width="120"> </el-table-column>
    <el-table-column prop="province" label="进产省份" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址" width="300"> </el-table-column>
    <el-table-column prop="zip" label="价格" width="120"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看</el-button
        >
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Mall",
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "熬里熬",
          province: "火星",
          address: "xxxxxx",
          zip: 99,
        },
        {
          date: "2016-05-04",
          name: "天地饼干",
          province: "徕卡大陆",
          address: "xxxxxx",
          zip: 300,
        },
        {
          date: "2016-05-01",
          name: "多西酒",
          province: "龙王殿",
          address: "xxxxxx",
          zip: 800,
        },
        {
          date: "2016-05-03",
          name: "多情散",
          province: "月下宫",
          address: "xxxxxx",
          zip: 1000,
        },
      ],
    };
  },
};
</script>

<style>
</style>