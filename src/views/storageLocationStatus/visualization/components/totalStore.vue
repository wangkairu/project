<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-08 23:18:47
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-23 19:33:28
 * @FilePath: \wms-client\src\view\index\Store.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="chart-warpper" id="label" ref="label">
    <canvas ref="warehouse" id="threeworld" style="width: 100%; height: 760px">
      <!-- <div class="menuTool">
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="left"></svg-icon>
          </div>
          <div>左移</div>
        </li>
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="right"></svg-icon>
          </div>
          <div>右移</div>
        </li>
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="top"></svg-icon>
          </div>
          <div>上移</div>
        </li>
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="bottom"></svg-icon>
          </div>
          <div>下移</div>
        </li>
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="hebing"></svg-icon>
          </div>
          <div>合并</div>
        </li>
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="suo"></svg-icon>
          </div>
          <div>锁定</div>
        </li>
        <li class="menuToolItem">
          <div class="iconfont">
            <svg-icon class="icon" icon-class="key"></svg-icon>
          </div>
          <div>解锁</div>
        </li>
      </div> -->
    </canvas>
    <canvas
      ref="warehouse_1"
      id="threeworld_1"
      style="width: 100%; height: 760px; display: none"
    ></canvas>
  </div>
</template>

<script>
import { queryWarehouse } from "@/api/location";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {
      mesh: null,
      renderer: "",
      scene: "",
      camera: null,
      controls: null,
      boxes: [
        {
          name: "东库",
          goods: [
            {
              name: "库区1",
              goods: [
                {
                  name: "库区列1-1",
                  goods: [
                    {
                      name: "货物1-1",
                      goods: [{ name: "货物1-1-1-2" }],
                    },
                    {
                      name: "货物2-1",
                      goods: [{ name: "货物1-1-2-2" }],
                    },
                    {
                      name: "货物3-1",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                  ],
                },
                {
                  name: "库区列1-2",
                  goods: [
                    {
                      name: "货物1",
                      goods: [
                        {
                          name: "货物1-1-3-2",
                        },
                      ],
                    },
                    {
                      name: "货物2",
                      goods: [
                        {
                          name: "货物1-1-3-2",
                        },
                      ],
                    },
                    {
                      name: "货物3",
                      goods: [
                        {
                          name: "货物1-1-3-2",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "库区2",
              goods: [
                {
                  name: "库区列2-1",
                  goods: [
                    {
                      name: "货物1",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                    {
                      name: "货物2",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                    {
                      name: "货物3",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                  ],
                },
                {
                  name: "库区列2-2",
                  goods: [
                    {
                      name: "货物1",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                    {
                      name: "货物2",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                    {
                      name: "货物3",
                      goods: [{ name: "货物1-1-3-2" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "西库",
        },
      ],
      raycaster: null,
      mouse: null,
      indoorScene: null,
      indoorRenderer: null,
      indoorCamera: null,
      indoorControls: null,
      width: null,
      height: null,
      name: "",
      showLabel: false,
      timer: null,
    };
  },
  mounted() {
    this.queryWarehouse();
    this.initScene();
    this.initScene1();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    async queryWarehouse() {
      const res = await queryWarehouse();
      console.log(res, "res");
    },
    initScene() {
      // 创建场景、相机和渲染器
      this.scene = new THREE.Scene();
      this.handelCamera();
      this.handelRenderer();
      // // 添加光源
      const light = new THREE.AmbientLight(0x444444, 3);
      this.scene.add(light);
      this.addElements();
      this.animate();
      this.handelControls();
    },
    initScene1() {
      // 添加第二个场景
      this.indoorScene = new THREE.Scene();
      this.indoorCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.indoorCamera.position.z = 5;
      this.indoorCamera.position.set(0, 2000, 3000); //设置相机位置*
      this.indoorCamera.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向（指向场景对象）*
      this.indoorScene.add(this.indoorCamera);
      this.indoorRenderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("threeworld_1"),
      });
      this.indoorRenderer.setSize(this.width, this.height);
      this.indoorRenderer.setClearColor(0x4682b4, 1.0);
      // 添加控制器
      const controls = new OrbitControls(
        this.indoorCamera,
        this.indoorRenderer.domElement
      );
      controls.target.set(0, 0, 0); // 设置控制器目标点
      controls.enableDamping = true;
      // 视角最小距离
      controls.minDistance = 100;
      // 视角最远距离
      controls.maxDistance = 5000;
      // 最大角度
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.update(); // 更新控制器
      this.indoorControls = controls;

      // 添加地板
      const floorLoader = new THREE.TextureLoader();
      floorLoader.load(require("../../../../assets/floor3.png"), (texture) => {
        texture.wraps = texture.wrapT = THREE.RepeatWrapping;
        const floorGeometry = new THREE.BoxGeometry(2600, 1400, 1);
        const floorMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.position.x = Math.PI / 2;
        // floor.name = "地板";
        this.indoorScene.add(floor);
      });

      this.animate1();
    },
    handelCreateBox() {
      // 添加货物
      for (let i = 0; i < this.boxes.length; i++) {
        if (this.boxes[i].name === this.name) {
          var children = this.boxes[i].goods;
        }
      }
      // 几个库区
      for (let j = 0; j < children.length; j++) {
        const goods = children[j].goods;
        // 库区有几列
        for (let k = 0; k < goods.length; k++) {
          const goods1 = goods[k].goods;
          //行
          for (let n = 0; n < goods1.length; n++) {
            const goods2 = goods1[n].goods;
            // 层
            const layer = 1;
            this.handelBox(layer, j, k, n, goods1[n].name);
            if (goods2.length > 0) {
              for (let m = 0; m < goods2.length; m++) {
                const goods3 = goods2[m];
                const layer1 = 2;
                this.handelBox(layer1, j, k, n, goods3.name);
              }
            }
          }
        }
      }
      this.indoorRenderer.domElement.addEventListener(
        "click",
        this.handelClickHtml
      );
    },
    handelBox(layer, j, k, n, name) {
      const interval = 2;
      const boxLoader = new THREE.TextureLoader();
      boxLoader.load(require("../../../../assets/box.png"), (texture) => {
        texture.wraps = texture.wrapT = THREE.RepeatWrapping;
        const boxGeometry = new THREE.BoxGeometry(100, 100, 50);
        const boxMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.y = 700 - 50 - n * 100;
        box.position.x = -1300 + 50 + k * 100 * (j * interval + 1);
        box.position.z = 50 * layer;
        box.name = name;
        this.indoorScene.add(box);
      });
    },
    handelCamera() {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.camera.position.z = 5;
      this.camera.position.set(0, 2000, 3000); //设置相机位置*
      this.camera.aspect =
        this.$refs.warehouse.clientWidth / this.$refs.warehouse.clientHeight;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向（指向场景对象）*
      this.scene.add(this.camera);
    },
    handelRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("threeworld"),
      });
      this.width = this.$refs.warehouse.clientWidth;
      this.height = this.$refs.warehouse.clientHeight;
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0x4682b4, 1.0);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    animate1() {
      requestAnimationFrame(this.animate1);
      this.indoorRenderer.render(this.indoorScene, this.indoorCamera);
    },
    handelControls() {
      // 初始化OrbitControls（需安装和导入相应模块）
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 0, 0); // 设置控制器目标点
      controls.enableDamping = true;
      // 视角最小距离
      controls.minDistance = 100;
      // 视角最远距离
      controls.maxDistance = 5000;
      // 最大角度
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.update(); // 更新控制器
      this.controls = controls;
    },
    addElements() {
      // // 添加地板
      const floorLoader = new THREE.TextureLoader();
      floorLoader.load(require("../../../../assets/floor3.png"), (texture) => {
        texture.wraps = texture.wrapT = THREE.RepeatWrapping;
        const floorGeometry = new THREE.BoxGeometry(2600, 1400, 1);
        const floorMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.position.x = Math.PI / 2;
        floor.name = "厂";
        this.scene.add(floor);
      });
      // 添加房子
      this.createHouse();
    },
    createHouse() {
      for (let i = 0; i < this.boxes.length; i++) {
        const houseLoader = new THREE.TextureLoader();
        houseLoader.load(require("../../../../assets/house.png"), (texture) => {
          const houseGeometry = new THREE.BoxGeometry(500, 400, 500);
          const houseMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
          });
          const house = new THREE.Mesh(houseGeometry, houseMaterial);
          house.position.y = 0;
          house.position.z = 260;
          house.position.x = i * 500 + i * 100;
          house.name = this.boxes[i].name;
          this.scene.add(house);
        });
      }
      // 进入室内
      this.renderer.domElement.addEventListener("click", this.onMouseClick);
    },
    onMouseClick(event) {
      const intersects_1 = this.getIntersects(event);
      var newArr = [];
      var arr = [];
      intersects_1.forEach((key, index) => {
        if (!newArr.includes(key.object.name)) {
          newArr.push(key.object.name);
          arr.push(key);
        }
      });
      if (intersects_1.length !== 0) {
        // 找到第一个不等于空的模型
        for (let item of arr) {
          // this.action.paused = true; //停止旋转
          if (item.object.name == "东库") {
            this.name = item.object.name;
            this.changeScene(); //改变页面场景
          } else if (item.object.name == "西库") {
            this.name = item.object.name;
            this.changeScene(); //改变页面场景
          }
        }
      }
    },
    getIntersects(event) {
      event.preventDefault();
      var raycaster = new THREE.Raycaster(); //生成射线
      var mouse = new THREE.Vector2();
      var container = this.$refs.label;
      let getBoundingClientRect = container.getBoundingClientRect();
      mouse.x =
        ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) *
          2 -
        1;
      mouse.y =
        -(
          (event.clientY - getBoundingClientRect.top) /
          container.offsetHeight
        ) *
          2 +
        1;
      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, this.camera);
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      const intersects = raycaster.intersectObjects(this.scene.children);
      //返回选中的对象
      return intersects;
    },
    // 创建点击标签
    handelClickHtml(event) {
      event.preventDefault();
      var raycaster = new THREE.Raycaster(); //生成射线
      var mouse = new THREE.Vector2();
      var container = this.$refs.label;
      let getBoundingClientRect = container.getBoundingClientRect();
      mouse.x =
        ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) *
          2 -
        1;
      mouse.y =
        -(
          (event.clientY - getBoundingClientRect.top) /
          container.offsetHeight
        ) *
          2 +
        1;
      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, this.indoorCamera);
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      const intersects = raycaster.intersectObjects(this.indoorScene.children);
      if (intersects.length > 0) {
        // 获取物体坐标
        const object = intersects[0].object;
        const position = object.position.clone().project(this.indoorCamera);
        const x = ((position.x + 1) / 2) * this.width;
        const y = ((-position.y + 1) / 2) * this.height;
        this.showLabel = true;
        const label = document.createElement("div");
        label.className = "label";
        label.style.position = "absolute";
        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
        label.style.background = "#fff";
        label.style.padding = "5px";
        label.textContent = intersects[0].object.name;
        this.$refs.label.appendChild(label);
      }
    },
    changeScene() {
      document.getElementById("threeworld").style.display = "none";
      document.getElementById("threeworld_1").style.display = "block";
      this.handelCreateBox();
      this.indoorRenderer.render(this.indoorScene, this.indoorCamera);
    },
    onWindowResize() {
      // 调整相机和渲染器尺寸
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  .menuTool {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    left: 50%;
    bottom: 0;
    width: 280px;
    height: 55px;
    padding: 5px 0;
    border-radius: 10px;
    background: #fff;
    .menuToolItem {
      display: flex;
      flex-direction: column;
    }
    .iconfont {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: #ccc;
      .icon {
        margin: 7px;
      }
      margin-bottom: 5px;
    }
    li {
      list-style: none;
    }
  }
}
</style>

