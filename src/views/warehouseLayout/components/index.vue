<template>
  <div class="wrapper">
    <div id="scroll-container">
      <div id="large-container">
        <div id="container"></div>
      </div>
      <div
        v-show="flag"
        class="mask"
        :style="{
          left: '0px',
          top: '0px',
          transform: `translate(${hoverstyle.left}px, ${hoverstyle.top}px)`,
        }"
      >
        <span>{{ this.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Konva from 'konva'
import { getWarehouseShowGroupByRule } from '@/api/location'
export default {
  name: "EastWarehouse",
  props: {
    eastAreaList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      data: {},
      area: [],
      width: 20,
      height: 15,
      stage: null,
      layer: null,
      color: '',
      flag: false,
      title: "",
      hoverstyle: {
        left: 300,
        top: 300,
      },
    }
  },
  mounted() {
    for (let key in this.eastAreaList) {
      this.area.push(key)
    }
    // this.init()
    // this.getWarehouseShowGroupByRule()
  },
  watch: {
    eastAreaList: {
      handler(val) {
        this.init()
      },
      deep: true,
    }
  },
  methods: {
    // async getWarehouseShowGroupByRule() {
    //   const params = {}
    //   const res = await getWarehouseShowGroupByRule(params)
    //   if (res.code === '0') {
    //     this.data = res.data
    //     this.init()
    //   }
    // },
    init() {
      const container = document.getElementById("container")
      this.stage = new Konva.Stage({
        container: 'container',
        width: container.clientWidth,
        height: container.clientHeight,
      });
      this.layer = new Konva.Layer();
      this.stage.on('contextmenu', (e) => {
        e.evt.preventDefault();
        this.flag = false;
      });

      this.stage.on('click', () => {
        this.flag = false;
      });
      for (let key in this.eastAreaList) {
        if (key.includes('A|B')) {
          this.color = 'yellow'
        } else if (key.includes('A|C')) {
          this.color = 'maroon'
        } else if (key.includes('E|B')) {
          this.color = 'lime'
        } else if (key.includes('C|F')) {
          this.color = 'teal'
        } else if (key.includes('D|B')) {
          this.color = 'navy'
        }
        // for (let n = 0; n < this.area.length; n++) {
        //   const simpleText = new Konva.Text({
        //     x: 15,
        //     y: 15,
        //     text: key,
        //     fontSize: 20,
        //     fontFamily: 'Calibri',
        //     fill: 'black'
        //   });
        //   this.layer.add(simpleText);
        // }
        this.area = this.eastAreaList[key]
        for (let i = 0; i < this.area.length; i++) {
          const row = this.area[i].rowIndex
          const col = this.area[i].colIndex
          const rect1 = new Konva.Rect({
            x: this.width * (col - 1),
            y: this.height * (row - 1),
            width: 20,
            height: 15,
            strokeWidth: 1,
            fill: this.color
          });
          rect1.on('click', (e) => {
            this.flag = true;
            this.title = this.area[i].alias
            this.hoverstyle.left = e.evt.layerX + 10
            this.hoverstyle.top = e.evt.layerY + 10
            // this.$router.push({
            //   name: 'warehouseAreaDetail', params: {
            //     area: this.area,
            //     key: key,
            //   }
            // })
            // const params = {
            //   area: this.area,
            //   key: key,
            // }
            // localStorage.setItem('area', JSON.stringify(params))
            // this.$router.push('/warehouseAreaDetail')
          });
          // rect1.on('mousemove', () => {
          // });
          this.layer.add(rect1);
        }
      }
      this.layer.draw();
      this.stage.add(this.layer);
    }
  }
}
</script>


<style scoped lang='scss'>
.wrapper {
  width: 100%;
  // height: 100%;
  #scroll-container {
    width: calc(100% - 22px);
    height: calc(100% - 31px);
    overflow: auto;
    margin: 10px;
    border: 1px solid grey;
    position: relative;
  }
  #large-container {
    width: 3275px;
    height: 800px;
    overflow: hidden;
  }
  #container {
    width: 100%;
    height: 100%;
  }
  .mask {
    background: #fff;
    position: absolute;
    padding: 8px 10px;
    // width: 100px;
    // height: 50px;
    box-shadow: 1px 1px 5px #aaa;
    // & {
    //   display: flex;
    //   flex-direction: column;
    //   // align-items: center;
    // }
    // & li {
    //   padding: 4px 8px;
    // }
    // & li:hover {
    //   background: #f0f0f0;
    // }
  }
}
</style>