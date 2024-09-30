<template>
    <div class="leftSide">
        <div class="conItem" v-for="(v,ind) in data" :key="ind">
            <van-checkbox v-model="v.checked" @change="handelChecked"></van-checkbox>
            <div class="con">
                <li>
                    <span class="title">库房：{{v.warehouseName}}</span>
                </li>
                <li>
                    <span class="title">区域：{{v.areaCode}}</span>
                </li>
                <li>
                    <span class="title">列：{{v.colIndexAlias}}</span>
                </li>
                <li>
                    <span class="title">客户简称：{{ v.customerShortName }}</span>
                </li>
                <li>
                    <span class="title">规格简称：{{ v.normsShortName }}</span>
                </li>
                <li>
                    <span class="title">轮型：{{ v.wheelType }}</span>
                </li>
                <li>
                    <span class="title">米长：{{ v.meterLength }}</span>
                </li>
                <li>
                    <span class="title">左右面：{{ v.leftRightSides }}</span>
                </li>
                <li>
                    <span class="title">可备货数量：{{ v.used }}</span>
                </li>
                <van-field 
                @input="handelCount(v)"
                v-model="v.count" label="备货数量" placeholder="请输入备货数量" />
                <van-field
                    v-model="v.colIndex"
                    is-link
                    label="备货区每列信息"
                    placeholder="请选择所在备货区每列信息"
                    @click="v.flag=true"
                    @input="handelColInput(v)"
                />
                <van-popup v-model="v.flag" position="bottom"  >
                    <van-picker
                        title="备货区每列信息"
                        show-toolbar
                        :columns="options"
                        @confirm="onConfirmCol(v,$event)"
                        @cancel="onCancelCol(v,$event)"
                    />
                </van-popup>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {queryDeliverGoodsLocationList} from '@/api/coupon'
export default {
    props:{
        category:{
            type:String,
        },
        colOptions:{
            type:Array,
        }
    },
    data(){
        return {
            // flag:false,
            data:[],
            LeftList:[],
        }
    },
    computed:{
        ...mapState({ warehouse:state=>state.wms.warehouse}),
        ...mapState({ options:state=>state.options}),
        ...mapState({ areaCode:state=>state.areaCode})
    },
    mounted(){
      this.queryDeliverGoodsLocationList()
    },
    methods:{
        onConfirmCol(val,e){
            val.flag = false;
            val.colIndex = e;
        },
        onCancelCol(val){
            val.flag = false;
            val.colIndex = '';
        },
        handelColInput(v){
            if(this.LeftList.length===0){
                this.LeftList.push({
                    count:v.count,
                    onlyCode:v.onlyCode,
                    readyArea:{
                        areaCode:this.areaCode,
                        colIndex:v.colIndex,
                        warehouseCode:this.warehouse,
                    }
                })
            }else{
                this.LeftList.forEach((item)=>{
                    if(item.onlyCode === v.onlyCode){
                        item.count=v.count,
                        item.onlyCode=v.onlyCode,
                        item.readyArea={
                            areaCode:this.areaCode,
                            colIndex:v.colIndex,
                            warehouseCode:this.warehouse,
                        }
                    }
                })
            }
            // this.$emit("handelRightEmit",this.LeftList)
        },
        handelCount(v){
            if(this.LeftList.length===0){
                this.LeftList.push({
                    count:v.count,
                    onlyCode:v.onlyCode,
                    readyArea:{
                        areaCode:this.areaCode,
                        colIndex:v.colIndex,
                        warehouseCode:this.warehouse,
                    }
                })
            }else{
                this.LeftList.forEach((item)=>{
                    if(item.onlyCode === v.onlyCode){
                        item.count=v.count,
                        item.onlyCode=v.onlyCode,
                        item.readyArea={
                            areaCode:this.areaCode,
                            colIndex:v.colIndex,
                            warehouseCode:this.warehouse,
                        }
                    }
                })
            }
            // this.$emit("handelRightEmit",this.LeftList)
        },
        handelChecked(){
            this.LeftList=this.data.map((v)=>{
                if(v.checked)
                {
                    return {
                        count:v.count,
                        onlyCode:v.onlyCode,
                        readyArea:{
                            areaCode:this.areaCode,
                            colIndex:v.colIndex,
                            warehouseCode:this.warehouse,
                        }
                    }
                }
            })
            this.$emit("handelRightEmit",this.LeftList)
        },
        async queryDeliverGoodsLocationList(){
            const params={
                category:this.category,
                leftRight: 1,
                warehouseCode: this.warehouse,
            }
            const res = await queryDeliverGoodsLocationList(params)
            if(res.data.code === '0'){
                this.data=res.data.data&&res.data.data.map((v)=>{
                    return {...v,checked:false,count:'',colIndex:"",flag:false,}
                })

            }
        }
    }
}
</script>

<style lang="less" scoped>
.leftSide{
    padding: 6px 10px;
    .conItem{
        display: flex;
        background: #fff;
        // justify-content: space-around;
        align-items: center;
        padding: 0 4px;
        // .con{
        //     margin-left: 10px;
        // }
        li{
            margin-left: 15px;
            padding: 3px 0;
            border-bottom: 1px solid #eee;
        }
        li .title{
            color: #646566;
        }
        ::v-deep .van-field__label{
            width: 100px;
        }
        ::v-deep .van-cell{
            padding: 4px 16px;
        }
    }
}

</style>