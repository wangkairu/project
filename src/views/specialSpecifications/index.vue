<template>
    <div class="wrapper">
        <!-- <div class="table-filter">
            <SearchFilter
            :labelWidth="'130px'"
            size="mini"
            :maxShow="5"
            @search="search"
            @reset="reset"
            class="search"
            >
                <el-form-item label="关键字">
                    <el-input v-model="form.keyWord" placeholder="请输入关键字" @change="handelChange"></el-input>
                </el-form-item>
          
            </SearchFilter>
        </div> -->
        <div class="table">
            <div style="margin-top: 10px;">
                <el-button
                    type="primary"
                    size="mini"
                    class="edit-btn"
                    @click="handelAdd()"
                    >新增</el-button
                >
            </div>
            <el-table
                :data="data"
                style="width: 100%;margin-top: 10px"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
                <el-table-column  type="index" label="序号" > </el-table-column>
                <el-table-column prop="normsName" label="规格简称"> </el-table-column>
                <el-table-column prop="customerShortName" label="客户简称" > </el-table-column>
                
                <el-table-column prop="wheelType" label="轮型"> </el-table-column>
                <el-table-column prop="meterLength" label="米长"> </el-table-column>
                <el-table-column prop="leftRightSidesEnum" label="左右面">
                    <!-- <template slot-scope="scope">
                        <span>{{ scope.row.leftRightSidesEnum==0?'左':'右' }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            class="edit-btn"
                            @click="handeleditDetail(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            v-permission="{ name: 'isDelete' }"
                            type="text"
                            size="mini"
                            class="edit-btn"
                            @click="delRow(scope.row)"
                            >删除</el-button
                        >
                        
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagenation">
            <PagiNation
            v-show="total > 0"
            :total="total"
            :page.sync="query.page"
            :limit.sync="query.size"
            @pagination="pageChange"
            />
        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            @close="handelCancel"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="规格简称" prop="normsName">
                    <el-input v-model="ruleForm.normsName" placeholder="请输入规格简称"></el-input>
                </el-form-item>
                <el-form-item label="客户简称" prop="customerShortName">
                    <el-input v-model="ruleForm.customerShortName" placeholder="请输入客户简称"></el-input>
                </el-form-item>
                <el-form-item label="轮型" prop="wheelType">
                    <el-input v-model="ruleForm.wheelType" placeholder="请输入轮型"></el-input>
                </el-form-item>
                <el-form-item label="米长" prop="meterLength">
                    <el-input v-model="ruleForm.meterLength" placeholder="请输入米长"></el-input>
                </el-form-item>
                <el-form-item label="左右面" prop="leftRightSides">
                    <el-radio-group v-model="ruleForm.leftRightSides">
                        <el-radio label="0">左</el-radio>
                        <el-radio label="1">右</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handelCancel">取 消</el-button>
                <el-button type="primary" @click="handelConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {queryListSpecial,saveOrUpdateSpecial,specialDelete} from '@/api/index'
import SearchFilter from "@/components/SearchFilter";
import PagiNation from '@/components/Pagination'
export default {
    name:"specialSpecifications",
    components: { PagiNation, SearchFilter },
    data(){
        return {
            dialogVisible:false,
            data:[],
            rules:{},
            title:"",
            ruleForm:{
                customerShortName: "",
                id: 0,
                leftRightSides: '',
                meterLength: '',
                normsName: "",
                wheelType: ""
            },
            total:0,
            form:{
                keyWord:"",
            },
            query:{
                page:1,
                size:10,
            }
        }
    },
    mounted(){
        this.queryListSpecial()
    },
    methods:{
        handelCancel(){
            this.dialogVisible = false
            this.ruleForm={
                customerShortName: "",
                id: 0,
                leftRightSides: '',
                meterLength: '',
                normsName: "",
                wheelType: ""
            };
        },
        handelAdd(){
            this.title='新增'
            this.dialogVisible=true
        },
        async handelConfirm(){
            if(this.title=='编辑'){
                const res = await saveOrUpdateSpecial({...this.ruleForm,leftRightSides:Number(this.ruleForm.leftRightSides)})
                if(res.code=='0'){
                    this.$message.success(res.msg)
                    this.dialogVisible=false
                    this.ruleForm={
                        customerShortName: "",
                        id: 0,
                        leftRightSides: '',
                        meterLength: '',
                        normsName: "",
                        wheelType: ""
                    },
                    this.queryListSpecial()
                }else{
                    this.$message.error(res.msg)
                }
            }else{
                const res = await saveOrUpdateSpecial({...this.ruleForm,leftRightSides:Number(this.ruleForm.leftRightSides),id:""})
                if(res.code=='0'){
                    this.$message.success(res.msg)
                    this.dialogVisible=false
                    this.ruleForm={
                        customerShortName: "",
                        id: 0,
                        leftRightSides: '',
                        meterLength: '',
                        normsName: "",
                        wheelType: ""
                    },
                    this.queryListSpecial()
                }else{
                    this.$message.error(res.msg)
                }
            }
            // dialogVisible = false
        },
        async delRow(row){
            this.$confirm("确定要删除吗？", "提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async ()=>{
                const ids=[row.id]
                const res = await specialDelete(ids)
                if(res.code=='0'){
                    this.$message.success(res.msg)
                    this.queryListSpecial()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        handeleditDetail(row){
            this.title='编辑'
            this.ruleForm=row
            this.ruleForm.leftRightSides=row.leftRightSides.toString()
            this.dialogVisible=true
        },
        async queryListSpecial(){
            const params={
                ...this.form
            }
            const res =await queryListSpecial(params,{...this.query,page:this.query.page-1})
            if(res.code=='0'){
                this.data=res.data.items
                this.total=res.data.total
            }
        },
        pageChange(val){
            this.query.page=val.page
            this.query.size=val.limit
        },
        // handelChange(){
        //     console.log(1111)
        //     this.queryListSpecial()
        // },
        search(){
            this.queryListSpecial()
        },
        reset(){
            this.form={
                keyWord:""
            }
            this.queryListSpecial()
        }
    }
}
</script>


<style lang="scss" scoped>
.wrapper{
    .table-filter {
      box-sizing: border-box;
      background-color: #fff;
      padding: 0px 15px;
      .search{
        padding-top: 15px;
      }
    }
    .table {
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 10px;
      padding: 0 10px;
      overflow: hidden;
      flex: 1;
      .enteringButton {
        padding: 8px 0;
      }
    }
    .pagenation {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      background-color: #fff;
      margin-top: 10px;
      padding: 6px;
      overflow: hidden;
    }
}
</style>