<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-08 23:18:47
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-23 19:33:28
 * @FilePath: \wms-client\src\view\index\Store.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="chart-warpper">
    <canvas id="base-echart"></canvas>
    <div
      class="canvashover"
      v-if="isShowHover"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${hoverstyle.left}px, ${hoverstyle.top}px)`,
      }"
    >
      <div v-for="(item, index) in arr" :key="index">
        <ul>
          <span>库位:</span>
          <span>{{ item.location }}</span>
        </ul>
        <ul>
          <span>名称:</span>
          <span>{{ item.name }}</span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryWarehouse } from "@/api/location";
export default {
  props: {
    activeName: {
      type: String,
    },
  },

  computed: {
    ...mapState("dataVisual", {
      storeInfo: (state) => state.storeInfo,
    }),
  },

  data() {
    return {
      chart: null,
      flag: false,
      ctx: null,
      canvas: null,
      allArcs: [],
      data: {
        name: "西库",
        children: [
          {
            name: "A1-1",
            value: "100",
            children: [
              {
                name: "规模一",
                value: "11",
                children: [
                  { name: "手提包", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                ],
              },
              {
                name: "规模一",
                value: "11",
                children: [
                  { name: "手提包", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                ],
              },
              {
                name: "规模一",
                value: "11",
                children: [
                  { name: "手提包", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                ],
              },
              {
                name: "规模二",
                value: "11",
                children: [
                  { name: "手提包", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                  { name: "手机", value: "8" },
                ],
              },
              {
                name: "规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模四",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模五",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
            ],
          },
          {
            name: "A1-2",
            value: "80",
            children: [
              {
                name: "规模一,规模二，规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模二",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模四",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模五",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模一,规模二，规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模一,规模二，规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
            ],
          },
          {
            name: "A1-2",
            value: "80",
            children: [
              {
                name: ["规模一", "规模二", "规模三"],
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模二",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模四",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模五",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
            ],
          },
          {
            name: "A1-2",
            value: "80",
            children: [
              {
                name: ["规模一", "规模二", "规模三"],
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模二",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模四",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模五",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
            ],
          },
          {
            name: "A1-2",
            value: "80",
            children: [
              {
                name: ["规模一", "规模二", "规模三"],
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模二",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模三",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模四",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
              {
                name: "规模五",
                value: "11",
                children: [
                  { name: "手提包", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                  { name: "手机", value: "12" },
                ],
              },
            ],
          },
        ],
      },
      arr: [
        {
          name: "设备箱",
          location: "w1-1-1-1",
        },
        {
          name: "设备箱",
          location: "w1-1-2-1",
        },
        {
          name: "设备箱",
          location: "w1-1-3-1",
        },
      ],
      row: 1,
      ThirdLayer: 0,
      addWidth: 0,
      rowTotal: 0,
      rowTotal_1: 0,
      count_1: 0,
      isShowHover: false,
      istitle: false,
      hoverstyle: {
        left: 300,
        top: 300,
      },
    };
  },
  mounted() {
    this.queryWarehouse();
  },
  methods: {
    async queryWarehouse() {
      const res = await queryWarehouse();
      if (res.code === "0") {
        this.data = res.data;
        this.canvasTreemap();
      }
    },
    canvasTreemap() {
      this.canvas = document.getElementById("base-echart");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = 1448;
      this.canvas.height = 800;
      // 计算矩形位置和尺寸，并绘制矩形
      this.drawTreemap(0, 0, this.canvas.width, this.canvas.height);
      this.addlistenCanvas();
    },
    //第一层 换行
    lineFeed(count, child, width, height, y) {
      if (this.rowTotal < count) {
        // 绘制文本
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(
          child.name,
          this.rowTotal * width,
          this.row === 1 ? y + 10 : y + height * (this.row - 1) + 11 * this.row
        );
        // 绘制矩形
        this.ctx.strokeStyle = "#fff";
        this.ctx.strokeRect(
          this.rowTotal * width,
          this.row === 1 ? y + 10 : y + 12 * this.row + height * (this.row - 1),
          width,
          height
        );
      } else {
        // 计算第几排
        this.row++;
        this.rowTotal = 0;
        // 绘制文本
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(
          child.name,
          this.rowTotal * width,
          y + height * (this.row - 1) + 11 * this.row
        );
        // 绘制矩形
        this.ctx.strokeStyle = "#fff";
        this.ctx.strokeRect(
          this.rowTotal * width,
          y + 12 * this.row + height * (this.row - 1),
          width,
          height
        );
      }
    },
    // 第二层换行
    secondLayerNewline(child_1, width_1, height_1, height, y) {
      if (this.row !== 1) {
        // 绘制文本
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(
          Array.isArray(child_1.name) ? child_1.name[0] : child_1.name,
          this.addWidth,
          y + height * (this.row - 1) + 11 * (this.row + 1)
        );
        // 绘制矩形
        this.ctx.strokeStyle = "#fff";
        this.ctx.strokeRect(
          this.addWidth,
          y + height * (this.row - 1) + 12 * (this.row + 1),
          width_1,
          height_1
        );
      } else {
        // 绘制文本
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(
          Array.isArray(child_1.name) ? child_1.name[0] : child_1.name,
          this.addWidth,
          y + 11 * 2
        );
        // 绘制矩形
        this.ctx.strokeStyle = "#fff";
        this.ctx.strokeRect(this.addWidth, y + 12 * 2, width_1, height_1);
      }
    },
    // 第三层换行
    thirdLayerNewlines(height, height_2, k, y, width_1) {
      if (this.row !== 1) {
        this.ctx.strokeRect(
          this.addWidth,
          k === 0
            ? y + 12 * (this.row + 1) + height * (this.row - 1)
            : y + 12 * (this.row + 1) + height_2 * k + height * (this.row - 1),
          width_1,
          height_2
        );
      } else {
        this.ctx.strokeRect(
          this.addWidth,
          k === 0 ? y + 12 * 2 : y + 12 * 2 + height_2 * k,
          width_1,
          height_2
        );
      }
    },
    drawTreemap(x, y, w, h) {
      // 遍历子节点嵌套

      for (var i = 0; i < this.data.children.length; i++) {
        // 计算子节点的大小
        var child = this.data.children[i];
        // var width = w / this.data.children.length;
        // var height = h / this.data.children.length;
        var width = 200;
        var height = 100;
        // 每排个数
        var count = Math.floor(w / width);
        this.addWidth = 0;
        // 第一层
        this.lineFeed(count, child, width, height, y);

        for (var j = 0; j < child.children.length; j++) {
          var child_1 = child.children[j];
          var width_1 = width / child.children.length;
          var height_1 = height - 12;
          // 加宽
          this.addWidth += j === 0 ? this.rowTotal * width : width_1;
          // 第二层
          this.secondLayerNewline(child_1, width_1, height_1, height, y);

          for (var k = 0; k < child_1.children.length; k++) {
            const child_2 = child_1.children[j];
            var height_2 = height_1 / child_1.children.length;
            // 绘制矩形
            this.ctx.strokeStyle = "#fff";
            this.thirdLayerNewlines(height, height_2, k, y, width_1);
            this.allArcs.push({
              ...child_2,
              startX:
                this.addWidth === 0 ? this.addWidth : this.addWidth - width_1,
              endX: this.addWidth,
              startY:
                k === 0
                  ? y + 12 * (this.row + 1) + height * (this.row - 1)
                  : y +
                    12 * (this.row + 1) +
                    height_2 * (k - 1) +
                    height * (this.row - 1),
              endY:
                y +
                12 * (this.row + 1) +
                height_2 * (k + 1) +
                height * (this.row - 1),
            });
          }
        }
        this.rowTotal++;
      }
    },
    addlistenCanvas() {
      // 事件绑定(这里有一个要注意的，我这里用了bind方法，是为了将“mousedownEvent”方法内的this指向切换到Canvas)
      this.canvas.addEventListener(
        "mousemove",
        this.mousehoverEvent.bind(this)
      );
      // this.canvas.addEventListener(
      //   "touchmove",
      //   this.touchmoveEvent.bind(this)
      // );
      // 点击事件
      // 事件绑定(这里有一个要注意的，我这里用了bind方法，是为了将“mousedownEvent”方法内的this指向切换到Canvas)
      this.canvas.addEventListener("click", this.mouseClickEvent.bind(this));
    },
    // mousehoverEvent(e) {
    //   let _self = this;
    //   let fn = function () {
    //     _self.changeallArcs(e);
    //     _self.drawTreemap();
    //   };
    //   // debounce(fn, 100);
    // },
    changeallArcs(e) {
      const _self = this;
      const x = e.layerX; // 相对于画布的x偏移量
      const y = e.layerY; // 相对于画布的y偏移量
      // 判断点的位置是否在最小长方形图里面
      _self.allArcs.forEach((v) => {
        if (v.startX < x && v.endX > x && v.startY < y && v.endY > y) {
          this.$nextTick(() => {
            this.isShowHover = true;
          });
          _self.hoverstyle = {
            left: x + 10,
            top: y + 5,
          };
        } else {
          this.isShowHover = false;
        }
      });
    },
    mouseClickEvent(e) {
      const x = e.layerX; // 相对于画布的x偏移量
      const y = e.layerY; // 相对于画布的y偏移量
      // 判断点的位置是否在最小长方形图里面
      this.changeallArcs(e);
      // let object = this.allArcs.find((p) => p.hover);
      // this.$message.info(

      // );
    },
  },
};
</script>

<style scoped lang='scss'>
.chart-warpper {
  position: relative;
  .canvashover {
    position: absolute;
    border: 1px solid #fff;
    background-color: #fff;
    // opacity: 0.9;
    box-shadow: 1px 1px 1px 1px 1px;
    padding: 10px;
    border-radius: 5px;
    transition: 1s;
    z-index: 999;
    span {
      padding: 5px 0px;
    }
  }
}
#base-echart {
  background: #000;
}
</style>