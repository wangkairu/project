<template>
  <div class="wrapper">
    <div class="record">
      <el-input clearable style="width: 150px;margin-right: 12px;" size="mini" v-model="input" placeholder="请输入内容" @change="handelChange"></el-input>
      <div class="tip">
        <span>
          <img src="@/assets/green.png" alt="" />:两层有货&nbsp;&nbsp;</span
        >
        <span>
          <img src="@/assets/yellow.png" alt="" />:一层有货&nbsp;&nbsp;</span
        >
        <span>
          <img src="@/assets/empty.png" alt="" />:没有货物&nbsp;&nbsp;</span
        >
        <span>
          <img src="@/assets/red.png" alt="" style="width:20px;height: 16px;" />:库位锁定&nbsp;&nbsp;</span
        >
        鼠标右击:启/禁用&nbsp;&nbsp;鼠标左击：查看货物信息
      </div>
      <el-button size="mini" @click="()=>{this.getProjectList();this.deleteFlag=true;this.luky=false;}" type="primary"
        >批量删除</el-button>
        <el-button size="mini" @click="handelColor" type="primary"
        >显示高亮</el-button>
      <el-button size="mini" @click="handelRecover" type="primary"
        >复位</el-button
      >
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
      v-if="luky"
      class="luck"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${clickstyle.left}px, ${clickstyle.top}px)`,
      }"
    >
      <li>库位编码：{{luckObj.position}}</li>
      <li>规格简称：{{luckObj.normsName}}</li>
      <li>客户简称：{{luckObj.customerShortName}}</li>
    </div>
    <div
      v-if="lockMask"
      class="luck"
      :style="{
        left: '0px',
        top: '0px',
        transform: `translate(${lockMaskStyle.left}px, ${lockMaskStyle.top}px)`,
      }"
    >
      <li>车辆名称：{{lockObj.vehicleName}}</li>
      <li>任务编号：{{lockObj.taskId}}</li>
      <!-- <li>客户简称：{{luckObj.customerShortName}}</li> -->
    </div>
    <el-dialog title="查看信息" :visible.sync="flagDetail" width="70%">
      <div class="information">
        <div>
          <h4>库位信息</h4>
          <li>库房：东库</li>
          <li>坐标：{{this.x}}列{{this.y}}行</li>
        </div>
        <div>
          <el-button size="mini" @click="handelRepeat" type="primary"
          >复位</el-button>
          <el-button size="mini" @click="handelBeacthClear" type="primary"
          >批量清空</el-button>
        </div>
      </div> 
      <el-table
        @selection-change="handleSelectionChange"
        :data="obj"
        style="width: 100%; margin-top: 10px"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="selection" width="55" fixed> </el-table-column>
        <el-table-column label="操作" fixed>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="alias"
          label="库位名称"
          width="230"
          show-overflow-tooltip
          fixed
        >
        </el-table-column>
        <el-table-column
          prop="mesBoxNo"
          label="箱号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="mesBoxNumberQrCode"
          label="箱号二维码"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="mesNormsName"
          label="MES规格名称"
          width="145"
        >
        </el-table-column>
        <el-table-column
          prop="mesCustomerShortName"
          label="MES客户简称"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="mesWheelType" label="MES轮型" width="90">
        </el-table-column>
        <el-table-column prop="mesMeterLength" label="MES米长" width="90">
        </el-table-column>
        <el-table-column prop="mesLeftRightSidesName" label="MES左右面" width="70">
        </el-table-column>
        <el-table-column prop="isUseEnum" label="是否占用" width="60">
        </el-table-column>
        <el-table-column prop="wmsTaskCompleteTime" label="入库时间" width="180">
        </el-table-column>
        <el-table-column prop="inventoryTime" label="库存时间" width="180">
        </el-table-column>
        <el-table-column prop="mesIsSolderJoint" label="有无焊点">
        </el-table-column>
        <el-table-column prop="mesNumOfRounds" label="轮数">
        </el-table-column>
        <el-table-column prop="mesSpecialRequirements" label="特殊要求" width="300">
        </el-table-column>
        <el-table-column prop="mesPackingTime" label="装箱时间" width="180">
        </el-table-column>
        <el-table-column prop="height" label="高度" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.height" placeholder="请输入高度" @change="handelChangeHeight(scope.row)"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flagDetail = false">取 消</el-button>
        <!-- <el-button type="primary" @click="flagDetail = false">确 定</el-button> -->
      </span>
    </el-dialog>
    <el-dialog   title="禁用库位" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
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
        <el-form-item label="导出">
          <el-button  size="mini" @click="handelExport(1)" type="primary"
        >禁用库位导出</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="handelConfrim">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="启用库位" :visible.sync="dialogVisible_1" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForms"
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
        <el-form-item label="导出">
          <el-button  size="mini" @click="handelExport(0)" type="primary"
        >启用库位导出</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancelStart('ruleForms')">取 消</el-button>
        <el-button type="primary" @click="handelConfrimEnable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="批量删除"
      :visible.sync="deleteFlag"
      width="60%"
      class="dialog"
      @close="handelCloseDelete">
      <el-form :model="form" :rules="rules" ref="ruleForm" size="small" label-width="100px" class="demo-ruleForm">
        <div class="left">
          <el-form-item label="库房编号" prop="region">
            <el-select v-model="form.echoWarehouseCode" disabled @change="handelEchoWarehouseCode" placeholder="请选择库房">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域编号" prop="region">
            <el-select v-model="form.echoFunctionAreaCode" @change="handelEchoFunctionAreaCode" placeholder="请选择区域编号">
              <el-option
                v-for="item in echoFunctionAreaCodeOptions"
                :key="item.value"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库列编号" prop="region">
            <el-select v-model="form.echoColIndexAliasList" @change="handelEchoColIndexAliasList" placeholder="请选择库列">
              <el-option
                v-for="item in echoColIndexAliasListOptions"
                :key="item.key"
                :label="item.key"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="开始行" prop="startRow">
            <el-input v-model="form.startRow" placeholder="请输入删除的开始行" @input="handelStartRow"></el-input>
          </el-form-item>
          <el-form-item  label="结束行" prop="endRow">
            <el-input v-model="form.endRow" placeholder="请输入删除的结束行" @input="handelEndRow"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handelCloseDelete">取 消</el-button>
        <el-button size="small" type="primary" @click="handelBatchDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="显示高亮" :visible.sync="showColor" width="70%">
      <el-form ref="form" :rules="rules" :model="query" label-width="90px">
        <el-form-item label="选择物料" >
          <el-button size="mini" type="primary" @click="handelSelectGoods">选择物料</el-button>
          <el-table  
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }" 
            :data="selectData" 
            style="width: 100%"
          >
            <el-table-column  prop="normsSimpleCode" label="规格简称" width="180"></el-table-column>
            <el-table-column  prop="customerShortName" label="客户简称"  width="180"></el-table-column>
            <el-table-column  prop="wheelType" label="轮型"> </el-table-column>
            <el-table-column  prop="meterLength" label="米长"> </el-table-column>
            <el-table-column  prop="leftRightSidesEnum" label="左右面"> </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancelData">取 消</el-button>
        <el-button type="primary" @click="handelConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="物料选择" :visible.sync="colorFlag" width="70%">
      <el-form ref="form" :rules="rules" :model="query" label-width="90px">
        <SearchFilter
          label-width="70px"
          :maxShow="7"
          :collapsiable="true"
          @search="search1"
          @reset="reset1"
        >
          <el-form-item  label="客户简称" prop="echoWarehouseCode">
            <el-input clearable size="mini" v-model="query.customerShortName" placeholder="请输入内容" @input="handelCustomer"></el-input>
          </el-form-item>
          <el-form-item label="规格简称" prop="echoWarehouseCode">
            <el-input clearable size="mini" v-model="query.normsSimpleCode" placeholder="请输入内容" @input="handelCustomer"></el-input>
          </el-form-item>
          <el-form-item label="轮型" prop="echoWarehouseCode">
            <el-input clearable size="mini" v-model="query.wheelType" placeholder="请输入内容" @input="handelCustomer"></el-input>
          </el-form-item>
          <el-form-item label="米长" prop="echoWarehouseCode">
            <el-input clearable size="mini" v-model="query.meterLength" placeholder="请输入米长" @input="handelCustomer"></el-input>
          </el-form-item>
          <el-form-item label="左右面" prop="leftRightSides">
            <el-select
              clearable
              size="mini"
              v-model="query.leftRightSides"
              placeholder="请选择左右面"
              @change="handelCustomer"
            >
              <el-option
                v-for="item in leftRightSidesOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </SearchFilter>
        <el-form-item label="选择物料" >
          <el-table  
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }" 
            :data="tableData" 
            style="width: 100%"
            ref="tb"
            @selection-change="handleRadioChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column  prop="normsSimpleCode" label="规格简称" width="180"></el-table-column>
            <el-table-column  prop="customerShortName" label="客户简称"  width="180"></el-table-column>
            <el-table-column  prop="wheelType" label="轮型"> </el-table-column>
            <el-table-column  prop="meterLength" label="米长"> </el-table-column>
            <el-table-column  prop="leftRightSidesEnum" label="左右面"> </el-table-column>
          </el-table>
        </el-form-item>
        <PageNation
        style="display: flex;justify-content: center;margin-top: 10px;"
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="pageChange"
        />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancelSelect">取 消</el-button>
        <el-button type="primary" @click="handelConfirmSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Konva from 'konva'
import { 
  getGoodsLocation,
  getWarehouseShow, 
  enableDisableLocation,
  getGoodsByLocationCode,
  clearLocation,
  clearLocationWithoutGoods,
  occupyrResourceShow,
  queryWarehouseColDropDown,
  occupyResourceRelease,
  queryLocationHighlight,
  enableLocationExport,
  batchClearLocation } 
  from '@/api/location'
import {setHeight} from '@/api/essential'
import {queryNormsList} from '@/api/specification'
import SearchFilter from "@/components/SearchFilter";
import PageNation from "@/components/Pagination";
import {uploadExcel} from '@/utils/uploadExcel'
export default {
  components:{
    SearchFilter,
    PageNation
  },
  name: "EastWarehouse",
  data() {
    return {
      colorFlag:false,
      deleteFlag:false,
      wStage: null,
      layer: null,
      imageObj: null,
      lockMask:false,
      width: 20,
      height: 15,
      flag: false,
      luky:false,
      flagDetail: false,
      isDrawing: false,
      scaleFlag:false,
      showColor:false,
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
      lockMaskStyle:{
        left: 300,
        top: 300,
      },
      luckObj:{},
      ruleForm: {
        endColIndex: '',
        endRowIndex: '',
        isEnable: 0,
        startColIndex: '',
        startRowIndex: '',
        warehouseCode: ""
      },
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
      lockObj:{},
      luckArr:[],
      ids:[],
      input:"",
      container:null,
      options:[],
      echoFunctionAreaCodeOptions:[],
      echoColIndexAliasListOptions:[],
      form:{
        echoWarehouseCode:"",
        echoColIndexAliasList:"",
        echoFunctionAreaCode:"",
        startRow:"",
        endRow:"",
        areaCode:""
      },
      query:{
        customerShortName: "",
        normsSimpleCode: "",
        normsType: '',
        wheelType: "",
        meterLength:"",
        leftRightSides:"",
        warehouseCode: ""
      },
      total:0,
      tableData:[],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      checkedGh:[],
      selectData:[],
      leftRightSidesOptions:[
        {key:"0",value:"左"},
        {key:"1",value:"右"}
      ]        
    }
  },
  mounted() {
    this.getWarehouseShow()
    window.addEventListener("resize", this.onWindowResize);
    this.occupyrResourceShow()
    this.initGetWarehouseShow()
    this.getProjectList()
  },
  beforeDestroy() {
    window.addEventListener("resize", this.onWindowResize);
    clearInterval(this.updateInterval);
  },
  methods: {
    async handelExport(val){
      const params={
        ...this.ruleForm,
        isEnable:val,
        warehouseCode:"WAREHOUSE-D-EAST"
      }
      const res = await enableLocationExport(params)
      const blob = new Blob([res], { type: "application/vnd.ms-excel" });
      const fileName = "启用库位.xlsx";
      uploadExcel(fileName, blob);
    },
    async handelConfirm(){
      if(this.layer.find('.purple').length!==0){
          this.layer.find('.purple').forEach((v)=>{
            v.destroy()
          })
      }
      const params={
        areaCode: "EAST",
        onlyCodeCategory: this.selectData[0].onlyCodeCategory,
        // onlyCodeCategory:'1522W-招远玲珑-B80/33-4000-1',
        warehouseCode: 'WAREHOUSE-D-EAST',
      }
      const res = await queryLocationHighlight(params)
      if(res.code==0){
        let arr=res.data&&res.data.length>0?res.data:[]
        for(let m=0;m<arr.length;m++){
          for(let j=arr[m].startRow;j<=arr[m].endRow;j++){
            this.rect1 = new Konva.Rect({
              x: 8 + this.width * arr[m].col + (arr[m].col * 8),
              y: 15 + this.height * j + (j * 6),
              width: 20,
              height: 15,
              fill: 'purple',
              name:"purple"
            });
            this.layer.add(this.rect1);
          }
        }
        this.showColor=false
      }
    },
    handelCancelData(){
      this.showColor=false
      this.selectData=[]
    },
    handelCustomer(){
      this.queryNormsList()
    },
    handelSelectGoods(){
      this.colorFlag=true
      this.queryNormsList()
      
    },
    handleRadioChange(selection){
      this.checkedGh = selection;
      if (selection.length > 1) {
        this.$refs.tb.clearSelection();
        this.$refs.tb.toggleRowSelection(selection.pop());
      }
    },
    handelCancelSelect(){
      this.$refs.tb.clearSelection();
      this.selectData=[]
      this.query={
        customerShortName: "",
        normsSimpleCode: "",
        normsType: '',
        wheelType: "",
        meterLength:"",
        leftRightSides:"",
        warehouseCode: ""
      };
      this.colorFlag=false
    },
    handelConfirmSelect(){
      this.selectData=this.checkedGh
      this.colorFlag=false
      this.query={
        customerShortName: "",
        normsSimpleCode: "",
        normsType: '',
        wheelType: "",
        meterLength:"",
        leftRightSides:"",
        warehouseCode: ""
      };
    },
    handelColor(){
      this.showColor=true
    },
    search1(){
      this.queryNormsList()
    },
    reset1(){
      this.query={}
      this.queryNormsList()
    },
    pageChange(val) {
      this.listQuery.pageNum = val.page;
      this.listQuery.pageSize = val.limit;
      this.queryNormsList();
    },
    async handelSelect(){
      this.colorFlag=true
      this.queryNormsList()
    },
    async queryNormsList(){
      const params={
        request:this.query,
        page: this.listQuery.pageNum - 1,
        size: this.listQuery.pageSize,
      }
      const res = await queryNormsList(params)
      if(res.code==0){
        this.tableData=res.data.items
        this.total=res.data.total
        // if(this.selectData.length>0){
        //   this.tableData.forEach((item)=>{
        //     if(item.onlyCodeCategory==this.selectData[0].onlyCodeCategory){
        //       console.log(this.selectData[0])
        //       this.$refs.tb.toggleRowSelection(this.selectData[0], true);
        //     }
        //   })
        // }
      }
    },
    handelCloseDelete(){
      this.deleteFlag=false
      if(this.layer.find('.batchDelete').length!==0){
          this.layer.find('.batchDelete').forEach((v)=>{
            v.destroy()
          })
      }
      this.form={
        // echoWarehouseCode:"",
        echoColIndexAliasList:"",
        echoFunctionAreaCode:"",
        startRow:"",
        endRow:"",
        areaCode:"",
      }
    },
    async handelBatchDelete(){
      const params={
        areaCode: this.form.areaCode,
        colIndexAlias: this.form.echoColIndexAliasList,
        endRow: this.form.endRow,
        functionAreaCode: this.form.echoFunctionAreaCode,
        functionCode: "IN",
        functionType: "IN",
        startRow: this.form.startRow
      }
      const res = await batchClearLocation(params)
      if(res.code=='0'){
        this.deleteFlag=false
        this.form={
          // echoWarehouseCode:"",
          echoColIndexAliasList:"",
          echoFunctionAreaCode:"",
          startRow:"",
          endRow:"",
          areaCode:"",
        }
        this.getWarehouseShow()
        this.$message.success(res.msg)
      }else{
        this.$message.error(res.msg)
      }
    },
    async getProjectList() {
      const params = {};
      const obj=await this.queryWarehouseColDropDown(params)
      if (obj.code === "0") {
        this.options = obj.data;
        this.form.echoWarehouseCode=obj.data[1].key
        this.handelEchoWarehouseCode()
      }
    },
    async handelEchoWarehouseCode(){
      const params={
        warehouseCode: this.form.echoWarehouseCode,
        functionCode:"IN",
        functionType:"IN",
        areaCode:"AREA-20178529",
      }
      const obj=await this.queryWarehouseColDropDown(params)
      if (obj.code === "0") {
        this.echoFunctionAreaCodeOptions=[]
        obj.data.forEach((v)=>{
          if(v.value!=='C'){
            this.echoFunctionAreaCodeOptions.push(v)
          }
        })
      }
    },
    async handelEchoFunctionAreaCode(val){
      const params={
        warehouseCode: this.form.echoWarehouseCode,
        functionType:"IN",
        functionCode:"IN",
        functionAreaCode:val,
      }
      const obj=await this.queryWarehouseColDropDown(params)
      if (obj.code === "0") {
        this.echoColIndexAliasListOptions=obj.data
        this.form.areaCode=obj.data[0].value
        this.form.echoColIndexAliasList=""
        this.form.startRow=''
        this.form.endRow=''
        if(this.layer.find('.batchDelete').length!==0){
          this.layer.find('.batchDelete').forEach((v)=>{
            v.destroy()
          })
        }
      }
    },
    async handelEchoColIndexAliasList(val){
      const params={
        warehouseCode: this.form.echoWarehouseCode,
        functionType:"IN",
        functionCode:"IN",
        functionAreaCode:this.form.echoFunctionAreaCode,
        colIndexAlias:val
      }
      const obj=await this.queryWarehouseColDropDown(params)
      if(this.layer.find('.batchDelete').length!==0){
        this.layer.find('.batchDelete').forEach((v)=>{
          v.destroy()
        })
      }
      this.form.startRow=''
      this.form.endRow=''
    },
    async queryWarehouseColDropDown(params){
      const res = await queryWarehouseColDropDown(params);
      return res
    },
    handelEndRow(){
      if(this.layer.find('.batchDelete').length!==0){
        this.layer.find('.batchDelete').forEach((v)=>{
          v.destroy()
        })
      }
      if(this.form.endRow<this.form.startRow){
        this.form.endRow=""
        this.$message.error("结束行输入不能小于开始行");
        return
      }
      const col=this.form.echoColIndexAliasList.includes('00')?this.form.echoColIndexAliasList.slice(2):this.form.echoColIndexAliasList.slice(1)
      const height1=this.form.endRow - this.form.startRow+1
      const batchDelete =  new Konva.Rect({
        x: 6+this.width * col + (col * 8) ,
        y: 12+this.height*this.form.startRow+ (this.form.startRow * 6),
        width: 24,
        height: 15*height1+ (height1 * 6),
        strokeWidth: 2,
        stroke: 'orange',
        name:"batchDelete"
      });
      this.layer.add(batchDelete);
    },
    handelStartRow(){
      if(this.form.endRow){
        if(this.layer.find('.batchDelete').length!==0){
          this.layer.find('.batchDelete').forEach((v)=>{
            v.destroy()
          })
        }
        const col=this.form.echoColIndexAliasList.includes('00')?this.form.echoColIndexAliasList.slice(2):this.form.echoColIndexAliasList.slice(1)
        const height1=this.form.endRow - this.form.startRow+1
        if(this.form.startRow>this.form.endRow){
          this.form.startRow=""
          this.$message.error("开始行输入不能大于结束行");
          return
        }else{
          const batchDelete =  new Konva.Rect({
            x: 6+this.width * col + (col * 8) ,
            y: 12+this.height*this.form.startRow+ (this.form.startRow * 6),
            width: 24,
            height: 15*height1+ (height1 * 6),
            strokeWidth: 2,
            stroke: 'orange',
            name:"batchDelete"
          });
          this.layer.add(batchDelete);
        }
      }
    },
    async handelChangeHeight(row){
      const params={
        id:row.id,
        height:row.height
      }
      const res = await setHeight(params)
      if(res.code=='0'){
        this.$message.success(res.msg)
      }else{
        this.$message.error(res.msg)
      }
    },
    async handelChange(){
      if(this.layer.find('.purple').length!==0){
        this.layer.find('.purple').forEach((v)=>{
          v.destroy()
        })
      }
      this.getGoodsLocation()
    },
    async getGoodsLocation(){
      const params={
        qrCode:this.input
      }
      const res = await getGoodsLocation(params)
      const x=res.data.col,y=res.data.row
      if(res.code==='0'){
        this.rect1 = new Konva.Rect({
          x: 8 + this.width * x + (x * 8),
          y: 15 + this.height * y + (y * 6),
          width: 20,
          height: 15,
          fill: 'purple',
          name:"purple"
        });
        this.rect1.on('mousedown', (e) => {
          if (e.evt.button === 0) {
            this.flag = false;
            this.luky=false;
            this.flagDetail = true
            this.stationCode = `E&A&${x}-${y}`
            this.x = x; this.y = y
            this.getGoodsByLocationCode(this.stationCode)
            // this.clickstyle.top = e.evt.layerY > 310 ? e.target.attrs.fill === 'yellow' ? e.evt.layerY - 210 : e.target.attrs.stroke == "block" ? e.evt.layerY - 320 : e.evt.layerY - 420 : e.evt.layerY + 10
          } else if (e.evt.button === 2) {
            this.luky=false;
            this.flag = true;
            this.ruleForm.startColIndex = i + 1;
            this.ruleForm.startRowIndex = j + 1;
            this.hoverstyle.left = e.evt.layerX + 10
            this.hoverstyle.top = e.evt.layerY + 10
          }
        });
        let time=null
        this.rect1.on('mouseover',(e) => {
          this.x = smallRect.x; this.y = smallRect.y
          this.stationCode = `E&A&${smallRect.x}-${smallRect.y}`
          time=setTimeout(() => {
            this.getGoodsByLocationCode(this.stationCode,e)
          }, 3000);
        })
        this.rect1.on('mouseout',(e) => {
          this.luky=false
          clearTimeout(time)
        })
        this.layer.add(this.rect1);
      }
    },
    async handleDelete(row) {
      this.radio = true
      if(row.id){
        this.clearLocation(row.id)
      }
      else{
        this.clearLocationWithoutGoods(row.warehouseCode)
      }
    },
    handelBeacthClear() {
      this.radio = false
      this.ids=this.goodsIdList.map((v)=>{
        return v.id
      })
      this.clearLocation()
    },
    handelRepeat(){
      const arr = this.goodsIdList.map((v)=>{
        return v.warehouseCode
      })
      this.clearLocationWithoutGoods(arr.length===2?arr[0]+'&'+arr[1]:arr[0])
    },
    async clearLocationWithoutGoods(val){
      this.$confirm("确定要释放吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async () => {
        const res = await clearLocationWithoutGoods(val)
          if (res.code === '0') {
            this.layer.clear ()
            this.getGoodsByLocationCode(this.stationCode)
            if (res.data == 2) {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * this.x + (this.x * 8),
                y: 15 + this.height * this.y + (this.y * 6),
                width: 20,
                height: 15,
                fill: 'green',
              });
            } else if (res.data == 1) {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * this.x + (this.x * 8),
                y: 15 + this.height * this.y + (this.y * 6),
                width: 20,
                height: 15,
                fill: 'yellow',
              });
            } else {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * this.x + (this.x * 8),
                y: 15 + this.height * this.y + (this.y * 6),
                width: 20,
                height: 15,
                strokeWidth: 1,
                fill: "#fff",
                stroke: 'block',
              });
            }
            this.rect1.on('mousedown', (e) => {
              if (e.evt.button === 0) {
                this.flag = false;
                this.luky=false;
                this.flagDetail = true
                this.stationCode = `E&A&${this.x}-${this.y}`
                // this.x = smallRect.x; this.y = smallRect.y
                this.getGoodsByLocationCode(this.stationCode)
                this.clickstyle.left = e.evt.layerX + 10
                // this.clickstyle.top = e.evt.layerY > 310 ? e.target.attrs.fill === 'yellow' ? e.evt.layerY - 210 : e.target.attrs.stroke == "block" ? e.evt.layerY - 320 : e.evt.layerY - 420 : e.evt.layerY + 10
              } else if (e.evt.button === 2) {
                this.luky=false;
                this.flag = true;
                this.ruleForm.startColIndex = i + 1;
                this.ruleForm.startRowIndex = j + 1;
                this.hoverstyle.left = e.evt.layerX + 10
                this.hoverstyle.top = e.evt.layerY + 10
              }
            });
            let time=null
            this.rect1.on('mouseover',(e) => {
              this.x = smallRect.x; this.y = smallRect.y
              this.stationCode = `E&A&${smallRect.x}-${smallRect.y}`
              if(res.data!=0){
                time=setTimeout(() => {
                  this.getGoodsByLocationCode(this.stationCode,e)
                }, 3000);
              }else{
                this.$nextTick(()=>{
                  this.luky=true;
                  this.clickstyle.left = e.evt.layerX+20
                  this.clickstyle.top = e.evt.layerY+5
                  this.luckObj.position=this.x+'列'+this.y+'行'
                  this.luckObj.normsName='暂无内容'
                  this.luckObj.customerShortName='暂无内容'
                })
              }
            })
            this.rect1.on('mouseout',(e) => {
              this.luky=false
              clearTimeout(time)
            })
            this.layer.add(this.rect1);
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
    clearLocation(val) {
      this.$confirm("确定要释放吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async () => {
        const params = {
          goodsIdList: this.radio?[val]:this.ids,
          locationCode: this.stationCode
        }
        const res = await clearLocation(params)
          if (res.code === '0') {
            this.layer.clear ()
            this.getGoodsByLocationCode(this.stationCode)
            if (res.data == 2) {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * this.x + (this.x * 8),
                y: 15 + this.height * this.y + (this.y * 6),
                width: 20,
                height: 15,
                fill: 'green',
              });
            } else if (res.data == 1) {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * this.x + (this.x * 8),
                y: 15 + this.height * this.y + (this.y * 6),
                width: 20,
                height: 15,
                fill: 'yellow',
              });
            } else {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * this.x + (this.x * 8),
                y: 15 + this.height * this.y + (this.y * 6),
                width: 20,
                height: 15,
                strokeWidth: 1,
                fill: "#fff",
                stroke: 'block',
              });
            }
            this.rect1.on('mousedown', (e) => {
              if (e.evt.button === 0) {
                this.flag = false;
                this.luky=false;
                this.flagDetail = true
                this.stationCode = `E&A&${this.x}-${this.y}`
                // this.x = smallRect.x; this.y = smallRect.y
                this.getGoodsByLocationCode(this.stationCode)
                this.clickstyle.left = e.evt.layerX + 10
                // this.clickstyle.top = e.evt.layerY > 310 ? e.target.attrs.fill === 'yellow' ? e.evt.layerY - 210 : e.target.attrs.stroke == "block" ? e.evt.layerY - 320 : e.evt.layerY - 420 : e.evt.layerY + 10
              } else if (e.evt.button === 2) {
                this.luky=false;
                this.flag = true;
                this.ruleForm.startColIndex = i + 1;
                this.ruleForm.startRowIndex = j + 1;
                this.hoverstyle.left = e.evt.layerX + 10
                this.hoverstyle.top = e.evt.layerY + 10
              }
              let time=null
              this.rect1.on('mouseover',(e) => {
                this.x = smallRect.x; this.y = smallRect.y
                this.stationCode = `E&A&${smallRect.x}-${smallRect.y}`
                if(res.data!=0){
                  time=setTimeout(() => {
                    this.getGoodsByLocationCode(this.stationCode,e)
                  }, 3000);
                }else{
                  this.$nextTick(()=>{
                    this.luky=true;
                    this.clickstyle.left = e.evt.layerX+20
                    this.clickstyle.top = e.evt.layerY+5
                    this.luckObj.position=this.x+'列'+this.y+'行'
                    this.luckObj.normsName='暂无内容'
                    this.luckObj.customerShortName='暂无内容'
                  })
                }
              })
              this.rect1.on('mouseout',(e) => {
                this.luky=false
                clearTimeout(time)
              })
            });
            this.layer.add(this.rect1);
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
    handleSelectionChange(val) {
      let arr = []
      val.forEach((v) => {
        arr.push(v)
      })
      this.goodsIdList = [...new Set(arr)]
    },
    async occupyrResourceShow(){
      if(this.layer){
        const res = await occupyrResourceShow("WAREHOUSE-D-EAST/A")
        this.luckArr=res.data.resourceVoList
        const conveyorbeltsArr=res.data.duckOccupy
        if(this.layer.find('.rect').length!==0){
          this.layer.find('.rect').forEach((v)=>{
            v.destroy()
          })
        }
        let conveyor=null
        if(conveyorbeltsArr!==null){
           conveyor = new Konva.Rect({
            x: 1540,
            y: 250,
            width:40,
            height: 260,
            strokeWidth: 1,
            stroke:'red',
            name:"conveyor"
          });
          this.layer.add(conveyor);
        }else{
          if(this.layer.find('.conveyor').length!==0){
            this.layer.find('.conveyor').forEach((v)=>{
              v.destroy()
            })
          }
        }
        const conveyorbelts = new Image();
        conveyorbelts.onload = () => {
          const img = new Konva.Image({
            x: 1525,
            y: 255,
            image: conveyorbelts,
            width:70,
            height: 250,
          });
          img.on('click',()=>{
              this.$confirm("确定要释放吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                this.occupyResourceRelease(conveyorbeltsArr.resourceId)
              })
              .catch(_ => { });
          })
          this.layer.add(img);
        }
        conveyorbelts.src = require('@/assets/conveyorbelts.png');
        if(this.luckArr){
            for(let i=0;i<this.luckArr.length;i++){ 
              const luck = new Konva.Rect({
              x: 6+this.width * this.luckArr[i].col + (this.luckArr[i].col * 8) ,
              y: 12+this.height*this.luckArr[i].rowStart+ (this.luckArr[i].rowStart * 6),
              width: 24,
              height: 15*this.luckArr[i].count+ (this.luckArr[i].count * 6),
              strokeWidth: 2,
              stroke: 'red',
              name:"rect",
            });
            luck.on('click',async (e)=>{
              this.luky=false;
              this.$confirm("确定要释放吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                this.occupyResourceRelease(this.luckArr[i].resourceId)
              })
              .catch(_ => { });
            })
            luck.on('mouseover', (e) => {
              this.lockMask=true;
              this.lockObj=this.luckArr[i]
              this.lockMaskStyle.left=e.evt.layerX + 10
              this.lockMaskStyle.top=e.evt.layerY + 10
              this.luky=false
            });
            luck.on('mouseout', (e) => {
              this.lockMask=false;
            });
            this.layer.add(luck);
        }
        }
      }
    },
     initGetWarehouseShow() {
      this.updateInterval = setInterval(async () => {
        this.occupyrResourceShow()
      }, 1500)
    },
    async occupyResourceRelease(val){
      const res=await occupyResourceRelease(val)
      if(res.code=='0'){
        if(res.data){
          this.occupyrResourceShow()
        }
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
      }else{
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    onWindowResize() {
      this.container = document.getElementById("container")
      this.screenWidth = this.container.clientWidth;
      this.screenHeight = this.container.clientHeight;
    },
    async getGoodsByLocationCode(stationCode,e,val) {
      const res = await getGoodsByLocationCode(stationCode)
      if (res.code === '0' ) {
        this.obj = res.data
        this.luky=true;
        this.clickstyle.left = e.evt.layerX+20
        this.clickstyle.top = e.evt.layerY+5
        this.luckObj.position=this.x+'列'+this.y+'行'
        this.luckObj.normsName=res.data[0].mesNormsName?res.data[0].mesNormsName:'暂无内容'
        this.luckObj.customerShortName=res.data[0].mesCustomerShortName?res.data[0].mesCustomerShortName:'暂无内容'
      } else {
        this.obj = []
      }
    },
    handelCancelStart(formName) {
      this.dialogVisible_1 = false;
      this.ruleForm = {
        endColIndex: '',
        endRowIndex: '',
        isEnable: 0,
        startColIndex: '',
        startRowIndex: '',
        warehouseCode: ""
      }
      this.$refs[formName].resetFields();
    },
    handelCancel(formName) {
      this.dialogVisible = false;
      this.ruleForm = {
        endColIndex: '',
        endRowIndex: '',
        isEnable: 0,
        startColIndex: '',
        startRowIndex: '',
        warehouseCode: ""
      }
      this.$refs[formName].resetFields();
    },
    handelForbidden(isEnable) {
      this.ruleForm.isEnable = isEnable
      this.dialogVisible = true
      this.flag = false
    },
    handelEnable(isEnable) {
      this.ruleForm.isEnable = isEnable
      this.dialogVisible_1 = true
      this.flag = false
    },
    async handelConfrimEnable() {
      const params = {
        ...this.ruleForm,
        endColIndex: Number(this.ruleForm.endColIndex),
        endRowIndex: Number(this.ruleForm.endRowIndex),
        warehouseCode: "WAREHOUSE-D-EAST",
        areaCode:'A',
      }
      const res = await enableDisableLocation(params)
      if (res.code === '0') {
        this.dialogVisible_1 = false;
        this.getWarehouseShow()
        this.ruleForm = {
          endColIndex: '',
          endRowIndex: '',
          isEnable: 0,
          startColIndex: '',
          startRowIndex: '',
          warehouseCode: ""
        }
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
    // 禁用库位
    async handelConfrim() {
      const params = {
        ...this.ruleForm,
        endColIndex: Number(this.ruleForm.endColIndex),
        endRowIndex: Number(this.ruleForm.endRowIndex),
        warehouseCode: "WAREHOUSE-D-EAST",
        areaCode:'A',
      }
      const res = await enableDisableLocation(params)
      if (res.code === '0') {
        this.dialogVisible = false;
        this.getWarehouseShow()
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
        this.ruleForm = {
          endColIndex: '',
          endRowIndex: '',
          isEnable: 0,
          startColIndex: '',
          startRowIndex: '',
          warehouseCode: ""
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    async getWarehouseShow() {
      const params = {
        warehouseCodeList: ['WAREHOUSE-D-EAST'],
        areaCode:'A',
      }
      const res = await getWarehouseShow(params)
      if (res.code === '0') {
        this.westAreaList = res.data
        this.init()
      }
    },
    init() {
      this.container = document.getElementById("container")
      this.wStage = new Konva.Stage({
        container: 'container',
        width: this.container.clientWidth,
        height: this.container.clientHeight,
        draggable: true,
      });
      this.layer = new Konva.Layer();
      this.wStage.add(this.layer);
      this.wStage.on("mouseover",() => {
        this.luky=false
      })
      this.wStage.on('contextmenu', (e) => {
        e.evt.preventDefault();
      });
      this.imageObj = new Image();
      this.imageObj.onload = () => {
        this.image = new Konva.Image({
          x: 0,
          y: 0,
          image: this.imageObj,
          width: 1535,
          height: 860,
        });
        // add the shape to the layer
        this.layer.add(this.image);
        this.image.on('mousedown', (e) => {
          if(e.evt.button===0){
            this.luky = false;
            this.flag = false;
          }else{
            this.flag = true;
            this.hoverstyle.left = e.evt.layerX + 10
            this.hoverstyle.top = e.evt.layerY + 10
          }
        });
        this.image.on("mouseover",() => {
          this.luky=false
        })
        for (let i = 0; i < this.westAreaList.length; i++) {
          const row = this.westAreaList[i]
          const rowText = new Konva.Text({
            x: 35+ 20 * i + (i * 8),
            y:-165+ 20 + (20 * 8),
            text: i+1,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: 'green',
            width: 20,
            align: 'center'
          });
          this.layer.add(rowText);
          for (let j = 0; j < row.length; j++) {
            const colText = new Konva.Text({
              x: 10,
              y:37+ 15* j+(j*6),
              text: j+1,
              fontSize: 15,
              fontFamily: 'Calibri',
              fill: 'green',
              width:20,
              align: 'center'
            });
            this.layer.add(colText);
            const smallRect = row[j]
            if (smallRect.e === 0) {
              this.rect1 = new Konva.Rect({
                x: 8+ this.width * smallRect.x + (smallRect.x * 8),
                y: 15 + this.height * smallRect.y + (smallRect.y * 6),
                width: 20,
                height: 15,
                strokeWidth: 1,
                stroke: '#999',
                dash: [2, 2],
                name:`${smallRect.x}-${smallRect.y}`
              });
            }else if(smallRect.e === -1||smallRect.e === -2){
              continue
            }else if (smallRect.c === 1) {
              this.rect1 = new Konva.Rect({
                x: 8+ this.width * smallRect.x + (smallRect.x * 8),
                y: 15 + this.height * smallRect.y + (smallRect.y * 6),
                width: 20,
                height: 15,
                strokeWidth: 1,
                fill: 'yellow',
                name:`${smallRect.x}-${smallRect.y}`
              });
            } else if (smallRect.c === 2) {
              this.rect1 = new Konva.Rect({
                x: 8 + this.width * smallRect.x + (smallRect.x * 8),
                y: 15+ this.height * smallRect.y + (smallRect.y * 6),
                width: 20,
                height: 15,
                strokeWidth: 1,
                fill: 'green',
                name:`${smallRect.x}-${smallRect.y}`
              });
            } else if(smallRect.c === 0&&smallRect.e!==0){
              this.rect1 = new Konva.Rect({
                x:8+ this.width * smallRect.x + (smallRect.x * 8),
                y: 15 + this.height * smallRect.y + (smallRect.y * 6),
                width: 20,
                height: 15,
                strokeWidth: 1,
                stroke: "block",
                name:`${smallRect.x}-${smallRect.y}`
              });
            }
            let time=null
            this.rect1.on('mouseover',(e) => {
              this.x = smallRect.x; this.y = smallRect.y
              this.stationCode = `E&A&${smallRect.x}-${smallRect.y}`
              if(smallRect.c ==1||smallRect.c ==2){
                time=setTimeout(() => {
                  this.getGoodsByLocationCode(this.stationCode,e)
                }, 3000);
              }else if(smallRect.c==0&&smallRect.e!=0){
                this.$nextTick(()=>{
                  this.luky=true;
                  this.clickstyle.left = e.evt.layerX+20
                  this.clickstyle.top = e.evt.layerY+5
                  this.luckObj.position=this.x+'列'+this.y+'行'
                  this.luckObj.normsName='暂无内容'
                  this.luckObj.customerShortName='暂无内容'
                })
              }
            })
            this.rect1.on('mouseout',(e) => {
              this.luky=false
              clearTimeout(time)
            })
            this.rect1.on('mousedown', (e) => {
              if (e.evt.button === 0) {
                this.flag = false;
                this.luky=false;
                this.flagDetail = true
                this.stationCode = `E&A&${smallRect.x}-${smallRect.y}`
                this.x = smallRect.x; this.y = smallRect.y
                this.getGoodsByLocationCode(this.stationCode)
                this.clickstyle.left = e.evt.layerX + 10
                // this.clickstyle.top = e.evt.layerY > 310 ? e.target.attrs.fill === 'yellow' ? e.evt.layerY - 210 : e.target.attrs.stroke == "block" ? e.evt.layerY - 320 : e.evt.layerY - 420 : e.evt.layerY + 10
              } else if (e.evt.button === 2) {
                this.luky=false;
                this.flag = true;
                this.ruleForm.startColIndex = i + 1;
                this.ruleForm.startRowIndex = j + 1;
                this.hoverstyle.left = e.evt.layerX + 10
                this.hoverstyle.top = e.evt.layerY + 10
              }
            });
            this.layer.add(this.rect1);
          }
        }
      };
      this.imageObj.src = require('@/assets/group.png');
      if(this.container.clientWidth>=1611){
        this.layer.scaleX(1 - 0.10)
        this.layer.scaleY(1 - 0.20)
        this.layer.position({ x: 0, y: 0 });
        this.wStage.position({ x: 70, y: 90 })
      }else if(1083>=this.container.clientWidth<1611){
        this.layer.scaleX(1 - 0.32);
        this.layer.scaleY(1 - 0.45);
        this.layer.position({ x: 0, y: 0 });
        this.wStage.position({ x: 10, y: 44 })
      }
      this.wStage.draw();
      this.wheel()
    },
    wheel() {
      this.wStage.on("wheel", (e) => {
        this.flagDetail = false;
        this.flag = false;
        this.scaleFlag=true
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
      this.luky=false
      if(this.scaleFlag){
        if(this.container.clientWidth>=1611){
          this.layer.scaleX(1 - 0.10)
          this.layer.scaleY(1 - 0.20)
          this.layer.position({ x: 0, y: 0 });
          this.wStage.position({ x: 70, y: 90 })
        }else if(1083>=this.container.clientWidth<1611){
          this.layer.scaleX(1 - 0.32);
          this.layer.scaleY(1 - 0.45);
          this.layer.position({ x: 0, y: 0 });
          this.wStage.position({ x: 10, y: 44 })
        }
      }
      this.scaleFlag=false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: relative;
  #container {
    width: 100%;
    height: calc(100vh - 50px - 30px);
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

.dialog{
  ::v-deep .el-dialog {
    top: -122px;
  }
  ::v-deep .el-form-item{
    margin-bottom: 6px;
  }
  .search{
    display: flex;
  }
  .left,.right{
    display: flex;
  }
  .demo-ruleForm{
    // display: flex;
    margin: 0 50px;
  }
  ::v-deep .el-dialog__header{
    padding: 0.425rem 1.25rem 0.25rem;
  }
  ::v-deep .el-dialog__headerbtn{
    top: 0.625rem;
  }
  ::v-deep .el-dialog__body {
    padding: 0px 0.25rem !important;
    .el-input--small .el-input__inner{
      width: 180px;
    }
  }
  ::v-deep .el-dialog__footer{
    padding: 0.25rem 1.25rem 0.325rem !important;
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
::v-deep .el-table__header-wrapper  .el-checkbox{
	display:none
}
</style>