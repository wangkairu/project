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
      <div class="main">
        <div class="con" v-if="form.length!==0">
          <div class="item" v-for="(v,ind) in form" :key="ind">
              <h4>{{ v.mesCustomerShortName }}</h4>
              <div class="item_con">
                  <van-row >
                    <van-col span="20" offset="1"> 
                      <li> 
                          <span>规格简称&emsp;</span>
                          <span>{{ v.mesNormsName }}</span>
                      </li>
                    </van-col>
                      <van-col span="20" offset="1">      
                          <li>
                              <span>客户简称&emsp;</span>
                              <span>{{ v.mesCustomerShortName }}</span>
                          </li>
                      </van-col>
                  </van-row>
                  <van-row type="flex" justify="space-around">
                      <van-col span="10" > 
                          <li> 
                              <span>轮型&emsp;</span>
                              <span>{{ v.mesWheelType }}</span>
                          </li>
                      </van-col>
                      <van-col span="10">     
                          <li>
                              <span>米长&emsp;</span>
                              <span>{{ v.mesMeterLength }}</span>
                          </li>
                      </van-col>
                  </van-row>
                  <van-row type="flex" justify="space-around">
                      <van-col span="10" > 
                          <li> 
                              <span>左右面&emsp;</span>
                              <span>{{ v.mesLeftRightSidesEnum }}</span>
                          </li>
                      </van-col>
                      <van-col span="10">     
                          <li>
                              <span>特殊要求&emsp;</span>
                              <span>{{ v.mesSpecialRequirements }}</span>
                          </li>
                      </van-col>
                  </van-row>
                  <van-row >
                      <van-col span="20" offset="1">      
                          <li>
                              <span>可调拨箱数&emsp;</span>
                              <span >{{ v.boxCount }}</span>
                          </li>
                      </van-col>
                      <van-col span="20" offset="1">      
                          <li>
                              <span>备注&emsp;</span>
                              <span>{{ form.remark }}</span>
                          </li>
                      </van-col>
                  </van-row>
              </div>
              <div class="item_con">
                <van-row >
                  <van-col span="20" offset="1"> 
                      <li style="display: flex;align-items: center;justify-content: space-between;height: 24px;"> 
                          <span style="display: inline-block;width: 160px;">调拨箱数&emsp;</span>
                          <van-cell-group>
                            <van-field v-model="v.count" style="width: 158px;" placeholder="请输入调拨箱数" />
                          </van-cell-group>
                      </li>
                    </van-col>
                    <van-col span="20" offset="1"> 
                      <li style="display: flex;align-items: center;justify-content: space-between;height: 24px;"> 
                          <span style="display: inline-block;width: 160px;">调拨出库制单人&emsp;</span>
                          <van-cell-group>
                            <van-field v-model="v.allocateUser" style="width: 158px;" placeholder="请输入调拨出库制单人" />
                          </van-cell-group>
                      </li>
                    </van-col>
                      <van-col span="20" offset="1">      
                        <li style="display: flex;align-items: center;justify-content: space-between;height: 24px;"> 
                          <span style="display: inline-block;width: 140px;">调拨出库位置&emsp;</span>
                          <van-cell-group>
                            <van-field v-model="v.allocateLocation" style="width: 168px;" placeholder="请输入调拨出库位置" />
                          </van-cell-group>
                      </li>
                      </van-col>
                      <van-col span="20" offset="1">      
                        <li style="display: flex;align-items: center;justify-content: space-between;height: 24px;"> 
                          <span style="display: inline-block;width: 140px;">调拨出库时间&emsp;</span>
                          <van-field  
                            style="width: 198px;height: 36px;line-height: 24px;"   
                            :value="v.time"
                            placeholder="点击选择调拨出库时间"
                            @click="startFlag=true" 
                          />
                          <van-popup v-model="startFlag" position="bottom">
                            <van-datetime-picker
                              :value="v.time"
                              type="date"
                              title="选择调拨出库时间"
                              @confirm="handelStartConfirm(v,$event)"
                              @cancel="startFlag = false"
                            />
                          </van-popup>
                        </li>
                      </van-col>
                  </van-row>
              </div>
          </div>
        </div>
        <div v-else class="empty">
          <!-- <van-empty description="暂无数据" /> -->
          <span class="text">暂无数据</span>
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
  import {queryAllocateInList,allocateOutCreate,queryStationCode,selectCol} from '@/api/allocate'
  import {queryWarehouseColDropDown} from '@/api/inventory'
  import { getGoodsByMes } from "@/api/storage"
  import moment from 'moment'
  export default {
    name: "Storage",
    components: {
      NavBar,
      // FormGroup,
    },
    data() {
      return {
        value:'',
        form: [],
        show: false,
        startFlag:false,
        WarehouseArr:[],
        warehouseOptions:[],
        functionAreaCodeArr:[],
        functionAreaCodeOption:[],
        date: new Date(),
        showWarehouse:false,
        name: '创建调拨出库单',
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
      // this.$nextTick(() => {
      //   this.$refs.field.focus();
      // });
    },
    methods: {
      handelStartConfirm(val,e){
        const date=new Date(e)
        let year=date.getFullYear()
        let month=Number(date.getMonth())+1
        let day=date.getDate()
        val.time=year.toString()+'-'+month.toString()+'-'+day.toString()
        val.startTimeStr=new Date(e).valueOf()
        this.startFlag=false
      },
      async handelManualPickup() {
        const res = await getGoodsByMes(this.value)
        if (res.data.code === '0') {
          this.form = res.data.data
          this.form.stationCode=this.locationVal
        } else {
          this.form = null;
        }
      },

      async handelFunctionAreaCode(){
        const params={
          functionCode:'IN',
          functionType:"IN",
          warehouseCode:this.warehouseCode,
          functionAreaCode:this.functionAreaCode
        }
        const res = await queryWarehouseColDropDown(params)
        if(res.data.code==='0'){
          this.colIndexAliasListArr = res.data.data.map((v)=>v.key)
          this.colIndexAliasListOptions = res.data.data
        }
        this.showColIndexAliasList = true
     
      },
      onConfirmColIndexAliasList(e){
        this.colIndexAliasListOptions.forEach((v)=>{
          if(v.key===e){
            this.colIndexAliasListVal = e;
            this.colIndexAliasList = e;
            this.areaCode = v.value;
            this.locationVal="";
            this.location="";
          }
        })
        this.showColIndexAliasList = false
        this.queryStationCode()
        this.selectCol()
      },
      onConfirmunFctionAreaCode(e){
        this.functionAreaCodeOption.map((v)=>{
          if(v.value===e){
            this.functionAreaCodeVal = e
            this.functionAreaCode =v.key
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
          this.functionAreaCodeOption = res.data.data
          this.functionAreaCodeArr=res.data.data.map((v)=>v.value)
        }
        this.showFunctionAreaCode = true
      },
      async queryWarehouseColDropDown(){
        const res = await queryWarehouseColDropDown({})
        if(res.data.code==='0'){
          this.warehouseOptions =res.data.data
          this.WarehouseArr = res.data.data&&res.data.data.map((v)=>v.value)
        }
      },
      async queryStationCode(){
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
          this.locationArr = res.data.data!=null&&res.data.data.map((v)=>v.stationName)
          this.locationOptions = res.data.data
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
      async selectCol(){
        const params={
          warehouseName:this.warehouse,
          warehouseCode:this.warehouseCode,
          functionCode:'IN',
          functionType:"IN",
          functionAreaCode:this.functionAreaCode,
          colIndexAliasList:[this.colIndexAliasList],
          areaCodeList:[this.areaCode]
        }
        const res = await selectCol(params)
        if(res.data.code=='0'){
          this.form=res.data.data.map(v=>{
            return {
              ...v,
              allocateUser:"",
              allocateLocation:"",
              startTimeStr:"",
              time:"",
            }
          })
        }
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
          dataList:this.form
        }
        const res = await allocateOutCreate(params)
        if(res.data.code==='0'){
          this.form=[]
          this.warehouse=''
          this.warehouseCode=''
          this.functionAreaCodeVal=''
          this.functionAreaCode=''
          this.colIndexAliasList=''
          this.colIndexAliasListVal=''
          this.areaCode=''
          // this.locationVal="",
          // this.location=""
        }
        this.$router.go(-1)
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
                width: 92%;
                margin: 8px auto;
                background: #fff;
                h4{
                    padding: 6px 8px;
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
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
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