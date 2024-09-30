<template>
    <div class="create">
        <NavBar :name="name" class="nav"></NavBar>
        <div class="main">
            <div class="select">
                <van-button  size="small" type="info" @click="handleOpen">选择发货单货物</van-button>
                <span class="tip">请先点击发货单货物</span>
            </div>
            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="obj.mesNormsName" label="规格简称" placeholder="请输入规格简称" disabled/>
                <van-field v-model="obj.mesCustomerShortName" label="客户简称" placeholder="请输入客户简称" disabled/>
                <van-field v-model="obj.mesWheelType" label="轮型" placeholder="请输入轮型" disabled/>
                <van-field v-model="obj.mesMeterLength" label="米长" placeholder="请输入米长" disabled/>
            </van-cell-group>
            <van-button round @click="handelClick" class="look" style="margin-top: 20px;"  type="info">查看备货区</van-button>
        </div>
        <van-popup v-model="show" position="right" class="mask" :style="{ height: '100%',width:'80%',}" >
            <div class="header">
                <van-search v-model="query.keyWord" placeholder="请输入产品" />
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
                        :columns="options"
                        @confirm="onConfirmWarehouse"
                        @cancel="onCancelWarehouse"
                    />
                </van-popup>
            </div>
            <div class="list">
                <van-radio-group v-model="radio" @change="handelChangeCheck" >
                <div class="list_item" v-for="(v,ind) in data" :key="ind">
                    <van-radio :name="v.mesNormsName+v.mesCustomerShortName" ></van-radio>
                    <div class="con">
                        <li>客户名称：{{v.mesCustomerShortName}}</li>
                        <li>规格名称：{{v.mesNormsName}}</li>
                        <div class="conItem">
                            <li>轮型：{{v.mesWheelType}}</li>
                            <li>米长：{{v.mesMeterLength }}</li>
                        </div>
                    </div>
                </div>
                </van-radio-group>
                <van-pagination v-if="total!==1" style="margin-top: 8px;" v-model="query.page" :page-count="total" :show-page-size="5"  @change="pageChange">
                    <template #prev-text>
                        <van-icon name="arrow-left" />
                    </template>
                    <template #next-text>
                        <van-icon name="arrow" />
                    </template>
                    <template #page="{ text }">{{ text }}</template>
                </van-pagination>
            </div>
            <div class="btn">
                <van-button size="small"  round  type="info" @click="handelConfirm">确认</van-button>
                <van-button size="small"  round  type="default" @click="handelCancel">取消</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import {queryDeliverGoodsTypeList,queryEnumList} from '@/api/coupon'
import NavBar from '@/components/NavBar'
export default {
    components:{NavBar},
    data(){
        return {
            name:"创建发货单",
            show:false,
            warehouse:false,
            query:{
                keyWord:"",
                warehouseCode:"",
                warehouseValue:"",
                size:6,
                page:1,
            },
            options:[],
            data:[],
            chosenAddressId:"",
            wareHouse:[],
            total:0,
            obj:{},
            radio:"",
        }
    },
    watch:{
        radio:{
            handler(val){
                if(!val){
                    this.radio=sessionStorage.getItem('radio')
                }
            }
        },
    },
    mounted(){
       
    },
    methods:{
        handelClick(){
            this.$router.push({
                name:"viewCoupon",
                params:{
                    category:this.obj.category
                }
            })
        },
        handelConfirm(){
            this.show=false
        },
        handelCancel(){
            this.radio='';
            this.obj={};
            this.show=false;
        },
        handelChangeCheck(val){
            sessionStorage.setItem('radio',this.radio)
           this.obj=this.data.find((v)=>{
                if(v.mesNormsName+v.mesCustomerShortName === val){
                    return v
                }
            })
        },
        async pageChange(val){
            this.queryDeliverGoodsTypeList()
        },
        onConfirmWarehouse(val){
            this.warehouse=false
            this.wareHouse.forEach(v=>{
                if(v.value===val){
                    this.query.warehouseCode= v.key
                    this.$store.commit("wms/setWarehouse",this.query.warehouseCode)
                    this.query.warehouseValue=v.value
                }
            })
            this.queryDeliverGoodsTypeList()
        },
        onCancelWarehouse(){
            this.warehouse=false;
            this.query.warehouseCode=''
            this.query.warehouseValue=""
            this.$store.commit("wms/setWarehouse",this.query.warehouseCode)
        },
        async queryEnumList(){
            const res = await queryEnumList('WarehouseCodeEnum')
            this.options = res.data.data.map((v)=>v.value)
            this.query.warehouseValue=this.options[0]
            this.query.warehouseCode= res.data.data[0].key
            await this.$store.commit("wms/setWarehouse",this.query.warehouseCode)
            this.wareHouse=res.data.data
            this.queryDeliverGoodsTypeList()
        },
        handleOpen(){
            this.show=true;
            this.queryEnumList()
        },
        async queryDeliverGoodsTypeList(){
            const params={
                ...this.query,
                page:this.query.page - 1,
            }
            const res = await queryDeliverGoodsTypeList(params)
            if(res.data.code==='0'){
                this.data = res.data.data.items.map((v)=>{
                    return {
                        ...v,
                        chekced:false,
                    }
                })
                this.total=Math.ceil(res.data.data.total / this.query.size)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.create{
    width: 100%;
    height: 100%;
    padding: 8px;
    .main{
        margin-top: 8px;
        .select{
            display: flex;
            align-items: center;
            padding-bottom: 2px;
            border-bottom: 1px solid #ccc;
            .tip{
                color: #666;
                margin-left: 10px;
            }
        }
        .look{
            width: 100%;
        }
    }
}
.div{
    display: flex;
    padding: 0 4px;
}


.mask{
    display: flex;
    flex-direction: column;
    .header{
        height: 90px;
        border-bottom: 1px solid #ccc;
    }
    .list{
        width: 100%;
        padding: 8px;
        flex: 1;
    }
    .list_item{
        display: flex;
        align-items: center;
        margin-top: 6px;
        padding: 2px 2px;
        border: 1px solid #ccc;
        .con{
            margin-left: 8px;
            width: 250px;
        }
        .conItem{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .btn{
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        ::v-deep .van-button--small{
            width: 3.325rem;
            margin-left: 10px;
        }
    }
}

</style>