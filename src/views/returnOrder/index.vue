<template>
    <div class="warpper">
      <div class="table-filter">
        <SearchFilter
          :labelWidth="'130px'"
          size="mini"
          :maxShow="5"
          @search="search"
          @reset="reset"
        >
          <el-form-item label="批号">
            <el-input v-model="form.batchNo" placeholder="请输入批号"></el-input>
          </el-form-item>
          <el-form-item label="发货单创建-开始时间">
            <el-date-picker
                v-model="form.createTimeStart"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                placeholder="选择发货单创建-开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发货单创建-结束时间">
            <el-date-picker
                v-model="form.createTimeEnd"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                placeholder="选择发货单创建-结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户简码">
            <el-input v-model="form.customerSimpleCode" placeholder="请输入客户简码"></el-input>
          </el-form-item>
          <el-form-item label="客户全称">
            <el-input v-model="form.mesCustomerFullName" placeholder="请输入客户全称"></el-input>
          </el-form-item>
          <el-form-item label="客户简称">
            <el-input v-model="form.mesCustomerShortName" placeholder="请输入客户简称"></el-input>
          </el-form-item>
          <el-form-item label="单号">
            <el-input v-model="form.no" placeholder="请输入单号"></el-input>
          </el-form-item>
          <el-form-item label="收货单位">
            <el-input v-model="form.receivingUnitDeliveryNote" placeholder="请输入收货单位"></el-input>
          </el-form-item>
          <el-form-item label="发货状态">
            <el-input v-model="form.statusEnum" placeholder="请输入发货状态"></el-input>
          </el-form-item>
          <el-form-item label="发货类型">
            <el-select v-model="form.wmsDeliverTypeEnum" placeholder="请选择发货类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
        </SearchFilter>
      </div>
      <div class="table">
        <div class="enteringButton">
            <el-button  type="primary" @click="openCreate = true" size="mini"
            >创建返库单</el-button
            >
            <el-button  type="primary" @click="handelStartReturn" size="mini"
            >开始返库</el-button
            >
            <el-button  type="primary" @click="handelBatchDelete" size="mini"
            >批量删除</el-button
            >
        </div> 
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column  type="index" label="序号" width="80" fixed> </el-table-column>
          <!-- <el-table-column  fixed prop="batchNo" label="批号"> </el-table-column> -->
          <!-- <el-table-column fixed prop="no" label="单号" width="238"> </el-table-column> -->
          <el-table-column prop="completeNum" label="已完成数量"> </el-table-column>
          <!-- <el-table-column prop="contractNo" label="合同号"> </el-table-column> -->
          <el-table-column prop="deliverBoxNum" label="发货箱数"> </el-table-column>
          <el-table-column prop="deliverGrossWeight" label="发货毛重"> </el-table-column>
          <el-table-column prop="deliverNetWeight" label="发货净重"> </el-table-column>
          <!-- <el-table-column prop="deliveryBatch" label="交货批次"> </el-table-column> -->
          <el-table-column prop="deliveryPerson" label="发货员"> </el-table-column>
          <!-- <el-table-column prop="documentInputBox1" label="文档输入框1"> </el-table-column>
          <el-table-column prop="documentInputBox2" label="文档输入框2"> </el-table-column> -->
          <el-table-column prop="planBoxCountLeft" label="计划箱数左"> </el-table-column>
          <el-table-column prop="planBoxCountRight" label="计划箱数右"> </el-table-column>
          <el-table-column prop="produceDate" label="生产日期"> </el-table-column>
          <el-table-column prop="reduceWeightPerBox" label="每箱减少重量"> </el-table-column>
          <el-table-column prop="statusEnum" label="状态" width="180"></el-table-column>
          <el-table-column prop="wmsDeliverTypeEnum" label="WMS发货类型" width="180"></el-table-column>
          <el-table-column prop="remark" label="备注" width="180"></el-table-column>
          <el-table-column  label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                v-permission="{ name: 'isDelete' }"
                type="text"
                size="mini"
                class="edit-btn"
                @click="delRow(scope.row)"
                >删除</el-button
              >
              <el-button
                v-permission="{ name: 'isDelete' }"
                type="text"
                size="mini"
                class="edit-btn"
                @click="handelViewDetail(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="创建返库单"
        :visible.sync="openCreate"
        width="50%"
        @close="handleClose">
        <el-form :model="obj" size="small" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="选择发货单" prop="deliverGoodsId">
              <!-- <el-select v-model="obj.deliverGoodsId" placeholder="请选择发货单id">
                <el-option
                  v-for="item in deliverOptions"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id">
                </el-option>
              </el-select> -->
              <!-- deliverOptions -->
              <el-button @click="handelDispatch" size="mini" type="primary">发货单</el-button>
              <el-table
                :data="selectData"
                style="width: 100%;margin-top: 10px"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              >
                <el-table-column  type="index" label="序号" width="80"> </el-table-column>
                <el-table-column prop="no" label="单号" width="160"> </el-table-column>
                <el-table-column prop="mesNormsName" label="规格简称"> </el-table-column>
                <el-table-column prop="mesCustomerShortName" label="客户简称"> </el-table-column>
                <el-table-column prop="mesCustomerFullName" label="客户全称"> </el-table-column>
                <el-table-column prop="mesWheelType" label="轮型"> </el-table-column>
                <el-table-column prop="mesMeterLength" label="米长"> </el-table-column>
                <el-table-column prop="mesLeftRightSidesEnum" label="左右面"> </el-table-column>
                <el-table-column prop="remark" label="备注" ></el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="返库单名称" prop="name">
                <el-input v-model="obj.name" placeholder="请输入返库单名称"></el-input>
            </el-form-item>
            <el-form-item label="返库原因" prop="reason">
                <el-input v-model="obj.reason" placeholder="请输入返库原因"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="obj.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="handleClose">取 消</el-button>
            <el-button size="mini" type="primary" @click="handelConfirm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="返库单明细"
        :visible.sync="openDetail"
        width="70%"
        @close="openDetail = false">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column  type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="mesBoxNumberQrCode" label="箱号二维码"> </el-table-column>
          <el-table-column prop="mesNormsName" label="规格简称" width="238"> </el-table-column>
          <el-table-column prop="mesCustomerShortName" label="客户简称"> </el-table-column>
          <el-table-column prop="mesWheelType" label="轮型"> </el-table-column>
          <el-table-column prop="mesMeterLength" label="米长"> </el-table-column>
          <el-table-column prop="mesLeftRightSidesEnum" label="左右面"> </el-table-column>
          <el-table-column prop="mesSpecialRequirements" label="特殊要求"> </el-table-column>
          <el-table-column prop="readyStartTime" label="备货订单时间"> </el-table-column>
          <el-table-column prop="readyFinishTime" label="备货完成时间"> </el-table-column>
          <!-- prop="documentInputBox1" -->
          <el-table-column  label="备货区编号"> </el-table-column>
          <!-- documentInputBox2 prop=""-->
          <el-table-column  label="起点库位编号"> </el-table-column>
          <el-table-column prop="planBoxCountLeft" label="终点库位编号"> </el-table-column>
          <el-table-column prop="backStartTime" label="返库开始时间"> </el-table-column>
          <el-table-column prop="backFinishTime" label="返库完成时间"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <!-- <el-table-column prop="wmsDeliverTypeEnum" label="WMS发货类型"> </el-table-column> -->
          <!-- <el-table-column prop="statusEnum" label="返库原因" ></el-table-column> -->
          <el-table-column prop="remark" label="备注" ></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="openDetail = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="openDetail = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="发货单列表"
        :visible.sync="dispatchFlag"
        width="70%"
        class="dispatch"
        @close="dispatchFlag = false">
        <el-table
          :data="dispatchData"
          style="width: 100%"
          ref="myTable"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          @selection-change="handleSelectionChangeDispatchList"
        >
          <el-table-column
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column  type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="no" label="单号" width="160"> </el-table-column>
          <el-table-column prop="mesNormsName" label="规格简称"> </el-table-column>
          <el-table-column prop="mesCustomerShortName" label="客户简称"> </el-table-column>
          <el-table-column prop="mesCustomerFullName" label="客户全称"> </el-table-column>
          <el-table-column prop="mesWheelType" label="轮型"> </el-table-column>
          <el-table-column prop="mesMeterLength" label="米长"> </el-table-column>
          <el-table-column prop="mesLeftRightSidesEnum" label="左右面"> </el-table-column>
          <el-table-column prop="remark" label="备注" ></el-table-column>
        </el-table>
        <div class="pagenation">
          <PagiNation
            v-show="total_1 > 0"
            :total="total_1"
            :page.sync="listQuery_1.pageNum"
            :limit.sync="listQuery_1.pageSize"
            @pagination="pageChange_1"
          />
        </div>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button size="mini" @click="dispatchFlag = false">取 消</el-button> -->
            <el-button size="mini" type="primary" @click="handelConfirmDispatch">确 定</el-button>
        </span>
      </el-dialog>
      <div class="pagenation">
        <PagiNation
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      </div>
    </div>
  </template>
  <script>
  import PagiNation from "@/components/Pagination";
  import {queryDeliverGoodsList} from '@/api/dispatch'
  import { queryTurnBackList,deleteTurnBack,turnBackCreate,startTurnBack,queryTurnBackDetailList} from "@/api/returnOrder";
  import SearchFilter from "@/components/SearchFilter";
  export default {
    name: "operationLog",
    components: { PagiNation, SearchFilter },
    data() {
      return {
        openCreate:false,
        openDetail:false,
        dispatchFlag:false,
        options:[
            {value:0,label:"内贸"},
            {value:1,label:"三资内贸"},
            {value:2,label:"中资外贸"},
            {value:3,label:"外贸"}],
        form: {},
        obj:{},
        ids:[],
        deliverOptions:[],
        rules:{
            deliverGoodsId:[
                { required: true, message: '请输入发货单id', trigger: 'blur' },
                {type: 'number',message: '请输入发货单id',trigger: 'blur'}
            ],
            name:[
                { required: true, message: '请输入返库单名称', trigger: 'blur' },
            ],
            reason:[
                { required: true, message: '请输入返库原因', trigger: 'blur' },
            ]
        },
        tableData: [],
        detailData:[],
        dispatchData:[],
        selectData:[],
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total_1:0,
        listQuery_1: {
          pageNum: 1,
          pageSize: 10,
        },
        selectProtocolId:"",
      };
    },
    mounted() {
      this.queryTurnBackList();
    },
    methods: {
      handelConfirmDispatch(){
        this.dispatchFlag=false
      },
      pageChange_1(val){
        this.listQuery_1.pageNum= val.page;
        this.listQuery_1.pageSize=val.limit
        this.queryDeliverGoodsList()
      },
      handelDispatch(){
        this.dispatchFlag=true
        this.queryDeliverGoodsList()
      },
      handleSelectionChangeDispatchList(val){
        this.selectData=val
        this.obj.deliverGoodsId=val[0].id
        if (val.length > 1) {
            this.$refs.myTable.clearSelection();
            this.$refs.myTable.toggleRowSelection(val.pop());
        }
        if(val.length != 0){
            this.selectProtocolId = val[val.length - 1].id;
        }
      },
      async queryDeliverGoodsList() {
      const params = {
        request:{
          status:6,
        },
        page: this.listQuery_1.pageNum-1,
        size: this.listQuery_1.pageSize,
      };
      const res = await queryDeliverGoodsList(params);
      if (res.code === "0") {
        this.dispatchData = res.data.items.map((v)=>{
          return {
            ...v,
            count:v.completeNum+'/'+v.deliverBoxNum
          }
        });
        this.dispatchData.forEach((v)=>{
          if(v.id==this.selectProtocolId){
            this.$nextTick(()=>{
              this.$refs.myTable.toggleRowSelection(v);
            })
          }
        })
        this.total_1 = res.data.total;
      }
    },
       async handelViewDetail(row){
          const res = await queryTurnBackDetailList(row.mainCode)
          res.code==='0'? this.detailData = res.data:this.detailData = []
          this.openDetail=true
       },
       async handelStartReturn(){
        if(this.ids.length<=0){
            this.$message.error("请先选择返库单")
        }else{
            const res = await startTurnBack(this.ids)
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.queryTurnBackList();
            }else{
                this.$message.error(res.msg)
            }
        }
       },
       handelConfirm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.obj.user=JSON.parse(localStorage.getItem('data')).username
            const res = await turnBackCreate(this.obj)
            if(res.code==='0'){
                this.openCreate = false;
                this.$message.success(res.msg)
                this.selectProtocolId=''
                this.selectData=[]
                this.obj={}
                this.queryTurnBackList();
            }else{
                this.$message.error(res.msg)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(){
        this.obj={}
        this.openCreate = false
      },
      handelBatchDelete(){
        this.deleteTurnBack()
      },
      handleSelectionChange(selection){
        this.ids=selection.map((v)=>v.id)
      },
      async delRow(row){
        this.deleteTurnBack(row.id)
      },
      deleteTurnBack(id){
        this.$confirm(`此操作将永久删除该id为${id}的数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            const ids = id?[id]:this.ids
            const res = await deleteTurnBack(ids)
            if(res.code==='0'){
                this.$message({
                type: 'success',
                message: '删除成功!'
                });
                this.queryTurnBackList();
            }else{
                this.$message({
                    type: 'error',
                    message: res.msg
                }); 
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        // const res = await deleteTurnBack([row.id])
      },
      async queryTurnBackList() {
        const params = {
          request: this.form,
          page: this.listQuery.pageNum-1,
          size: this.listQuery.pageSize,
        };
        const res = await queryTurnBackList(params);
        if (res.code === "0") {
          this.tableData = res.data.items;
          this.total = res.data.total;
        }
      },
      pageChange(val) {
        this.listQuery.pageNum = val.page;
        this.listQuery.pageSize = val.limit;
        this.queryTurnBackList();
      },
      search() {
        this.queryTurnBackList();
      },
      reset() {
        this.form = {};
        this.queryTurnBackList();
      },
    },
  };
  </script>
  
  
  <style lang="scss" scoped>
  .warpper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table-filter {
      box-sizing: border-box;
      background-color: #fff;
      padding: 10px 15px;
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
    .control {
      box-sizing: border-box;
      display: flex;
      justify-content: right;
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;
      overflow: hidden;
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
  ::v-deep .el-drawer__body {
    padding: 0 16px;
  }
  ::v-deep .el-table .el-table__cell{
    padding: 0.54rem 0;
  }
  .dispatch{
    ::v-deep .el-table__header-wrapper  .el-checkbox{
      //找到表头那一行，然后把里面的复选框隐藏掉
      display:none
    }
  }
 
  </style>