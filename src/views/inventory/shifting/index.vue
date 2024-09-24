<template>
  <div class="warpper">
    <div class="table-filter">
      <SearchFilter
        :labelWidth="'130px'"
        size="mini"
        :maxShow="3"
        @search="search"
        @reset="reset"
      >
        <el-form-item label="移库单开始创建">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.createTimeStart"
              type="date"
              placeholder="开始时间"
              @change="handelCreateTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="移库单结束创建">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.createTimeEnd"
              type="date"
              placeholder="结束时间"
              @change="handelCreateTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="移库单开始完成">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.finishedTimeStart"
              type="date"
              placeholder="开始时间"
              @change="handelFinishedTimeStart"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="移库单结束完成">
          <div class="time">
            <el-date-picker
              size="mini"
              v-model="form.finishedTimeEnd"
              type="date"
              placeholder="结束时间"
              @change="handelFinishedTimeEnd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="搜索框">
          <el-input
            size="mini"
            v-model="form.keyWord"
            placeholder="请输入内容"
            @keyup.enter.native="selectBlur"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            clearable
            @change="handelStatus"
            v-model="form.status"
            placeholder="请选择状态"
            size="mini"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </SearchFilter>
    </div>
    <div class="table">
      <div class="enteringButton">
        <el-button type="primary" @click="handelCreateShifting" size="mini"
          >创建移库单</el-button
        >
        <el-button type="primary" @click="handelBatchDelate" size="mini"
          >批量删除</el-button
        >
        <el-button type="primary" @click="handelStartShfting" size="mini"
          >开始移库</el-button
        >
      </div>
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%"
        :data="data"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :selectable="checkSelectable"
          type="selection"
          width="70"
        >
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="name" label="移库名称"> </el-table-column>
        <el-table-column prop="statusEnum" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.statusEnum === '未开始'">{{
              scope.row.statusEnum
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.statusEnum === '已完成'"
              type="success"
              >{{ scope.row.statusEnum }}</el-tag
            >
            <el-tag v-else type="info">{{ scope.row.statusEnum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="finishedTime" label="移库完成时间">
        </el-table-column>
        <el-table-column prop="moveUser" label="移库人">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)"
              >明细</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.status === 0"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
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
    <el-dialog title="明细表" :visible.sync="dialogVisible" width="60%">
      <el-descriptions class="margin-top" :column="3">
        <el-descriptions-item label="移库单主表编号">
          <descriptionsTooltip :value="tableHeader.code"></descriptionsTooltip
        ></el-descriptions-item>
        <el-descriptions-item label="移库名称">{{
          tableHeader.name
        }}</el-descriptions-item>
        <el-descriptions-item label="移库单创建时间">{{
          tableHeader.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="移库完成时间">{{
          tableHeader.finishedTime
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          {{ tableHeader.remark ? tableHeader.remark : "无" }}
        </el-descriptions-item>
      </el-descriptions>
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="detail"
        style="width: 100%; margin-top: 30px"
      >
        <el-table-column prop="index" label="#" > </el-table-column>
        <el-table-column prop="mesBoxNo" label="箱号" width="90"> </el-table-column>
          <el-table-column prop="mesBoxNumberQrCode" label="箱号二维码" width="200"> </el-table-column>
        <el-table-column prop="warehouseCodeBefore" label="移库前库位编号">
        </el-table-column>
        <el-table-column prop="warehouseCodeAfter" label="移库后库位编号">
        </el-table-column>
        <el-table-column prop="mesNormsNo" label="规格代码">
        </el-table-column>
        <el-table-column prop="mesNormsName" label="规格简称">
        </el-table-column>
        <el-table-column prop="mesCustomerShortName" label="客户简称">
        </el-table-column>
        <el-table-column prop="mesWheelType" label="轮型">
        </el-table-column>
        <el-table-column prop="mesMeterLength" label="米长">
        </el-table-column>
        <el-table-column prop="mesLeftRightSides" label="左右面">
          <template slot-scope="scope">
            <span>{{ scope.row===0?'左':"右" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mesSpecialRequirements" label="特殊要求">
        </el-table-column>
        <el-table-column prop="mesTray" label="托盘">
        </el-table-column>
        <el-table-column prop="statusEnum" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.statusEnum === '未开始'">{{
              scope.row.statusEnum
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.statusEnum === '已完成'"
              type="success"
              >{{ scope.row.statusEnum }}</el-tag
            >
            <el-tag v-else type="info">{{ scope.row.statusEnum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finishedTime" label="移库完成时间" width="180">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :before-close="handleClose"
      title="创建移库单"
      :visible.sync="dialogVisible_1"
      width="80%"
    >
      <el-form ref="shiftingForm" size="mini"  label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="移库名称" >
              <el-input v-model="name" placeholder="请输入移库名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆" >
              <!-- vehicleOptions @change="handelWarehouseCode"-->
              <el-select  v-model="vehicle" placeholder="请选择车辆" >
                <el-option
                  v-for="item in vehicleOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="移库人" >
              <el-input v-model="moveUser" placeholder="请输入移库人"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="移库库房" >
              <!-- @change="handelWarehouseCode" -->
              <el-select v-model="warehouseCode" placeholder="请选择" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="移库区域">
              <el-select v-model="area" placeholder="请选择" @change="handelArea">
                <el-option
                  v-for="item in warehouseArea"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="移库起始列">
              <el-select  v-model="onlyCode" placeholder="请选择" @change="handelshiftingCol">
                <el-option
                  v-for="item in optionsCol"
                  :key="item.colIndexAlias"
                  :label="item.colIndexAlias"
                  :value="item.onlyCode">
                  <span style="float: left">{{ item.colIndexAlias }}</span>
                  <span style="float: right; color: #8492a6; font-size: 11px">可移库数量{{item.used }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="移库终点列">
              <el-select v-model="moveTarget.onlyCode" placeholder="请选择">
                <el-option
                  v-for="item in targetInfo"
                  :key="item.colIndexAlias"
                  :label="item.colIndexAlias"
                  :value="item.onlyCode"
                  :disabled="!item.capacity">
                  <span style="float: left">{{ item.colIndexAlias }}</span>
                  <span style="float: right; color: #8492a6; font-size: 11px">可容量{{item.capacity }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="start">
        <div class="top">
          <h4>移库货物列表</h4>
          <el-form ref="count" size="mini" :model="moveStart" label-width="90px">
            <el-form-item label="移库数量">
              <el-input @change="handelCount" v-model="moveStart.count" placeholder="请输入移库数量"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%"
        :data="goodsInfo"
        ref="goodsInfo"
        height="400"
        :header-cell-class-name="cellClass"
        >
          <el-table-column
            type="selection"
            :selectable="selectableGoodsInfo"
            width="100"
          >
          </el-table-column>
          <el-table-column type="index" label="#"> </el-table-column>
          <!-- <el-table-column prop="mesBoxNo" label="箱号" width="90"> </el-table-column>
          <el-table-column prop="mesBoxNumberQrCode" label="箱号二维码" width="200"> </el-table-column> -->
          <el-table-column prop="mesNormsName" label="规格简称"> </el-table-column>
          <el-table-column prop="mesCustomerShortName" label="客户简称"> </el-table-column>
          <el-table-column prop="mesMeterLength" label="米长"> </el-table-column>
          <el-table-column prop="mesWheelType" label="轮型"> </el-table-column>
          <el-table-column prop="mesLeftRightSidesName" label="左右面"></el-table-column>
          <!-- <el-table-column prop="wmsStatusName" label="状态"></el-table-column> -->
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="handelShiftingCreate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import descriptionsTooltip from '@/components/Descriptions'
import PageNation from "@/components/Pagination";
import { queryEnumList } from '@/api/dispatch';
import { queryMoveList, 
  queryMoveDetailList, 
  deleteMove,
  createMove,
  getMoveAreaInfo,
  getMoveColStartInfo,
  getMoveColTargetInfo,
  getSelectColGoodsInfo,
  moveConfirm} from "@/api/shifting";
import SearchFilter from "@/components/SearchFilter";
import moment from "moment";
export default {
  name: "shifting",
  components: { PageNation, SearchFilter,  descriptionsTooltip },
  data() {
    return {
      options:[],
      vehicleOptions:[
        {key:1,value:"0001"},
        {key:2,value:"0002"},
        {key:3,value:"0003"},
        {key:4,value:"0004"},
        {key:5,value:"0005"},
        {key:6,value:"0006"},
        {key:7,value:"0007"},
        {key:8,value:"0008"},
        {key:9,value:"0009"},
        {key:10,value:"0010"},
        {key:11,value:"0011"},
        {key:12,value:"0012"},
        {key:13,value:"0013"},
        {key:14,value:"0014"},
        {key:15,value:"0015"},
      ],
      warehouseArea:[],
      optionsCol:[],
      goodsInfo:[],
      targetInfo:[],
      warehouseCode:"",
      area:"",
      onlyCode:"",
      name:"",
      vehicle:"",
      moveUser:"",
      moveStart:{
        count:"",
      },
      moveTarget:{
        onlyCode:"",
      },
      dialogVisible_1: false,
      dialogVisible: false,
      data: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      loading: true,
      detail: [],
      multipleSelection: [],
      tableHeader: {},
      form: {
        keyWord: "",
        status: "",
        moveUser:"",
        createTimeEnd: "",
        createTimeStart: "",
        finishedTimeEnd: "",
        finishedTimeStart: "",
      },
      statusOptions: [
        {
          key: 0,
          value: "未开始",
        },
        {
          key: 1,
          value: "移库中",
        },
        {
          key: 2,
          value: "已完成",
        },
      ],
    };
  },
  mounted() {
    this.queryMoveList();
  },
  methods: {
    handleClose(){
      this.dialogVisible_1 = false;
      this.name= "";
      this.vehicle ="";
      this.moveUser="";
      this.moveStart.count ="";
      this.onlyCode ="";
      this.moveTarget.onlyCode ="";
      this.warehouseCode="";
      this.area="";
      this.goodsInfo=[];
    },
    handelStartShfting(){
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.moveConfirm(this.multipleSelection);
      } else {
        this.$message({
          showClose: true,
          message: "请先选择移库单",
          type: "warning",
        });
      }
    },
    async handelShiftingCreate(){
      const params ={
        name:this.name,
        vehicle:this.vehicle,
        // moveUser:this.moveUser,
        moveStart:{
          ...this.moveStart,
          onlyCode:this.onlyCode,
          warehouseCode:this.warehouseCode,
        },
        moveTarget:{
          ...this.moveTarget,
          count:0,
          warehouseCode:this.warehouseCode,
        }
      }
      const res=await createMove(params);
     if(res.code === '0')
     {
      this.queryMoveList();
      this.dialogVisible_1 = false;
      this.name= "";
      this.vehicle ="";
      this.moveStart.count ="";
      this.onlyCode ="";
      this.moveTarget.onlyCode ="";
      this.warehouseCode="";
      this.area="";
      this.goodsInfo=[];
     }else{
      this.$message.error(res.msg);
     }
    },
    handelCount(){
      if(this.moveStart.count){
        this.$refs.goodsInfo.clearSelection();
        for (let i=0; i<this.moveStart.count; i++) {
          this.$refs.goodsInfo.toggleRowSelection(this.goodsInfo[i]);
        }
      }else {
        this.$refs.goodsInfo.clearSelection();
      }
      
    },
    selectableGoodsInfo(row,index){
      return 
    },
    cellClass(row) {
      if(row.columnIndex === 0){
        return "DisableSelection";
      }
    },
    async handelCreateShifting() {
      this.dialogVisible_1 = true;
      const res = await queryEnumList('WarehouseCodeEnum');
      if(res.code === "0") {
        this.options = res.data;
        this.warehouseCode=res.data[0].key;
        this.getMoveAreaInfo()
      }
    },
    handelWarehouseCode(){
      this.getMoveAreaInfo()
    },
    async getMoveAreaInfo() {
      const res = await getMoveAreaInfo(this.warehouseCode);
      if(res.code === "0") {
        this.warehouseArea = res.data.map((v,ind)=>{
          return{
            value:v,
            key:ind,
          }
        })
      }
    },
    async handelArea(){
      const params={
        warehouseCode:this.warehouseCode,
        area:this.area,
      }
      const res = await getMoveColStartInfo(params);
      if(res.code==='0') {
        this.optionsCol = res.data
      }
    },
    handelshiftingCol(val){
      const params={
        onlyCode:val,
        warehouseCode:this.warehouseCode,
      }
      this.moveStart.count = "";
      this.moveTarget.onlyCode = "";
      this.getSelectColGoodsInfo(params);
      this.getMoveColTargetInfo(params)
    },
    async getSelectColGoodsInfo(params){
      const res = await getSelectColGoodsInfo(params);
      if(res.code === '0')
      {
        this.goodsInfo=res.data
      }
    },
    async getMoveColTargetInfo(params){
      const res = await getMoveColTargetInfo(params)
      if(res.code === '0')
      {
        this.targetInfo=res.data.map(v=>{
          return {
            ...v,
            capacity:v.total - v.used
          }
        })
      }else {
        this.targetInfo=[]
      }
    },
    // handleClose() {
    //   this.dialogVisible_1 = false;
    // },
    handelConfirm() {
      this.dialogVisible_1 = false;
      this.queryMoveList();
    },
    search() {
      this.queryMoveList();
    },
    reset() {
      this.form = {
        keyWord: "",
        status: "",
        createTimeEnd: "",
        createTimeStart: "",
        finishedTimeEnd: "",
        finishedTimeStart: "",
      };
      this.queryMoveList();
    },
    selectBlur() {
      this.queryMoveList();
    },
    handelStatus() {
      this.queryMoveList();
    },
    handelCreateTimeStart(val) {
      this.form.createTimeStart = moment(val).valueOf();
      this.queryMoveList();
    },
    handelCreateTimeEnd(val) {
      this.form.createTimeEnd = moment(val).valueOf();
      this.queryMoveList();
    },
    handelFinishedTimeEnd(val) {
      this.form.finishedTimeEnd = moment(val).valueOf();
      this.queryMoveList();
    },
    handelFinishedTimeStart(val) {
      this.form.finishedTimeStart = moment(val).valueOf();
      this.queryMoveList();
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryMoveList();
    },
    async queryMoveList() {
      const params = {
        request: this.form,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      };
      const res = await queryMoveList(params);
      if (res.code === "0") {
        this.data = res.data.items;
        this.loading = false;
        this.total = res.data.total;
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    // 批量删除 选择 盘点单
    handleSelectionChange(val) {
      let arr = []
      val.forEach((v) => {
        arr.push(v.id);
      });
      this.multipleSelection = [...new Set(arr)]
    },
    // 删除单个
    async handleDelete(row) {
      this.$confirm("确定要取消吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteMove([row.id]);
      }).catch((err) => {
        console.log(err)
      })

    },
    checkSelectable(row) {
      return row.status === 0;
    },
    async handelBatchDelate() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.deleteMove(this.multipleSelection);
      } else {
        this.$message({
          showClose: true,
          message: "请先选择移库单",
          type: "warning",
        });
      }
    },
    async moveConfirm(arr){
      this.$confirm("是否确定移库？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await moveConfirm(arr);
          if (res.code === "0") {
            this.queryMoveList();
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
        .catch(() => { });
    },
    async deleteMove(arr) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteMove(arr);
          if (res.code === "0") {
            this.queryMoveList();
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
        .catch(() => { });
    },
    // 查看明细单
    async handleDetail(row) {
      this.tableHeader = row;
      const res = await queryMoveDetailList(row.code);
      if (res.code === "0") {
        this.dialogVisible = true;
        this.detail = res.data.map((v, ind) => {
          return {
            ...v,
            index: ind + 1,
          };
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.warpper {
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 10px;
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
  .start{
    h4{
      padding: 4px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 6px;
    }
  }
  .end{
    margin-top: 10px;
    h4{
      padding: 4px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 6px;
    }
  }
}
ul {
  display: flex;
}
.hiden {
  display: inline-block;
  width: calc(100% - 112px);
  // overflow: hidden;
}
::v-deep .el-descriptions__body .el-descriptions__table {
  white-space: nowrap !important;
}
::v-deep .el-descriptions-item__content {
  width: 100px;
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
  width: 180px;
}
.time {
  ::v-deep .el-input__suffix {
    right: 2.6125rem;
  }
}
.el-table ::v-deep .DisableSelection > .cell {
  display: none;
}
</style>