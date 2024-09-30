<template>
    <div class="create">
        <NavBar  :name="name" class="nav"> </NavBar> 
        <div class="main">
            <div class="con">
                <div class="header">
                    <van-field  
                        @clear="obj.name = ''" 
                        clearable 
                        v-model="obj.name" 
                        label="移库名称" 
                        placeholder="请输入移库名称" 
                    />
                    <van-field  
                        @clear="obj.vehicle = ''" 
                        clearable 
                        v-model="obj.vehicle" 
                        label="车辆" 
                        placeholder="请输入车辆" 
                    />
                    <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="warehouse"
                        label="移库库房"
                        placeholder="点击选择移库库房"
                        @click="handelWarehouse"
                    />
                    <van-popup v-model="showWarehouse" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="WarehouseArr"
                            @confirm="onConfirmWarehouse($event)"
                            @cancel="showWarehouse = false"
                        />
                    </van-popup>
                    <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="onlyCodeValue"
                        label="移库区域"
                        placeholder="点击选择移库区域"
                        @click="handelOnlyCode($event)"
                    />
                    <van-popup v-model="showOnlyCode" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="onlyCodeOptions"
                            @confirm="onConfirmOnlyCode($event)"
                            @cancel="showOnlyCode = false"
                        />
                    </van-popup>
                    <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="startColumn"
                        label="移库起始列"
                        placeholder="点击选择移库起始列"
                        @click="handelStartColumn"
                    />
                    <van-popup v-model="showStartColumn" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="startColumnOptions"
                            @confirm="onConfirmStartColums($event)"
                            @cancel="showStartColumn = false"
                        />
                    </van-popup>
                    <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="endColumn"
                        label="移库终点列"
                        placeholder="点击选择移库终点列"
                        @click="handelEndColumn($event)"
                    />
                    <van-popup v-model="showEndColumn" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="endColumnOptions"
                            @confirm="onConfirmShowEndColumn($event)"
                            @cancel="showEndColumn = false"
                        />
                    </van-popup>
                    <van-field  
                        @clear="count = ''" 
                        clearable 
                        v-model="count" 
                        label="移库数量" 
                        placeholder="请输入移库数量" 
                    /> 
                </div>
                <div class="list">
                    <h4>移库货物列表</h4>
                    <div v-if="data.length>0">
                        <div class="listItem" v-for="(v,ind) in data" :key="ind">
                            <van-row >
                                <van-col span="20" offset="1">      
                                    <li>
                                        <span>箱号&emsp;</span>
                                        <span>{{ v.mesBoxNo }}</span>
                                    </li>
                                </van-col>
                                <van-col span="20" offset="1" style="margin-top: 2px;"> 
                                    <li> 
                                        <span>箱号二维码&emsp;</span>
                                        <span>{{ v.mesBoxNumberQrCode }}</span>
                                    </li>
                                </van-col>
                                <van-col span="20" offset="1" style="margin-top: 2px;">      
                                    <li>
                                        <span>客户简称&emsp;</span>
                                        <span>{{ v.mesCustomerShortName }}</span>
                                    </li>
                                </van-col>
                                <van-col span="20" offset="1" style="margin-top: 2px;">      
                                    <li>
                                        <span>规格简称&emsp;</span>
                                        <span>{{ v.mesNormsName }}</span>
                                    </li>
                                </van-col>
                            </van-row>
                            <van-row type="flex" justify="space-around">
                                <van-col span="10" style="margin-top: 2px;"> 
                                    <li> 
                                        <span>左右面&emsp;</span>
                                        <span>{{ v.mesLeftRightSidesName }}</span>
                                    </li>
                                </van-col>
                                <van-col span="10" style="margin-top: 2px;">      
                                    <li>
                                        <span>米长&emsp;</span>
                                        <span>{{ v.mesMeterLength }}</span>
                                    </li>
                                </van-col>
                            
                            </van-row>
                            <van-row type="flex" justify="space-around" >
                                <van-col span="10" style="margin-top: 2px;"> 
                                    <li> 
                                        <span>轮型&emsp;</span>
                                        <span>{{ v.mesWheelType }}</span>
                                    </li>
                                </van-col>
                                <van-col span="10" style="margin-top: 2px;">
                                    <li>
                                        <span>状态&emsp;</span>
                                        <span>{{ v.wmsStatusName }}</span>
                                    </li>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                    <div v-else class="empty" style="height: 190px;">
                        暂无数据
                        <!-- <van-empty description="暂无数据" style="height: 190px;" /> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="btn">
            <van-button @click="handelConfrim" style="width: 40%;" size="small" type="info">保存</van-button>
            <van-button @click="handelClose" style="width: 40%;" size="small" type="default">取消</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {queryEnumList,getMoveAreaInfo,getMoveColStartInfo,getMoveColTargetInfo,getSelectColGoodsInfo,moveCreate} from '@/api/shift'
