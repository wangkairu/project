<template>
      <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'145px'"
          size="mini"
          :maxShow="4"
          @search="search"
          @reset="reset"
        >
          <el-form-item label="库房">
            <el-select clearable v-model="form.warehouseCode" @change="handelIsFinished" placeholder="请选择">
                <el-option
                v-for="item in warehouseArr"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调拨状态">
            <el-select clearable v-model="form.isFinished" @change="handelIsFinished" placeholder="请选择调拨状态">
                <el-option
                v-for="item in statusArr"
                :key="item.key"
                :label="item.value"
                :value="item.key">
                </el-option>
            </el-select>
          </el-form-item>
        </SearchFilter>
      </div>
      <div class="table">
        <div class="enteringButton">
            <el-button type="primary" size="mini" @click="handelAdd"
            >创建调拨出库</el-button
            >
            <el-button type="primary" size="mini" @click="handelBatchDelate"
            >批量删除</el-button
            >
        </div>
        <el-table
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          :data="data"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="65"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="100"> </el-table-column>
          <el-table-column
            fixed
            prop="warehouseName"
            label="库房名称"
            width="100"
          >
          </el-table-column>
          <el-table-column
            fixed
            prop="mesCustomerShortName"
            label="客户简称"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="mesLeftRightSidesEnum" label="左右面">
          </el-table-column>
          <el-table-column
            fixed
            prop="mesMeterLength"
            label="米长"
          >
          </el-table-column>
          <el-table-column
            fixed
            prop="mesWheelType"
            label="轮型"
          >
          </el-table-column>
          <el-table-column prop="mesNormsName" label="规格简称" width="140">
          </el-table-column>
          <el-table-column prop="mesSpecialRequirements" label="特殊要求">
          </el-table-column>
          <el-table-column prop="warehouseName" label="库房名称"> </el-table-column>
          <el-table-column prop="boxCount" label="可调拨箱数"> </el-table-column>
          <el-table-column  prop="count" label="调拨数量"></el-table-column>
          <el-table-column  prop="isFinished" label="调拨状态" >
            <template slot-scope="scope">
              <el-tag :type="scope.row.isFinished!=0?'success':'danger'">{{ scope.row.isFinished!=0?'已完成':'未完成' }}</el-tag>
            </template> 
          </el-table-column>
          <el-table-column prop="allocateUser" label="调拨出库制单人">
          </el-table-column>
          <el-table-column prop="allocateLocation" label="调拨出库位置">
          </el-table-column>
          <el-table-column prop="startTime" label="调拨出库时间" width="180"> </el-table-column>
          <el-table-column prop="remark" label="备注" width="200">
          </el-table-column>
          <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                    v-if="scope.row.isFinished==0"
                    type="text"
                    @click="handelDelete(scope.$index, scope.row)"
                    >删除</el-button>
                    <el-button
                    v-if="scope.row.isFinished==0"
                    type="text"
                    @click="handelComplate(scope.$index, scope.row)"
                    >完成</el-button>
                </template>
           </el-table-column>
        </el-table>
      </div>
      <div class="pagenation">
        <PageNation
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      </div>
      <el-dialog @close="resetForm" title="绑定入库规则" :visible.sync="openAllocate" width="60%">
      <el-form ref="form" :rules="rules" :model="obj" label-width="140px">
        <el-form-item label="库房编号" prop="warehouseCode">
          <el-select
            clearable
            v-model="obj.warehouseCode"
            placeholder="请选择库房"
            @change="warehouseCodeChanged"
          >
            <el-option
              v-for="item in warehouseOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区域编号" prop="functionAreaCode">
          <el-select
            v-model="obj.functionAreaCode"
            placeholder="请选择区域编号"
            @change="functionAreaCodeChanged"
          >
            <el-option
              v-for="item in functionAreaCodeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库列编号" prop="colIndexAliasList">
          <el-select
            v-model="obj.colIndexAliasList"
            placeholder="请选择库列编号"
            multiple
            @change="handelColIndexAliasList"
          >
            <el-option
              v-for="item in colIndexAliasListOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择库列">
          <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="allocateData"    @selection-change="handelSelect" style="width: 100%">
            <el-table-column type="selection" width="65"></el-table-column>
            <el-table-column  prop="mesNormsName" label="规格简称" width="120"></el-table-column>
            <el-table-column prop="mesCustomerShortName" label="客户简称"  width="140"></el-table-column>
            <el-table-column  prop="mesWheelType" label="轮型"> </el-table-column>
            <el-table-column  prop="mesMeterLength" label="米长"> </el-table-column>
            <el-table-column  prop="mesLeftRightSidesEnum" label="左右面"> </el-table-column>
            <el-table-column  prop="mesSpecialRequirements" label="特殊要求"> </el-table-column>
            <el-table-column  prop="boxCount" label="可调拨箱数"> </el-table-column>
            <el-table-column  prop="count" label="调拨数量" width="200"> 
                <template slot-scope="scope">
                    <el-input size="mini" class="time" @input="handelInput(scope.row)" v-model="scope.row.count" @change="handelStartTimeStr(scope.row)" placeholder="请输入调拨箱数"></el-input>
                </template>
            </el-table-column>
            <el-table-column  prop="allocateLocation" label="调拨出库位置" width="200"> 
                <template slot-scope="scope">
                    <el-input size="mini"  class="time" v-model="scope.row.allocateLocation" @change="handelStartTimeStr(scope.row)" placeholder="请输入调拨出库位置"></el-input>
                </template>
            </el-table-column>
            <el-table-column width="300" prop="startTimeStr" label="调拨出库开始时间"> 
                <template slot-scope="scope">
                    <el-date-picker 
                        class="time"
                        @change="handelStartTimeStr(scope.row)"
                        size="mini"
                        v-model="scope.row.startTimeStr"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="选择调拨出库开始时间">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column   label="调拨出库完成时间" width="180"> </el-table-column>
            <el-table-column  prop="allocateUser" label="调拨出库制单人"></el-table-column>
            <el-table-column  prop="remark" label="备注" width="200">
              <template slot-scope="scope">
                <el-input class="time" size="mini" v-model="scope.row.remark" @change="handelStartTimeStr(scope.row)" placeholder="请输入备注"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
 import PageNation from "@/components/Pagination";
  import SearchFilter from "@/components/SearchFilter";
