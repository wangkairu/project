<template>
    <div class="view">
        <NavBar :name="name" class="nav"></NavBar>
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
        <van-field
            v-model="query.areaCodeVal"
            is-link
            label="空闲备货区"
            placeholder="请选择所在空闲备货区"
            @click="flag = true"
        />
        <van-popup v-model="flag" position="bottom"  >
            <van-picker
                title="空闲备货区"
                show-toolbar
                :columns="dispatchOptions"
                @confirm="onConfirmDispatch"
                @cancel="onCancelDispatch"
            />
        </van-popup>
        <div class="main">
            <van-tabs v-model="active" @click="handelClick">
                <van-tab title="左面" ></van-tab>
                <van-tab title="右面" ></van-tab>
            </van-tabs>
            <leftSide 
                v-show="active===0" 
                :category="category" 
                :warehouseCode="query.warehouseCode"
                @handelEmit="handelEmit"
            ></leftSide>
            <rightSide 
            v-show="active===1" 
            :category="category" 
            :warehouseCode="query.warehouseCode"
            @handelRightEmit="handelRightEmit"
            ></rightSide>
        </div>
        <div class="btn">
            <van-button round @click="handelCreate" class="look"  type="info">确认</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {
    queryEnumList,
    getFreeStockAreaList,
    getStockAreaColInfo,
    createDeliverGoods
} from '@/api/coupon'
import leftSide from './components/leftSide.vue'
import rightSide from './components/rightSide.vue'
import {mapState} from 'vuex'
export default {
    name:"viewCoupon",
    components:{NavBar,leftSide,rightSide},
    data(){
        return{
            name:"备货区列表信息",
            active:"左面",
            warehouse:false,
            flag:false,
            options:[],
            dispatchOptions:[],
            dispatch:[],
            wareHouse:[],
            query:{
                warehouseValue:"",
                warehouseCode:"",
                areaCode:"",
                areaCodeVal:"",
            },
            category:"",
            colOptions:[],
            left:[],
            right:[],
        }
    },
    created(){
        this.category=this.$route.params.category
        this.queryEnumList()
    },
    computed:{
        // ...mapState({ code:state=>state.code}),
        ...mapState({ code:state=>state.wms.warehouse}),
    },
    mounted(){

    },
    methods:{
        handelEmit(val){
            this.left=val
        },
        handelRightEmit(val){
            this.right = val
        },
        async getStockAreaColInfo(){
            const params={
                warehouseCode:this.query.warehouseCode,
                areaCode:this.query.areaCode,
            }
            const res = await getStockAreaColInfo(params)
            if(res.data.code === '0'){
                this.colOptions = res.data.data&&res.data.data.map((v)=>{
                    return v.col
                })
                this.$store.commit("setColOptions",this.colOptions)
            }
        },
        async handelCreate(){
            const params={
                autoAllocate:false,
                leftList:this.left,
                readyAreaCode:this.query.areaCode,
                rightList:this.right,
                readyAreaWarehouseCode:this.query.warehouseCode,
                warehouseCode:this.code,
            }
            const res = await createDeliverGoods(params)
            if(res.data.code === '0'){
                
                this.$router.push('/coupon')
                this.left=[]
                this.query.areaCode=''
                this.right=[]
                this.query.warehouseCode=''
                this.code=''
            }
        },
        handelClick(val){
            this.active=val
        },
        onConfirmDispatch(val){
            this.dispatch.forEach((v)=>{
                if(v.key === val){
                    this.query.areaCode = v.remark
                }
            })
            this.query.areaCodeVal = val
            this.flag = false;
            this.$store.commit('setAreaCode',this.query.areaCode)
            this.getStockAreaColInfo()
        },
        onCancelDispatch(){
            this.query.dispatchVal=''
            this.query.dispatch=''
            this.flag = false
        },
        async getFreeStockAreaList(){
            const res = await getFreeStockAreaList(this.query.warehouseCode)
            if(res.data.code==='0')
            {
                this.dispatchOptions=res.data.data.map((v)=>{return v.key})
                this.dispatch=res.data.data
            }
        },
        onConfirmWarehouse(val){
            this.warehouse=false
            this.query.areaCodeVal=''
            this.query.areaCode=''
            this.wareHouse.forEach(v=>{
                if(v.value===val){
                    this.query.warehouseCode= v.key
                    this.query.warehouseValue=v.value
                    // this.$store.commit("setWarehouseCode",this.query.warehouseCode)
                }
            })
            console.log(this.query.warehouseCode,'this.query.warehouseCode')
            this.$store.commit('setAreaCode',this.query.areaCode)
            this.getFreeStockAreaList()
        },
        onCancelWarehouse(){
            this.warehouse=false;
            this.query.warehouseCode=''
            this.query.warehouseValue=""
        },
        async queryEnumList(){
            const res = await queryEnumList('WarehouseCodeEnum')
            this.options = res.data.data.map((v)=>v.value)
            this.query.warehouseValue=this.options[0]
            this.query.warehouseCode=res.data.data[0].key
            // this.$store.commit("setWarehouseCode",this.query.warehouseCode)
            this.wareHouse=res.data.data
            this.getFreeStockAreaList()
        },
    }
}
</script>

<style lang="less" scoped>
::v-deep .van-tabs__line{
    background: #1989fa;
}
.view{
    width: 100%;
    height: 100%;
    position: relative;
    .main{
        height: 484px;
        overflow: hidden;
        overflow-y: scroll;
        background: #f1f1f1;
    }
}
.btn{
    width: 100%;
    padding: 2px 10px;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #e1e1e1;
    .look{
        width: 100%;
    }
}

</style>