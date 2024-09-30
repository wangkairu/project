<template>
    <div class="inventory">
        <NavBar  :name="name" class="nav"> </NavBar>
        <div class="con">
            <van-search v-model="value" placeholder="请输入搜索关键词" @input="handelSearch" @clear="handelClear"/>
        </div>
        <div class="list">
            <div class="btn">
                <van-button @click="handelCreate" size="small" type="info">创建移库单</van-button>
                <van-button @click="handelShift" size="small" type="info" style="margin-left: 10px;">开始移库</van-button>
                <van-button size="small" type="info" style="margin-left: 10px;" @click="handelBatchDelete">批量删除</van-button>
            </div>
            <div v-if="data&&data.length>0">
                <div class="item" v-for="(v,ind) in data" :key="ind">
                    <van-checkbox :disabled="v.statusEnum==='已完成'||v.statusEnum==='移库中'" v-model="v.checked" shape="square" @change="handelCheckBox"></van-checkbox>
                    <div class="item_con">
                        <li class="title">
                            <span>{{ v.name }}</span>
                            <span v-show="v.statusEnum==='已完成'" class="status">{{ v.statusEnum }}</span>
                            <span v-show="v.statusEnum==='移库中'" class="Inventory">{{ v.statusEnum }}</span>
                            <span v-show="v.statusEnum==='未开始'" class="noStart">{{ v.statusEnum }}</span>
                        </li>
                        <div class="detail">
                            <li>
                                <span class="text">创建时间&emsp;&nbsp;</span>
                                <span>{{ v.createTime }}</span>
                            </li>
                            <!-- <li>
                                <span class="text">盘点人&emsp;&nbsp;</span>
                                <span>{{ v.name }}</span>
                            </li> -->
                            <li>
                                <span class="text">完成时间&emsp;&nbsp;</span>
                                <span>{{ v.finishedTime }}</span>
                            </li>
                            <li class="view" @click="handelDetails(v)">查看明细</li>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="empty">
                <span>暂无数据</span>
            </div>
        </div>
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
import {Dialog} from 'vant'
import NavBar from '@/components/NavBar'
import {queryMoveList,moveDelete,moveConfirm} from '@/api/shift'
export default {
    components:{
        NavBar
    },
    data(){
        return {
            name:"库内移位",
            value:"",
            query:{
                size:6,
                page:1,
            },
            total:0,
            data:[],
            ids:[],
        }
    },
    mounted(){
        this.queryMoveList()
    },
    methods:{
        async handelShift(){
            if(this.ids.length>0){
                const res = await moveConfirm(this.ids)
                if(res.data.code==='0'){
                    this.queryMoveList()
                }
            }else{
                Dialog.alert({
                    message: '请先选择数据',
                }).then(() => {});
            }
        },
        handelCreate(){
            this.$router.push({
                name:"shiftCreate"
            })
        },
        handelSearch(){
            this.queryMoveList()
        },
        handelClear(){
            this.value =''
            this.queryMoveList()
        },
        handelDetails(v){
            this.$router.push({
                name:"shiftDetails",
            })
            localStorage.setItem("shiftMainCode",JSON.stringify(v))
        },
        handelCheckBox(){
            this.ids=this.data.map((v)=>{
                if(v.checked)
                {
                    return v.id
                }
            })
        },
        async handelBatchDelete(){
            if(this.ids.length>0){
                const res = await moveDelete(this.ids)
                if(res.data.code==='0'){
                    this.queryMoveList()
                }
            }else{
                Dialog.alert({
                    message: '请先选择数据',
                }).then(() => {
                // on close
                });
            }
        },
        async queryMoveList(){
            const params={
                keyWord:this.value,
                ...this.query,
                page:this.query.page-1
            }
            const res = await queryMoveList(params)
            if(res.data.code==='0'){
                this.total=res.data.data.total
                this.data=res.data.data.items.map((v)=>{
                    return {
                        ...v,
                        checked:false,
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
.inventory{
    height: 100%;
    display: flex;
    flex-direction: column;
    .con {
        padding: 2px 12px;
        height: 60px;
        background: #fff;
        h4{
            color: #444;
            // margin-left: 10px;
        }
    }
    .list{
        flex: 1;
        padding: 10px 12px;
        background: #f0f0f0;
        overflow: hidden;
        overflow-y:scroll ;
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
        .item{
            display: flex;
            margin-top: 10px;
            align-items: center;
            .item_con{
                width: 92%;
                height: 150px;
                margin-left: 10px;
                background: #fff;
            }
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 10px;
                border-bottom: 1px solid #eee;
                & .status{
                    display: inline-block;
                    background: #D7F8DF;
                    color: #4A9E5E;
                    padding: 4px;
                }
                & .noStart{
                    padding: 4px;
                    background: #eee;
                    color: #555;
                }
                & .Inventory{
                    padding: 4px;
                    background: #FFE5CF;
                    color:  #F19D4A;
                }
            }
            .detail{
                padding: 12px 14px;
                li{
                    padding: 2px 0;
                    .text{
                        color: #666;
                    }
                }
                .view{
                    margin-top: 10px;
                    color: #1989fa;
                }
            }
        }
    }
}


.pagiation{
    height: 40px;
}
</style>