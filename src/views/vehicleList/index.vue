<template>
    <div class="wraper">
        <div class="WAREHOUSE" v-for="(item,ind) in data" :key="ind">
            <div class="title">{{ item.name }}</div>
            <el-table
            :data="item.children"
            border
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            style="width: 100%">
            <el-table-column
                    prop="parkPointName"
                    label="待命点名称">
                </el-table-column>
                <el-table-column
                    prop="parkPoint"
                    label="待命点">
                </el-table-column>
                <el-table-column
                    label="车辆">
                    <template slot-scope="scope">
                        <span v-if="scope.row.vehicleName">{{scope.row.vehicleName}}</span>
                        <span v-else>暂无车辆</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="mini"
                    :disabled ="scope.$index===0||!scope.row.vehicleName"
                    @click="handleUp(scope.$index, scope.row,ind)">上移</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    :disabled ="scope.$index===item.children.length-1||!scope.row.vehicleName"
                    @click="handleDown(scope.$index, scope.row,ind)">下移</el-button>
                    <el-button
                    size="mini"
                    type="text"
                    :disabled="!scope.row.vehicleName"
                    @click="handelRemove( scope.row,ind)">移除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="WAREHOUSEW"></div> -->
    </div>
</template>

<script>
import {queryVehicleList,moveVehicle,removeVehicle} from '@/api/index'
export default {
    data(){
        return{
            eastPackage:[],
            data:[],
            WAREHOUSE:[],
            WAREHOUSEW:[],
        }
    },
    mounted(){
        this.queryVehicleList()
    },
    methods:{
        async handelRemove(row){
            this.$confirm("确定要移除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                const res=await removeVehicle(row.id);
                if(res.code==='0')
                {
                    this.queryVehicleList()
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
            });  
        },
        async handleUp(index,row,ind){
            this.data[ind].children.splice(index-1,0,row);
            this.data[ind].children.splice(index+1,1);
            const params={
                id:row.id,
                vehicleName:row.vehicleName,
                move:1,
            }
            this.moveVehicle(params);
        },
        handleDown(index,row,ind){
            this.data[ind].children.splice(index+2,0,row);
            this.data[ind].children.splice(index,1);
            const params={
                id:row.id,
                vehicleName:row.vehicleName,
                move:2,
            }
            this.moveVehicle(params);
        },
        async moveVehicle(params){
            const res = await moveVehicle(params);
           if(res.code ==="0")
           {
            this.queryVehicleList()
            this.$message.success(res.msg)
           }else{
            this.$message.error(res.msg)
           }
        },
        async queryVehicleList(){
            const res = await queryVehicleList()
            if(res.code == '0') {
                this.eastPackage = res.data.info.cateGoryList;
                this.data = this.eastPackage.map((item)=>{
                    return {
                        name:res.data.info[item][0].categoryName,
                        children:res.data.info[item]
                    }
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.wraper{
   background: #fff;
   .WAREHOUSE{
        .title{
            padding: 16px;
            color: #555;
        }
   }
}
</style>