<template>
    <div class="manual">
        <NavBar :name="name" class="nav"> </NavBar>
        <div class="con">
            <van-form >
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
            <van-field v-model="query.mesBoxNumberQrCode" label="MES箱号二维码" placeholder="请输入MES箱号二维码" />
            <van-field v-model="query.mesBoxNo" label="MES箱号" placeholder="请输入MES箱号" />
            <van-field v-model="query.mesNormsName" label="MES规格名称" placeholder="请输入MES规格名称" />
            <van-field v-model="query.mesCustomerShortName" label="MES客户简称" placeholder="请输入MES客户简称" />
            <van-field v-model="query.mesWheelType" label="MES轮型" placeholder="请输入MES轮型" />
            <van-field  v-model="query.mesMeterLength" label="MES米长" placeholder="请输入MES米长" />
            <van-field name="radio" label="MES左右面">
                <template #input>
                    <van-radio-group v-model="query.mesLeftRightSides" direction="horizontal">
                        <van-radio :name="0">左</van-radio>
                        <van-radio :name="1" style="margin-left: 40px;">右</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="radio" label="MES左右面">
                <template #input>
                    <van-radio-group v-model="query.mesLeftRightSides" direction="horizontal">
                        <van-radio name="S">S</van-radio>
                        <van-radio name="M" style="margin-left: 40px;">M</van-radio>
                        <van-radio name="T" style="margin-left: 40px;">T</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            </van-form>
            <!-- <van-field v-model="query.mesLeftRightSides" label="MES左右面" placeholder="请输入MES左右面" /> -->
        </div>
        <div class="footer">
            <van-button class="btn" round  type="info"  @click="handelClick">手动入库</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {handInTask,queryEnumList} from '@/api/index'
import { Toast, Notify } from 'vant';
export default {
    name: "manual",
    components: {
        NavBar
    },
    data()
    {
        return {
            warehouse:false,
            name:"手动入库",
            query:{
                mesBoxNo:"",
                mesBoxNumberQrCode:"",
                mesCustomerShortName:"",
                mesLeftRightSides:"",
                mesMeterLength:"",
                mesNormsName:"",
                mesTray:"",
                mesWheelType:"",
                warehouseCode:""
            },
            data:[],
            warehouseOptions:[],
        }
    },
    mounted(){
        this.queryEnumList();
    },
    methods:{
        // asyncValidator(val){
        //     console.log(val,'val')
        //     return /1\d/.test(val);
        // },
        async handelClick(){
            if(Number(this.query.mesMeterLength)!=NaN){
                const parms={
                    ...this.query,
                    mesMeterLength:Number(this.query.mesMeterLength)
                }
                const res = await handInTask(parms)
                if(res.code==='0'){
                    this.query={
                        mesBoxNo:"",
                        mesBoxNumberQrCode:"",
                        mesCustomerShortName:"",
                        mesLeftRightSides:"",
                        mesMeterLength:"",
                        mesNormsName:"",
                        mesTray:"",
                        mesWheelType:"",
                        warehouseCode:""
                    }
                }
            }else{
                Toast.fail("MES米长为数字,请重新输入");
            }
            
        },
        async queryEnumList(){
            const res = await queryEnumList('WarehouseCodeEnum')
            if(res.data.code==='0')
            {
                this.warehouseOptions=res.data.data
                this.data= res.data.data.map(v=>v.value)
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
    }
}
</script>

<style scoped lang="less">
.manual{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .con{
        flex: 1;
    }
    .footer{
        height: 50px;
        padding:2px 8px;
        border-top: 1px solid #ccc;
        .btn{
            width: 100%;
        }
    }
}
</style>