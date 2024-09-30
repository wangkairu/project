<template>
    <div class="create">
        <NavBar  :name="name" class="nav"> </NavBar> 
        <div class="main" @click="handelMain">
            <div class="con">
                <div class="header">
                    <van-field  
                        @input="handelInput" 
                        @clear="handelClear" 
                        clearable 
                        v-model="value" 
                        label="盘点人" 
                        placeholder="请输入盘点人" 
                    />
                    <van-field  
                        @clear="handelClearName" 
                        clearable 
                        v-model="obj.name" 
                        label="盘点计划名称" 
                        placeholder="请输入盘点计划名称" 
                    />
                    <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="obj.WareHouse"
                        label="库房编号"
                        placeholder="点击选择库房编号"
                        @click="handelWarehouse"
                    />
                    <van-popup v-model="showPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="Warehouse"
                            @confirm="onConfirmWarehouse"
                            @cancel="showPicker = false"
                        />
                    </van-popup>
                </div>
                <h5>盘点计划集合</h5>
                <div class="group" v-for="(v,ind) in obj.checkPlanList" :key="ind">
                    <li class="group_item">
                        <div class="grou_item_con">
                            <van-field
                                readonly
                                clickable
                                name="picker"
                                :value="v.functionAreaCodeVal"
                                label="区域编号"
                                placeholder="点击选择区域编号"
                                @click="handelFunctionCode(v)"
                            />
                            <van-popup v-model="functionCodeFlag" position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="functionCode"
                                    @confirm="onConfirmFunctionCode(v,$event)"
                                    @cancel="functionCodeFlag = false"
                                />
                            </van-popup>
                            <van-field
                                readonly
                                clickable
                                name="picker"
                                :value="v.colIndexAlias"
                                label="库列编号"
                                placeholder="点击选择库列编号"
                                @click="handelFunctionAreaCode(v)"
                            />
                            <van-popup v-model="functionAreaCodeFlag" position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="columns"
                                    @confirm="onConfirmFunctionAreaCode(v,$event)"
                                    @cancel="functionAreaCodeFlag = false"
                                />
                            </van-popup>
                        </div>
                        <van-button @click="handelDelete(ind)" style="border:1px solid #1989fa;color: #1989fa;height:24px;margin-left: 86%;margin-top: 10px;"  size="small" type="text">删除</van-button>
                    </li>
                    <!-- <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="value"
                        label="功能类型编号"
                        placeholder="点击选择功能类型编号"
                        @click="showPicker = true"
                    />
                    <van-popup v-model="showPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="columns"
                            @confirm="onConfirm"
                            @cancel="showPicker = false"
                        />
                    </van-popup> -->
                </div>
                <van-button @click="handelAdd" style="width: 40%;margin-top: 10px;" size="small" type="info">新增盘点计划集合</van-button>
            </div>
            <div class="mask" v-show="flag">
                <div v-show="options.length===0" class="none">暂无数据</div>
                <div v-show="options.length>0" class="block">
                    <li @click="handelClick(v)" v-for="(v,ind) in options" :key="ind">{{ v.showValue }}</li>
                </div>
            </div>
        </div>
        <div class="btn">
            <van-button @click="handelSave" style="width: 40%;" size="small" type="info">保存</van-button>
            <van-button @click="handelClose" style="width: 40%;" size="small" type="default">取消</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {sysUserGetUserList,queryWarehouseColDropDown,create} from '@/api/inventory'
