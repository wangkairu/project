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
          <el-select v-model="form.warehouseCode" @change="handelIsFinished" placeholder="请选择">
              <el-option
              v-for="item in warehouseArr"
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
          >创建调拨入库</el-button
          >
          <!-- <el-button type="primary" size="mini" @click="handelBatchDelate"
          >批量删除</el-button
          > -->
      </div>
      <!--         @selection-change="handleSelectionChange" -->
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="data"
      >
        <!-- <el-table-column type="selection" width="65"></el-table-column> -->
        <el-table-column fixed type="index" label="序号" width="100"> </el-table-column>
        <el-table-column
          fixed
          prop="stationCode"
          label="库位编号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="mesBoxNumberQrCode" label="箱号二维码" width="180">
        </el-table-column>
        <el-table-column prop="mesNormsName" label="规格简称">
        </el-table-column>
        <el-table-column prop="mesCustomerShortName" label="客户简称">
        </el-table-column>
        <el-table-column
          fixed
          prop="mesWheelType"
          label="轮型"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesMeterLength"
          label="米长"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="mesLeftRightSidesEnum"
          label="左右面"
        >
        </el-table-column>
        <el-table-column prop="mesSpecialRequirements" label="特殊要求">
        </el-table-column>
        <el-table-column prop="finishTime" label="调拨入库完成时间"> </el-table-column>
        <el-table-column prop="allocateUser" label="调拨入库操作人"> </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <!-- <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <el-button
                  type="text"
                  @click="handelDelete(scope.$index, scope.row)"
                  >删除</el-button>
              </template>
         </el-table-column> -->
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
    <el-dialog @close="resetForm" title="调拨入库" :visible.sync="openAllocate" width="50%">
    <el-form ref="form" :rules="rules" :model="obj" label-width="90px" style="display: flex;flex-wrap: wrap;">
      <div style="display: flex;flex-direction: column;">
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
          <el-form-item label="库列编号" prop="colIndexAliasList">
          <el-select
            v-model="obj.colIndexAliasList"
            placeholder="请选择库列编号"
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
        <el-form-item label="箱号二维码">
          <el-input style="width: 200px;" v-model="value" clearable placeholder="请输入箱号二维码" @input="handelQrCode"></el-input>
        </el-form-item>
      </div>
      <div style="display: flex;flex-direction: column;">
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
     
        <el-form-item label="库位编号" prop="locationCode" >
          <el-select
            v-model="obj.locationCode"
            placeholder="请选择库位编号"
            @change="handelStationCode"
          >
            <el-option
              v-for="item in locationCodeOptions"
              :key="item.stationCode"
              :label="item.stationName"
              :value="item.stationCode"
            />
          </el-select>
        </el-form-item>
      </div>
     
     <div style="margin-left: 10px;display: flex;flex-direction:column;width: 100%;">
        <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }" :data="allocateData" style="width:95%;margin-left: 12px;">
            <!-- <el-table-column type="selection" width="65"></el-table-column> -->
            <el-table-column  prop="specification_name" label="规格简称"></el-table-column>
            <el-table-column prop="customer_name_short" label="客户简称"></el-table-column>
            <el-table-column  prop="wheel" label="轮型"> </el-table-column>
            <el-table-column  prop="length" label="米长"> </el-table-column>
            <el-table-column  prop="mesLeftRightSides" label="左右面"> 
              <template slot-scope="scope">
                <span>{{ scope.row.mesLeftRightSides==1?'右':'左' }}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="requirement" label="特殊要求"> </el-table-column>
            <!-- <el-table-column  prop="boxCount" label="可调拨箱数"></el-table-column> -->
            <!-- <el-table-column  prop="allocateLocation" label="调拨入库位置" width="280"> 
                <template slot-scope="scope">
                  <el-select v-model="scope.row.allocateLocation" @change="handelStartTimeStr(scope.row)" clearable placeholder="请选择调拨入库位置">
                    <el-option
                      v-for="item in options"
                      :key="item.stationCode"
                      :label="item.stationName"
                      :value="item.stationCode">
                    </el-option>
                  </el-select>
                </template>
            </el-table-column> -->
            <!-- <el-table-column width="300" prop="startTimeStr" label="调拨入库开始时间"> 
                <template slot-scope="scope">
                    <el-date-picker 
                        @change="handelStartTimeStr(scope.row)"
                        size="mini"
                        v-model="scope.row.startTimeStr"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="选择调拨入库开始时间">
                    </el-date-picker>
                </template>
            </el-table-column> -->
            <!-- <el-table-column   label="调拨入库完成时间" width="180"> </el-table-column> -->
            <!-- <el-table-column  prop="allocateUser" label="调拨入库制单人"> </el-table-column> -->
            <!-- @change="handelStartTimeStr(scope.row)" -->
            <el-table-column  prop="remark" label="备注" width="200">
                <template slot-scope="scope">
                    <el-input class="inputCon" size="mini" v-model="scope.row.remark"  placeholder="请输入备注"></el-input>
                </template>
            </el-table-column>
        </el-table>
     </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import PageNation from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import {queryAllocateInList,queryStationCode,createAllocate,} from '@/api/storeIn'
