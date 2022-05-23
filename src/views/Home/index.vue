<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="user-name">Admin</p>
            <p class="user-rights">超级管理员</p>
          </div>
        </div>
        <hr />
        <div class="login-info">
          <p>上次登录时间：<span>2022-5-16</span></p>
          <p>上次登录地点：<span>益阳</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 450px; margin-top: 20px">
        <el-table :data="tableData">
          <!-- 遍历出表格内容 -->
          <!-- key要和tableData中保持一致 -->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <!-- 订单统计 -->
      <div class="order">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin-top: 10px">
        <div style="height: 280px" ref="echarts"></div>
        <!-- <Echart :chartData="echartData.order" style="height: 280px" /> -->
      </el-card>
      <div class="graph">
        <el-card>
          <div style="height: 240px" ref="userEcharts"></div>
          <!-- <Echart :chartData="echartData.user" style="height: 240px" /> -->
        </el-card>
        <el-card>
          <div style="height: 200px" ref="videoEcharts"></div>
          <!-- <Echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          /> -->
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data.js";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      userImg: require("../../assets/logo.png"),
      tableData: [],
      tableLabel: {
        name: "手机品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "s-goods",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data; // 动态获取表格数据
      if (code === 20000) {
        this.tableData = data.tableData;
        // echarts数据获取
        const order = data.orderData;
        const xData = order.date; //底部日期
        const keyArray = Object.keys(order.data[0]); //key值
        const series = [];
        // 遍历key值(手机型号)
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);

        // 用户图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", //类目轴
            data: data.userData.map((item) => item.data), //遍历星期
            axisLine: {
              lineStyle: {
                color: "#333",
              },
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  colorl: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar", //图形
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar", //图形
            },
          ],
        };

        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption);

        // 饼图实现
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videoData,
              type: "pie",
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    margin-bottom: 20px;
    img {
      width: 130px;
      border-radius: 50%;
      margin-right: 35px;
      background-color: #eee;
    }
    .user-info {
      display: inline-block;
      position: absolute;
      transform: translate(0, 50%);
      .user-name {
        font-size: 30px;
        font-weight: bold;
      }
      .user-rights {
        text-align: center;
        color: rgb(128, 128, 128);
      }
    }
  }
  .login-info {
    font-size: 14px;
    color: rgb(92, 92, 92);
    margin-top: 20px;
    p {
      padding-bottom: 8px;
      span {
        padding-left: 40px;
        color: rgb(63, 63, 63);
      }
    }
  }
  // 订单
  .order {
    width: 100%;
    height: 180px;
    overflow: hidden;
    .el-card {
      margin: 0 0 10px 0;
      float: left;
      width: 33.33%;
      .icon {
        width: 110px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
      }
      .detail {
        width: 100%;
        p {
          padding: 10px 0 0 20px;
          white-space: nowrap;
        }
        .num {
          font-size: 20px;
          font-weight: 500;
        }
        .txt {
          color: rgb(150, 150, 150);
        }
      }
    }
  }
  .graph {
    display: flex;
    width: 100%;
    height: 250px;
    justify-content: space-between;
    margin-top: 20px;
    .el-card {
      width: 49%;
    }
  }
}
</style>