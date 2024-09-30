<template>
    <div class="detail">
        <NavBar :name="name" class="nav"></NavBar>
        <div class="con">
           <div class="conItem" v-for="(v,ind) in data" :key="ind">
                <li>
                    <span>状态：{{v.statusEnum}}</span>
                </li>
                <li>
                    <span>AGV任务编号：{{v.taskId}}</span>
                </li>
                <li>
                    <span>车号：{{v.vehicleName}}</span>
                </li>
                <li>
                    <span>MES箱号：{{v.mesBoxNo}}</span>
                </li>
                <li>
                    <span>MES箱号二维码：{{v.mesBoxNumberQrCode}}</span>
                </li>
                <li>
                    <span>MES规格名称：{{v.mesNormsName}}</span>
                </li>
                <li>
                    <span>MES客户名称：{{v.mesCustomerShortName}}</span>
                </li>
                <li>
                    <span>MES轮型：{{v.mesWheelType}}</span>
                </li>
                <li>
                    <span>MES米长：{{v.mesMeterLength}}</span>
                </li>
                <li>
                    <span>MES左右面：{{v.mesLeftRightSidesEnum}}</span>
                </li>
                <li>
                    <span>MES入库时间：{{v.wmsWarehousingTime}}</span>
                </li>
                <li>
                    <span>备注：{{v.remark}}</span>
                </li>
           </div>
        </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar'
import {queryDeliverGoodsDetailList} from '@/api/coupon'
export default {
    name:"detail",
    components:{NavBar},
    data(){
        return {
            name:"详情",
            mainCode:"",
            data:[],
        }
    },
    mounted(){
        this.mainCode = this.$route.params.id
        localStorage.setItem('mainCode',this.mainCode)
        this.queryDeliverGoodsDetailList()
    },
    methods:{
        async queryDeliverGoodsDetailList(){
            const id = localStorage.getItem('mainCode')
            const res = await queryDeliverGoodsDetailList(id)
            if(res.data.code === '0'){
                this.data=res.data.data
            }
        }
    }
    
}
</script>

<style scoped lang="less">
.detail{
    width: 100%;
    height: 100%;
    // background: #eee;
    .con{
     padding: 8px 8px;
    .conItem{
        // background: #ccc;
        border:1px solid #ccc;
        margin-bottom: 8px;
        li{
            padding: 8px;
        }
        li:not(:last-child){
            border-bottom: 1px solid #ccc;
        }
    }
}
}

</style>