export default{
    name:"inventoryCreate",
    components:{
        NavBar
    },
    data(){
        return {
            name:"创建库内移位",
            obj: {},
            warehouseCode:"",
            warehouse:'',
            WarehouseArr:[],
            warehouseOptions:[],
            showWarehouse:false,
            onlyCodeValue:"",
            onlyCodeOptions:[],
            showOnlyCode:false,
            startColumn:"",
            startColumnCode:"",
            startColumnOptions:[],
            startColumnArr:[],
            showStartColumn:false,
            endColumn:"",
            endColumnCode:"",
            endColumnOptions:[],
            endColumnArr:[],
            showEndColumn:false,
            count:"",
            data:[],
        }
    },
    mounted(){},
    methods:{
        async queryEnumList(){
            const res = await queryEnumList('WarehouseCodeEnum')
            if(res.data.code=='0'){
              this.warehouseOptions= res.data.data
              this.WarehouseArr = res.data.data.map((v)=>v.value)
            }
        },
        onConfirmWarehouse(e){
            this.warehouseOptions.forEach((v)=>{
                if(v.value===e){
                    this.warehouse=e
                    this.warehouseCode=v.key
                    // this.onlyCodeValue = ''
                }
            })
            this.showWarehouse = false
        },
        handelWarehouse(){
            this.queryEnumList()
            this.showWarehouse = true
        },
        async handelOnlyCode(){
            const res = await getMoveAreaInfo(this.warehouseCode)
            if(res.data.code==='0'){
                this.onlyCodeOptions = res.data.data
            }
            this.showOnlyCode = true
        },
        onConfirmOnlyCode(e){
            this.onlyCodeValue = e
            this.showOnlyCode = false
        },
        async handelStartColumn(){
            const params={
                area:this.onlyCodeValue,
                warehouseCode:this.warehouseCode
            }
            const res = await getMoveColStartInfo(params)
            this.startColumnArr = res.data.data
            this.startColumnOptions = res.data.data.map((v)=>v.colIndexAlias+`可移库数量${v.total - v.used}`)
            this.showStartColumn = true
        },
        onConfirmStartColums(e){
            let arr = e.replace("可移库数量", ",").split(',')
            this.startColumn = arr[0]
            this.startColumnArr.map((v)=>{
                if(this.startColumn===v.colIndexAlias){
                    this.startColumnCode = v.onlyCode
                }
            })
            this.showStartColumn = false
            this.getSelectColGoodsInfo()
        },
        async getSelectColGoodsInfo(){
            const params={
                warehouseCode:this.warehouseCode,
                onlyCode:this.startColumnCode
            }
            const res = await getSelectColGoodsInfo(params)   
            if(res.data.code==='0'){
                this.data = res.data.data
            }
        },
        async handelEndColumn(){
            const params={
                warehouseCode:this.warehouseCode,
                onlyCode:this.startColumnCode
            }
            const res = await getMoveColTargetInfo(params)
            if(res.data.code==='0'){
                this.endColumnArr = res.data.data
                this.endColumnOptions = res.data.data.map((v)=>v.colIndexAlias+`可移库数量${v.total - v.used}`)
            }
            this.showEndColumn = true
        },
        onConfirmShowEndColumn(e){
            let arr = e.replace("可移库数量", ",").split(',')
            this.endColumn = arr[0]
            this.endColumnArr.map((v)=>{
                if(this.endColumn===v.colIndexAlias){
                    this.endColumnCode = v.onlyCode
                }
            })
            this.showEndColumn = false
        },
        handelClose(){
            this.$router.go(-1)
        },
        async handelConfrim(){
            const params={
                moveStart: {
                    count: this.count,
                    onlyCode: this.startColumnCode,
                    warehouseCode: this.warehouseCode
                },
                moveTarget: {
                    count: this.count,
                    onlyCode: this.endColumnCode,
                    warehouseCode:this.warehouseCode
                },
                ...this.obj,
            }
            const res = await moveCreate(params)
            if(res.data.code==='0'){
                this.$router.go(-1)
            }
        },
    }
}
</script>

<style lang="less" scoped>
.create{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f1f1f1;
    .main{
        flex: 1;
        padding: 10px;
        overflow: hidden;
        overflow-y: scroll;
        // background: #fff;
        .con{
            // background: #fff;
            .list{
                margin-top: 10px;
                h4{
                    padding: 10px;
                    background: #fff;
                }
                .empty{
                    color: #ccc;
                    // height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .listItem{
                padding: 10px ;
                margin-top: 10px;
                background: #fff;
            }
        }
    }
    .btn{
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #eee;
    }
}
</style>