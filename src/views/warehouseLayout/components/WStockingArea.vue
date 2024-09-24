<template>
  <div class="wrapper">
    <div class="record">
      <div class="clear" style="margin-right: 10px;">
        <span>清除：</span>
        <el-select style="margin-right: 10px;" size="mini" v-model="areaName"  placeholder="请选择区域">
          <el-option
            v-for="item in newArr"
            :key="item.value"
            :label="item.name"
            :value="item.text">
          </el-option>
        </el-select>
        <el-select style="margin-right: 10px;" size="mini" multiple v-model="stockingArea"  placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="selectClearReady">清除</el-button>
        <el-button type="primary" size="mini" @click="handelRuleList">绑定</el-button>
        <el-button type="primary" size="mini" @click="handelRuleListLook">查看</el-button>
      </div>
      <div class="tip">
        <!-- <span>
          <img src="@/assets/green.png" alt="" />:两层有货&nbsp;&nbsp;</span
        > -->
        <span>
          <img src="@/assets/yellow.png" alt="" />:一层有货&nbsp;&nbsp;</span
        >
        <span>
          <img src="@/assets/empty.png" alt="" />:没有货物&nbsp;&nbsp;</span
        >
        <!-- <span>
          <img src="@/assets/red.png" alt="" style="width:20px;height: 16px;" />:库位锁定&nbsp;&nbsp;</span
        > -->
        鼠标右击:启/禁用&nbsp;&nbsp;鼠标左击：查看货物信息
      </div>
      <!-- <el-button size="mini" @click="handelRecover" type="primary"
        >复位</el-button
      > -->
    </div>
    <div id="container"></div>
    <div
      v-show="flag"
      class="mask"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${hoverstyle.left}px, ${hoverstyle.top}px)`,
      }"
    >
      <li @click="handelForbidden(0)">禁用</li>
      <li @click="handelEnable(1)">启用</li>
    </div>
    <div
      v-show="luky"
      class="luck"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${clickstyle.left}px, ${clickstyle.top}px)`,
      }"
    >
      <li>车辆：{{luckObj.vehicleName}}</li>
      <li>库位名称：{{luckObj.vehicleName}}</li>
    </div>
    <el-dialog title="查看信息" :visible.sync="flagDetail" width="90%">
      <div class="information">
        <div>
          <h4>库位信息</h4>
          <li>库房：西库备货区</li>
          <li>坐标：{{this.x}}列{{this.y}}行</li>
        </div>
        <!-- <el-button size="mini" @click="handelBeacthClear" type="primary"
        >批量清空</el-button> -->
      </div> 
      <!-- @selection-change="handleSelectionChange" -->
      <el-table
        :data="obj"
        style="width: 100%; margin-top: 10px"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="alias"
          label="库位名称"
          width="270"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="mesBoxNumberQrCode"
          label="箱号二维码"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="mesCustomerShortName"
          label="MES客户简称"
          width="145"
        >
        </el-table-column>
        <el-table-column
          prop="mesCordStructure"
          label="MES帘线结构"
          width="270"
        >
        </el-table-column>
        <el-table-column prop="mesTray" label="MES托盘"> </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长">
        </el-table-column>
        <el-table-column prop="mesGrossWeight" label="MES毛重">
        </el-table-column>
        <el-table-column prop="mesLeftRightSidesName" label="MES左右面">
        </el-table-column>
        <el-table-column prop="mesIsSolderJoint" label="MES有无焊点">
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flagDetail = false">取 消</el-button>
        <el-button type="primary" @click="flagDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="禁用库位" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="开始列" prop="startColIndex">
          <el-input
            v-model="ruleForm.startColIndex"
            placeholder="请输入开始列"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束列" prop="endColIndex">
          <el-input
            v-model="ruleForm.endColIndex"
            placeholder="请输入结束列"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始行" prop="startRowIndex">
          <el-input
            v-model="ruleForm.startRowIndex"
            placeholder="请输入开始行"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束行" prop="endRowIndex">
          <el-input
            v-model="ruleForm.endRowIndex"
            placeholder="请输入结束行"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <!-- @click="handelCancel" -->
        <el-button >取 消</el-button>
        <!-- @click="handelConfrim" -->
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="启用库位" :visible.sync="dialogVisible_1" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="开始行" prop="startRowIndex">
          <el-input
            v-model="ruleForm.startRowIndex"
            placeholder="请输入开始行"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束行" prop="endRowIndex">
          <el-input
            v-model="ruleForm.endRowIndex"
            placeholder="请输入结束行"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始列" prop="startColIndex">
          <el-input
            v-model="ruleForm.startColIndex"
            placeholder="请输入开始列"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束列" prop="endColIndex">
          <el-input
            v-model="ruleForm.endColIndex"
            placeholder="请输入结束列"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <!-- @click="handelCancelStart" -->
        <el-button >取 消</el-button>
        <!-- @click="handelConfrimEnable" -->
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="绑定规则"
        :visible.sync="ruleFlag"
        width="70%">
          <span>区域：</span>
          <el-select style="margin-right: 10px;" size="mini" v-model="query.areaCode"  placeholder="请选择区域">
            <el-option
              v-for="item in newArr"
              :key="item.value"
              :label="item.name"
              :value="item.text">
            </el-option>
          </el-select>
          <span style="margin-left: 20px;">库列：</span>
          <el-select style="margin-right: 10px;" size="mini" multiple v-model="query.colIndexList"  placeholder="请选择库列">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-table
            ref="myTable"
            :data="tableData"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            @selection-change="handleSelectionChange"
            style="width: 100%;margin-top:10px">
            <el-table-column  type="selection" width="50" align="center"></el-table-column>
            <el-table-column
              prop="normsSimpleCode"
              label="规格简称">
            </el-table-column>
            <el-table-column
              prop="customerShortName"
              label="客户简称"
              width="180">
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
              prop="leftRightSidesEnum"
              label="左右面">
            </el-table-column>
            <el-table-column
              prop="specialRequirements"
              label="特殊要求">
            </el-table-column>
            <el-table-column
              prop="normsTypeEnum"
              label="规格类型">
            </el-table-column>
          </el-table>
          <div class="pagination" style="margin-top: 16px;display: flex;justify-content: flex-end;">
            <PageNation
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.pageNum"
              :limit.sync="listQuery.pageSize"
              @pagination="pageChange"
            />
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ruleFlag = false">取 消</el-button>
          <el-button type="primary" @click="handelConfirmRule">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="查看绑定规则"
        :visible.sync="ruleLookFlag"
        @selection-change="handleSelectionChangeDelete"
        width="70%">
        <div>
          <span>区域：</span>
          <el-select style="margin-right: 10px;" size="mini" v-model="form.areaCode"  placeholder="请选择区域">
            <el-option
              v-for="item in newArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px;">库列：</span>
          <el-select style="margin-right: 10px;" size="mini" multiple v-model="form.colIndexList"  placeholder="请选择库列">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="handelSearch">搜索</el-button>
          <el-button size="mini"  @click="handelReset">重置</el-button>
        </div>
        <el-button style="margin-top: 10px;" size="mini" type="primary" @click="handelBitchDelete">批量删除</el-button>
        <el-table
          ref="myTable"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          :data="ruleData"
          style="width: 100%;margin-top:10px">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="normsSimpleCode"
            label="规格简称">
          </el-table-column>
          <el-table-column
            prop="customerShortName"
            label="客户简称"
            width="180">
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
            prop="colIndex"
            label="库列">
          </el-table-column>
          <el-table-column
            prop="isEnabled"
            align="center"
            label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isEnabled" @change="handelEnable(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <!-- <el-button
                v-show="scope.row.isEnabled==0"
                size="mini"
                type="text"
                >启用</el-button>
              <el-button
                v-show="scope.row.isEnabled==1"
                size="mini"
                type="text"
                @click="handelDisable(scope.row)">禁用</el-button> -->
                <el-button
                size="mini"
                type="text"
                @click="handelDelect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination" style="margin-top: 10px;display: flex;justify-content: flex-end;">
          <PageNation
            v-show="totalRule > 0"
            :total="totalRule"
            :page.sync="listQueryRule.pageNum"
            :limit.sync="listQueryRule.pageSize"
            @pagination="pageChangeRule"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ruleLookFlag = false">取 消</el-button>
          <!-- <el-button type="primary" @click="handelConfirmRule">确 定</el-button> -->
        </span>
      </el-dialog>
  </div>
</template>
<script>
import Konva from 'konva'
import PageNation from "@/components/Pagination";
import { queryNormsList ,} from "@/api/specification";
import { 
  // getWarehouseShow, 
  getReadyGoodsByLocationCode,
  enableDisableLocation,
  getGoodsByLocationCode,
  clearLocation,
  basWarehouseVirtually,
  occupyrResourceShow,
  selectClearReady,
     addRule,
    enableStockUpRule,
    queryStockUpList,
    deleteStockUpRule,
  occupyResourceRelease } 
  from '@/api/location'
export default {
  name: "EastWarehouse",
  components:{
    PageNation
  },
  data() {
    return {
      ruleFlag:false,
      ruleLookFlag:false,
      wStage: null,
      layer: null,
      imageObj: null,
      width: 20,
      height: 15,
      flag: false,
      luky:false,
      flagDetail: false,
      isDrawing: false,
      startX: 0,
      startY: 0,
      dialogVisible: false,
      dialogVisible_1: false,
      image: null,
      hoverstyle: {
        left: 300,
        top: 300,
      },
      clickstyle: {
        left: 300,
        top: 300,
      },
      ruleForm: {
        endColIndex: '',
        endRowIndex: '',
        isEnable: 0,
        startColIndex: '',
        startRowIndex: '',
        warehouseCode: ""
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      listQueryRule:{
        page: 1,
        pageSize: 10,
      },
      totalRule:0,
      rules: {
        endColIndex: [
          { required: true, message: '请输入结束列', trigger: 'blur' },
        ],
        endRowIndex: [
          { required: true, message: '请输入结束行', trigger: 'change' }
        ],
      },
      obj: [],
      westAreaList: [],
      updateInterval: [],
      stationCode: null,
      goodsIdList: [],
      radio: false,
      react1: null,
      x: null,
      y: null,
      luckObj:{},
      luckArr:[],
      newArr:[],
      areaName:"",
      stockingArea:[],
      options:[
        {label:'1',value:1},
        {label:'2',value:2},
        {label:"3",value:3},
        {label:"4",value:4}
      ],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData:[],
      selectedRows:[],
      ruleData:[],
      ids:[],
      query:{},
      form:{
        areaCode:"",
        colIndexList:[],
        warehouseCode: 'WAREHOUSE-D-WEST'
      },
    }
  },
  mounted() {
    this.basWarehouseVirtually()
  //   window.addEventListener("resize", this.onWindowResize);
  //   this.occupyrResourceShow()
  //   this.initGetWarehouseShow()
  },
  // beforeDestroy() {
  //   window.addEventListener("resize", this.onWindowResize);
  //   clearInterval(this.updateInterval);
  // },
  methods: {
    handelSearch(){
        this.handelRuleListLook()
    },
    handelReset(){
      this.form={
        areaCode:'',
        colIndexList:[],
        warehouseCode:"",
      }
      this.handelRuleListLook()
    },
    pageChange(val){
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.handelRuleList()
    },
    pageChangeRule(val){
      this.listQueryRule.page = val.page-1;
      this.listQueryRule.pageSize = val.limit;
      this.handelRuleListLook()
    },
    handleSelectionChangeDelete(select){
        this.ids=select.map((v)=>v.id)
      },
      async handelBitchDelete(){
        if(this.ids.length==0){
          this.$message({
            message: '请选择要删除的数据',
            type: 'warning'
          });
        }else{
          const res = await deleteStockUpRule(this.ids)
          if(res.code=='0'){
            this.$message.success(res.msg)
            this.handelRuleListLook()
          }else{
            this.$message.error(res.msg)
          }
        }
      },
      handelDelect(row){
        const ids=[row.id]||this.ids
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteStockUpRule(ids)
          if(res.code=='0'){
            this.$message.success(res.msg)
            this.handelRuleListLook()
          }else{
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // async handelDisable(row){
      //   const params={
      //     id:row.id,
      //     enable:row.isEnabled,
      //   }
      //   const res = await enableStockUpRule(params)
      //   if(res.code=='0'){
      //     this.$message.success(res.msg)
      //     this.handelRuleListLook()
      //   }else{
      //     this.$message.error(res.msg)
      //   }
      // },
      async handelEnable(row){
        const params={
          id:row.id,
          enable:row.isEnabled==true?1:0,
        }
        const res = await enableStockUpRule(params)
        if(res.code=='0'){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
      },
      async handelRuleListLook(){
        const params={
          ...this.form,
          ...this.listQueryRule
        }
        const res= await queryStockUpList(params)
        if(res.code=='0'){
          this.ruleData=res.data.items
          this.totalRule=res.data.total
        }else{
          this.ruleData=[]
        }
        this.ruleLookFlag=true
      },
      async handelConfirmRule(){
        if(this.query.areaCode&&this.query.colIndexList&&this.selectedRows.length>0){
          const params={
          areaCode:this.query.areaCode,
          colIndexList: this.query.colIndexList,
          id: 0,
          ruleList:this.selectedRows,
          warehouseCode: 'WAREHOUSE-D-WEST'
        }
          const res = await addRule(params)
          if(res.code=='0'){
            this.$message.success(res.msg)
            this.ruleFlag = false
          }else{
            this.$message.error(res.msg)
          }
        }else{
          this.$message({
            message: '请选择区域、库列、绑定规则',
            type: 'warning'
          });
        }
      },
      handleSelectionChange(val){
        this.selectedRows = val;
      },
      async handelRuleList(){
        const params={
          page: this.listQuery.pageNum - 1,
          size: this.listQuery.pageSize,
          request:{ normsSimpleCode: "",normsType: '',}
        }
        const res = await queryNormsList(params)
        if(res.code=='0'){
          this.tableData=res.data.items
          this.total=res.data.total
        }
        this.ruleFlag = true
      },
    async selectClearReady(){
        if(!this.areaName){
          this.$message.error("请先选择区域")
        }
        const params={
          areaCode:this.areaName,
        }
        const res = await selectClearReady(params,this.stockingArea)
        if(res.code==='0'){
          this.stockingArea=[]
          this.newArr=[]
          this.areaName=''
          this.$message.success(res.msg)
          this.basWarehouseVirtually()
        }else{
          this.$message.error(res.msg)
        }
      },
    async handleDelete(row) {
      this.radio = true
      this.clearLocation(row.id)
    },
  //   handelBeacthClear() {
  //     this.radio = false
  //     this.clearLocation()
  //   },
    clearLocation(val) {
      this.$confirm("确定要释放吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async () => {
        const params = {
          goodsIdList: this.radio ? [val] : this.goodsIdList,
          locationCode: this.stationCode
        }
        const res = await clearLocation(params)
          if (res.code === '0') {
          //   this.layer.clear ()
            this.basWarehouseVirtually()
            this.getReadyGoodsByLocationCode(this.stationCode)
          //   if (res.data == 2) {
          //     this.rect1 = new Konva.Rect({
          //       x: 8 + this.width * this.x + (this.x * 8),
          //       y: 15 + this.height * this.y + (this.y * 6),
          //       width: 20,
          //       height: 15,
          //       fill: 'green',
          //     });
          //   } else if (res.data == 1) {
          //     this.rect1 = new Konva.Rect({
          //       x: 8 + this.width * this.x + (this.x * 8),
          //       y: 15 + this.height * this.y + (this.y * 6),
          //       width: 20,
          //       height: 15,
          //       fill: 'yellow',
          //     });
          //   } else {
          //     this.rect1 = new Konva.Rect({
          //       x: 8 + this.width * this.x + (this.x * 8),
          //       y: 15 + this.height * this.y + (this.y * 6),
          //       width: 20,
          //       height: 15,
          //       strokeWidth: 1,
          //       fill: "#fff",
          //       stroke: 'block',
          //     });
          //   }
          //   this.layer.add(this.rect1);
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
      })
      .catch(_ => { });
 
    },
  //   handleSelectionChange(val) {
  //     let arr = []
  //     val.forEach((v) => {
  //       arr.push(v.id)
  //     })
  //     this.goodsIdList = [...new Set(arr)]
  //   },
  //   async occupyrResourceShow(){
  //     if(this.layer){
  //       const res = await occupyrResourceShow("WAREHOUSE-D-EAST")
  //       this.luckArr=res.data.resourceVoList
  //       const conveyorbeltsArr=res.data.duckOccupy
  //       if(this.layer.find('.rect').length!==0){
  //         this.layer.find('.rect').forEach((v)=>{
  //           v.destroy()
  //         })
  //       }
  //       let conveyor=null
  //       if(conveyorbeltsArr!==null){
  //          conveyor = new Konva.Rect({
  //           x: 1540,
  //           y: 250,
  //           width:40,
  //           height: 260,
  //           strokeWidth: 1,
  //           stroke:'red',
  //           name:"conveyor"
  //         });
  //         this.layer.add(conveyor);
  //       }else{
  //         if(this.layer.find('.conveyor').length!==0){
  //           this.layer.find('.conveyor').forEach((v)=>{
  //             v.destroy()
  //           })
  //         }
  //       }
  //       const conveyorbelts = new Image();
  //       conveyorbelts.onload = () => {
  //         const img = new Konva.Image({
  //           x: 1525,
  //           y: 255,
  //           image: conveyorbelts,
  //           width:70,
  //           height: 250,
  //         });
  //         img.on('click',()=>{
  //             this.$confirm("确定要释放吗？", "提示", {
  //               confirmButtonText: "确定",
  //               cancelButtonText: "取消",
  //               type: "warning",
  //             })
  //             .then(() => {
  //               this.occupyResourceRelease(conveyorbeltsArr.resourceId)
  //             })
  //             .catch(_ => { });
  //         })
  //         this.layer.add(img);
  //       }
  //       conveyorbelts.src = require('@/assets/conveyorbelts.png');
  //       if(this.luckArr){
  //           for(let i=0;i<this.luckArr.length;i++){ 
  //           const luck = new Konva.Rect({
  //           x: 6+this.width * this.luckArr[i].col + (this.luckArr[i].col * 8) ,
  //           y: 12+this.height*this.luckArr[i].rowStart+ (this.luckArr[i].rowStart * 6),
  //           width: 24,
  //           height: 15*this.luckArr[i].count+ (this.luckArr[i].count * 6),
  //           strokeWidth: 2,
  //           stroke: 'red',
  //           name:"rect",
  //           });
  //           luck.on('click',async (e)=>{
  //             this.luky=false;
  //             this.$confirm("确定要释放吗？", "提示", {
  //               confirmButtonText: "确定",
  //               cancelButtonText: "取消",
  //               type: "warning",
  //             })
  //             .then(() => {
  //               this.occupyResourceRelease(this.luckArr[i].resourceId)
  //             })
  //             .catch(_ => { });
  //           })
  //         luck.on('mouseover', (e) => {
  //           this.luky=true;
  //           this.luckObj=this.luckArr[i]
  //           this.clickstyle.left=e.evt.layerX + 10
  //           this.clickstyle.top=e.evt.layerY + 10
  //          });
  //         luck.on('mouseout', (e) => {
  //           this.luky=false;
  //          });
  //         this.layer.add(luck);
  //       }
  //       }
  //     }
  //   },
  //    initGetWarehouseShow() {
  //     this.updateInterval = setInterval(async () => {
  //       this.occupyrResourceShow()
  //     }, 1500)
  //   },
  //  async occupyResourceRelease(val){
  //     const res=await occupyResourceRelease(val)
  //     if(res.code=='0'){
  //       if(res.data){
  //           this.occupyrResourceShow()
  //       }
  //       this.$message({
  //         message: res.msg,
  //         type: 'success',
  //         duration: 1000
  //       })
  //     }else{
  //       this.$message({
  //         message: res.msg,
  //         type: 'error',
  //         duration: 1000
  //       })
  //     }
  //   },
  //   onWindowResize() {
  //     const container = document.getElementById("container")
  //     this.screenWidth = container.clientWidth;
  //     this.screenHeight = container.clientHeight;
  //   },
    async getReadyGoodsByLocationCode(stationCode) {
      const res = await getReadyGoodsByLocationCode(stationCode)
      if (res.code === '0' || res.data.length > 0) {
        this.obj = res.data
      } else {
        this.obj = []
      }
    },
    handelCancelStart() {
      this.dialogVisible_1 = false;
      this.ruleForm = {
        endColIndex: '',
        endRowIndex: '',
        isEnable: 0,
        startColIndex: '',
        startRowIndex: '',
        warehouseCode: ""
      }
    },
    handelCancel() {
      this.dialogVisible = false;
      this.ruleForm = {
        endColIndex: '',
        endRowIndex: '',
        isEnable: 0,
        startColIndex: '',
        startRowIndex: '',
        warehouseCode: ""
      }
    },
    // handelForbidden(isEnable) {
    //   this.ruleForm.isEnable = isEnable
    //   this.dialogVisible = true
    //   this.flag = false
    // },
    // handelEnable(isEnable) {
    //   this.ruleForm.isEnable = isEnable
    //   this.dialogVisible_1 = true
    //   this.flag = false
    // },
  //   async handelConfrimEnable() {
  //     const params = {
  //       ...this.ruleForm,
  //       endColIndex: Number(this.ruleForm.endColIndex),
  //       endRowIndex: Number(this.ruleForm.endRowIndex),
  //       warehouseCode: "WAREHOUSE-D-EAST",
  //     }
  //     const res = await enableDisableLocation(params)
  //     if (res.code === '0') {
  //       this.dialogVisible_1 = false;
  //       this.basWarehouseVirtually()
  //       this.ruleForm = {
  //         endColIndex: '',
  //         endRowIndex: '',
  //         isEnable: 0,
  //         startColIndex: '',
  //         startRowIndex: '',
  //         warehouseCode: ""
  //       }
  //       this.$message({
  //         message: res.msg,
  //         type: 'success',
  //         duration: 1000
  //       })
  //     } else {
  //       this.$message({
  //         message: res.msg,
  //         type: 'error',
  //         duration: 1000
  //       })
  //     }
  //   },
  // //   // 禁用库位
  //   async handelConfrim() {
  //     const params = {
  //       ...this.ruleForm,
  //       endColIndex: Number(this.ruleForm.endColIndex),
  //       endRowIndex: Number(this.ruleForm.endRowIndex),
  //       warehouseCode: "WAREHOUSE-D-EAST",
  //     }
  //     const res = await enableDisableLocation(params)
  //     if (res.code === '0') {
  //       this.dialogVisible = false;
  //       this.basWarehouseVirtually()
  //       this.$message({
  //         message: res.msg,
  //         type: 'success',
  //         duration: 1000
  //       })
  //       this.ruleForm = {
  //         endColIndex: '',
  //         endRowIndex: '',
  //         isEnable: 0,
  //         startColIndex: '',
  //         startRowIndex: '',
  //         warehouseCode: ""
  //       }
  //     } else {
  //       this.$message({
  //         message: res.msg,
  //         type: 'error',
  //         duration: 1000
  //       })
  //     }
  //   },
    async basWarehouseVirtually() {
      const params = {
        warehouseCodeList: ['WAREHOUSE-D-WEST']
      }
      const res = await basWarehouseVirtually(params)
      if (res.code === '0') {
        let arr = res.data["WAREHOUSE-D-WEST"]
        let sortArr=[]
        for(let key in arr){
          sortArr.push({
            text:key,
            name:arr[key],
          })
        }
        this.newArr=sortArr.sort((a,b)=>{ return a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' })})
        this.westAreaList = this.newArr.map((v)=>{
          return {
            text:v.text,
            name:v.name,
            children:res.data[v.text]
          }
        })
        this.init()
      }
    },
    init() {
      const container = document.getElementById("container")
      this.wStage = new Konva.Stage({
        container: 'container',
        width: container.clientWidth,
        height: container.clientHeight,
      });
      this.layer = new Konva.Layer();
      this.wStage.add(this.layer);
      this.wStage.on('contextmenu', (e) => {
        e.evt.preventDefault();
      });
      let countRow=0,floor=0;
      for (let i = 0; i < this.westAreaList.length; i++) {
          const row = this.westAreaList[i].children;
          for(let k = 0; k < row.length; k++){
              const col = row[k]
              for(let j = 0; j < col.length; j++){
                  const smallRect = col[j]
                  const width = (this.width * col.length)  + (col.length * 8)
                  if(width*countRow>container.clientWidth){
                      countRow = 0;
                      floor++;
                  }
                  const height = this.height *floor + (floor * 10)
                  const rowText = new Konva.Text({
                    x: 2+width *countRow,
                    y:floor===0?floor*height+6:floor*height+105,
                    text: this.westAreaList[i].name,
                    fontSize: 14,
                    fontFamily: 'Calibri',
                    fill: '#222',
                  });
                  if (smallRect.e === 0) {
                    continue
                  }
                  if(smallRect.c === 0){
                    this.rect1 = new Konva.Rect({
                      x: countRow==0?(this.width * j) + (j  * 5)+2:(width *countRow)+(this.width * j) + (j  * 5),
                      y: floor===0?(this.height * k) + (k * 10)+30:(floor*height)+(this.height * k) + (k* 10)+125,
                      width: 20,
                      height: 15,
                      stroke: "block",
                      strokeWidth: 1,
                    });
                  }else if(smallRect.c === 1){
                    this.rect1 = new Konva.Rect({
                        x: countRow==0?(this.width * j) + (j  * 5)+2:(width *countRow)+(this.width * j) + (j  * 5),
                        y: floor===0?(this.height * k) + (k * 10)+30:(floor*height)+(this.height * k) + (k * 10)+125,
                          width: 20,
                          height: 15,
                          fill: 'yellow',
                      });
                  }
                  this.rect1.on('mousedown', (e) => {
                      if (e.evt.button === 0) {
                      this.flag = false;
                      this.luky=false;
                      this.flagDetail = true
                      this.stationCode = `W&${this.westAreaList[i].text}&${smallRect.x}-${smallRect.y}`
                      this.x = smallRect.x; this.y = smallRect.y
                      this.getReadyGoodsByLocationCode(this.stationCode)
                      this.clickstyle.left = e.evt.layerX + 10
                      // this.clickstyle.top = e.evt.layerY > 310 ? e.target.attrs.fill === 'yellow' ? e.evt.layerY - 210 : e.target.attrs.stroke == "block" ? e.evt.layerY - 320 : e.evt.layerY - 420 : e.evt.layerY + 10
                      } 
                  });
                  this.layer.add(this.rect1);
                  this.layer.add(rowText);
              }
          }
          countRow++;
          // for (let j = 0; j < row.length; j++) {
          //   const colText = new Konva.Text({
          //     x: 10,
          //     y:37+ 15* j+(j*6),
          //     text: j+1,
          //     fontSize: 15,
          //     fontFamily: 'Calibri',
          //     fill: 'green',
          //     width:20,
          //     align: 'center'
          //   });
          //   this.layer.add(colText);
          //   const smallRect = row[j]
          //   if (smallRect.e === 0) {
          //     continue
          //   }
          //   if (smallRect.c === 1) {
          //     this.rect1 = new Konva.Rect({
          //       x:  8+ this.width * smallRect.x + (smallRect.x * 8),
          //       y: 15 + this.height * smallRect.y + (smallRect.y * 6),
          //       width: 20,
          //       height: 15,
          //       strokeWidth: 1,
          //       fill: 'yellow',
          //       name:`${smallRect.x}-${smallRect.y}`
          //     });
          //   } else if (smallRect.c === 2) {
          //     this.rect1 = new Konva.Rect({
          //       x: 8 + this.width * smallRect.x + (smallRect.x * 8),
          //       y: 15+ this.height * smallRect.y + (smallRect.y * 6),
          //       width: 20,
          //       height: 15,
          //       strokeWidth: 1,
          //       fill: 'green',
          //       name:`${smallRect.x}-${smallRect.y}`
          //     });
          //   } else{
          //     this.rect1 = new Konva.Rect({
          //       x:8+ this.width * smallRect.x + (smallRect.x * 8),
          //       y: 15 + this.height * smallRect.y + (smallRect.y * 6),
          //       width: 20,
          //       height: 15,
          //       strokeWidth: 1,
          //       stroke: "block",
          //       name:`${smallRect.x}-${smallRect.y}`
          //     });
          //   }
          //   this.rect1.on('mousedown', (e) => {
          //     if (e.evt.button === 0) {
          //       this.flag = false;
          //       this.luky=false;
          //       this.flagDetail = true
          //       this.stationCode = `E&${smallRect.x}-${smallRect.y}`
          //       this.x = smallRect.x; this.y = smallRect.y
          //       this.getGoodsByLocationCode(this.stationCode)
          //       this.clickstyle.left = e.evt.layerX + 10
          //       // this.clickstyle.top = e.evt.layerY > 310 ? e.target.attrs.fill === 'yellow' ? e.evt.layerY - 210 : e.target.attrs.stroke == "block" ? e.evt.layerY - 320 : e.evt.layerY - 420 : e.evt.layerY + 10
          //     } else if (e.evt.button === 2) {
          //       this.luky=false;
          //       this.flag = true;
          //       this.ruleForm.startColIndex = i + 1;
          //       this.ruleForm.startRowIndex = j + 1;
          //       this.hoverstyle.left = e.evt.layerX + 10
          //       this.hoverstyle.top = e.evt.layerY + 10
          //     }
          //   });
          //   this.layer.add(this.rect1);
          // }
      }
      // this.imageObj = new Image();
      // this.imageObj.onload = () => {
      //   this.image = new Konva.Image({
      //     x: 0,
      //     y: 0,
      //     image: this.imageObj,
      //     width: 1535,
      //     height: 860,
      //   });
      //   // add the shape to the layer
      //   this.layer.add(this.image);
      //   this.image.on('mousedown', (e) => {
      //     if(e.evt.button===0){
      //       this.luky=false;
      //       this.flag = false;
      //     }else{
      //       this.flag = true;
      //       this.hoverstyle.left = e.evt.layerX + 10
      //       this.hoverstyle.top = e.evt.layerY + 10
      //     }
      //   });
    
      // };
      // this.imageObj.src = require('@/assets/eastImg.png');
      this.wStage.draw();
      // this.wheel()
    },
    wheel() {
      this.wStage.on("wheel", (e) => {
        this.flagDetail = false;
        this.flag = false;
        var max = 4;   // 放大最大的比例
        var min = 0.25; // 缩小最小的比例
        var step = 0.03; // 每次缩放的比例
        const x = e.evt.offsetX;
        const y = e.evt.offsetY;
        var offsetX = (x - this.layer.offsetX()) * this.layer.scaleX() / (this.layer.scaleX() - step) - (x - this.layer.offsetX());
        var offsetY = (y - this.layer.offsetY()) * this.layer.scaleY() / (this.layer.scaleY() - step) - (y - this.layer.offsetY());
        if (e.evt.wheelDelta) {
          if (e.evt.wheelDelta > 0) {
            // 放大
            if (this.layer.scaleX() < max && this.layer.scaleY() < max) {
              this.layer.scaleX(this.layer.scaleX() + step);
              this.layer.scaleY(this.layer.scaleY() + step)
              this.layer.move({ x: -offsetX, y: -offsetY }); // 跟随鼠标偏移位置
            }
          } else {
            // 缩小
            if (this.layer.scaleX() > min && this.layer.scaleY() > min) {
              this.layer.scaleX(this.layer.scaleX() - step);
              this.layer.scaleY(this.layer.scaleY() - step);
              this.layer.move({ x: offsetX, y: offsetY }); // 跟随鼠标偏移位置
            }
          }
        }
      })
    },
    handelRecover() {
      this.layer.scaleX(1)
      this.layer.scaleY(1)
      this.layer.position({ x: 0, y: 0 });
      this.wStage.position({ x: 0, y: 0 })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: relative;
  #container {
    position: absolute;
    width: 100%;
    margin-top: 8px;
    height: 100%;
  }
  .record {
    position: absolute;
    right: 0;
    top: -30px;
    display: flex;
    align-items: center;
    .tip {
      display: inline-block;
      margin-right: 30px;
      display: flex;
      span {
        display: flex;
        align-items: center;
      }
    }
  }
  .mask {
    background: #fff;
    position: absolute;
    box-shadow: 1px 1px 5px #aaa;
    & li {
      width: 80px;
      padding: 4px 8px;
    }
    & li:hover {
      background: #f0f0f0;
    }
    .text {
      font-size: 14px;
    }
    .first {
      display: flex;
    }
  }
  .luck{
    background: #fff;
    position: absolute;
    box-shadow: 1px 1px 5px #aaa;
    & li {
      // width: 80px;
      padding: 4px 10px;
    }
  }
  .length {
    height: 420px;
  }
  .one {
    height: 210px;
  }
  .empty {
    height: 320px;
  }
  .information{
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom: 8px;
    & div{
      display: flex;
    }
    & li{
      margin-left:10px
    }
  }
}
::v-deep .el-card__body,
.el-main {
  padding: 10px;
}
::v-deep .el-empty .el-empty__image {
  height: 190px;
}
::v-deep .el-dialog__body {
  padding: 1.275rem 1.25rem;
}
</style>