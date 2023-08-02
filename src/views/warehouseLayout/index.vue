<template>
  <div class="chart-warpper" id="label" ref="label">
    <!-- <el-input
      size="mini"
      :class="[back ? 'backNo' : 'input']"
      v-model="input"
      placeholder="请输入内容"
    ></el-input> -->
    <el-button
      icon="el-icon-back"
      :class="[back ? 'backNo' : 'backBlack']"
      size="mini"
      @click="handelClickBack"
      >返回</el-button
    >
    <canvas ref="warehouse" id="threeworld" style="width: 100%; height: 760px">
    </canvas>
    <canvas
      ref="warehouse_1"
      id="threeworld_1"
      style="width: 100%; height: 760px; display: none"
    ></canvas>

    <!-- <div
      class="canvashover"
      v-if="isShowHover"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${hoverstyle.left}px, ${hoverstyle.top}px)`,
      }"
    >
      v-for="(item, index) in arr" :key="index"
      <div>
        <ul>
          <span>库位:</span>
          <span>1-2-1</span>
        </ul>
        <ul>
          <span>名称:</span>
          <span>托盘</span>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import { queryWarehouse } from "@/api/location";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
export default {
  data() {
    return {
      input: "",
      mesh: null,
      renderer: "",
      scene: "",
      camera: null,
      controls: null,
      boxes: [],
      raycaster: null,
      mouse: null,
      indoorScene: null,
      indoorRenderer: null,
      indoorCamera: null,
      indoorControls: null,
      width: null,
      height: null,
      name: "",
      back: true,
      count: 0,
      isShowHover: false,
      arr: [],
      hoverstyle: {
        left: 300,
        top: 300,
      },
      house: null,
      row: 0,
      col: 0,
      east: false,
      west: false,
      boxGroup: null,
      area: 0,
      x: 0,
    };
  },
  mounted() {
    this.queryWarehouse();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    handelClickBack() {
      this.arr = [];
      document.getElementById("threeworld").style.display = "block";
      document.getElementById("threeworld_1").style.display = "none";
      this.back = true;
      this.isShowHover = false;
      this.name === "4期东库" ? (this.east = true) : (this.west = true);
    },
    async queryWarehouse() {
      const params = {
        warehouseCodeList: [],
      };
      const res = await queryWarehouse(params);
      if (res.code === "0") {
        this.boxes = res.data;
        this.initScene();
        this.initScene1();
      }
    },
    initScene() {
      // 创建场景、相机和渲染器
      this.scene = new THREE.Scene();
      this.handelCamera();
      this.handelRenderer();
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
      this.indoorCamera.position.set(0, 1000, 2000); //设置相机位置*
      this.indoorCamera.lookAt(0, 0, 0); //设置相机方向（指向场景对象）*
      this.indoorScene.add(this.indoorCamera);
      this.indoorRenderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("threeworld_1"),
        antialias: true,
      });
      this.indoorRenderer.alpha = true;
      this.indoorRenderer.setSize(this.width, this.height);
      this.indoorRenderer.setPixelRatio(window.devicePixelRatio);
      // 添加控制器
      const controls = new OrbitControls(
        this.indoorCamera,
        this.indoorRenderer.domElement
      );
      controls.enableDamping = true;
      // 视角最小距离
      controls.minDistance = 500;
      // 视角最远距离
      controls.maxDistance = 5000;
      // 最大角度
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.update(); // 更新控制器
      this.indoorControls = controls;
      // 添加地面
      const floorGeometry = new THREE.BoxGeometry(2600, 1400, 1);
      floorGeometry.rotateX(-Math.PI / 2);
      const floorMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      this.indoorScene.add(floor);
      // 添加墙壁
      this.handelWall();
      this.animate1();
    },
    handelWall() {
      const shape = new THREE.Shape();
      shape.moveTo(-200, 0);
      shape.lineTo(200, 0);
      shape.lineTo(200, 130);
      shape.lineTo(-200, 130);
      const extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      };
      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshBasicMaterial({ color: 0xe5d890 });
      const backWall = new THREE.Mesh(extrudeGeometry, material);
      backWall.position.y = 0;
      // backWall.position.x = -200;
      // backWall.position.z = -130;
      this.indoorScene.add(backWall);
    },
    // 创建区域，货物
    handelCreateBox() {
      this.boxGroup = new THREE.Group();
      // 几个库区
      for (let j = 0; j < this.arr.length; j++) {
        const goods = this.arr[j].colList;
        const width = this.arr[j].col * 125;
        const height = this.arr[j].row * 133;
        // 库区有几列
        this.area++;
        this.x = this.handelAreaX(this.area, width, 125);
        this.handelArea(this.area, width, height, this.arr[j].areaName);
        for (let k = 0; k < goods.length; k++) {
          const goods1 = goods[k].rowList;
          this.count++;
          //行
          for (let n = 0; n < goods1.length; n++) {
            const goods2 = goods1[n].locationList;
            // 层
            for (let m = 0; m < goods2.length; m++) {
              const goods3 = goods2[m];
              const layer = goods2[m].floor;
              this.handelBox(
                layer,
                n,
                goods3.locationName,
                goods3.isUse,
                goods3.isEnabled,
                k,
                this.x
              );
              this.indoorRenderer.domElement.addEventListener(
                "click",
                this.handelClickHtml
              );
            }
          }
        }
      }
    },

    // 划分区域
    handelArea(area, width, height, areaName) {
      let plane = null;
      const areaLoad = new THREE.TextureLoader();
      areaLoad.load(require("@/assets/plane.png"), (texture) => {
        const geometry = new THREE.BoxGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        plane = new THREE.Mesh(geometry, material);
        plane.position.x = this.handelAreaX(area, width, width);
        plane.position.y = 10;
        plane.position.z = -700 + 200;
        plane.rotation.x = -Math.PI / 2;

        // 创建库区标签
        let pointLabel = this.getCanvas(areaName, "area");
        pointLabel.position.z = 400;
        pointLabel.rotation.x = Math.PI / 2;
        plane.add(pointLabel);
        this.indoorScene.add(plane);
        // this.indoorRenderer.domElement.addEventListener(
        //   "click",
        //   this.handelClickHtml
        // );
      });
    },
    handelAreaX(area, width, itemWidth) {
      if (-1300 + itemWidth / 2 + area * (width + 30) >= 1300) {
        this.area = 1;
        return this.area == 1
          ? -1300 + itemWidth / 2
          : -1300 + itemWidth / 2 + area * (width + 30);
      } else {
        return area == 1
          ? -1300 + itemWidth / 2
          : -1300 + itemWidth / 2 + area * (width + 30);
      }
    },
    handelBox(layer, n, name, use, isEnabled, k, x) {
      const boxLoader = new THREE.TextureLoader();
      boxLoader.load(require("@/assets/box.png"), (texture) => {
        const boxGeometry = new THREE.BoxGeometry(125, 100, 133);
        let cube = null;
        // 创建正方体的几何体和材质
        if (use !== 0 && isEnabled !== 0) {
          const material = new THREE.MeshBasicMaterial({ map: texture });
          cube = new THREE.Mesh(boxGeometry, material);
        } else if (use === 0 && isEnabled !== 0) {
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.01,
          });
          cube = new THREE.Mesh(boxGeometry, material);
          const edges = new THREE.EdgesGeometry(boxGeometry);
          const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
          const wireframe = new THREE.LineSegments(edges, lineMaterial);
          cube.add(wireframe);
        } else if (use !== 0 && isEnabled === 0) {
          const boxMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.01,
          });
          cube = new THREE.Mesh(boxGeometry, boxMaterial);
        }
        cube.position.x = k === 0 ? x : x + k * 125;
        cube.position.y = layer == 1 ? 90 : 95 * layer;
        cube.position.z = -700 + n * 150;
        this.boxGroup.add(cube);
        // 创建画布并绘制文字
        const label = this.getCanvas(name, "box");
        // 调整标签的位置和旋转
        label.position.set(0, 0, 80); // 在立方体的顶部背面放置标签
        cube.add(label);
        this.indoorScene.add(this.boxGroup);
      });
    },
    getTextCanvas(text) {
      var width = 512,
        height = 256;
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.font = 100 + 'px " bold';
      ctx.fillStyle = "#000000";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(text, width / 2, height / 2);
      return canvas;
    },
    handelCamera() {
      const fov = 50; // 视野范围
      const aspect = 1; // 相机默认值 画布的宽高比
      const near = 0.1; // 近平面
      const far = 10000; // 远平面
      // 透视投影相机
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 2000, 2000); //设置相机位置*
      this.camera.aspect =
        document.getElementById("threeworld").clientWidth /
        document.getElementById("threeworld").clientHeight;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(0, 0, 0); //设置相机方向（指向场景对象）*
      this.scene.add(this.camera);
    },
    handelRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("threeworld"),
        antialias: true,
      });
      this.width = this.$refs.warehouse.clientWidth;
      this.height = this.$refs.warehouse.clientHeight;
      this.renderer.setSize(this.width, this.height);
      // this.renderer.setClearColor(0x4682b4, 1.0);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    animate1() {
      TWEEN.update();
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
      // const planeGeometry = new THREE.PlaneGeometry(2000, 1000, 4, 4);
      // planeGeometry.rotateX(-Math.PI / 2);
      // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 });
      // const cubeC = new THREE.Mesh(planeGeometry, planeMaterial);
      // this.scene.add(cubeC);
      let grid = new THREE.GridHelper(2600, 1400, 0xffffff, 0xffffff);
      grid.material.opacity = 0.2;
      grid.material.depthWrite = false;
      grid.material.transparent = true;
      this.scene.add(grid);
      // 添加房子
      this.createHouse_1();
    },
    createHouse_1() {
      this.house = new THREE.Group();
      // 地板
      const loader = new THREE.TextureLoader();
      const texture = loader.load(require("@/assets/floor1.jpg"));
      const planeGeo = new THREE.PlaneGeometry(400, 250);
      planeGeo.rotateX(-Math.PI / 2);
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.position.x = -1000 + 800;
      this.house.add(mesh);
      // // 展示左右墙
      const sideWall = this.wallAdd();
      const sideWall2 = this.wallAdd();
      sideWall.rotation.y = -300;
      sideWall.position.x = -400;
      sideWall2.rotation.y = -300;
      sideWall2.position.x = 0;
      this.house.add(sideWall);
      this.house.add(sideWall2);
      // 展示后墙
      this.rearWall();
      // // 展示前墙
      this.frontWall();
      // // 展示房顶
      const roof1 = this.roof();
      roof1.rotation.x = Math.PI / 2;
      roof1.position.y = 130;
      roof1.position.x = -190;
      this.doorFrame();
      this.house.name = "4期西库";
      this.house.add(roof1);
      this.scene.add(this.house);
      const house1 = this.house.clone();
      house1.position.set(500, 0, 0);
      house1.name = "4期东库";
      this.scene.add(house1);
      const label = this.getCanvas("4期西库", "house");
      const label_1 = this.getCanvas("4期东库", "house");
      this.house.add(label_1);
      label_1.position.set(160, 100, 160);
      // 调整标签的位置和旋转
      label.position.set(-330, 100, 160); // 在立方体的顶部背面放置标签
      this.house.add(label);
      // 进入室内
      this.renderer.domElement.addEventListener("click", this.onMouseClick);
    },
    getCanvas(name, val) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 160;
      canvas.height = 50;
      if (val === "house") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "30px Arial";
        context.fillStyle = "#000000";
      } else if (val === "area") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "24px Arial";
        context.fillStyle = "#000000";
      } else {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "18px Arial";
        context.fillStyle = "#000000";
      }
      context.fillText(name, 5, 35); // 在画布中绘制文字
      // 创建纹理并应用于标签
      const texture1 = new THREE.CanvasTexture(canvas);
      const labelGeometry = new THREE.PlaneGeometry(100, 60); // 标签的尺寸
      const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture1,
        transparent: true,
      });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      return label;
    },
    // 绘制左右墙
    wallAdd() {
      const shape = new THREE.Shape(); // 用Shape类绘制二维形状
      shape.moveTo(-130, 0);
      shape.lineTo(130, 0);
      shape.lineTo(130, 130);
      shape.lineTo(-130, 130);

      const extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      };
      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      var material = new THREE.MeshBasicMaterial({ color: 0xe5d890 });
      const sideWall = new THREE.Mesh(extrudeGeometry, material);
      sideWall.position.z = 1;
      return sideWall;
    },
    // 绘制后墙
    rearWall() {
      const shape = new THREE.Shape();
      shape.moveTo(-200, 0);
      shape.lineTo(200, 0);
      shape.lineTo(200, 130);
      shape.lineTo(-200, 130);
      const extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      };
      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshBasicMaterial({ color: 0xe5d890 });
      const backWall = new THREE.Mesh(extrudeGeometry, material);
      backWall.position.y = 0;
      backWall.position.x = -186;
      backWall.position.z = -130;
      this.house.add(backWall);
    },
    // 绘制前墙
    frontWall() {
      const shape = new THREE.Shape();
      shape.moveTo(-200, 0);
      shape.lineTo(200, 0);
      shape.lineTo(200, 130);
      shape.lineTo(-200, 130);

      const shape_a = new THREE.Path();
      shape_a.moveTo(30, 30);
      shape_a.lineTo(80, 30);
      shape_a.lineTo(80, 80);
      shape_a.lineTo(30, 80);
      shape_a.lineTo(30, 30);
      shape.holes.push(shape_a);

      const shape_b = new THREE.Path();
      shape_b.moveTo(-20, 0);
      shape_b.lineTo(-20, 100);
      shape_b.lineTo(-80, 100);
      shape_b.lineTo(-80, 0);
      shape_b.lineTo(-20, 0);
      shape.holes.push(shape_b);
      const extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      };
      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshBasicMaterial({ color: "grey" });
      const backWall = new THREE.Mesh(extrudeGeometry, material);
      backWall.position.x = -186;
      backWall.position.z = 130;
      this.house.add(backWall);
    },
    // 展示房顶
    roof() {
      const roofGeometry = new THREE.BoxGeometry(400, 300, 10);
      const loader = new THREE.TextureLoader();
      const roofTexture = loader.load(require("@/assets/roof.png"));
      roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
      const textureMaterial = new THREE.MeshBasicMaterial({ map: roofTexture });
      const roof = new THREE.Mesh(roofGeometry, textureMaterial);
      return roof;
    },
    // 门框
    doorFrame() {
      // 门框
      const shape = new THREE.Shape();
      shape.moveTo(-20, 0);
      shape.lineTo(-20, 100);
      shape.lineTo(-80, 100);
      shape.lineTo(-80, 0);
      shape.lineTo(-20, 0);

      const shape_c = new THREE.Path();
      shape_c.moveTo(-25, 5);
      shape_c.lineTo(-25, 95);
      shape_c.lineTo(-75, 95);
      shape_c.lineTo(-75, 5);
      shape_c.lineTo(-25, 5);

      shape.holes.push(shape_c);
      const extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      };
      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshBasicMaterial({ color: "silver" });
      const frame = new THREE.Mesh(extrudeGeometry, material);
      // 门
      const doorGeometry = new THREE.BoxGeometry(50, 90, 4); //门的形状
      const doorTexture = new THREE.TextureLoader().load(
        require("@/assets/door.jpg")
      );
      const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture }); //门的材质
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(-50, 50, 5); // 门相对于group的位移和旋转，开关门动画会用到。
      const group = new THREE.Group(); // 创建Group
      group.add(frame); // 往Group加入门框
      group.add(door); // 往Group加入门板
      group.position.y = 1;
      group.position.z = 130;
      group.position.x = -189;
      this.house.add(group);
    },
    onMouseClick(event) {
      const intersects_1 = this.getIntersects(event);
      if (intersects_1.length !== 0) {
        // 找到第一个不等于空的模型
        if (intersects_1[0].object.parent.name == "4期东库") {
          this.name = "4期东库";
          if (!this.east || this.west) {
            this.count = 0;
            this.indoorScene.remove(this.indoorScene.children[2]);
            for (let i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i].warehouseName === "4期东库") {
                this.arr = this.boxes[i].areaList;
              }
            }
            this.changeScene();
          } else {
            this.back = false;
            document.getElementById("threeworld").style.display = "none";
            document.getElementById("threeworld_1").style.display = "block";
          }
        } else if (intersects_1[0].object.parent.name == "4期西库") {
          this.name = "4期西库";
          if (!this.west || this.east) {
            this.indoorScene.remove(this.indoorScene.children[2]);
            this.count = 0;
            for (let i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i].warehouseName === "4期西库") {
                this.arr = this.boxes[i].areaList;
              }
            }
            this.changeScene(); //改变页面场景
          } else {
            this.back = false;
            document.getElementById("threeworld").style.display = "none";
            document.getElementById("threeworld_1").style.display = "block";
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
    //点击事件
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
        this.hoverstyle.left = x;
        this.hoverstyle.top = y;
        this.isShowHover = true;
        // this.initTween(
        //   intersects[0].object.position.x,
        //   intersects[0].object.position.y,
        //   intersects[0].object.position.z
        // );
        // this.indoorCamera.position
        //   .copy(intersects[0].object.position)
        //   .add(new THREE.Vector3(0, 0, 0));
        // this.isShowHover = true;
      }
    },
    initTween(targetX, targetY, targetZ) {
      // 获取当前相机位置
      let initPosition = {
        x: this.indoorCamera.position.x,
        y: this.indoorCamera.position.y,
        z: this.indoorCamera.position.z,
      };
      //定义相机移动方法
      let tween = new TWEEN.Tween(initPosition).to(
        { x: targetX, y: targetY, z: targetZ },
        2000
      );
      tween.easing(TWEEN.Easing.Sinusoidal.InOut);
      tween.start();
      //格子位置参数
      let onUpdate = (pos) => {
        let x = pos.x;
        let y = pos.y;
        let z = pos.z;
        //z<0为背面格子，z>0为正面格子，并设置相机的位置
        // if (pos.z < 0) {
        this.indoorCamera.position.set(x, y, z);
        // } else {
        //   this.indoorCamera.position.set(x, y, z );
        // }
      };
      //调用相机方法并传入格子位置参数
      tween.onUpdate(onUpdate);
      // tween.start();
      //设置相机target位置（相机看向格子的位置）
      if (targetZ < 0) {
        this.indoorControls.target.set(targetX, targetY - 0.4, -12);
      } else {
        this.indoorControls.target.set(targetX, targetY - 0.4, 12);
      }
    },

    changeScene() {
      document.getElementById("threeworld").style.display = "none";
      document.getElementById("threeworld_1").style.display = "block";
      this.back = false;
      this.handelCreateBox();
      this.indoorRenderer.render(this.indoorScene, this.indoorCamera);
    },
    onWindowResize() {
      // 调整相机和渲染器尺寸
      this.camera.aspect =
        document.getElementById("threeworld").clientWidth /
        document.getElementById("threeworld").clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        document.getElementById("threeworld").clientWidth,
        document.getElementById("threeworld").clientHeight
      );
      // 库房画布
      const div = document.getElementById("threeworld");
      div.style.width = document.getElementById("threeworld").clientWidth;
      div.style.height = document.getElementById("threeworld").clientHeight;
      // 货物画布
      // const canvas = document.getElementById("threeworld_1");
      // canvas.style.width = document.getElementById("threeworld_1").clientWidth;
      // canvas.style.height = document.getElementById("threeworld").clientHeight;
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-warpper {
  position: relative;
  .input {
    position: absolute;
    right: 100px;
    top: 10px;
    width: 200px;
    display: block;
  }
  .backBlack {
    position: absolute;
    right: 10px;
    top: 10px;
    display: block;
  }
  .backNo {
    display: none;
  }
  .canvashover {
    position: absolute;
    border: 1px solid #fff;
    background-color: #fff;
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
    display: block;
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 280px;
    height: 55px;
    padding: 8px 6px;
    border-radius: 10px;
    background-color: rgba($color: #000000, $alpha: 0.2);
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
::v-deep .el-input__inner {
  background-color: transparent !important;
  border: 1px solid #1296db;
}
</style>

