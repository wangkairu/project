<template>
    <div class="coupon">
        <NavBar :name="name" class="nav"></NavBar>
        <div class="con">
            <div class="footer">
            <!-- <van-button size="small" type="info" @click="checkAll">全选</van-button> -->
                <van-button size="small"  type="info" @click="handelCreate">创建发货单</van-button>
                <van-button size="small"  type="info" @click="handelStartDispatch">开始发货</van-button>
                <!-- <van-button size="small"  type="info" @click="handelReturn">开始返库</van-button> -->
                <van-button size="small"  type="info" @click="handelCancel">发货单取消</van-button>
            </div>
            <!-- <van-checkbox-group v-model="result" ref="checkboxGroup" > -->
            <div class="data" v-if="data&&data.length>0">
                <div class="con-items" v-for="v in data" :key="v.id">
                    <div class="header">
                        <h4>{{v.mesCustomerFullName}}</h4>
                        <span @click="handelClick(v)">{{ v.folder?'收起':"展开" }}</span>
                        <!-- <svg-icon style="color: #1989fa;" class="icons" :icon-class="v.folder?'unfold':'fold'" @click="handelClick(v)" /> -->
                    </div>
                    <div class="detail" v-if="v.folder">
                        <li>客户全称：{{v.mesCustomerFullName}}</li>
                        <li>客户简称：{{v.mesCustomerShortName}}</li>
                        <li>单号：{{v.no}}</li>
                        <li>交货批次：{{v.deliveryBatch}}</li>
                        <li>发货箱数：{{v.deliverBoxNum}}</li>
                        <li>发货毛重：{{v.deliverGrossWeight}}</li>
                        <li>发货净重：{{v.deliverNetWeight}}</li>
                        <li>帘线结构：{{v.mesCordStructure}}</li>
                        <li>米长：{{v.mesMeterLength}}</li>
                        <li>轮型：{{v.mesWheelType}}</li>
                        <li>计划箱数左：{{v.planBoxCountLeft}}</li>
                        <li>计划箱数右：{{v.planBoxCountRight}}</li>
                        <li>每箱减少重量：{{v.reduceWeightPerBox}}</li>
                        <li>备注：{{v.remark}}</li>
                        <li>发货员：{{v.deliveryPerson}}</li>
                    </div>
                    <div class="detail" v-else>
                        <li>客户简称：{{v.mesCustomerShortName}}</li>
                        <li>单号：{{v.no}}</li>
                        <li>交货批次：{{v.deliveryBatch}}</li>
                        <li>发货箱数：{{v.deliverBoxNum}}</li>
                        <li>发货状态：{{ v.statusEnum }}</li>
                    </div>
                    <div class="footer">
                        <van-checkbox v-model="v.checked" @change="handelChange()"></van-checkbox>
                        <van-button type="info" size="small" @click="handelRadioReturn(v)">明细</van-button>
                    </div>
                </div>
            </div>
            <div v-else class="empty">
                <span>暂无数据</span>
            </div>
            <!-- </van-checkbox-group> -->
        </div>

    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {queryDeliverGoodsList,turnBack,cancelDeliverGoods,confirmDeliverGoods} from '@/api/coupon'
export default{
    name:"coupon",
    components:{NavBar},
    data(){
        return{
            name: '备货',
            data:[],
            checked:"",
            result:[],
            ids:[],
        }
    },
    mounted(){
        this.queryDeliverGoodsList()
    },
    methods:{
        handelCreate(){
            this.$router.push({
                name:"createDispatch"
            })
        },
        async handelStartDispatch(){
            const res =await confirmDeliverGoods(this.ids)
            if(res.data.code==='0')
            {
                this.queryDeliverGoodsList()
            }
        },
        async handelCancel(){
            const res = await cancelDeliverGoods(this.ids)
            if(res.data.code==='0')
            {
                this.queryDeliverGoodsList()
            }
        },
        handelClick(val){
            this.$set(val, 'folder', !val.folder)
        },
        checkAll(){
            this.$refs.checkboxGroup.toggleAll(true);
        },
        handelAllChange(val){
            this.checked=val
            // this.checked?checkboxGroup.toggleAll(true):checkboxGroup.toggleAll(false);
        },
        handelChange(){
            let id = [];
            this.data.forEach(v=>{
                if(v.checked===true){
                    id.push(v.id)
                }
            })
            this.ids=id
        },
        //async handelReturn(){
        //    const res = await turnBack(this.ids)
        //    if(res.code==='0')
        //    {
        //        this.queryDeliverGoodsList()
         //   }
       // },
        async handelRadioReturn(v){
            this.$router.push({
                name:"couponDetail",
                params:{
                  id:v.mainCode  
                }
            })
            // const res = await turnBack([v.id])
            // if(res.code==='0')
            // {
            //     this.queryDeliverGoodsList()
            // }
        },
        async queryDeliverGoodsList(){
            const params={
                // status:6,
            }
            const res=await queryDeliverGoodsList(params)
            this.data=res.data.data.items.map((v)=>{
                return {
                    ...v,
                    folder:false,
                    checked:false,
                }
            })
        }
    }
}
</script>


<style lang="less" scoped>
.coupon{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fcfbfb;
   & .con{
        flex: 1;
        overflow-y: scroll;
        padding: 0 10px;
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
        .checked{
            margin-top: 10px;
            background: #fff;
            padding: 6px 6px;
        }
        & .con-items{
            background: #fff;
            margin-top: 8px;
            & h4{
                width: 240px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            & .header{
                padding: 8px;
                display: flex;
                justify-content: space-between;
            }
            li{
                padding:4px 8px;
            }
            & .footer{
                border-top: 1px solid #eee;
                padding: 4px 8px;
                // float: right;
                display: flex;
                justify-content: space-between;
            }
        }
   }
   & .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 10px;
    .btn {
      width: 100%;
    }
  }
}
</style>