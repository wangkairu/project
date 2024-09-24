<template>
    <div class="wrapper">
        <div id="container"></div>
        <div id="westContainer"></div>
        <div id="small"></div>
        <div id="eastSouth"></div>
    </div>
</template>

<script>
import Konva from 'konva'
import {getWarehouseShow} from '@/api/location'
export default {
    name:"warehouseScreen",
    data(){
        return {
            westAreaList:[],
            westArea:[],
            smallAreaList:[],
            samll:null,
            smallStage:null,
            smallLayer:null,
            samllImage:null,
            smallImg:null,
            eastSouthAreaList:[],
            eastSouthStage:null,
            eastSouthLayer:null,
            eastSouthImage:null,
            eastSouthImg:null,
            rect1:null,
            image:null,
            imageObj:null,
            wStage:null,
            container:null,
            westContainer:null,
            layerWest:null,
            layer:null,
            stage:null,
            wImage:null,
            wImg:null,
            width:20,
            height:15,
        }
    },
    mounted(){
        this.getWarehouseShow()
        this.getWarehouseShowWest()
        this.smallGetWarehouseShow()
        this.eastSouthGetWarehouseShow()
    },
    methods:{
        async eastSouthGetWarehouseShow(){
            const params = {
                areaCode: "E",
                warehouseCodeList: ["warehouse-D-EAST"]
            }
            const res = await getWarehouseShow(params)
            if (res.code === '0') {
                this.eastSouthAreaList = res.data
                this.eastSouthInit()
            }
        },
        eastSouthInit(){
            this.eastSouth = document.getElementById("eastSouth")
            this.eastSouthStage = new Konva.Stage({
                container: 'eastSouth',
                width: this.eastSouth.clientWidth,
                height: this.eastSouth.clientHeight,
                // draggable: true,
            });
            this.eastSouthLayer = new Konva.Layer();
            this.eastSouthStage.add(this.eastSouthLayer);
            this.eastSouthStage.on('contextmenu', (e) => {
                e.evt.preventDefault();
            });
            // this.group = new Konva.Group({
            //   x: 0,
            //   y: 0,
            //   draggable: true,
            //   dragBoundFunc: function(pos) {
            //       return {
            //         x: pos.x,
            //         y: this.absolutePosition().y
            //       };
            //   }
            // })
            this.eastSouthImage = new Image();
            this.eastSouthImage.onload = () => {
                this.eastSouthImg = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: this.eastSouthImage,
                    width: 4110,
                    height: 890,
                });
                // add the shape to the layer
                // this.group.add(this.image)
                this.eastSouthLayer.add(this.eastSouthImg);
                for (let i = 0; i < this.eastSouthAreaList.length; i++) {
                const row = this.eastSouthAreaList[i]
                const rowText = new Konva.Text({
                    x: 50+ 20 * i + (i * 12),
                    y:-155+ 20 + (20 * 8),
                    text: i+1,
                    fontSize: 18,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width: 50,
                    align: 'center'
                });
                this.eastSouthLayer.add(rowText);
                // this.group.add(rowText)
                for (let j = 0; j < row.length; j++) {
                    const smallRect = row[j]
                    const colText = new Konva.Text({
                    x: 26,
                    y:46+ 18 * j + (j * 2),
                    text: j+1,
                    fontSize: 18,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width: 20,
                    align: 'center'
                    });
                    this.eastSouthLayer.add(colText);
                    let rect1 = null;
                    if (smallRect.e === 0) {
                    rect1 = new Konva.Rect({
                        x: 30 + this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        stroke: '#999',
                        dash: [2, 2],
                        name:`${smallRect.x}-${smallRect.y}`
                    });
                    }else if(smallRect.e === -1||smallRect.e === -2){
                    continue
                    }
                    if (smallRect.c === 1) {
                    rect1 = new Konva.Rect({
                        x: 30 + this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        fill: 'yellow'
                    });
                    } else if (smallRect.c === 2) {
                    rect1 = new Konva.Rect({
                        x: 30 + this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        fill: 'green'
                    });
                    } else if(smallRect.c === 0&&smallRect.e !== 0){
                    rect1 = new Konva.Rect({
                        x: 30+ this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        stroke: 'block',
                    });
                    }
                    this.eastSouthLayer.add(rect1);
                }
                }
            };
            this.eastSouthImage.src = require('@/assets/group2.png');
            this.eastSouthStage.draw();
            if(this.eastSouth.clientWidth>=1611){
                this.eastSouthLayer.scaleX(1 - 0.60);
                this.eastSouthLayer.scaleY(1 - 0.25);
                this.eastSouthLayer.position({ x: -1, y: 0 });
                this.eastSouthStage.position({ x: 0, y: 95 })
            }else if(1083>=this.eastSouth.clientWidth<1611){
                this.eastSouthLayer.scaleX(1 - 0.868);
                this.eastSouthLayer.scaleY(1 - 0.79);
                this.eastSouthLayer.position({ x: 1, y: 0 });
                this.eastSouthStage.position({ x: 0, y: 20 })
            }
        },
        async smallGetWarehouseShow(){
            const params = {
                areaCode:"B",
                warehouseCodeList: ['WAREHOUSE-D-EAST']
            }
            const res = await getWarehouseShow(params)
            if (res.code === '0') {
                this.smallAreaList = res.data
                this.smallInit()
            }
        },
        smallInit(){
            this.small = document.getElementById("small")
            this.smallStage = new Konva.Stage({
                container: 'small',
                width:this.small.clientWidth,
                height:this.small.clientHeight,
            });
            this.smallLayer = new Konva.Layer();
            this.smallStage.add(this.smallLayer);
            this.smallStage.on('contextmenu', (e) => {
                e.evt.preventDefault();
            });
            this.samllImage = new Image();
            this.samllImage.onload = () => {
            this.smallImg = new Konva.Image({
                x: 0,
                y: 0,
                image: this.samllImage,
                width: 1000,
                height: 450,
            });
            // add the shape to the layer
            this.smallLayer.add(this.smallImg);

            for (let i = 0; i < this.smallAreaList.length; i++) {
                const row = this.smallAreaList[i]
                const rowText = new Konva.Text({
                    x:25+ 20 * i + (i * 8),
                    y:20,
                    text: i+1,
                    fontSize: 18,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width: 20,
                    align: 'center'
                });
                this.smallLayer.add(rowText);
                for (let j = 0; j < row.length; j++) {
                const colText = new Konva.Text({
                    x:0,
                    y:50+15*j+(j*10),
                    text: j+1,
                    fontSize: 15,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width:20,
                    align: 'center'
                });
                this.smallLayer.add(colText);
                const smallRect = row[j]
                if (smallRect.e === 0) {
                    this.rect1 = new Konva.Rect({
                        x:this.width * smallRect.x + (smallRect.x * 8),
                        y:25+ this.height * smallRect.y + (smallRect.y * 10),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        stroke: '#999',
                        dash: [2, 2],
                        name:`${smallRect.x}-${smallRect.y}`
                    });
                }else if(smallRect.e === -1||smallRect.e === -2){
                    continue
                }
                if (smallRect.c === 1) {
                    this.rect1 = new Konva.Rect({
                        x:0+ this.width * smallRect.x + (smallRect.x * 8),
                        y:25+ this.height * smallRect.y + (smallRect.y * 10),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        fill: 'yellow',
                        name:`${smallRect.x}-${smallRect.y}`
                    });
                } else if (smallRect.c === 2) {
                    this.rect1 = new Konva.Rect({
                        x:0+ this.width * smallRect.x + (smallRect.x * 8),
                        y:25+ this.height * smallRect.y + (smallRect.y * 10),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        fill: 'green',
                        name:`${smallRect.x}-${smallRect.y}`
                    });
                } else if(smallRect.c === 0&&smallRect.e !== 0){
                    this.rect1 = new Konva.Rect({
                        x:0+this.width * smallRect.x + (smallRect.x * 8),
                        y:25+ this.height * smallRect.y + (smallRect.y * 10),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        stroke: "block",
                        name:`${smallRect.x}-${smallRect.y}`
                    });
                }
                    this.smallLayer.add(this.rect1);
                }
            }
            };
            this.samllImage.src = require('@/assets/group.png');
            this.smallStage.draw();
            if(this.small.clientWidth>=1611){
                this.smallLayer.scaleX(1 - 0.6230);
                this.smallLayer.scaleY(1 - 0.25);
                this.smallLayer.position({ x: -1, y: 0 });
                this.smallStage.position({ x: 0, y: 95 })
            }else if(1083>=this.small.clientWidth<1611){
                this.smallLayer.scaleX(1 - 0.49);
                this.smallLayer.scaleY(1 - 0.60);
                this.smallLayer.position({ x: 0, y: 0 });
                this.smallStage.position({ x: 0, y: 20 })
            }
        },
        async getWarehouseShow() {
            const params = {
                warehouseCodeList: ['WAREHOUSE-D-EAST'],
                areaCode:'A',
            }
            const res = await getWarehouseShow(params)
            if (res.code === '0') {
                this.westAreaList = res.data
                this.init()
            }
        },
        async getWarehouseShowWest(){
            const params = {
                warehouseCodeList: ['WAREHOUSE-D-WEST'],
                areaCode:"A"
            }
            const res = await getWarehouseShow(params)
            if (res.code === '0') {
                this.westArea = res.data
                this.westInit()
            }
        },
        westInit(){
            this.westContainer = document.getElementById("westContainer")
            this.stage = new Konva.Stage({
                container: 'westContainer',
                width: this.westContainer.clientWidth,
                height: this.westContainer.clientHeight,
            });
            this.layerWest = new Konva.Layer();
            this.stage.add(this.layerWest);
            this.stage.on('contextmenu', (e) => {
                e.evt.preventDefault();
            });
            this.wImage = new Image();
            this.wImage.onload = () => {
                this.wImg = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: this.wImage,
                    width: 4280,
                    height: 862,
                });
                // add the shape to the layer
                // this.group.add(this.image)
                this.layerWest.add(this.wImg);
                for (let i = 0; i < this.westArea.length; i++) {
                const row = this.westArea[i]
                const rowText = new Konva.Text({
                    x: 50+ 20 * i + (i * 12),
                    y:-155+ 20 + (20 * 8),
                    text: i+1,
                    fontSize: 18,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width: 50,
                    align: 'center'
                });
                this.layerWest.add(rowText);
                for (let j = 0; j < row.length; j++) {
                    const smallRect = row[j]
                    const colText = new Konva.Text({
                    x: 26,
                    y:46+ 18 * j + (j * 2),
                    text: j+1,
                    fontSize: 18,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width: 20,
                    align: 'center'
                    });
                    this.layerWest.add(colText);
                    let rect1 = null;
                    if (smallRect.e === 0) {
                    rect1 = new Konva.Rect({
                        x: 30 + this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        stroke: '#999',
                        dash: [2, 2],
                        name:`${smallRect.x}-${smallRect.y}`
                    });
                    }else if(smallRect.e === -1||smallRect.e === -2){
                    continue
                    }
                    if (smallRect.c === 1) {
                    rect1 = new Konva.Rect({
                        x: 30 + this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        fill: 'yellow'
                    });
                    } else if (smallRect.c === 2) {
                    rect1 = new Konva.Rect({
                        x: 30 + this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        fill: 'green'
                    });
                    } else if(smallRect.c === 0&&smallRect.e !== 0){
                    rect1 = new Konva.Rect({
                        x: 30+ this.width * smallRect.x + (smallRect.x * 12),
                        y: 25 + this.height * smallRect.y + (smallRect.y * 5),
                        width: 20,
                        height: 15,
                        strokeWidth: 1,
                        stroke: 'block',
                    });
                    }
                    this.layerWest.add(rect1);
                }
                }
            };
            this.wImage.src = require('@/assets/group2.png');
             this.stage.draw();
            if(this.westContainer.clientWidth>=1611){
                this.layerWest.scaleX(1 - 0.6230);
                this.layerWest.scaleY(1 - 0.25);
                this.layerWest.position({ x: -1, y: 0 });
                this.stage.position({ x: 0, y: 95 })
            }else if(1083>=this.westContainer.clientWidth<1611){
                this.layerWest.scaleX(1 - 0.873);
                this.layerWest.scaleY(1 - 0.773);
                this.layerWest.position({ x: 1, y: 0 });
                this.stage.position({ x: 0, y: 20 })
            }
        },
        init() {
            this.container = document.getElementById("container")
            this.wStage = new Konva.Stage({
                container: 'container',
                width: this.container.clientWidth,
                height: this.container.clientHeight,
                // draggable: true,
            });
            this.layer = new Konva.Layer();
            this.wStage.add(this.layer);
            this.wStage.on('contextmenu', (e) => {
                e.evt.preventDefault();
            });
            this.imageObj = new Image();
            this.imageObj.onload = () => {
                this.image = new Konva.Image({
                x: 0,
                y: 0,
                image: this.imageObj,
                width: 1535,
                height: 860,
                });
                // add the shape to the layer
                this.layer.add(this.image);
                for (let i = 0; i < this.westAreaList.length; i++) {
                const row = this.westAreaList[i]
                const rowText = new Konva.Text({
                    x: 35+ 20 * i + (i * 8),
                    y:-165+ 20 + (20 * 8),
                    text: i+1,
                    fontSize: 18,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    width: 20,
                    align: 'center'
                });
                    this.layer.add(rowText);
                    for (let j = 0; j < row.length; j++) {
                        const colText = new Konva.Text({
                        x: 10,
                        y:37+ 15* j+(j*6),
                        text: j+1,
                        fontSize: 15,
                        fontFamily: 'Calibri',
                        fill: 'green',
                        width:20,
                        align: 'center'
                        });
                        this.layer.add(colText);
                        const smallRect = row[j]
                        if (smallRect.e === 0) {
                        this.rect1 = new Konva.Rect({
                            x: 8+ this.width * smallRect.x + (smallRect.x * 8),
                            y: 15 + this.height * smallRect.y + (smallRect.y * 6),
                            width: 20,
                            height: 15,
                            strokeWidth: 1,
                            stroke: '#999',
                            dash: [2, 2],
                            name:`${smallRect.x}-${smallRect.y}`
                        });
                        }else if(smallRect.e === -1||smallRect.e === -2){
                        continue
                        }else if (smallRect.c === 1) {
                        this.rect1 = new Konva.Rect({
                            x: 8+ this.width * smallRect.x + (smallRect.x * 8),
                            y: 15 + this.height * smallRect.y + (smallRect.y * 6),
                            width: 20,
                            height: 15,
                            strokeWidth: 1,
                            fill: 'yellow',
                            name:`${smallRect.x}-${smallRect.y}`
                        });
                        } else if (smallRect.c === 2) {
                        this.rect1 = new Konva.Rect({
                            x: 8 + this.width * smallRect.x + (smallRect.x * 8),
                            y: 15+ this.height * smallRect.y + (smallRect.y * 6),
                            width: 20,
                            height: 15,
                            strokeWidth: 1,
                            fill: 'green',
                            name:`${smallRect.x}-${smallRect.y}`
                        });
                        } else if(smallRect.c === 0&&smallRect.e!==0){
                        this.rect1 = new Konva.Rect({
                            x:8+ this.width * smallRect.x + (smallRect.x * 8),
                            y: 15 + this.height * smallRect.y + (smallRect.y * 6),
                            width: 20,
                            height: 15,
                            strokeWidth: 1,
                            stroke: "block",
                            name:`${smallRect.x}-${smallRect.y}`
                        });
                        }
                        this.layer.add(this.rect1);
                    }
                }
            };
                this.imageObj.src = require('@/assets/group.png');
                if(this.container.clientWidth>=1611){
                    this.layer.scaleX(1 - 0.60)
                    this.layer.scaleY(1 - 0.65)
                    this.layer.position({ x: 0, y: 0 });
                    this.wStage.position({ x: 70, y: 90 })
                }else if(1083>=this.container.clientWidth<1611){
                    this.layer.scaleX(1 - 0.67);
                    this.layer.scaleY(1 - 0.78);
                    this.layer.position({ x: 0, y: 0 });
                    this.wStage.position({ x: 4, y: 20 })
                }
                this.wStage.draw();
            },
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    #container {
       width: 780px;
       height: 340px;
    }
    #westContainer{
        width: 820px;
        height: 340px;
    }
    #small{
        width: 780px;
        height: 340px;
    }
    #eastSouth{
        width: 820px;
        height: 340px;
    }
}
  
</style>