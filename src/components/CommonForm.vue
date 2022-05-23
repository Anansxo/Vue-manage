<template>
  <div>
    <div class="addUser-search">
      <el-button type="primary" class="add-user" @click="addUser"
        >新增用户</el-button
      >
      <el-button type="danger" class="add-user" @click="delAllUser"
        >删除全部</el-button
      >
      <!-- 带年纪新增用户弹出 -->
      <el-dialog
        title="创建用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div class="create-user">
          <span>创建时间: </span
          ><el-input v-model="createTime" :disabled="true"></el-input>
          <span>用户名: </span
          ><el-input
            placeholder="设置用户名"
            v-model="userName"
            clearable
          ></el-input>
          <span>账号: </span
          ><el-input
            placeholder="设置账号"
            v-model="accountNumber"
            clearable
          ></el-input>
          <span>密码: </span
          ><el-input
            placeholder="设置密码"
            v-model="passWord"
            show-password
          ></el-input>
          <span>确认密码: </span
          ><el-input
            placeholder="再输入一次密码"
            v-model="confirmPassword"
            show-password
          ></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="set">确 定</el-button>
        </span>
      </el-dialog>
      <div class="search">
        <el-input
          v-model="searchInput"
          placeholder="输入用户名搜索"
          class="search-input"
          v-on:mouseleave.native="searchBtn()"
            clearable>
        ></el-input>
        <el-button type="success" class="search-btn" @click="searchBtn()"
          >搜索</el-button
        >
      </div>
    </div>
    <el-table :data="showData" style="width: 100%">
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.userName }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.accountNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.passWord }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      createTime: "", //创建时间
      userName: "", // 用户名
      accountNumber: "", //账号
      passWord: "", //密码
      confirmPassword: "", //再次输入密码
      searchInput: "", //监听搜索框输入的内容
      showData: [], //查找的内容放入的数组

      tableData: JSON.parse(localStorage.getItem("users")) || [], //本地存储读取
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除当前选中用户
    handleDelete(index, row) {
      console.log(index, row);
      if (confirm("确认删除此用户吗？")) {
        this.tableData.splice(index, 1);
      }
    },
    // 删除全部用户
    delAllUser() {
      if (confirm("危险！！此操作将删除全部用户, 确认进行？")) {
        this.tableData = this.tableData.filter((tableData) => {
          return !tableData;
        });
        alert("已删除全部用户");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    date() {
      // 获取到当前年月日
      const d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      month = month < 10 ? "0" + month : month; //小于10在前面补0
      let day = d.getDate();
      day = day < 10 ? "0" + day : day;
      const date = year + "-" + month + "-" + day;
      return (this.createTime = date);
    },
    // 新增用户
    addUser() {
      this.dialogVisible = true;
      // 调用时间函数
      this.date();
    },
    // 确认创建用户
    set() {
      if (confirm("确认创建？")) {
        this.tableData.push({
          createTime: this.createTime,
          userName: this.userName,
          accountNumber: this.accountNumber,
          passWord: this.passWord,
          confirmPassword: this.confirmPassword,
        });
        // 创建成功后清空表单内的所有内容
        this.userName = "";
        this.accountNumber = "";
        this.passWord = "";
        this.confirmPassword = "";
        this.dialogVisible = false;
      }
    },
    // 取消创建用户
    cancel() {
      // 未创建清空表单内的所有内容
      this.userName = "";
      this.accountNumber = "";
      this.passWord = "";
      this.confirmPassword = "";
      this.dialogVisible = false;
    },

    // 模糊搜索
    searchBtn() {
      // console.log(this.tableData);
      if (!this.searchInput) {
        this.showData = this.tableData;
      } else {
        this.showData = this.tableData.filter((item) => {
          // console.log(item.userName);
          // console.log(this.searchInput);
          // includes()判断一个数组是否包含一个指定的值
          return item.userName.includes(this.searchInput);
        });
      }
    },
  },
  created() {
    this.searchBtn();
  },
  watch: {
    tableData: {
      deep: true,
      handler(value) {
        // 设置浏览器本地存储
        localStorage.setItem("users", JSON.stringify(value));
      },
    },
  },
  // mounted() {
  //   console.log(this.tableData);
  // },
};
</script>
<style lang="less" scoped>
.addUser-search {
  margin-bottom: 10px;
  .create-user {
    display: flex;
    flex-direction: column;
    .el-input {
      margin: 5px 0 5px 0;
      width: 100%;
    }
  }
  .search {
    float: right;
    .search-input {
      width: 150px;
      margin-right: 10px;
    }
  }
}
</style>