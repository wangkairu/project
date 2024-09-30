<template>
    <div class="cargo">
        <NavBar :name="name" class="nav"></NavBar>
        <div class="con">
            <van-field
            clearable
            ref="field"
            v-model="query.mesBoxNumberQrCode"
            label="二维码"
            placeholder="请扫描二维码"
            @clear="obj = null"
        />
        <van-field
            v-model="query.warehouseValue"
            is-link
            label="库房"
            placeholder="请选择所在库房"
            @click="warehouse = true"
            />
            <van-popup v-model="warehouse" position="bottom"  >
                <van-picker
                    title="库房"
                    show-toolbar
                    :columns="data"
                    @confirm="onConfirmWarehouse"
                    @cancel="onCancelWarehouse"
                />
            </van-popup>
            <van-field
            v-model="query.area"
            is-link
            readonly
            label="区域"
            placeholder="请选择所在区域"
            @click="show = true"
            />
            <van-popup v-model="show" position="bottom"  >
                <van-picker
                    title="区域"
                    show-toolbar
                    :columns="query.warehouseValue=='四期-东库'?options:westOptions"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </van-popup>
            <van-field v-model="query.colIndex" label="列" placeholder="请输入列数" />
            <van-field v-model="query.rowIndex" label="行" placeholder="请输入行数" />
            <van-field
            v-model="query.floor"
            is-link
            label="层"
            placeholder="请选择所在层"
            @click="floor = true"
            />
            <van-popup v-model="floor" position="bottom"  >
                <van-picker
                    title="层"
                    show-toolbar
                    :columns="floorOtpions"
                    @confirm="onConfirmFloor"
                    @cancel="onCancelFloor"
                />
            </van-popup>
 
        </div>
        <div class="footer">
            <van-button class="btn" round  type="info" @click="handelClick">货物移位</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {changeLocation,queryEnumList} from '@/api/index'
export default {
    name:"cargo",
    components:{NavBar},
    data(){
        return {
            show:false,
            floor:false,
            warehouse:false,
            name:"货物移位",
            options:[ "A","B","C","D",'E'],
            westOptions:["A","B"],
            floorOtpions:[1,2],
            areaList:{},
            query:{
                area:"",
                colIndex:"",
                floor:"",
                mesBoxNumberQrCode:"",
                rowIndex:"",
                warehouseCode:"",
                warehouseValue:"",
            },
            data:[],
            warehouseOptions:[],
        }
    },
    mounted(){
        this.queryEnumList();
    },
    methods:{
        async handelClick(){
            const params={
                ...this.query
            }
            const res = await changeLocation(params)
            if(res.code==='0'){
                this.query={
                    area:"",
                    colIndex:"",
                    floor:"",
                    mesBoxNumberQrCode:"",
                    rowIndex:"",
                    warehouseCode:"",
                    warehouseValue:"",
                }
            }
        },
        onConfirmWarehouse(val){
            this.warehouse=false
            this.warehouseOptions.forEach(v=>{
                if(v.value===val){
                    this.query.warehouseCode= v.key
                    this.query.warehouseValue=v.value
                }
            })
        },
        onCancelWarehouse(){
            this.warehouse=false;
            this.query.warehouseCode=''
            this.query.warehouseValue=""
        },
        onConfirmFloor(val){
            this.query.floor=val
            this.floor = false
        },
        onCancelFloor(){
            this.query.floor=''
            this.floor = false
        },
        onConfirm(val){
            this.query.area=val
            this.show=false
        },
        onCancel(){
            this.show=false
            this.query.area=""
        },
        async queryEnumList(){
            const res = await queryEnumList('WarehouseCodeEnum')
            if(res.data.code==='0')
            {
                this.warehouseOptions=res.data.data
                this.data= res.data.data.map(v=>v.value)
            }
        },
        // async changeLocation(){
        //     const res = await changeLocation()
        // },
     
    }
}
</script>

<style lang="less" scoped>
.cargo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.con{
    // margin: 10px auto;
    margin-top: 10px;
    padding: 0 8px;
    flex: 1;
    .dropList{
        width: 300px;
        height: 25px;
        border: 1px solid #ccc;
    }
}
.footer{
    height: 50px;
    padding:2px 8px;
    border-top: 1px solid #ccc;
    .btn{
        width: 100%;
    }
}
</style>