import {queryAllocateOutList,deleteAllocate,selectCol,createAllocate,completeAllocate} from '@/api/storeOut'
import {queryWarehouseColDropDown} from '@/api/location'
export default {
    components:{
        PageNation,SearchFilter
    },
    data(){
        return {
            statusArr:[
              {key:0,value:"未完成"},
              {key:1,value:"已完成"},
            ],
            openAllocate:false,
            data:[],
            allocateData:[],
            form:{},
            obj:{
                warehouseName:"",
            },
            rules:{},
            warehouseOptions:[],
            warehouseArr:[],
            colIndexAliasListOptions:[],
            colIndexAliasList:[],
            warehouseCodeOptions:[],
            functionAreaCodeOptions:[],
            warehouseName:"",
            total:0,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            ids:[],
            num:[],
            dataList:[],
            user:"",
            selectArr:[],
        }
    },
    mounted(){
        this.user= JSON.parse(localStorage.getItem("data")).username
        this.queryAllocateOutList()
        this.warehouse()
    },
    methods:{
        async handelComplate(index,row){
          const res = await completeAllocate(row.id)
          if(res.code=='0'){
            this.$message.success(res.msg);
            this.queryAllocateOutList()
          }else{
            this.$message.error(res.msg);
          }
        },
        handelInput(row){
          if(row.count<0){
            row.count=""
            this.$message("调拨箱数不能小于0")
          }else if(row.count>row.boxCount){
            row.count=""
            this.$message("调拨箱数不能大于可调拨箱数")
          }
        },
        handelStartTimeStr(row){
            if(this.dataList.length>0){
                const arr=this.dataList
                this.dataList=arr.map((v)=>{
                    if(v.onlyCode==row.onlyCode){
                        return {
                            ...v,
                            count:row.count,
                            startTimeStr:row.startTimeStr,
                            allocateLocation:row.allocateLocation,
                            remark:row.remark,
                            allocateUser:this.user,
                        }
                    }
                })
            }
            // else{
            //   this.$message.info("请先选择库列")
            // }
        },
        handelSelect(val){
            this.dataList = val.map((v)=>{
               return {
                ...v,
                allocateUser:this.user,
              }
            })
        },
        handelAdd(){
            this.openAllocate = true
            this.warehouse()
        },
        resetForm(){
          this.dataList=[]
          this.allocateData=[]
          this.obj={}
          this.openAllocate = false
        },
        async submitForm(){
          if(this.dataList.length==0){
            this.$message("请先勾选库列")
          }else{
            const params={
                areaCode:this.obj.functionAreaCode,
                dataList:this.dataList,
                warehouseCode:this.obj.warehouseCode,
                warehouseName:this.obj.warehouseName,
            }
            const res = await createAllocate(params)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.dataList=[]
                this.allocateData=[]
                this.obj={}
                this.openAllocate = false
                this.queryAllocateOutList()
            }else{
              this.$message.error(res.msg)
            }
          }
            
        },
        async warehouse(){
            const res = await queryWarehouseColDropDown({})
            if(res.code==='0'){
                this.warehouseOptions = res.data
                this.warehouseArr=res.data
                this.form.warehouseCode = res.data[1].key
                this.queryAllocateOutList()
            }
        },
        // 获取第一层
        warehouseCodeChanged(value) {
            this.warehouseOptions.forEach((v)=>{
                if(v.key === value){
                  this.obj.warehouseName = v.value
                }
            })
            const params = {
                warehouseCode: value, 
            };
            queryWarehouseColDropDown(params).then((res) => {
                if (res.code == "0") {
                    this.queryWarehouseColDropDown()
                }
            });
        },
        async queryWarehouseColDropDown(){
            const params = {
                warehouseCode: this.obj.warehouseCode,
                functionType:'IN',
                functionCode:'IN'
            };
            this.obj.functionType = 'IN';
            this.obj.functionCode = 'IN'
            const res = await queryWarehouseColDropDown(params)
            if(res.code==='0'){
                this.functionAreaCodeOptions = res.data
            }
        },
        async functionAreaCodeChanged(){
            const params={
                warehouseCode: this.obj.warehouseCode,
                warehouseName:this.obj.warehouseName,
                functionType:'IN',
                functionCode:'IN',
                functionAreaCode:this.obj.functionAreaCode,
               
            }
            const res = await queryWarehouseColDropDown(params)
            if(res.code==='0')
            {
                this.colIndexAliasListOptions = res.data.map((v) => {
                    return {
                        key: v.value,
                        value: v.key,
                    };
                });
            }
        },
        async handelColIndexAliasList(val){
            if(val){
                this.colIndexAliasListOptions.forEach((v) => {
                    if (val.includes(v.value)) {
                        this.num.push(v.key);
                    }
                });
            }
            const params={
                ...this.obj,
                areaCodeList:this.num
            }
            const res = await selectCol(params)
            if(res.code === '0'){
                this.allocateData = res.data.map((v)=>{
                    return {
                        ...v,
                        count:"",
                        // location:v.warehouseName+'-'+v.areaCode+v.colIndex
                    }
                })
            }
        },
        handleSelectionChange(select){
            this.selectArr=select.map((v)=>{
              return v
            })
        },
        handelBatchDelate(){
            if(this.ids.length>0){
                this.$message.info('请先选择数据')
            }else{
              const flag=this.selectArr.every((v)=>v.isFinished==0)
              if(flag){
                this.ids=this.selectArr.map((v)=>v.id)
                this.deleteAllocate()
              }else{
                this.$message.info('请勾选调拨状态为未完成的数据')
              }
              
            }
        },
        handelDelete(index,row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.deleteAllocate(row.id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        async deleteAllocate(val){
            const id = val? [val] : this.ids
            const res = await deleteAllocate(id)
            if(res.code==='0'){
                this.$message.success(res.msg);
                this.queryAllocateOutList()
            }else{
                this.$message.error(res.msg);
            }
        },
        search(){
            this.queryAllocateOutList()
        },
        reset(){
          this.form.warehouseCode=""
          this.form.isFinished=""
          this.queryAllocateOutList()
        },
        handelIsFinished(){
            this.queryAllocateOutList()
        },
        pageChange(val) {
            this.listQuery.pageNum = val.page-1;
            this.listQuery.pageSize = val.limit;
            this.queryAllocateOutList();
        },
        async queryAllocateOutList(){
            const params={
                ...this.form,
                // isFinished:0,
                pageNumber: this.listQuery.pageNum,
                pageSize: this.listQuery.pageSize
            }
            const res = await queryAllocateOutList(params)
            if(res.code==='0'){
                this.data=res.data.items
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.warpper {
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 0;
    .form {
      display: flex;
      justify-content: space-around;
    }
  }
  .row {
    margin-top: 20px;
  }
  .table {
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    .enteringButton {
      margin-bottom: 10px;
    }
  }
  .button {
    float: right;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    padding: 6px;
  }
  .background {
    background: #f5f5f5;
    border-radius: 10px;
    padding: 8px 10px;
    .backgroundItem {
      padding: 15px 10px;
      margin-bottom: 10px;
      background: #f0f0f0;
      border-radius: 10px;
      position: relative;
    }
    .iconfont {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 20px;
    }
  }
}
ul {
  display: flex;
}
.hiden {
  display: inline-block;
  width: calc(100% - 112px);
}
::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
  width: 300px;
}
::v-deep span.el-tooltip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 4px !important;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-input--mini .el-input__inner {
  width: 175px;
}
.time {
  ::v-deep .el-input__suffix {
    right: 2.6125rem;
  }
}

</style>