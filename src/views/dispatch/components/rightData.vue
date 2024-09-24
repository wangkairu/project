<template>
     <!-- :row-key="getRightRowKey" :reserve-selection="true" -->
     <el-table
        :data="leftRightList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        @selection-change="handleReftSelectionChange">
            <el-table-column
                type="selection" width="50"  >
            </el-table-column>
            <el-table-column
                prop="warehouseName"
                label="库房" width="100">
            </el-table-column>
            <el-table-column
                prop="areaCode"
                label="区域">
            </el-table-column>
            <el-table-column
                prop="colIndexAlias"
                label="列">
            </el-table-column>
            <el-table-column
                prop="normsShortName"
                label="规格名称">
            </el-table-column>
            <el-table-column
                prop="customerShortName"
                label="客户简称">
            </el-table-column>
            <el-table-column
                prop="wheelType"
                label="轮型">
            </el-table-column>
            <el-table-column
                prop="meterLength"
                label="米长">
            </el-table-column>
            <el-table-column
                prop="leftRightSides"
                label="左右面">
            </el-table-column>
            <el-table-column
                prop="used"
                label="可备货数量">
            </el-table-column>
            <el-table-column
                prop="count"
                label="备货数量" width="110">
                <template slot-scope="scope">
                <el-input class="input" @change="handelCount(scope.row)"  v-model="scope.row.count" placeholder="请输入可备货数量" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="used"
                label="备货区每列信息" width="180" v-if="!readyArea.autoAllocate">
                <template slot-scope="scope">
                <el-select size="mini"
                    v-model="scope.row.colIndex" placeholder="请选择" @change="handelChangeRightColOptions(scope.row)">
                    <el-option
                    v-for="item in colOptions"
                    :key="item.col"
                    :label="item.label"
                    :value="item.col">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.count }}</span>
                    </el-option>
                </el-select>
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
import {mapState} from 'vuex'
import { queryDeliverGoodsLocationList,} from '@/api/dispatch'
export default{
    name:"rightData",
    props: {
        colOptions:{
            type:Array
        },
        flag:{
            type:Boolean,
        },
        readyArea:{
            type:Object,
        },
    },
    data(){
        return {
            leftRightList:[],
            autoAllocate:this.readyArea.autoAllocate,
            selectrightList:[],
            selectList:[],
            selectOptions:[],
        }
    },
    computed:{
        // areaCode
        ...mapState({ areaCode:state=>state.areaCode}),
        ...mapState({ list:state=>state.list}),
        ...mapState({warehouse:state=>state.warehouse}),
        ...mapState({warehouseCode:state=>state.warehouseCode})
        // ...mapState({autoAllocate:state=>state.autoAllocate})
        // list: function(){
        //     this.queryDeliverGoodsLocationList()
        // }
    },
    watch:{
        flag:{
            handler(val){
                if(val){
                    // console.log(val,"val")
                    this.queryDeliverGoodsLocationList()
                }else {
                    this.leftRightList=[]
                }
            },
            immediate:true,
            deep:true,
        },
        list:{
            handler(val){
                if(val){
                    this.queryDeliverGoodsLocationList();
                    this.selectList=[];
                    this.selectOptions=[];
                }else {
                    this.leftRightList=[]
                }
            },
            immediate:true,
            deep:true,
        },
        areaCode:{
            handler(val){
                if(val){
                    this.leftRightList.forEach((v)=>{
                        v.colIndex=''
                    })
                }
            },
            immediate:true,
            deep:true,
        }
    },
    mounted(){
        // this.queryDeliverGoodsLocationList()
    },
    methods:{
        handelChangeRightColOptions(val){
            // const ind = this.selectOptions.findIndex(v => {return v.onlyCode === val.onlyCode});
            // if(ind!==-1)
            // {
            //     this.selectOptions.splice(ind,1)
            // } 
            this.selectOptions.push(val);
            const arr = [...new Set(this.selectOptions)];
            const list=this.selectrightList.map((v,ind)=>{
                if(v.onlyCode===arr[ind].onlyCode){
                    return {
                        onlyCode:v.onlyCode,
                        count:Number(arr[ind].count),
                        readyArea:{
                            areaCode:this.areaCode,
                            colIndex:arr[ind].colIndex,
                            warehouseCode:this.warehouse
                        }
                    }
                }
            })
            this.selectrightList=list;
            this.$emit("handelChangeRight",this.selectrightList)
        },
        handelCount(row){
            // const index = this.selectList.findIndex(v=> {return v.onlyCode==row.onlyCode})
            // if (index !== -1) {
            //     this.selectList.splice(index,1);
            // }
            this.selectList.push(row);
            const arr = [...new Set(this.selectList)];
            const list=this.selectrightList.map((v,index)=>{
                if(v.onlyCode===arr[index].onlyCode&&this.readyArea.autoAllocate){
                    return {
                        onlyCode:v.onlyCode,
                        count:Number(arr[index].count),
                    }
                }else{
                    return {
                        onlyCode:v.onlyCode,
                        count:Number(arr[index].count),
                        readyArea:{
                            areaCode:this.areaCode,
                            colIndex:arr[index].colIndex,
                            warehouseCode:this.warehouse
                        }
                    }
                }
            })
            this.selectrightList=list
            this.$emit("handelCountChange",this.selectrightList)
        },
        // getRightRowKey(row){
        //     return row.warehouseName+row.areaCode+row.colIndexAlias+row.leftRightSides
        // },
        handleReftSelectionChange(val){
            let left=[]
            val.forEach((v)=>{
                if(this.readyArea.autoAllocate){
                    left.push({count:v.count,onlyCode:v.onlyCode,})
                }else{
                    left.push({count:v.count,onlyCode:v.onlyCode,readyArea:{
                        areaCode:this.areaCode,
                        colIndex:v.colIndex,
                        warehouseCode:this.warehouse
                    }})
                }
            })
            console.log(this.autoAllocate);
            this.selectrightList=[...new Set(left)]
            this.$emit("handelleReftSelection",this.selectrightList)
        },
        queryDeliverGoodsLocationList(){
            const params={
                category: this.list.category,
                leftRight: 1,
                warehouseCode: this.warehouseCode,
            }
            queryDeliverGoodsLocationList(params).then((res)=>{
               if(res.data){
                    this.leftRightList=res.data.map((v)=>{
                        return {
                            ...v,
                            count:0,
                            colIndex:"",
                            readyArea:{
                                areaCode: "",
                                colIndex: 0,
                                warehouseCode: ""
                            }
                        }
                    })
               }else{
                this.leftRightList=[]
               }
            })
        }
      
    }
}
</script>

<style scoped lang="scss">

</style>