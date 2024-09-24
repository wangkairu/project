<template>
    <div>
        <!-- :row-key="getLeftRowKey" :reserve-selection="true"-->
        <el-table  
        :data="leftRightList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        @selection-change="handleLeftSelectionChange">
            <el-table-column
           type="selection"  width="50" >
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
            label="备货数量"
            width="110">
                <template slot-scope="scope">
                    <el-input  @change="handelLeftCount(scope.row)"  class="input" v-model="scope.row.count" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="colIndex"
                label="备货区每列信息" width="180" v-if="!readyArea.autoAllocate">
                <template slot-scope="scope">
                <el-select  class="select"  size="mini" v-model="scope.row.colIndex" placeholder="请选择" @change="handelChangeColOptions(scope.row)">
                    <el-option
                    v-for="item in colOptions"
                    :key="item.col"
                    :label="item.laebl"
                    :value="item.col">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.count }}</span>
                    </el-option>
                </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import { queryDeliverGoodsLocationList,} from '@/api/dispatch'
export default {
    props:{
        colOptions:{
            type:Array
        },
        readyArea:{
            type:Object,
        },
    },
    data(){
        return {
            leftRightList:[],
            // category:this.list[0].category,
            autoAllocate:this.readyArea.autoAllocate,
            selectLeftList:[],
            newArr:[],
            selectOptions:[],
            // list:[],
            selectList:[],
        }
    },
    computed:{
        ...mapState({ areaCode:state=>state.areaCode}),
        ...mapState({warehouse:state=>state.warehouse}),
        ...mapState({list:state=>state.list}),
        ...mapState({warehouseCode:state=>state.warehouseCode})
    },
    watch:{
        list:{
            handler(val){
                if(val){
                    this.queryDeliverGoodsLocationList();
                    this.selectOptions = [];
                    this.newArr = [];
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
                }else {
                    this.leftRightList=[]
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
        handelChangeColOptions(val){
            // const ind = this.selectOptions.findIndex((v)=>{
            //   return  v.onlyCode === val.onlyCode
            // })
            // if(ind !== -1){
            //   this.selectOptions.splice(ind,1);
            // }
            this.selectOptions.push(val);

            const arr = [...new Set(this.selectOptions)];
            const list=this.selectLeftList.map((v,index)=>{
                if(v.onlyCode===this.selectOptions[index].onlyCode){
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
            this.selectLeftList=list
            this.$emit("handelColOptions",this.selectLeftList)
        },
        handelLeftCount(row){
            // const ind = this.newArr.findIndex((v)=>{
            //   return  v.onlyCode === row.onlyCode
            // })
            // if(ind !== -1){
            //   this.newArr.splice(ind,1);
            // }
            this.newArr.push(row);
            const arr = [...new Set(this.newArr)];
            console.log(arr);
            this.selectList=this.selectLeftList.map((v,ind)=>{
                if(v.onlyCode===arr[ind].onlyCode&&this.readyArea.autoAllocate){
                    return {
                        onlyCode:v.onlyCode,
                        count:Number(arr[ind].count),
                    }
                }else{
                    return {
                        onlyCode:v.onlyCode,
                        count:Number(arr[ind].count),
                        readyArea:{
                            areaCode:this.areaCode,
                            colIndex:row.colIndex,
                            warehouseCode:this.warehouse
                        }
                    }
                }
            })
            this.selectLeftList=this.selectList
            this.$emit("handelCount",this.selectLeftList)
        },
        handleLeftSelectionChange(val){
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
            this.selectLeftList=[...new Set(left)];
            this.$emit("handelLeftSelection",this.selectLeftList)
        },
        getLeftRowKey(row){
            return row.warehouseName+row.areaCode+row.colIndexAlias+row.leftRightSides
        },
        queryDeliverGoodsLocationList(){
            const params={
                category: this.list.category,
                leftRight: 0,
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
                }else {
                    this.leftRightList= []
                }
            })
        }
      
    }
}
</script>

<style scoped lang="scss">
</style>