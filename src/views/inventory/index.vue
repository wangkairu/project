<template>
    <div class="inventory">
        <NavBar  :name="name" class="nav"> </NavBar>
        <div class="top">
            <van-cell-group>
                <van-field
                    clearable
                    ref="field"
                    v-model="value"
                    label="二维码"
                    placeholder="请扫描二维码"
                    @change="handelManualPickup"
                    @clear="handelClear"
                />
            </van-cell-group>
        </div>
        <div class="main">
            <div class="con" v-if="data&&data.length>0">
                <div class="item" v-for="(v,ind) in data" :key="ind">
                    <h4 style="display: flex;justify-content: space-between;">
                        {{ v.customerShortName }}
                        <!-- v-show="mainCode.statusEnum==='盘点中'&&!v.flag||mainCode.statusEnum==='未开始'&&!v.flag" -->
                        <div v-show="!v.flag" @click="handelClick(v)"  class="edit">编辑</div>
                        <div class="btn" v-show="v.flag">
                            <div  @click="handelClickSave(v)"  class="edit">保存</div>
                            <div  @click="handelCancelSave(v)"  class="edit">取消</div>
                        </div>
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
                                        <span>{{ v.customerShortName }}</span>
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
                                    <!-- <van-field
                                        v-if="v.flag"
                                        style="width:70%;padding:2px 6px;border:1px solid #ddd"
                                        readonly
                                        clickable
                                        name="picker"
                                        :value="v.statusEnum"
                                        placeholder="点击选择是否完成状态"
                                        @click="show = true"
                                    />
                                    <van-popup v-model="show" position="bottom">
                                        <van-picker
                                            show-toolbar
                                            :columns="columns"
                                            @confirm="onConfirm(v,$event)"
                                            @cancel="onCancel"
                                        />
                                    </van-popup> -->
                                    <span v-show="v.flag===false">{{ v.statusEnum }}</span>
                                    <!-- <van-field  v-show="v.flag===true"  v-model="v.statusEnum"  placeholder="请输入" /> -->
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
                </div>
            </div>
            <div v-else class="empty">
                <span>暂无数据</span>
            </div>
        </div>
        <!-- <div class="list"> -->
            <!-- <div class="btn">
                <van-button @click="handelCreate" size="small" type="info">创建盘点计划</van-button>
                <van-button size="small" type="info" style="margin-left: 10px;" @click="handelBatchDelete">批量删除</van-button>
            </div> -->
            <!-- <div class="item" v-for="(v,ind) in data" :key="ind">
                <van-checkbox :disabled="v.statusEnum==='已完成'||v.statusEnum==='盘点中'" v-model="v.checked" shape="square" @change="handelCheckBox"></van-checkbox>
                <div class="item_con">
                    <li class="title">
                        <span>{{ v.name }}</span>
                        <span v-show="v.statusEnum==='已完成'" class="status">{{ v.statusEnum }}</span>
                        <span v-show="v.statusEnum==='盘点中'" class="Inventory">{{ v.statusEnum }}</span>
                        <span v-show="v.statusEnum==='未开始'" class="noStart">{{ v.statusEnum }}</span>
                    </li>
                    <div class="detail">
                        <li>
                            <span class="text">创建时间&emsp;&nbsp;</span>
                            <span>{{ v.createTime }}</span>
                        </li>
                        <li>
                            <span class="text">盘点人&emsp;&nbsp;</span>
                            <span>{{ v.checkPlanUser }}</span>
                        </li>
                        <li>
                            <span class="text">完成时间&emsp;&nbsp;</span>
                            <span>{{ v.finishedTime }}</span>
                        </li>
                        <li class="view" @click="handelDetails(v)">查看明细</li>
                    </div>
                </div>
                
            </div> -->
        <!-- </div> -->
        <!-- <div class="pagiation">
            <van-pagination v-model="query.page" :total-items="50" :show-page-size="5">
                <template #prev-text>
                    <van-icon name="arrow-left" />
                </template>
                <template #next-text>
                    <van-icon name="arrow" />
                </template>
                <template #page="{ text }">{{ text }}</template>
            </van-pagination>
        </div> -->
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {queryCheckPlanList,editCheckPlanDetail,queryCheckPlanDetailListByQrCode} from '@/api/inventory'
export default {
    components:{
        NavBar
    },
    data(){
        return {
            name:"盘点",
            value:"",
            show:false,
            columns:['是','否'],
            // currentPage:0,
            // query:{
            //     size:6,
            //     page:1,
            // },
            total:0,
            data:[],
            newData:[],
            ids:[],
            userInfo:null,
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.$refs.field.focus();
        });
        this.userInfo=JSON.parse(localStorage.getItem("data"))
    },
    methods:{
        handelClear(){
            this.data = []
            this.value=''
        },
        async handelManualPickup(){
            if(this.value){
                const res = await queryCheckPlanDetailListByQrCode(this.value)
                if(res.data.code==='0'){
                    this.newData=res.data.data
                    this.data=res.data.data&&res.data.data.map((v)=>{
                        return {
                            ...v,
                            flag:false,
                            checkPlanCount:v.checkPlanCount?v.checkPlanCount:0,
                        }
                    })
                }
            }
            
        },
        handelCancelSave(v){
            v.flag=false
            this.newData.forEach((i)=>{
                if(i.id==v.id){
                    v.checkPlanCount=i.checkPlanCount
                    v.statusEnum=i.statusEnum
                    v.status=i.status
                }
            })
        },
        async handelClickSave(v){
            const params ={
                checkPlanCount: v.checkPlanCount,
                id: v.id,
                status: v.status,
                userName: this.userInfo.data.username,
                workNo: this.userInfo.data.workNo
            }
            const res = await editCheckPlanDetail(params)
            if(res.data.code === '0'){
                this.value=''
                v.flag=false
                this.data=[]
                this.handelManualPickup()
            }
        },
        // onConfirm(v,e){
        //     v.statusEnum=e
        //     v.status=e=='是'?1:0
        //     this.show=false
        // },
        // onCancel(){
        //     this.show=false
        // },
        handelClick(v){
            v.flag=true
        },
        handelCheckBox(){
            this.ids=this.data.map((v)=>{
                if(v.checked)
                {
                    return v.id
                }
            })
        },
    }
}
</script>

<style scoped lang="less">
.inventory{
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
        padding: 2px 12px;
        height: 60px;
        background: #fff;
        h4{
            color: #444;
            // margin-left: 10px;
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
                    .btn{
                        display: flex;
                    }
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
   
}


.pagiation{
    height: 40px;
}
</style>