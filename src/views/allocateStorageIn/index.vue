<template>
    <div class="storage">
      <NavBar :name="name" class="nav"> </NavBar>
      <van-field
        readonly
        clickable
        name="picker"
        :value="warehouse"
        label="库房编号"
        placeholder="点击选择库房编号"
        @click="handelWarehouse"
      />
      <van-popup v-model="showWarehouse" position="bottom">
        <van-picker
          show-toolbar
          :columns="WarehouseArr"
          @confirm="onConfirmWarehouse($event)"
          @cancel="showWarehouse = false"
        />
      </van-popup>
      
      <van-field
          readonly
          clickable
          name="picker"
          :value="functionAreaCodeVal"
          label="区域编号"
          placeholder="点击选择区域编号"
          @click="handelFunctionCode"
          :disabled="warehouse?false:true"
      />
      <van-popup v-model="showFunctionAreaCode" position="bottom">
        <van-picker
            show-toolbar
            :columns="functionAreaCodeArr"
            @confirm="onConfirmunFctionAreaCode"
            @cancel="showFunctionAreaCode = false"
        />
      </van-popup>
      <van-field
          readonly
          clickable
          name="picker"
          :value="colIndexAliasListVal"
          label="库列编号"
          placeholder="点击选择库列编号"
          @click="handelFunctionAreaCode"
          :disabled="functionAreaCodeVal&&warehouse?false:true"
      />
      <van-popup v-model="showColIndexAliasList" position="bottom">
          <van-picker
              show-toolbar
              :columns="colIndexAliasListArr"
              @confirm="onConfirmColIndexAliasList($event)"
              @cancel="showColIndexAliasList = false"
          />
      </van-popup>
      <van-field
          readonly
          clickable
          name="picker"
          :value="locationVal"
          label="库位编号"
          placeholder="点击选择库位编号"
          @click="handelLocation"
          :disabled="functionAreaCodeVal&&warehouse&&colIndexAliasListVal?false:true"
      />
      <van-popup v-model="showLocation" position="bottom">
        <van-picker
          show-toolbar
          :columns="locationArr"
          @confirm="onConfirmLocation($event)"
          @cancel="showLocation = false"
        />
      </van-popup>
      <van-cell-group>
        <van-field
          clearable
          ref="field"
          v-model="value"
          label="二维码"
          placeholder="请扫描二维码"
          @change="handelManualPickup"
          @clear="form = null"
        />
      </van-cell-group>
      <div class="main">
        <div class="con" v-if="form!==null">
          <div class="item"  >
              <h4>{{ form.customer_name_short }}</h4>
              <div class="item_con">
                  <van-row >
                    <van-col span="20" offset="1"> 
                      <li> 
                          <span>箱号二维码&emsp;</span>
                          <span>{{ form.serial }}</span>
                      </li>
                    </van-col>
                    <van-col span="20" offset="1"> 
                      <li> 
                          <span>规格简称&emsp;</span>
                          <span>{{ form.specification_name }}</span>
                      </li>
                    </van-col>
                      <van-col span="20" offset="1">      
                          <li>
                              <span>客户简称&emsp;</span>
                              <span>{{ form.customer_name_short }}</span>
                          </li>
                      </van-col>
                  </van-row>
                  <van-row type="flex" justify="space-around">
                      <van-col span="10" > 
                          <li> 
                              <span>轮型&emsp;</span>
                              <span>{{ form.wheel }}</span>
                          </li>
                      </van-col>
                      <van-col span="10">     
                          <li>
                              <span>米长&emsp;</span>
                              <span>{{ form.length }}</span>
                          </li>
                      </van-col>
                  </van-row>
                  <!-- type="flex" justify="space-around" -->
                  <van-row >
                      <van-col span="10" offset="1"> 
                          <li> 
                              <span>左右面&emsp;</span>
                              <span>{{ form.mesLeftRightSides==1?'右':'左' }}</span>
                          </li>
                      </van-col>
                      
                  </van-row>
                  <van-row >
                    <van-col span="20" offset="1">     
                          <li>
                              <span>特殊要求&emsp;</span>
                              <span>{{ form.requirement }}</span>
                          </li>
                      </van-col>
                      <van-col span="20" offset="1">      
                          <li>
                              <span>备注&emsp;</span>
                              <van-field  style="width:45%;padding:0 2px;border:1px solid #ddd" v-model="form.remark"  placeholder="请输入备注" />
                              <!-- <span>{{ form.remark }}</span> -->
                          </li>
                      </van-col>
                      <!-- <van-col span="20" offset="1">      
                          <li>
                              <span>调拨入库完成时间&emsp;</span>
                              <span >{{ form.finishTime }}</span>
                          </li>
                      </van-col> -->
                      <!-- <van-col span="20" offset="1">      
                          <li>
                              <span>调拨入库操作人&emsp;</span>
                              <span>{{ form.allocateUser }}</span>
                          </li>
                      </van-col> -->
                      <!-- <van-col span="20" offset="1">      
                          <li>
                              <span>备注&emsp;</span>
                              <span>{{ form.remark }}</span>
                          </li>
                      </van-col> -->
                  </van-row>
              </div>
              <!-- <div class="item_con">
                  <van-row style="margin-top: 2px;">
                      <van-col span="20" offset="1">      
                          <li>
                              <span>调拨入库开始时间&emsp;</span>
                              <span>{{ form.startTime }}</span>
                          </li>
                      </van-col>
                      <van-col span="20" offset="1"> 
                          <li> 
                              <span>调拨入库完成时间&emsp;</span>
                              <span>{{ form.finishTime }}</span>
                          </li>
                      </van-col>
                      <van-col span="20" offset="1"> 
                          <li> 
                              <span>调拨出库操作人&emsp;</span>
                              <span>{{ form.allocateUser }}</span>
                          </li>
                      </van-col> 
                     
                  </van-row>
              </div>  -->
          </div>
        </div>
        <div v-else class="empty">
          <!-- <van-empty description="暂无数据" /> -->
          <span>暂无数据</span>
        </div>
      </div>

      <div class="footer">
        <van-button round type="info" @click="warehousingGoods">提交</van-button>
      </div>
    </div>
  </template>
  <script>
  // import FormGroup from '@/components/FormGroup'
  import NavBar from '@/components/NavBar'
  import {queryAllocateInList,allocateInCreate,queryStationCode} from '@/api/allocate'
  import {queryWarehouseColDropDown} from '@/api/inventory'
  import { getGoodsByMes } from "@/api/storage"
  export default {
    name: "Storage",
    components: {
      NavBar,
      // FormGroup,
    },
    data() {
      return {
        value:'',
        form: null,
        show: false,
        WarehouseArr:[],
        warehouseOptions:[],
        functionAreaCodeArr:[],
        functionAreaCodeOption:[],
        date: new Date(),
        showWarehouse:false,
        name: '调拨入库',
        warehouse:"",
        warehouseCode:"",
        data:[],
        ids:'',
        functionAreaCode:"",
        functionAreaCodeVal:"",
        colIndexAliasList:"",
        colIndexAliasListVal:"",
        colIndexAliasListOptions:[],
        colIndexAliasListArr:[],
        showColIndexAliasList:false,
        showFunctionAreaCode:false,
        areaCode:"",
        locationVal:"",
        location:"",
        showLocation:false,
        locationArr:[],
        locationOptions:[],
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.field.focus();
      });
    },
    methods: {
      async handelManualPickup() {
        if(this.value){
          const res = await getGoodsByMes(this.value)
          if (res.data.code === '0') {
            this.form = res.data.data
            this.form.stationCode=this.locationVal
          } else {
            this.form = null;
          }
        }else{
          this.form = null
        }
        
      },
      async handelLocation(){
        this.queryStationCode()
        // 
      },
      async handelFunctionAreaCode(){
        const params={
          functionCode:'IN',
          functionType:"IN",
          warehouseCode:this.warehouseCode,
          functionAreaCode:this.functionAreaCode,
        }
        const res = await queryWarehouseColDropDown(params)
        if(res.data.code==='0'){
          this.showColIndexAliasList = true
          this.colIndexAliasListArr = res.data.data&&res.data.data.map((v)=>v.key)
          this.colIndexAliasListOptions = res.data.data
        }
        
      },
      onConfirmColIndexAliasList(e){
        this.colIndexAliasListOptions.forEach((v)=>{
          if(v.key===e){
            this.colIndexAliasListVal = e;
            this.colIndexAliasList = e;
            this.areaCode = v.value;
            this.locationVal="";
            this.location="";
            this.locationArr=[]
          }
        })
        this.showColIndexAliasList = false

      },
      onConfirmunFctionAreaCode(e){
        this.functionAreaCodeOption.map((v)=>{
          if(v.value===e){
            this.functionAreaCodeVal = e
            this.functionAreaCode =v.key
            this.colIndexAliasListArr=[]
            this.locationArr=[]
            this.colIndexAliasList=''
            this.colIndexAliasListVal=''
            this.areaCode=''
          }
        })
        this.showFunctionAreaCode = false
      },
      async handelFunctionCode(){
        const params = {
          functionCode:'IN',
          functionType:"IN",
          warehouseCode:this.warehouseCode
        }
        const res = await queryWarehouseColDropDown(params)
        if(res.data.code==='0'){
          this.showFunctionAreaCode = true
          this.functionAreaCodeOption = res.data.data
          this.functionAreaCodeArr=res.data.data.map((v)=>v.value)
        }
       
      },
      async queryWarehouseColDropDown(){
        const res = await queryWarehouseColDropDown({})
        if(res.data.code==='0'){
          this.warehouseOptions =res.data.data
          this.WarehouseArr = res.data.data.map((v)=>v.value)
        }
      },
      async queryStationCode(){
        if(this.colIndexAliasList){
          const params={
            warehouseCode:this.warehouseCode,
            functionCode:'IN',
            functionType:"IN",
            functionAreaCode:this.functionAreaCode,
            colIndexAlias:this.colIndexAliasList,
            areaCode:this.areaCode
          }
          const res = await queryStationCode(params)
          if(res.data.code==='0'){
            this.showLocation=true
            this.locationArr = res.data.data.map((v)=>v.stationName)
            this.locationOptions = res.data.data
          }
        }
        
      },
      onConfirmLocation(e){
        this.locationOptions.map((v)=>{
          if(v.stationName==e){
            this.locationVal=e
            this.location = v.stationCode
          }
        })
        this.showLocation = false
      },
      handelCheckBox(val){
        this.ids=val.id
      },
      handelWarehouse(){
        this.queryWarehouseColDropDown()
        this.showWarehouse = true
      },
      onConfirmWarehouse(e){
        this.warehouseOptions.forEach((v)=>{
          if(v.value===e){
            this.warehouse=e
            this.warehouseCode=v.key
            this.functionAreaCodeArr=[]
            this.colIndexAliasListArr=[]
            this.locationArr=[]
            this.functionAreaCodeVal=''
            this.functionAreaCode=''
            this.colIndexAliasList=''
            this.colIndexAliasListVal=''
            this.areaCode=''
            this.locationVal="",
            this.location=""
          }
        })
        this.showWarehouse = false
      },
      async queryEnumList(){
          const res = await queryEnumList('WarehouseCodeEnum')
          if(res.data.code=='0'){
            this.warehouseOptions= res.data.data
            this.WarehouseArr = res.data.data.map((v)=>v.value)
          }
      },
      async warehousingGoods() {
        const params={
          areaCode:this.areaCode,
          warehouseCode:this.warehouseCode,
          warehouseName:this.warehouse,
          dataList:[
            {
              colIndex:this.colIndexAliasList,
              locationCode:this.location,
              mesBoxNumberQrCode:this.value,
              mesCustomerShortName:this.form.customer_name_short,
              mesLeftRightSides:this.form.mesLeftRightSides,
              mesMeterLength:this.form.length,
              mesNormsName:this.form.specification_name,
              mesSpecialRequirements:this.form.requirement,
              mesWheelType:this.form.wheel,
              remark:this.form.remark,
              stationCode:this.locationVal,
            }
          ],
        }
        const res = await allocateInCreate(params)
        if(res.data.code==='0'){
          this.form=null
          this.warehouse=''
          this.warehouseCode=''
          this.functionAreaCodeVal=''
          this.functionAreaCode=''
          this.colIndexAliasList=''
          this.colIndexAliasListVal=''
          this.areaCode=''
          this.locationVal="",
          this.location=""
        }
      },
      handelCancel() {
        this.show = false
      },
      handelFocus(val) {
        this.show = true
        this.name = val
      },
  
    }
  }
  </script>
  
  <style scoped lang="less">
  .storage {
    height: 100%;
    display: flex;
    flex-direction: column;
    .nav {
      height: 50px;
    }
    .main {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      .con{
            margin-top: 6px;
            .item{
                width: 100%;
                // margin: 0 auto;
                margin-top: 10px;
                background: #fff;
                h4{
                    padding: 8px 12px;
                    background: #ccc;
                }
                .item_con{
                    background: #fff;
                    border-bottom: 1px solid #ccc;
                    padding: 6px 0;
                    ul{
                        display: flex;
                        // justify-content: space-between;
                        padding: 2px 10px;
                    }
                    li{
                        margin-top: 4px;
                    }
                    ul li:not(:first-child){
                        margin-left: 15px;
                    }
                }
                .button{
                    padding: 5px 0;
                    display: flex;
                    justify-content: space-between;
                }
                .edit{
                    color: #1989fa;
                    padding: 4px 14px;
                    // float:right;
                }
            }
        }
      .empty {
        color: #ccc;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .footer {
      height: 50px;
      padding: 2.5px 10px;
      border-top: 1px solid #ccc;
      .van-button--normal {
        width: 100%;
      }
    }
  }
  .boxInformation {
    margin-top: 6px;
  
    .boxCon {
      color: #444;
      font-size: 13px;
      padding: 0 8px;
    }
    .information {
      // padding: 0 15px;
      background: #fff;
      margin-top: 6px;
      height: 148px;
      li {
        padding: 0 36px;
        height: 37px;
        line-height: 37px;
        border-bottom: 1px solid #eee;
      }
    }
    .title {
      color: #666;
      font-size: 13px;
    }
    .con {
      color: #4e4e4e;
      display: inline-block;
      margin-left: 30px;
    }
  }
  </style>