import {selectCol,} from '@/api/storeOut'
import {queryWarehouseColDropDown,getGoodsByMes} from '@/api/location'
export default {
  components:{
    PageNation,SearchFilter
  },
  data(){
      return {
          openAllocate:false,
          value:"",
          data:[],
          options:[],
          allocateData:[],
          form:{
            warehouseCode:"",
          },
          obj:{
            warehouseName:"",
            locationCode:"",
            colIndexAliasList:"",
            functionAreaCode:"",
            stationCode:"",
          },
          rules:{},
          warehouseOptions:[],
          warehouseArr:[],
          colIndexAliasListOptions:[],
          colIndexAliasList:[],
          warehouseCodeOptions:[],
          functionAreaCodeOptions:[],
          locationCodeOptions:[],
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
          
      }
  },
  mounted(){
      this.user= JSON.parse(localStorage.getItem("data")).username
      this.queryAllocateInList()
      this.warehouse()
  },
  methods:{
    handelStationCode(val){
      this.locationCodeOptions.forEach((v)=>{
        if(v.stationCode==val){
          this.obj.stationName=v.stationName
        }
      })
    },
      async handelQrCode(){
        if(this.value){
          const res = await getGoodsByMes(this.value)
          if(res.code=='0'){
            this.allocateData=[res.data]
          }
        }else{
          this.allocateData=[]
        }
        
      },
      handelStartTimeStr(row){
          if(this.dataList.length>0){
              const arr=this.dataList
              this.options.forEach((v)=>{
                if(v.stationCode==row.allocateLocation){
                  this.stationCode=v.stationName
                }
              })
              this.dataList=arr.map((v)=>{
                  if(v.onlyCode==row.onlyCode){
                      return {
                        ...v,
                        startTimeStr:row.startTimeStr,
                        locationCode:row.allocateLocation,
                        remark:row.remark,
                        allocateUser:this.user,
                        stationCode:this.stationCode,
                      }
                  }
              })
          }else{
            this.options.forEach((v)=>{
              if(v.stationCode==row.allocateLocation){
                this.stationCode=v.stationName
              }
            })
          }
      },
      async queryStationCode(){
        const params={
          areaCode:this.num[0],
          warehouseCode:this.obj.warehouseCode,
          functionType:'IN',
          functionCode:'IN',
          colIndexAliasList:this.obj.colIndexAliasList,
          functionAreaCode:this.obj.functionAreaCode,
        }
        const res = await queryStationCode(params)
        this.locationCodeOptions=res.data
      },
      handelSelect(val){
        this.dataList = val.map((v)=>{
            return {
            ...v,
            allocateUser:this.user,
            locationCode:v.allocateLocation,
            stationCode:this.stationCode,
          }
        })
      },
      handelAdd(){
        this.openAllocate = true
        this.warehouse()
      },
      resetForm(){
        // this.dataList=[]
        this.allocateData=[]
        this.obj={}
        this.openAllocate = false
      },
      async submitForm(){
        const params={
            areaCode:this.obj.functionAreaCode,
            warehouseCode:this.obj.warehouseCode,
            warehouseName:this.obj.warehouseName,
            dataList:[
              {
                colIndex:this.obj.colIndexAliasList,
                locationCode:this.obj.locationCode,
                mesBoxNumberQrCode:this.value,
                mesCustomerShortName:this.allocateData[0].customer_name_short,
                mesLeftRightSides:this.allocateData[0].mesLeftRightSides,
                mesMeterLength:this.allocateData[0].length,
                mesNormsName:this.allocateData[0].specification_name,
                mesSpecialRequirements:this.allocateData[0].requirement,
                mesWheelType:this.allocateData[0].wheel,
                remark:this.allocateData[0].remark,
                stationCode:this.obj.stationCode,
              }
            ],
          }
          const res = await createAllocate(params)
          if(res.code==='0'){
              this.$message.success(res.msg)
              // this.dataList=[]
              this.allocateData=[]
              this.obj={}
              this.openAllocate = false
              this.queryAllocateInList()
          }
      },
      async warehouse(){
          const res = await queryWarehouseColDropDown({})
          if(res.code==='0'){
            this.warehouseOptions = res.data
            this.warehouseArr=res.data 
            this.form.warehouseCode = res.data[1].key
          }
      },
      // 获取第一层
      warehouseCodeChanged(value) {
        this.obj.functionAreaCode=''
        this.obj.colIndexAliasList=''
        this.obj.locationCode=''
        this.obj.stationName=''
        this.value=''
        this.allocateData=[]
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
        this.obj.colIndexAliasList=''
        this.obj.locationCode=''
        this.obj.stationName=''
        this.value=''
        this.allocateData=[]
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
        this.obj.locationCode=''
        this.obj.stationName=''
        this.value=''
        this.allocateData=[]
          if(val){
              this.colIndexAliasListOptions.forEach((v) => {
                  if (val.includes(v.value)) {
                    this.num.push(v.key);
                  }
              });
          }
          this.queryStationCode()
      },
      
      // handleSelectionChange(select){
      //     this.ids=select.map((v)=>v.id)
      // },
      // handelBatchDelate(){
      //     if(this.ids.length>0){
      //         this.$message.info('请先选择数据')
      //     }else{
      //         this.deleteAllocate()
      //     }
      // },
      // handelDelete(index,row){
      //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //     }).then(async () => {
      //         this.deleteAllocate(row.id)
      //     }).catch(() => {
      //         this.$message({
      //             type: 'info',
      //             message: '已取消删除'
      //         });          
      //     });
      // },
      // async deleteAllocate(val){
      //     const id = val || this.ids
      //     const res = await deleteAllocate(id)
      //     if(res.code==='0'){
      //         this.$message.success(res.msg);
      //     }else{
      //         this.$message.error(res.msg);
      //     }
      // },
      search(){
          this.queryAllocateInList()
      },
      reset(){
          // this.form={}
          this.queryAllocateInList()
      },
      handelIsFinished(){
          this.queryAllocateInList()
      },
      pageChange(val) {
          this.listQuery.pageNum = val.page-1;
          this.listQuery.pageSize = val.limit;
          this.queryAllocateInList();
      },
      async queryAllocateInList(){
          const params={
            warehouseCode:this.form.warehouseCode,
              // isFinished:0,
              pageNumber: this.listQuery.pageNum,
              pageSize: this.listQuery.pageSize
          }
          const res = await queryAllocateInList(params)
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