<template>
    <div class="inventoryDetails">
        <NavBar  :name="name" class="nav"> </NavBar> 
        <div class="header">
            <!-- <li>
                <span class="text">盘点单主表编号&emsp;</span>
                <span>{{ mainCode.code }}</span>
            </li> -->
            <li>
                <span class="text">盘点人&emsp;</span>
                <span>{{ mainCode.checkPlanUser }}</span>
            </li>
            <li>
                <span class="text">盘点单创建时间&emsp;</span>
                <span>{{ mainCode.createTime }}</span>
            </li>
            <li>
                <span class="text">备注&emsp;</span>
                <span>{{ mainCode.remark?mainCode.remark:"无" }}</span>
            </li>
        </div>
        <div class="main">
            <div class="con">
                <div class="item" v-for="(v,ind) in data" :key="ind">
                    <h4 style="display: flex;justify-content: space-between;">
                        {{ v.customerShortName }}
                        <div @click="handelClick(v)" v-show="mainCode.statusEnum==='盘点中'&&!v.flag||mainCode.statusEnum==='未开始'&&!v.flag" class="edit">编辑</div>
                    </h4>
                    <div class="item_con">
                        <van-row type="flex" justify="space-around">
                            <van-col span="10">      
                                <li>
                                    <span>规格简称&emsp;</span>
                                    <span>{{ v.mesNormsName }}</span>
                                </li>
                            </van-col>
                            <van-col span="10"> <li> 
                                        <span>客户简称&emsp;</span>
                                        <span>{{ v.mesWheelType }}</span>
                                    </li></van-col>
                   
                            <!-- <van-col span="8">span: 8</van-col> -->
                        </van-row>
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
                                    <span>{{ v.mesLeftRightSides }}</span>
                                </li>
                            </van-col>
                            <van-col span="10">     
                                <li>
                                    <span>托盘&emsp;</span>
                                    <span>{{ v.mesTray }}</span>
                                </li>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="item_con">
                        <van-row type="flex" justify="space-around">
                            <van-col span="10">      
                                <li style="display: flex;">
                                    <span>盘点箱数&emsp;</span>
                                    <span v-show="v.flag===false">{{ v.checkPlanCount }}</span>
                                    <van-field v-show="v.flag===true" style="width:45%;padding:0 2px;border:1px solid #ddd" v-model="v.checkPlanCount"  placeholder="请输入" />
                                </li>
                            </van-col>
                            <van-col span="10"> 
                                <li> 
                                    <span>功能类型&emsp;</span>
                                    <span>{{ v.functionTypeEnum }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10">      
                                <li>
                                    <span>盘亏数量&emsp;</span>
                                    <span>{{ v.checkPlanLoss }}</span>
                                </li>
                            </van-col>
                            <van-col span="10"> 
                                <li> 
                                    <span>功能类型编号&emsp;</span>
                                    <span>{{ v.functionCode }}</span>
                                </li>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-around">
                            <van-col span="10">      
                                <li>
                                    <span>盘盈数量&emsp;</span>
                                    <span>{{ v.checkPlanProfit }}</span>
                                </li>
                            </van-col>
                            <van-col span="10"> 
                                <li> 
                                    <span>分区编号&emsp;</span>
                                    <span>{{ v.functionAreaCode }}</span>
                                </li>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="item_con">
                        <van-row >
                            <van-col span="20" offset="1">      
                                <li style="display: flex;align-items: center;">
                                    <span>是否完成&emsp;</span>
                                    <span v-show="v.flag===false">{{ v.statusEnum }}</span>
                                    <van-field style="width:70%;padding:2px 6px;border:1px solid #ddd" v-show="v.flag===true"  v-model="v.statusEnum"  placeholder="请输入" />
                                </li>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 2px;">
                            <van-col span="20" offset="1"> 
                                <li> 
                                    <span>盘点完成时间&emsp;</span>
                                    <span>{{ v.checkPlanFinishedTime }}</span>
                                </li>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="button" v-show="v.flag">
                        <div @click="handelSave(v)" v-show="mainCode.statusEnum==='盘点中'&&v.flag||mainCode.statusEnum==='未开始'&&v.flag" class="edit">保存</div>
                        <div @click="handelCancel(v)" v-show="mainCode.statusEnum==='盘点中'&&v.flag||mainCode.statusEnum==='未开始'&&v.flag" class="edit">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn">
            <van-button @click="handelClose" style="width: 40%;" size="small" type="info">确定</van-button>
            <van-button @click="handelClose" style="width: 40%;" size="small" type="default">取消</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {queryCheckPlanDetailList,editCheckPlanDetail} from '@/api/inventory'
import moment from 'moment'
export default {
    name:"inventoryDetails",
    components:{
        NavBar
    },
    data(){
        return {
            name:"盘点明细",
            mainCode:"",
            data:[],
            userInfo:{},
        }
    },
    mounted(){
        this.mainCode=JSON.parse(localStorage.getItem("mainCode"));
        this.userInfo=JSON.parse(localStorage.getItem("data"))
        this.queryCheckPlanDetailList()
        
    },
    methods:{
        handelClose(){
            this.$router.go(-1)
        },
        handelClick(val){
            val.flag=true
            localStorage.setItem('newVal',JSON.stringify(val))
        },
        handelCancel(val){
            val.flag=false;
            val.checkPlanCount=JSON.parse(localStorage.getItem("newVal")).checkPlanCount
            val.statusEnum = JSON.parse(localStorage.getItem("newVal")).statusEnum
        },
        async handelSave(v){
            const params ={
                checkPlanCount: v.checkPlanCount,
                id: v.id,
                status: v.statusEnum==='否'?0:1,
                userName: this.userInfo.data.username,
                workNo: this.userInfo.data.workNo
            }
            const res = await editCheckPlanDetail(params)
            if(res.data.code === '0'){
                this.queryCheckPlanDetailList()
            }
        },
        async queryCheckPlanDetailList(){
            const res = await queryCheckPlanDetailList(this.mainCode.code)
            if(res.data.code==='0'){
                this.data=res.data.data.map((v)=>{
                    return {
                        ...v,
                        checkPlanFinishedTime:v.checkPlanFinishedTime?moment(v.checkPlanFinishedTime).format('YYYY-MM-DD'):'暂未完成',
                        flag:false,
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
                margin-top: 4px;
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