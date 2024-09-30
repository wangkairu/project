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
                <!-- <van-field v-model="obj.mesMeterLength" label="左右面" placeholder="请输入左右面" disabled/> -->
            </van-cell-group>
            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.name" label="返库单名称" placeholder="请输入返库单名称" />
                <van-field v-model="form.reason" label="返库原因" placeholder="请输入返库原因" />
                <van-field v-model="form.remark" label="备注" placeholder="请输入备注" />
            </van-cell-group>
            <!-- <van-button round @click="handelClick" class="look" style="margin-top: 20px;"  type="info">查看备货区</van-button> -->
        </div>
        <div class="toolBtn">
            <van-button size="small"  round  type="info" @click="handelConfirm">确认</van-button>
            <van-button size="small"  round  type="default" @click="handelCancel">取消</van-button>
        </div>
        <van-popup v-model="show" position="right" :style="{ height: '100%',width:'80%',position:'reletive' }" >
            <van-search v-model="query.mesCustomerShortName" placeholder="请输入客户简称" @change="handelChange" @clear="handelChange" />
            <!-- <van-field
                v-model="query.warehouseValue"
                is-link
                label="库房"
                placeholder="请选择所在库房"
                @click="warehouse = true"
            /> -->
            <!-- <van-popup v-model="warehouse" position="bottom" :style="{ height: '30%' }" >
                <van-picker
                    title="库房"
                    show-toolbar
                    :columns="options"
                    @confirm="onConfirmWarehouse"
                    @cancel="onCancelWarehouse"
                />
            </van-popup> -->
            <div class="list">
                <van-radio-group v-model="radio" @change="handelChangeCheck">
                <div class="list_item" v-for="(v,ind) in data" :key="ind">
                    <van-radio :name="v.mesNormsName+v.mesCustomerShortName" ></van-radio>
                    <div class="con">
                        <li>客户名称：{{v.mesCustomerShortName}}</li>
                        <li>规格名称：{{v.mesNormsName}}</li>
                        <div class="conItem">
                            <li>轮型：{{v.mesWheelType}}</li>
                            <li>米长：{{v.mesMeterLength }}</li>
                            <!-- <li>左右面：{{v.mesMeterLength }}</li> -->
                        </div>
                    </div>
                </div>
                </van-radio-group>
                <van-pagination v-if="total!==1" style="margin-top: 16px;" v-model="query.page" :page-count="total" :show-page-size="5"  @change="pageChange">
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
                <van-button size="small"  round  type="info" @click="show=false">确认</van-button>
                <van-button size="small"  round  type="default" @click="handelCancelMask">取消</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import {queryDeliverGoodsList,turnBackCreate} from '@/api/return'
import NavBar from '@/components/NavBar'
export default {
    components:{NavBar},
    data(){
        return {
            name:"创建返库单",
            show:false,
            warehouse:false,
            query:{
                // keyWord:"",
                // warehouseCode:"",
                // warehouseValue:"",
                mesCustomerShortName:"",
                size:6,
                page:1,
                status:6
            },
            options:[],
            data:[],
            chosenAddressId:"",
            wareHouse:[],
            total:0,
            obj:{},
            radio:"",
            form:{},
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
        handelChange(){
            this.queryDeliverGoodsTypeList()
        },
        handelCancelMask(){
            this.radio='';
            this.obj={};
            this.show=false
        },
        async handelConfirm(){
            let user=JSON.parse(localStorage.getItem('data')).data.username
            const params={
                deliverGoodsId:this.obj.id,
                ...this.form,
                user:user,
            }
            const res = await turnBackCreate(params)
            if(res.data.code=='0'){
                this.$router.back()
            }
        },
        handelCancel(){
            this.radio='';
            this.obj={};
            this.form={};
            this.$router.back()
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
        // onConfirmWarehouse(val){
        //     this.warehouse=false
        //     this.wareHouse.forEach(v=>{
        //         if(v.value===val){
        //             this.query.warehouseCode= v.key
        //             this.$store.commit("setWarehouse",this.query.warehouseCode)
        //             this.query.warehouseValue=v.value
        //         }
        //     })
        //     this.queryDeliverGoodsTypeList()
        // },
        // onCancelWarehouse(){
        //     this.warehouse=false;
        //     this.query.warehouseCode=''
        //     this.query.warehouseValue=""
        //     this.$store.commit("setWarehouse",this.query.warehouseCode)
        // },
        // async queryEnumList(){
        //     const res = await queryEnumList('WarehouseCodeEnum')
        //     this.options = res.data.data.map((v)=>v.value)
        //     this.query.warehouseValue=this.options[0]
        //     this.query.warehouseCode= res.data.data[0].key
        //     this.$store.commit("setWarehouse",this.query.warehouseCode)
        //     this.wareHouse=res.data.data
        //     this.queryDeliverGoodsTypeList()
        // },
        handleOpen(){
            this.show=true;
            this.queryDeliverGoodsTypeList()
        },
        async queryDeliverGoodsTypeList(){
            const params={
                query:this.query,
                page:this.query.page - 1,
                size:this.query.size,
                
            }
            const res = await queryDeliverGoodsList(params)
            if(res.data.code==='0'){
                this.data = res.data.data.items.map((v)=>{
                    return {
                        ...v,
                        chekced:false,
                    }
                })

                this.total=res.data.data.total
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
    display: flex;
    flex-direction: column;
    .main{
        flex:1;
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
.list{
    width: 100%;
    padding: 8px;
}
.list_item{
    display: flex;
    align-items: center;
    margin-top: 6px;
    padding: 2px 4px;
    border: 1px solid #ccc;
    .con{
        margin-left: 10px;
        width: 250px;
    }
    .conItem{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.btn{
    position: absolute;
    bottom: 10px;
    // display: flex;
    // justify-content: space-between;
    padding: 0 10px;
    ::v-deep .van-button--small{
        width: 3.325rem;
        margin-left: 10px;
    }
}
.toolBtn{

    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    ::v-deep .van-button--small{
        width: 3.325rem;
    }
}
</style>