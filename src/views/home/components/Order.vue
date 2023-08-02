<template>
  <div class="warpper">
    <!-- 树状 -->
    <el-card
      class="box-card"
      style="flex: 3; margin: 10px 0; margin-right: 20px"
    >
      <div slot="header" class="clearfix">
        <span>当天库存</span>
        <!-- <div class="clearfix">
          <el-radio-group
            v-model="query.dateType"
            size="mini"
            style="margin-right: 10px"
            @input="dateTypeChange"
          >
            <el-radio-button label="year">年统计</el-radio-button>
            <el-radio-button label="month">月统计</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-show="query.dateType == 'year'"
            v-model="query.year"
            type="year"
            placeholder="选择年"
            size="mini"
            value-format="yyyy"
            @change="yearChange"
          >
          </el-date-picker>
          <el-date-picker
            v-show="query.dateType == 'month'"
            v-model="query.month"
            type="month"
            placeholder="选择月"
            size="mini"
            value-format="yyyy-M"
            @change="monthChange"
          >
          </el-date-picker>
        </div> -->
      </div>
      <div ref="orderAmount" style="height: 300px"></div>
    </el-card>
    <!-- 饼状 -->
    <el-card class="box-card" style="flex: 1; margin: 10px 0">
      <div slot="header" class="clearfix">
        <span>出入库比例</span>
      </div>
      <div style="height: 300px; width: 100%" ref="orderStatus"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yearFinishOrderLoading: false,
      chartsLoading: false,
      salesPerType: "sales",
      query: {
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
        dateType: "year",
      },
    };
  },
  methods: {
    //订单状态饼图渲染
    renderOrderStatus() {
      let orderStatusOptions = {
        title: {
          text: "出入库占比",
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            color: ["#409EFF", "#67C23A",],
            data: [
              {
                value: 1048,
                name: "入库",
              },
              {
                value: 735,
                name: "出库",
              },

              // {
              //   value: this.order_sended,
              //   name: "已发货",
              // },
              // {
              //   value: this.order_unSend,
              //   name: "未发货",
              // },
            ],
            radius: ["40%", "60%"],
          },
        ],
      };
      this.$echarts
        .init(this.$refs["orderStatus"])
        .setOption(orderStatusOptions);
    },
    //成品出库外贸分类概述
    renderYearFinishOrder() {
      let orderAmount = this.$echarts.init(this.$refs["orderAmount"]);
      let orderAmountOptions = {
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {},
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: 'Morning Peak',
                    xAxis: '07:30'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: 'Evening Peak',
                    xAxis: '17:30'
                  },
                  {
                    xAxis: '21:15'
                  }
                ]
              ]
            }
          }
        ]
      };
      orderAmount.setOption(orderAmountOptions);
    },
    dateTypeChange() {
      this.updataYearFinishOrder();
    },
    yearChange(newVal) {
      //重置月选择
      this.updataYearFinishOrder();
    },
    monthChange(newVal) {
      this.updataYearFinishOrder();
    },
    async updataYearFinishOrder() {
      let query = {};
      switch (this.query.dateType) {
        case "year":
          query.year = this.query.year;
          break;
        case "month":
          query.year = this.query.month.split("-")[0];
          query.month = this.query.month.split("-")[1];
          break;
      }

      //   this.yearFinishOrderLoading = true;
      //   this.yearFinishOrderLoading = false;
    },
  },
  mounted() {
    this.renderOrderStatus();
    this.renderYearFinishOrder();
  },
};
</script>

<style scoped lang='sass'>
.clearfix
  display: flex
  align-items: center
  overflow: hidden
  justify-content: space-between

.warpper
  display: flex
</style>