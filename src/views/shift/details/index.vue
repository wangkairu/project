<template>
    <div class="inventoryDetails">
        <NavBar  :name="name" class="nav"> </NavBar> 
        <div class="header">
            <!-- <li>
                <span class="text">盘点单主表编号&emsp;</span>
                <span>{{ mainCode.code }}</span>
            </li> -->
            <li>
                <span class="text">移库名称&emsp;</span>
                <span>{{ mainCode.name }}</span>
            </li>
            <li>
                <span class="text">移库单创建时间&emsp;</span>
                <span>{{ mainCode.createTime }}</span>
            </li>
            <li>
                <span class="text">备注&emsp;</span>
                <span>{{ mainCode.remark?mainCode.remark:"无" }}</span>
            </li>
        </div>
        <div class="main">
            <div class="con" v-if="data.length>0">
                <div class="item" v-for="(v,ind) in data" :key="ind">
                    <h4>{{ v.mesCustomerShortName }}</h4>
                    <div class="item_con">
                        <van-row type="flex" justify="space-around">
                            <van-col span="10"> <li> 
                                        <span>轮型&emsp;</span>
                                        <span>{{ v.mesWheelType }}</span>
                                    </li></van-col>
                            <van-col span="10">      
                                <li>
                                    <span>米长&emsp;</span>
                                    <span>{{ v.mesMeterLength }}</span>
                                </li>
                            </van-col>
                         
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10" > 
                                <li> 
                                    <span>左右面&emsp;</span>
                                    <span>{{ v.mesLeftRightSides ===0?'左':'右'}}</span>
                                </li>
                            </van-col>
                            <van-col span="10">     
                                <li>
                                    <span>托盘&emsp;</span>
                                    <span>{{ v.mesTray }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10" > 
                                <li> 
                                    <span>特殊要求&emsp;</span>
                                    <span>{{ v.mesSpecialRequirements }}</span>
                                </li>
                            </van-col>
                            <van-col span="10">     
                                <li>
                                    <span>规格代码&emsp;</span>
                                    <span>{{ v.mesNormsNo }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10">      
                                <li>
                                    <span>箱号&emsp;</span>
                                    <span >{{ v.mesBoxNo }}</span>
                                </li>
                            </van-col>
                            <van-col span="10">      
                                <li>
                                    <span>状态&emsp;</span>
                                    <span>{{ v.statusEnum }}</span>
                                </li>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="item_con">
                        <van-row style="margin-top: 2px;">
                            <van-col span="20" offset="1">      
                                <li>
                                    <span>规格简称&emsp;</span>
                                    <span>{{ v.mesNormsName }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>客户简称&emsp;</span>
                                    <span>{{ v.mesCustomerShortName }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>箱号二维码&emsp;</span>
                                    <span>{{ v.mesBoxNumberQrCode }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1">      
                                <li>
                                    <span>移库前库位编号&emsp;</span>
                                    <span>{{ v.warehouseCodeBefore }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>移库后库位编号&emsp;</span>
                                    <span>{{ v.warehouseCodeAfter }}</span>
                                </li>
                            </van-col>
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>移库完成时间&emsp;</span>
                                    <span>{{ v.finishedTime }}</span>
                                </li>
                            </van-col>
                        </van-row>
                    </div> 
                </div>
            </div>
            <div v-else class="empty">
                <!-- <van-empty description="暂无数据" /> -->
                <span>暂无数据</span>
            </div>
        </div>
        <div class="btn">
            <van-button @click="handelClose" style="width: 90%;" size="small" type="info">返回</van-button>
            <!-- <van-button @click="handelClose" style="width: 40%;" size="small" type="default">取消</van-button> -->
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {queryMoveDetailList,editCheckPlanDetail} from '@/api/shift'
import moment from 'moment'
export default {
    name:"inventoryDetails",
    components:{
        NavBar
    },
    data(){
        return {
            name:"库内移位明细",
            mainCode:null,
            data:[],
            userInfo:{},
        }
    },
    mounted(){
        this.mainCode=JSON.parse(localStorage.getItem("shiftMainCode"));
        this.queryMoveDetailList()
    },
    methods:{
        handelClose(){
            this.$router.go(-1)
        },
        async queryMoveDetailList(){
            const res = await queryMoveDetailList(this.mainCode.code)
            if(res.data.code==='0'){
                this.data=res.data.data.map((v)=>{
                    return {
                        ...v,
                        mesSpecialRequirements:v.mesSpecialRequirements?v.mesSpecialRequirements:'无',
                        finishedTime:v.finishedTime?moment(v.finishedTime).format('YYYY-MM-DD'):'暂未完成',
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
.inventoryDetails{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #eee;
    .header{
        background: #fff;
        padding: 6px 12px;
        li{
            margin-top: 6px;
            .text{
                color: #666;
            }
        }
    }
    .main{
        flex: 1;
        overflow: hidden;
        overflow-y: scroll;
        padding: 10px;
    
        .con{
            margin-top: 6px;
            .item{
                margin-top: 10px;
                background: #fff;
                h4{
                    padding: 6px 8px;
                    background: #ccc;
                }
                .item_con{
                    background: #fff;
                    border-bottom: 1px solid #ccc;
                    padding: 6px 0;
                    ul{
                        display: flex;
                        // justify-content: space-between;
                        padding: 2px 10px;
                    }
                    li{
                        margin-top: 4px;
                    }
                    ul li:not(:first-child){
                        margin-left: 15px;
                    }
                }
                .button{
                    padding: 5px 0;
                    display: flex;
                    justify-content: space-between;
                }
                .edit{
                    color: #1989fa;
                    padding: 4px 14px;
                    // float:right;
                }
            }
        }
        .empty {
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            color: #ccc;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .btn{
        height: 50px;
        // line-height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        
    }
}
</style>