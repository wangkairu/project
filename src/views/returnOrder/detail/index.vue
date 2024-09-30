<template>
    <div class="detail">
        <NavBar :name="name" class="nav"></NavBar>
        <div class="con">
           <div class="conItem" v-for="(v,ind) in data" :key="ind">
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
                <!-- <li>
                    <span>特殊要求：{{v.deliverNetWeight}}</span>
                </li> -->
                <li>
                    <span>备货订单时间：{{v.readyStartTime}}</span>
                </li>
                <li>
                    <span>备货完成时间：{{v.readyFinishTime}}</span>
                </li>
                <li>
                    <span>备货区编号：{{v.documentInputBox1}}</span>
                </li>
                <li>
                    <span>起点库位编号：{{v.documentInputBox2}}</span>
                </li>
                <li>
                    <span>终点库位编号{{v.planBoxCountLeft}}</span>
                </li>
                <li>
                    <span>返库开始时间：{{v.backStartTime}}</span>
                </li>
                <li>
                    <span>返库完成时间：{{v.backFinishTime}}</span>
                </li>
                <li>
                    <span>WMS发货类型：{{v.wmsDeliverTypeEnum}}</span>
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
import {queryTurnBackDetailList} from '@/api/return'
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
        // localStorage.setItem('mainCode',this.mainCode)
        this.queryDeliverGoodsDetailList()
    },
    methods:{
        async queryDeliverGoodsDetailList(){
            // const id = localStorage.getItem('mainCode')
            const res = await queryTurnBackDetailList(this.mainCode)
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