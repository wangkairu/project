<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-11 16:35:59
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-30 14:57:07
 * @FilePath: \wms-client\src\view\index\Sales.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成品库存概述</span>
      </div>
      <div id="inventory" style="height: 300px; width: 100%"></div>
    </el-card>
    <div class="display" style="display: flex">
      <el-card
        style="flex: 0.8; margin: 10px 0; margin-right: 20px; background: #fff"
      >
        <div slot="header" class="clearfix">
          <span>入库排行榜</span>
          <!-- <el-radio-group
            v-model="salesPerType"
            size="mini"
            @input="salesPerTypeChange"
          >
            <el-radio-button label="sales">出库</el-radio-button>
            <el-radio-button label="cost">入库</el-radio-button>
          </el-radio-group> -->
        </div>
        <div class="saleRank">
          <div class="row" v-for="(item, index) in arr" :key="index">
            <div>
              <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                index + 1
              }}</span>
              <span class="client">{{ item.name }}</span>
            </div>

            <span class="profit">{{ item.splifice }}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="flex: 3; margin: 10px 0">
        <div slot="header" class="clearfix">
          <span>成品入库柱状图</span>
        </div>
        <div id="main" style="height: 300px; width: 100%"></div>
      </el-card>
    </div>
    <div class="display" style="display: flex">
      <el-card
        style="flex: 0.8; margin: 10px 0; margin-right: 20px; background: #fff"
      >
        <div slot="header" class="clearfix">
          <span>出库排行榜</span>
          <!-- <el-radio-group
            v-model="salesPerType"
            size="mini"
            @input="salesPerTypeChange"
          >
            <el-radio-button label="sales">出库</el-radio-button>
            <el-radio-button label="cost">入库</el-radio-button>
          </el-radio-group> -->
        </div>
        <div class="saleRank">
          <div class="row" v-for="(item, index) in arr" :key="index">
            <div>
              <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                index + 1
              }}</span>
              <span class="client">{{ item.name }}</span>
            </div>

            <span class="profit">{{ item.splifice }}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" style="flex: 3; margin: 10px 0">
        <div slot="header" class="clearfix">
          <span>成品出库柱状图</span>
        </div>
        <div id="main" style="height: 300px; width: 100%"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      chartsLoading: false,
      salesPerType: "sales",
      query: {
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
        dateType: "year",
      },
      arr: [
        {
          name: "设备箱",
          splifice: "213",
        },
        {
          name: "设备箱",
          splifice: "200",
        },
        {
          name: "设备箱",
          splifice: "190",
        },
        {
          name: "设备箱",
          splifice: "173",
        },
        {
          name: "设备箱",
          splifice: "140",
        },
        // {
        //   name: "设备箱",
        //   splifice: "135",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "105",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "98",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "90",
        // },
        // {
        //   name: "设备箱",
        //   splifice: "50",
        // },
      ],
    };
  },
  //   computed: {
  //     ...mapState("dataVisual", {
  //       salesInfo: (state) => state.salesInfo,
  //     }),
  //     // clientRank() {},
  //   },
  mounted() {
    this.getProducts();
    this.getInventory();
  },
  methods: {
    getInventory() {
      let chartDom = document.getElementById('inventory');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland']
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        // feature: {
        //   mark: { show: true },
        //   dataView: { show: true, readOnly: false },
        //   magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //   restore: { show: true },
        //   saveAsImage: { show: true }
        // }
        // },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: [
              "7:00",
              "8:00",
              "9:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
            ].map(function (str) {
              return str.replace(" ", "\n");
            }),
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 100, 150, 400, 200, 265, 235, 355]
          },
          {
            name: 'Steppe',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 130, 140, 320, 222, 215, 305, 295]
          },
          {
            name: 'Desert',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 150, 240, 360, 252, 275, 385, 400]
          },
          {
            name: 'Wetland',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [98, 77, 101, 99, 40, 130, 140, 320, 222, 215, 305, 295]
          }
        ]
      }
      option && myChart.setOption(option);
    },
    getProducts() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          //   data: [
          //     "7:00",
          //     "8:00",
          //     "9:00",
          //     "10:00",
          //     "11:00",
          //     "12:00",
          //     "13:00",
          //     "14:00",
          //     "15:00",
          //     "16:00",
          //     "17:00",
          //     "18:00",
          //   ].map(function (str) {
          //     return str.replace(" ", "\n");
          //   }),
          data: ["设备箱", "设备箱", "设备箱", "设备箱", "设备箱"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 700, 624],
            type: 'bar',
            smooth: true,
          },
          //   {
          //     data: [720, 832, 801, 834, 1190, 1230, 1220, 720, 832, 801, 600, 524],
          //     type: "line",
          //     smooth: true,
          //   },
        ],
      };

      option && myChart.setOption(option);
    },
    salesPerTypeChange(newVal) {
      switch (newVal) {
        case "sales":
          // this.renderSalesPer(
          //   `销售额\n${this.salesInfo.categoriesPer.totalSales}`,
          //   this.salesInfo.categoriesPer.sales
          // );
          break;
        case "cost":
          // this.renderSalesPer(
          //   `成本\n${this.salesInfo.categoriesPer.totalCost}`,
          //   this.salesInfo.categoriesPer.cost
          // );
          break;
      }
    },
    renderSales() {
      let sales = this.$echarts.init(this.$refs["sales"]);
      let salesOptions = {
        legend: {
          data: ["销售额", "成本", "利润"],
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          data: this.salesInfo.chartsData.xData,
        },
        yAxis: {},
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "销售额",
            type: "bar",
            data: this.salesInfo.chartsData.salesData,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "成本",
            type: "bar",
            data: this.salesInfo.chartsData.costData,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "利润",
            type: "bar",
            data: this.salesInfo.chartsData.profitData,
          },
        ],
      };
      sales.setOption(salesOptions);
    },
    renderSalesPer(text, data) {
      let salesPerOptions = {
        title: {
          text: text,
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            data: data,
            radius: ["40%", "70%"],
          },
        ],
      };
      this.$echarts.init(this.$refs["salesPer"]).setOption(salesPerOptions);
    },
    // salesPerTypeChange(newVal) {
    //   switch (newVal) {
    //     case "sales":
    //       this.renderSalesPer(
    //         `销售额\n${this.salesInfo.categoriesPer.totalSales}`,
    //         this.salesInfo.categoriesPer.sales
    //       );
    //       break;
    //     case "cost":
    //       this.renderSalesPer(
    //         `成本\n${this.salesInfo.categoriesPer.totalCost}`,
    //         this.salesInfo.categoriesPer.cost
    //       );
    //       break;
    //     case "profit":
    //       this.renderSalesPer(
    //         `利润\n${this.salesInfo.categoriesPer.totalProfit}`,
    //         this.salesInfo.categoriesPer.profit
    //       );
    //       break;
    //   }
    // },
    dateTypeChange() {
      this.updata();
    },
    yearChange() {
      this.updata();
    },
    monthChange() {
      this.updata();
    },
    //更新数据
    async updata() {
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

      this.chartsLoading = true;
      // let res = await this.$store
      //   .dispatch("dataVisual/getSalesInfo", query)
      //   .catch(() => {
      //     this.chartsLoading = false;
      //   });
      // this.chartsLoading = false;
    },

    dataFormat: function (date) {
      if (!date) return "xxxx-xx-xx xx:xx:xx";
      return formatDate(new Date(date));
    },
    formatAmount(amount) {
      return formatAmount(amount);
    },
  },

  // watch: {
  //   salesInfo: {
  //     handler(newVal) {
  //       this.renderSales();
  //       this.renderSalesPer(
  //         `销售额\n${formatAmount(this.salesInfo.categoriesPer.totalSales)}`,
  //         this.salesInfo.categoriesPer.sales
  //       );
  //       this.$nextTick(() => {});
  //     },
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.display {
  display: flex;
  .saleRank {
    div.li {
      display: flex;
      // justify-content: space-between;
      list-style: none;
      margin-top: 16px;
      // align-items: space-between;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .index {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-top: 1.5px;
      margin-right: 16px;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      background-color: #fafafa;
      border-radius: 20px;
    }
    // .client {
    //   flex: 1 1;
    // }
  }
}
.rank-top {
  color: #fff;
  background-color: #314659 !important;
}
</style>