export default{
    name:"inventoryCreate",
    components:{
        NavBar
    },
    data(){
        return {
            name:"创建盘点计划",
            value:"",
            options:[],
            flag:false,
            showPicker:false,
            functionCodeFlag:false,
            functionAreaCodeFlag:false,
            obj: {
                name: "",
                userName: "",
                workNo: "",
                WareHouse: "",
                WareHouseCode:"",
                checkPlanList: [
                    {
                        WareHouse: "",
                        WareHouseCode:"",
                        areaCode: "",
                        colIndexAlias: "",
                        functionAreaCode: "",
                        functionAreaCodeVal:"",
                        functionCode: "IN",
                        functionType: "IN",
                    },
                ],
            },
            columnsWarehouse:[],
            Warehouse:[],
            columnsFunctionCode:[],
            functionCode:[],
            functionAreaCode:[],
            columnsFunctionAreaCode:[],
            columns:[],
        }
    },
    mounted(){

    },
    methods:{
        handelClose(){
            this.obj={
                name: "",
                userName: "",
                workNo: "",
                WareHouse: "",
                WareHouseCode:"",
                checkPlanList: [
                    {
                        WareHouse: "",
                        WareHouseCode:"",
                        areaCode: "",
                        colIndexAlias: "",
                        functionAreaCode: "",
                        functionAreaCodeVal:"",
                        functionCode: "IN",
                        functionType: "IN",
                    },
                ],
            }
            this.$router.go(-1)
        },
        async handelSave(){
            const params={
                ...this.obj
            }
            const res = await create(params)
            if(res.code=='0'){
                this.$router.go(-1)
            }
        },
        handelAdd(){
            this.obj.checkPlanList.push({
                WareHouse: "",
                WareHouseCode:"",
                areaCode: "",
                colIndexAlias: "",
                functionAreaCode: "",
                functionAreaCodeVal:"",
                functionCode: "IN",
                functionType: "IN",
            })
        },
        handelDelete(ind){
            this.obj.checkPlanList.splice(ind,1)
        },
        async onConfirmFunctionAreaCode(val,e){
            this.columnsFunctionCode.forEach((v)=>{
                if(v.key===e){
                    val.colIndexAlias = e;
                    val.areaCode = v.value;
                }
            })
            this.functionAreaCodeFlag=false
        },
        async handelFunctionAreaCode(v){
            const params={
                warehouseCode:v.WareHouseCode,
                functionAreaCode: v.functionAreaCode,
                functionCode:'IN',
                functionType:"IN",
            }
            const res = await this.queryWarehouseColDropDown(params)
            this.columnsFunctionCode = res
            this.columns=res.map((v)=>v.key) 
            this.functionAreaCodeFlag=true
        },
        async handelFunctionCode(v){
            this.functionCodeFlag = true
            const params={
                warehouseCode:v.WareHouseCode,
                functionCode:'IN',
                functionType:"IN",
            }
            const res = await this.queryWarehouseColDropDown(params)
            this.columnsFunctionCode = res
            this.functionCode=res.map((v)=>v.value) 
        },
        onConfirmFunctionCode(val,warehouse){
            this.columnsFunctionCode.forEach((v)=>{
                if(v.value===warehouse)
                {
                    val.functionAreaCodeVal=v.value;
                    val.functionAreaCode=v.key;
                    val.WareHouse=this.obj.WareHouse;
                    val.WareHouseCode=this.obj.WareHouseCode;
                }
            })
            this.functionCodeFlag = false
        },
        onConfirmWarehouse(warehouse){
            this.columnsWarehouse.forEach((v)=>{
                if(v.value===warehouse)
                {
                    this.obj.WareHouse=v.value
                    this.obj.WareHouseCode=v.key
                }
            })
            this.showPicker = false
        },
        async handelWarehouse(){
            this.showPicker = true
            const res = await this.queryWarehouseColDropDown({})
            this.columnsWarehouse=res
            this.Warehouse=res.map((v)=>v.value)
        },
        async queryWarehouseColDropDown(val){
            const res = await queryWarehouseColDropDown(val)
            if(res.data.code==='0')
            {
               return res.data.data
            }
        },
        handelInput(){
            this.flag=true
            this.sysUserGetUserList()
        },
        async sysUserGetUserList(){
            const params={
                keyWord:this.value
            }
            const res = await sysUserGetUserList(params)
            if(res.data.code==='0'){
                this.options = res.data.data
            }
        },
        handelClear(){
            this.value=''
            this.flag=false
            // this.sysUserGetUserList()
        },
        handelClearName(){
            this.obj.name=''
        },
        handelMain(){
            this.flag=false
        },
        handelClick(v){
            this.value=v.showValue
            this.flag=false
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
        overflow: hidden;
        overflow-y: scroll;
        padding: 10px;
        position: relative;
        .con{
            h5{
                color: #444;
                padding: 10px 8px;
            }
        }
    }
    .mask{
        position: absolute;
        padding: 10px 10px 4px 10px;
        background: #fff;
        left: 100px;
        top: 56px;
        width: 264px;
        .none{
            text-align: center;
            color: #444;
        }
        .block li{
            font-size: 14px;
            padding: 0px 0px 4px 0;
            border-bottom: 1px solid #eee;
        }
    }
    .group_item{
        margin-top: 6px;
        background: #fff;
        padding:0 0 10px 0;
        .grou_item_con{
            border-bottom: 1px solid #ccc;
        }
    }
    .btn{
        height: 50px;
        // line-height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #eee;
    }
}
</style>